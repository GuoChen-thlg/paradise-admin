import { App, Directive, DirectiveBinding } from 'vue'

import InfiniteScroll from 'element-plus/lib/el-infinite-scroll'

export default {
	install: (app: App): void => {
		app.directive('has', {
			created(el: Element, binding: DirectiveBinding) {},
			updated(el: Element, binding: DirectiveBinding) {},
		} as Directive)
	},
}
