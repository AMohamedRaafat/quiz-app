import Quzis from '../assets/data.json'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { shuffle } from '../utils/shuffle'

export const useQuizStore = defineStore('quiz', () => {
    const currentQuestionIndex = ref(0);
    const correctAnswersCount = ref(0);
    const questions = ref(Quzis);
    const shuffleQuestionsAndAnswers = (array) => {
        // Shuffle the answers within each question first
        array.forEach(question => {
            question.optionsEn = shuffle([...question.optionsEn]);
            question.optionsAr = shuffle([...question.optionsAr]);
        });

        // Then shuffle the questions themselves
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    questions.value = shuffleQuestionsAndAnswers(questions.value);

    return { questions, currentQuestionIndex, correctAnswersCount };
})