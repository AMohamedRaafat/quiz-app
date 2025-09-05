<template>
  <div class="quiz-container">
    <h1 class="text-center text-3xl font-bold dark:text-white">
      {{ $t("quiz") }}
    </h1>
    <ProgressBar
      :currentQuestionIndex="currentQuestionIndex"
      :totalQuestions="questions.length"
    />

    <div class="questions-section" v-if="!completed">
      <QuizItem
        :question="questions[currentQuestionIndex]"
        :submitted="questions[currentQuestionIndex].submitted"
        :isCorrect="questions[currentQuestionIndex].isCorrect"
        :currentQuestionIndex="currentQuestionIndex"
        @checkAnswer="checkAnswer"
        @prevQuestion="prevQuestion"
        @nextQuestion="nextQuestion"
      />
    </div>
    <div v-else class="text-center mt-8">
      <h2 class="text-2xl font-bold mb-4 dark:text-white">
        {{ $t("quizCompleted") }}
      </h2>
      <p class="text-lg dark:text-white">
        {{
          $t("yourScore", {
            score: correctAnswersCount,
            total: questions.length,
          })
        }}
      </p>
      <button
        class="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        @click="() => window.location.reload()"
      >
        {{ $t("restartQuiz") }}
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useQuizStore } from "../stores/data";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const quizStore = useQuizStore();
const { currentQuestionIndex, questions } = storeToRefs(quizStore);

const completed = ref(false);
const checkAnswer = (selectedOption) => {
  if (!selectedOption) return;

  const currentQuestion = questions.value[currentQuestionIndex.value];
  const isMultipleChoice = currentQuestion.type === "multiple";

  const isCorrect = isMultipleChoice
    ? JSON.stringify(selectedOption.sort()) ===
      JSON.stringify(
        locale.value === "en-US"
          ? currentQuestion.correctAnswersEn[0].sort()
          : currentQuestion.correctAnswersAr[0].sort()
      )
    : selectedOption ===
      (locale.value === "en-US"
        ? currentQuestion.correctAnswersEn[0]
        : currentQuestion.correctAnswersAr[0]);

  updateQuestionStatus(currentQuestion, selectedOption, isCorrect);
};

const updateQuestionStatus = (question, selectedOption, isCorrect) => {
  question.answer = isCorrect ? selectedOption : null;
  question.submitted = true;
  question.isCorrect = isCorrect;
};

const prevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  }
};
const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++;
  } else {
    completed.value = true;
  }
};
const correctAnswersCount = computed(() => {
  return questions.value.filter((q) => q.answer !== null).length;
});
</script>
<style scoped></style>
