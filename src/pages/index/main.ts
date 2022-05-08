/*
 * @Author: 天火流光
 * @Date: 2021-04-10 11:11:29
 * @LastEditTime: 2022-03-20 20:33:45
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
import draggable from 'vuedraggable'
import lowCodeComponents from '@/plugins/lowCodeComponents'

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
	//
	.use(ElDialogDrag)
	.use(ElDialogCorenr)
	.use(ElDialogDragWidth)
	//仓库地址 https://gitee.com/longxinziyan/vue3-menus#vue3-menus
	.use(vue3Menus)
	// 拷贝指令
	.use(copy)
	// 自动加载无代码组件
	.use(lowCodeComponents)
	
app.component(draggable.name, draggable)
app.mount('#app')
