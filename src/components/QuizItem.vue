<template>
  <div class="dark:text-white">
    <div class="flex items-center justify-between">
      <h2 class="font-bold text-1xl">
        {{
          $i18n.locale === "en-US" ? question.questionEn : question.questionAr
        }}
      </h2>

      <span
        class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20"
        >{{ $t(question.type) }}</span
      >
    </div>
    <div class="mt-4 space-y-2">
      <div
        class="flex items-center gap-2 cursor-pointer p-4 rounded"
        v-for="(option, index) in $i18n.locale === 'en-US'
          ? question.optionsEn
          : question.optionsAr"
        :class="{
          'bg-green-300 text-black':
            submitted &&
            isCorrect &&
            (question.type === 'single'
              ? selectedOption === option
              : selectedOptions.includes(option)),
          'bg-red-300 text-black':
            submitted &&
            !isCorrect &&
            (question.type === 'single'
              ? selectedOption === option
              : selectedOptions.includes(option) && !question.answer),
        }"
      >
        <input
          v-if="question.type === 'single'"
          :id="option"
          :disabled="submitted"
          :key="index"
          type="radio"
          :value="option"
          name="quiz-options"
          v-model="selectedOption"
        />
        <input
          v-else
          type="checkbox"
          :id="option"
          :disabled="submitted"
          :key="index + currentQuestionIndex"
          :value="option"
          :name="option"
          @change="
            () => {
              if (selectedOptions.includes(option)) {
                selectedOptions = selectedOptions.filter((o) => o !== option);
              } else {
                selectedOptions.push(option);
              }
            }
          "
        />
        <label :for="option">{{ option }}</label>
      </div>

      <div class="mt-4 flex justify-end gap-1">
        <button
          v-if="currentQuestionIndex > 0"
          class="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
          @click="$emit('prevQuestion')"
        >
          {{ $t("previous") }}
        </button>
        <button
          v-if="!submitted"
          class="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
          @click="
            $emit(
              'checkAnswer',
              props.question.type === 'single'
                ? selectedOption
                : selectedOptions
            )
          "
        >
          {{ $t("checkAnswer") }}
        </button>
        <button
          v-else
          class="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
          @click="$emit('nextQuestion')"
        >
          {{ $t("next") }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  submitted: {
    type: Boolean,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
  currentQuestionIndex: {
    type: Number,
    required: true,
  },
});
const emits = defineEmits(["checkAnswer", "prevQuestion", "nextQuestion"]);
const selectedOption = ref(props.question.answer);
const selectedOptions = ref([]);

watch(
  () => props.question,
  (newQuestion) => {
    selectedOption.value = newQuestion.answer;
    selectedOptions.value = [];
  }
);
</script>
