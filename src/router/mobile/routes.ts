import { RouteRecordRaw } from 'vue-router'
// import store from '@/store/index'
// import Login from '@/views/index/Login.vue'

// import { AUTHORITY } from '@/enum'

export const routes: Array<RouteRecordRaw> = [
			{
				/*  */
				path: '/',
				redirect: '/index',
			},
			{
				/* 基础页面  */
				path: '/index',
				name: 'Home',
				component: () =>
					import(
						/* webpackChunkName: "home" */ '@/views/mobile/Home.vue'
					),
				meta: {
					showAside: false,
					showHeader: false,
					showFooter: false,
					showTabNav: false,
					title: '关于',
					authority: [],
					verifyLogin: false,
				},
			},
		]
