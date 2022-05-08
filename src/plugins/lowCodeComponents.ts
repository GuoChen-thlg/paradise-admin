/*
 * @Author: 天火流光
 * @Date: 2022-03-20 19:28:51
 * @LastEditTime: 2022-03-20 20:12:16
 * @LastEditors: 天火流光
 * @Description: 无代码组件 自动引入 @/components/modules/ 下的所有组件为全局组件
 * @FilePath: \paradise-admin\src\plugins\lowCodeComponents.ts
 *
 */
import { App } from 'vue'

const context = require.context('@/components/modules/', true, /\.vue$/)
export default {
	install: (app: App): void => {
		context.keys().forEach((key: string) => {
			const component = context(key).default
			app.component(component.name, component)
		})
	},
}
