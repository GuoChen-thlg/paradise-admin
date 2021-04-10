import ElementPlus from 'element-plus'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import locale from 'element-plus/lib/locale'
import { App } from '@vue/runtime-core'
// import { ElButton } from 'element-plus'

export default {
	install: (app: App): void => {
		locale.use(lang)
		app.use(ElementPlus)
	},
}
