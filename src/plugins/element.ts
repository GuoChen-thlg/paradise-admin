import ElementPlus from 'element-plus'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import locale from 'element-plus/lib/locale'
import { App, Plugin } from 'vue'

const plugin: Plugin = {
	install: (app: App): void => {
		locale.use(lang)
		app.use(ElementPlus)
	},
}
export default plugin
