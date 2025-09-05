<template>
  <div :class="({ dark: isDark }, ' ')">
    <div
      class="mx-auto mt-8 w-[60%] bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
    >
      <div class="flex gap-2 justify-end">
        <ChangeLanguage />
        <DarkMode />
      </div>

      <QuizContainer />
    </div>
  </div>
</template>

<script setup></script>
<style scoped></style>
