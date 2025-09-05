<template>
  <span
    v-if="$t(text) === 'Easy' || $t(text) === 'سهل'"
    class="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 inset-ring inset-ring-green-500/20"
    >{{ $t(text) }}</span
  >
  <span
    v-else-if="$t(text) === 'Medium' || $t(text) === 'متوسط'"
    class="inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 inset-ring inset-ring-yellow-400/20"
    >{{ $t(text) }}</span
  >
  <span
    v-else-if="$t(text) === 'Hard' || $t(text) === 'صعب'"
    class="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 inset-ring inset-ring-red-400/20"
    >{{ $t(text) }}</span
  >
  <span
    v-else
    class="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 inset-ring inset-ring-gray-400/20"
    >{{ $t(text) }}</span
  >
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps({
  text: {
    type: Object,
    required: true,
  },
});
</script>
