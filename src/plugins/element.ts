/*
 * @Author: 天火流光
 * @Date: 2021-06-18 16:10:21
 * @LastEditTime: 2022-02-20 20:41:12
 * @LastEditors: 天火流光
 * @Description: element-plus 安装到 Vue
 * @FilePath: \paradise-admin\src\plugins\element.ts
 *
 */
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { App, Plugin } from 'vue'

const plugin: Plugin = {
	install: (app: App): void => {
		app.use(ElementPlus, {
			locale: zhCn,
		})
	},
}
export default plugin
