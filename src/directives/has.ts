import { App, Directive, DirectiveBinding } from 'vue'

import store from '@/store'

const has = (el: Element, binding: DirectiveBinding<string>) => {
	const permissionStr = binding.value
	const permissionList = permissionStr
		.replaceAll(/ /g, '')
		.split(',')
		.filter(per => per.trim() !== '')
	const userAuthority = store.state.user.authority as string[]
	if (
		permissionList.length === 0 ||
		userAuthority.length === 0 ||
		permissionList.every(per => userAuthority.includes(per))
	) {
		el.parentNode?.removeChild(el)
	}
	console.log(el, binding)
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
