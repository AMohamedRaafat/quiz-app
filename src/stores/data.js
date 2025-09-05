import Quzis from '../assets/data.json'
import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useQuizStore = defineStore('quiz', () => {
    const currentQuestionIndex = ref(0);
    const correctAnswersCount = ref(0);
    const questions = ref(Quzis);
    return { questions, currentQuestionIndex, correctAnswersCount };
})