import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementPlus from './plugins/element'

import '@/assets/element-variables.scss'

const app = createApp(App)

app.use(ElementPlus)
app.use(router).use(store)

app.mount('#app')
