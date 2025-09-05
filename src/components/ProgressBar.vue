<template>
  <div class="my-6">
    <!--Progress Bar-->
    <div class="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-600">
      <div
        class="bg-green-300 h-4 rounded-full transition-all duration-500 ease-in-out"
        :style="{ width: progress + '%' }"
      ></div>
    </div>
    <p class="mt-2 dark:text-white">
      {{
        $t("questionfrom", {
          index: currentQuestionIndex + 1,
          total: totalQuestions,
        })
      }}
    </p>
  </div>
</template>
<script setup>
import { computed } from "vue";
const props = defineProps({
  currentQuestionIndex: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
});

const progress = computed(() => {
  return ((props.currentQuestionIndex + 1) / props.totalQuestions) * 100;
});
</script>
