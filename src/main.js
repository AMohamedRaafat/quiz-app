import { createApp } from 'vue'
import './style.css'
import i18n from './boot/i18n.js'
import App from './App.vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import globalComponents from './boot/global-components.js'
const pinia = createPinia()
const app = createApp(App);

globalComponents({ app })
app.use(i18n)
app.use(pinia)
app.use(MotionPlugin)
app.mount('#app')
