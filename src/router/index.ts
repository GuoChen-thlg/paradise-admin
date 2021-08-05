import {
	createRouter,
	createWebHashHistory,
	createWebHistory,
} from 'vue-router'
import { routes } from '@/router/routes'
import store from '@/store'
import { verifyLogin, } from '@/api'

import hasAuthority from '@/utils/hasAuthority'
import { crumbs_mutations } from '@/store/modules/crumbs'
const router = createRouter({
	// history: createWebHashHistory(),
	history: (window as any).VUE_APP_ENV_NO_PRODUCTION
		? createWebHashHistory()
		: createWebHistory(),
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
	console.log(to)

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
// router.beforeResolve((to, from) => {})
router.afterEach((to, from) => {
	document.title = (to.meta.title as string) || '管理系统'
	console.log(to)
	;['id', 'role', 'continent'].forEach(param => {
		if (to.params[param] && to.params[param] !== '')
			to.meta.title = `${to.meta.title}(${param}:${to.params[param]})`
	})

	store.commit(crumbs_mutations.ADDTAB, to)
})
export default router
