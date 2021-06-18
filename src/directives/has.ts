import { App, Directive, DirectiveBinding } from 'vue'

import store from '@/store'
/**
 * 查看
 * 修改
 * 删除
 * 增加
 */

const has = (el: Element, binding: DirectiveBinding) => {

	// store.state.user
}

export default {
	install: (app: App): void => {
		app.directive('has', {
			created(el: Element, binding: DirectiveBinding) {
				has(el, binding)
			},
			updated(el: Element, binding: DirectiveBinding) {
				has(el, binding)
			},
		} as Directive)
	},
}
