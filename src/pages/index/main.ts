/*
 * @Author: 天火流光
 * @Date: 2021-04-10 11:11:29
 * @LastEditTime: 2022-03-06 21:06:34
 * @LastEditors: 天火流光
 * @Description:
 * @FilePath: \paradise-admin\src\pages\index\main.ts
 *
 */
import { createApp } from 'vue'
import vue3Menus from 'vue3-menus'

import App from '@/pages/index/App.vue'
import store, { key } from '@/store'
import router from '@/router/index'
import ElementPlus from '@/plugins/element'
import has from '@/directives/has'
import ElDialogDrag from '@/directives/el-dialog-drag'
import ElDialogCorenr from '@/directives/el-dialog-corner'
import ElDialogDragWidth from '@/directives/el-dialog-drag-width'
import copy from '@/directives/copy'

/*  */
import '@/assets/scss/element-variables.scss'
import '@/assets/scss/theme.scss'
import '@/assets/scss/self-adaption.scss'
import '@/assets/scss/menus.scss'
/*  */

const app = createApp(App)

app.use(router)
	.use(store, key)
	.use(ElementPlus)
	.use(has)
	.use(ElDialogDrag)
	.use(ElDialogCorenr)
	.use(ElDialogDragWidth)
	//仓库地址 https://gitee.com/longxinziyan/vue3-menus#vue3-menus
	.use(vue3Menus)
	.use(copy)

app.mount('#app')
