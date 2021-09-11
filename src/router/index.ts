import {
	createRouter,
	createWebHashHistory,
	createWebHistory,
} from 'vue-router'
import { routes } from '@/router/routes'
import store from '@/store'

import hasAuthority from '@/utils/hasAuthority'
import { crumbs_mutations } from '@/store/modules/crumbs'
const router = createRouter({
	// history: createWebHashHistory(),
	history:
		// process.env.NODE_ENV === 'production'
		// 	? createWebHistory()
		// 	:
		createWebHashHistory(),
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

	if (
		(to.meta.verifyLogin && state.user.login_statu) ||
		!to.meta.verifyLogin
	) {
		/*  TODO 用户权限列表 */
		// if (
		// 	!hasAuthority(
		// 		to.meta && (to.meta.authority as string[]),
		// 		state.user.authority
		// 	)
		// ) {
		// 	return '/404'
		// }
	} else {
		return '/login'
	}
	if (/\/$/.test(to.path)) {
		return router.replace({ ...to, path: to.path.slice(0, -1) })
	}
})
// router.beforeResolve((to, from) => {})
router.afterEach((to, from) => {
	document.title = (to.meta.title as string) || '管理系统'
	console.log(to)
	// 若要将子页面添加到 tab 列中 则将形参添加到该数组中
	// 
	;['id', 'key', 'continent'].forEach(param => {
		if (to.params[param] && to.params[param] !== '')
			to.meta.title = `${to.meta.title}(${param}:${to.params[param]})`
	})

	store.commit(crumbs_mutations.ADDTAB, to)
})
export default router
