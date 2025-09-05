<template>
  <div class="my-6">
    <!--Progress Bar-->
    <div class="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-600">
      <div
        class="bg-green-300 h-4 rounded-full transition-all duration-500 ease-in-out"
        :style="{ width: countDown ? progress + '%' : '100%' }"
      ></div>
    </div>
    <div class="flex justify-between">
      <p class="mt-2 dark:text-white">
        {{
          $t("questionfrom", {
            index: currentQuestionIndex + 1,
            total: totalQuestions,
          })
        }}
      </p>

      <p
        v-if="!isCompleted"
        class="mt-2 font-bold"
        :class="{
          'text-red-500 dark:text-red-400': countDown <= 60,
          'text-gray-800 dark:text-gray-200': countDown > 60,
        }"
      >
        {{ $t("timeleft") }}: {{ formatTime(countDown) }}
      </p>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onBeforeUnmount } from "vue";
import { SECONDS } from "../configs/CountDown";
const props = defineProps({
  currentQuestionIndex: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["timeUp"]);
const progress = computed(() => {
  return ((props.currentQuestionIndex + 1) / props.totalQuestions) * 100;
});

const countDown = ref(SECONDS); // 5 minutes in seconds
let timer = null;

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const startTimer = () => {
  timer = setInterval(() => {
    if (countDown.value > 0) {
      countDown.value--;
    } else {
      clearInterval(timer);
      emit("timeUp");
    }
  }, 1000);
};

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});

startTimer();
</script>
