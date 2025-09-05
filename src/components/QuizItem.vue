<template>
  <div class="dark:text-white">
    <div class="flex items-center justify-between">
      <h2 class="font-bold text-1xl">
        {{
          $i18n.locale === "en-US" ? question.questionEn : question.questionAr
        }}
      </h2>

      <div class="flex gap-1">
        <Badge :text="question.type" />
        <Badge :text="question.difficulty" />
      </div>
    </div>
    <div class="mt-4 space-y-2">
      <p v-if="question.type === 'multiple'">{{ $t("selectMore") }}</p>
      <div
        class="flex items-center gap-2 cursor-pointer p-4 rounded"
        v-for="(option, index) in $i18n.locale === 'en-US'
          ? question.optionsEn
          : question.optionsAr"
        :class="{
          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300':
            submitted &&
            ((question.type === 'single' &&
              option ===
                question[
                  $i18n.locale === 'en-US'
                    ? 'correctAnswersEn'
                    : 'correctAnswersAr'
                ][0]) ||
              (question.type === 'multiple' &&
                question[
                  $i18n.locale === 'en-US'
                    ? 'correctAnswersEn'
                    : 'correctAnswersAr'
                ].includes(option))),
          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 ':
            submitted &&
            ((question.type === 'single' &&
              selectedOption === option &&
              option !== question.answer) ||
              (question.type === 'multiple' &&
                selectedOptions.includes(option) &&
                !question[
                  $i18n.locale === 'en-US'
                    ? 'correctAnswersEn'
                    : 'correctAnswersAr'
                ].includes(option))),
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
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
        <label
          class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          :for="option"
          >{{ option }}</label
        >
      </div>

      <div class="mt-4 flex justify-end gap-1">
        <button
          v-if="currentQuestionIndex > 0"
          class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          @click="$emit('prevQuestion')"
        >
          {{ $t("previous") }}
        </button>
        <button
          v-if="!submitted"
          type="button"
          class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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
          text-white
          bg-gradient-to-r
          from-purple-500
          via-purple-600
          to-purple-700
          hover:bg-gradient-to-br
          focus:ring-4
          focus:outline-none
          focus:ring-purple-300
          dark:focus:ring-purple-800
          font-medium
          rounded-lg
          text-sm
          px-5
          py-2.5
          text-center
          me-2
          mb-2
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
const selectedOption = ref(false);
const selectedOptions = ref([]);

watch(
  () => props.question,
  (newQuestion) => {
    selectedOption.value = newQuestion.answer;
    selectedOptions.value = [];
  }
);
</script>
