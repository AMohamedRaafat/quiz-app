import { defineAsyncComponent } from 'vue'
export default ({ app }) => {
    app.component('QuizContainer', defineAsyncComponent(() => import('../components/QuizContainer.vue')))
    app.component('QuizItem', defineAsyncComponent(() => import('../components/QuizItem.vue')))
    app.component('ProgressBar', defineAsyncComponent(() => import('../components/ProgressBar.vue')))
    app.component('DarkMode', defineAsyncComponent(() => import('../components/darkMode.vue')))
    app.component('ChangeLanguage', defineAsyncComponent(() => import('../components/changeLanguage.vue')))
}