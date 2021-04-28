import { createRouter, createWebHashHistory } from 'vue-router'
import routes from '@/router/routes'
import store from '@/store'

const router = createRouter({
	history: createWebHashHistory(),
	routes,
	scrollBehavior(to, from, savedPosition) {
		// ...
		return {
			top: 0,
		}
	},
})

router.beforeEach((to, from) => {
	const state = store.state
	// console.log(to)
	// console.log(from.meta)

	document.title = (to.meta.title as string) || '管理系统'
	// if (to.meta.verifyLogin && state.user.login_status != true) {
	// 	return '/login'
	// }
})

export default router
