import { createApp } from 'vue'
import { useRootStore } from '@/stores/store'
import { createPinia } from 'pinia'

import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()


app.use(pinia)

export const store = useRootStore()

app.mount('#app')
