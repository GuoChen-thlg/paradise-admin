import { RouteRecordRaw } from 'vue-router'
import store from '@/store'
import Login from '@/views/Login.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: () => {
			if (store.state.user.login_status === true) {
				return '/home'
			} else {
				return '/login'
			}
		},
	},
	{
		path: '/home',
		name: 'Home',
		component: () => import('@/views/Home.vue'),
		meta: {
			title: '管理系统',
			role: ['rootadmin'],
			verifyLogin: true,
		},
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '@/views/About.vue'),
		meta: {
			showAside: false,
			showHeader: false,
			showFooter: false,
			showTabNav: false,
			title: '关于',
			role: ['rootadmin'],
			verifyLogin: false,
		},
	},
	{
		path: '/personnel',
		name: 'Personnel',
		component: () => import('@/views/Personnel.vue'),
		meta: {
			showAside: true,
			showHeader: true,
			showFooter: true,
			showTabNav: true,
			role: ['rootadmin'],
			title: '人员信息',
			verifyLogin: true,
		},
	},
	{
		path: '/addnew',
		name: 'Addnew',
		component: () => import('@/views/AddNew.vue'),
		meta: {
			showAside: true,
			showHeader: true,
			showFooter: true,
			showTabNav: true,
			role: ['rootadmin'],
			title: '添加人员',
			verifyLogin: true,
		},
	},
	{
		path: '/hell',
		component: () => import('@/views/hell/index.vue'),
		children: [
			{
				path: '',
				name: 'Hell',
				component: () => import('@/views/hell/Hell.vue'),
				meta: {
					showAside: true,
					showHeader: true,
					showFooter: true,
					showTabNav: true,
					role: ['rootadmin'],
					title: '幽冥地府',
					verifyLogin: true,
				},
			},
		],
		meta: {
			showAside: true,
			showHeader: true,
			showFooter: true,
			showTabNav: true,
			role: ['rootadmin'],
			title: '幽冥地府',
			verifyLogin: true,
		},
	},

	{
		path: '/login',
		name: 'Login',
		component: Login,
		// beforeEnter: (to, from, next) => {
		// 	if (store.state.user.login_status === true) {
		// 		return false
		// 	}
		// },
		meta: {
			showAside: false,
			showHeader: false,
			showFooter: false,
			showTabNav: false,
			role: ['rootadmin'],
			title: '南天门登记处',
			verifyLogin: false,
		},
	},
	{
		path: '/404',
		name: 'NotFound',
		component: () => import('@/views/NotFount.vue'),
		meta: {
			showAside: false,
			showHeader: false,
			showFooter: false,
			showTabNav: false,
			role: ['rootadmin'],
			verifyLogin: false,
			title: '404',
		},
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: { name: 'NotFound' },
	},
]

export default routes
