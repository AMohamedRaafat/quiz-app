
import { defineStore } from "pinia";
import { ref } from "vue";
export const useDarkStore = defineStore("dark", () => {
    const isDark = ref(false);
    function toggleDark() {
        isDark.value = !isDark.value;
    }
    return { isDark, toggleDark };
});
