<template>
  <button
    @click="changeLocale()"
    class="cursor-pointer dark:text-white font-bold mb-4"
    :class="$i18n.locale !== 'ar' ? '-mt-1' : ''"
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
