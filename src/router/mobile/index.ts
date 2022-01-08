import {
	createRouter,
	createWebHashHistory,
	createWebHistory,
} from 'vue-router'
import { routes } from '@/router/mobile/routes'


// import hasAuthority from '@/utils/hasAuthority'
// import { crumbs_mutations } from '@/store/modules/crumbs'
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

export default router
