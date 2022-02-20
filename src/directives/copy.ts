/*
 * @Author: 天火流光
 * @Date: 2022-02-19 00:42:28
 * @LastEditTime: 2022-02-19 01:35:25
 * @LastEditors: 天火流光
 * @Description: 拷贝指令
 * @FilePath: \paradise-admin\src\directives\copy.ts
 *
 */
import { ElMessage } from 'element-plus'
import { App, DirectiveBinding } from 'vue'

export default {
	install: (app: App): void => {
		app.directive('copy', {
			mounted(el: Element, binding: DirectiveBinding) {
				// TODO 有待优化
				el.addEventListener('click', () => {
					const elInput = document.createElement('input')
					elInput.type = 'hidder'
					elInput.value = binding.value
					document.body.appendChild(elInput)
					elInput.select()
					document.execCommand('copy')
					console.log(elInput.value)
					document.body.removeChild(elInput)
					ElMessage.success('复制成功')
					// navigator.clipboard
					// 	.writeText('value')
				})
			},
		})
	},
}
