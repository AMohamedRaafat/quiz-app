<template>
  <div class="text-center mt-8">
    <h2 class="text-2xl font-bold mb-4 dark:text-white">
      {{ $t("quizCompleted") }}
    </h2>
    <p class="text-lg dark:text-white">
      {{
        $t("yourScore", {
          score,
          total,
        })
      }}
    </p>
    <button
      class="cursor-pointer mt-3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      @click="() => window.location.reload()"
    >
      {{ $t("restartQuiz") }}
    </button>
  </div>
</template>
<script setup>
const props = defineProps({
  score: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});
</script>
