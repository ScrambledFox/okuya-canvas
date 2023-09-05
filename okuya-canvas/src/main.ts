import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'

import 'primevue/resources/themes/soho-dark/theme.css'
import "primeicons/primeicons.css";

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue)
app.use(router)

app.mount('#app')
