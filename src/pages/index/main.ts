import { createApp } from 'vue'
import App from '@/pages/index/App.vue'
import store, { key } from '@/store'
import router from '@/router/index'
import ElementPlus from '@/plugins/element'
import has from '@/directives/has'
import ElDialogDrag from '@/directives/el-dialog-drag'
import ElDialogCorenr from '@/directives/el-dialog-corner'
import ElDialogDragWidth from '@/directives/el-dialog-drag-width'
/*  */
import '@/assets/scss/element-variables.scss'
import '@/assets/scss/theme.scss'
import '@/assets/scss/self-adaption.scss'
/*  */

const app = createApp(App)

app.use(router)
	.use(store, key)
	.use(ElementPlus)
	.use(has)
	.use(ElDialogDrag)
	.use(ElDialogCorenr)
	.use(ElDialogDragWidth)
app.mount('#app')
