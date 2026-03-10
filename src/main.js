import { createApp } from 'vue'
import { useRootStore } from '@/stores/store'
import { createPinia } from 'pinia'

import App from './App.vue'
// import router from './router'

const app = createApp(App)
const pinia = createPinia()


app.use(pinia)
// app.use(router)

export const store = useRootStore()
// rootStore.getCongestion()

app.mount('#app')

// export const rootStore = useRootStore()
// app.use(rootStore)
