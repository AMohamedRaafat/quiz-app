<template>
  <button
    @click="changeLocale()"
    class="cursor-pointer mb-4 dark:text-white font-bold p-4 rounded w-[50px] h-[50px] flex items-center"
  >
    {{ $i18n.locale === "en-US" ? "ع" : "EN" }}
  </button>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

const changeLocale = () => {
  if (locale.value === "en-US") {
    locale.value = "ar";
    document.dir = "rtl";
  } else {
    locale.value = "en-US";
    document.dir = "ltr";
  }
};
</script>
