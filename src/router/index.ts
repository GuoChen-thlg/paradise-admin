import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from '@/router/routes'
import store from '@/store'
import { verifyLogin, getAuthInfo } from '@/api'

import hasAuthority from '@/utils/hasAuthority'
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
router.beforeResolve((to, from) => {
	console.log('beforeResolve', to, from)
})
router.beforeEach((to, from) => {
	const state = store.state
	document.title = (to.meta.title as string) || '管理系统'

	/*  TODO 用户权限列表 */
	// if (
	// 	!hasAuthority(
	// 		to.meta && (to.meta.authority as string[]),
	// 		state.user.authority
	// 	)
	// ) {
	// 	return '/404'
	// }
	if (/\/$/.test(to.path)) {
		return router.replace({ ...to, path: to.path.slice(0, -1) })
	}
})

export default router
