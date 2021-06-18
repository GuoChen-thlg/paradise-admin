import { createApp } from 'vue'
import App from './App.vue'
import store, { key } from './store'
import router from './router'
import ElementPlus from './plugins/element'
import EchartsPlus from './plugins/echarts'
import has from './directives/has'
/*  */
import 'element-plus/lib/theme-chalk/display.css'
import '@/assets/scss/element-variables.scss'
import '@/assets/scss/theme.scss'
import '@/assets/scss/self-adaption.scss'
/*  */

const app = createApp(App)

app.use(router)
	.use(store, key)
	.use(ElementPlus)
	.use(EchartsPlus)
	.use(has)

app.mount('#app')
