<template>
  <div :class="({ dark: isDark }, ' ')">
    <div
      v-motion
      :initial="{ opacity: 0, y: 100, scale: 0.5 }"
      :enter="{ opacity: 1, y: 0, scale: 1 }"
      :duration="1200"
      class="mx-auto mt-8 w-[85%] lg:w-[60%] bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
    >
      <div class="flex gap-5 justify-end items-center">
        <ExcelDownload :data="questions" />
        <ChangeLanguage />
        <DarkMode />
      </div>
      <QuizContainer />
    </div>
  </div>
</template>

<script setup>
import { useQuizStore } from "/src/stores/data";
import { storeToRefs } from "pinia";
const quizStore = useQuizStore();
const { questions } = storeToRefs(quizStore);
</script>
<style scoped></style>
