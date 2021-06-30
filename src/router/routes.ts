import { RouteRecordRaw } from 'vue-router'
import store from '@/store'
import Login from '@/views/Login.vue'

import { AUTHORITY } from '@/enum'

export const routes: Array<RouteRecordRaw> = [
			{
				/*  */
				path: '/',
				redirect: () => {
					if (store.state.user.login_statu === true) {
						return '/home'
					} else {
						return '/login'
					}
				},
			},
			{
				/* 基础页面  */

				path: '/about',
				name: 'About',
				component: () =>
					import(/* webpackChunkName: "about" */ '@/views/About.vue'),
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
			{
				/* 登录页面 登录后不可见 */
				path: '/login',
				name: 'Login',
				component: Login,
				meta: {
					showAside: false,
					showHeader: false,
					showFooter: false,
					showTabNav: false,
					authority: [],
					title: '南天门登记处',
					verifyLogin: false,
				},
			},
			{
				/* 未找到 */
				path: '/404',
				name: 'NotFound',
				component: () =>
					import(
						/* webpackChunkName: "not-fount" */ '@/views/NotFount.vue'
					),
				meta: {
					showAside: false,
					showHeader: false,
					showFooter: false,
					showTabNav: false,
					authority: [],
					verifyLogin: false,
					title: '404',
				},
			},
			{
				/*  */
				path: '/:pathMatch(.*)*',
				redirect: { name: 'NotFound' },
			},
			/* *********************************************************************** */
			{
				/* 首页 */
				path: '/home',
				name: 'Home',
				component: () =>
					import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
				meta: {
					showAside: true,
					showHeader: true,
					showFooter: true,
					showTabNav: true,
					title: '管理系统',
					authority: [],
					verifyLogin: true,
				},
			},
			{
				/* 人员列表 不可增删改同等级及以上人员信息 */
				path: '/personnel',
				name: 'Personnel',
				component: () =>
					import(
						/* webpackChunkName: "personnel" */ '@/views/personnel-bureau/Personnel.vue'
					),
				meta: {
					showAside: true,
					showHeader: true,
					showFooter: true,
					showTabNav: true,
					authority: [AUTHORITY.PERSONNEL_R],
					title: '人员信息',
					verifyLogin: true,
				},
				children: [
					{
						/*  */
						path: ':id(\\d+)',
						name: 'Personnel',
						component: () =>
							import(
								/* webpackChunkName: "edit-personnel" */ '@/views/personnel-bureau/EditPersonnel.vue'
							),
						props: {},
						meta: {
							showAside: true,
							showHeader: true,
							showFooter: true,
							showTabNav: true,
							authority: [
								AUTHORITY.PERSONNEL_C,
								AUTHORITY.PERSONNEL_R,
								AUTHORITY.PERSONNEL_U,
								AUTHORITY.PERSONNEL_D,
							],
							title: '编辑人员信息',
							verifyLogin: true,
						},
					},
					{
						/*  */
						path: 'create',
						name: 'Addnew',
						component: () =>
							import(
								/* webpackChunkName: "add-new" */ '@/views/personnel-bureau/AddNew.vue'
							),
						props: {},
						meta: {
							showAside: true,
							showHeader: true,
							showFooter: true,
							showTabNav: true,
							authority: [AUTHORITY.PERSONNEL_C],
							title: '添加人员',
							verifyLogin: true,
						},
					},
				],
			},
			{
				/* 设置页面 */
				path: '/setting',
				name: 'Setting',
				component: () =>
					import(
						/* webpackChunkName: "router-view" */ '@/views/router-view.vue'
					),
				children: [
					{
						path: 'authority',
						name: 'Authority',
						component: () =>
							import(
								/* webpackChunkName: "authority" */ '@/views/setting/Authority.vue'
							),
					},
					{
						path: 'edit-role/:role?',
						name: 'EditRole',
						component: () =>
							import(
								/* webpackChunkName: "edit-role" */ '@/views/setting/EditRole.vue'
							),
					},
				],
			},
			{
				/* 产品页面 */
				path: '/product',
				component: () =>
					import(
						/* webpackChunkName: "router-view" */ '@/views/router-view.vue'
					),
				children: [
					{
						/*  */
						path: '',
						name: 'Product',
						component: () =>
							import(
								/* webpackChunkName: "product" */ '@/views/product/Product.vue'
							),
						meta: {
							showAside: true,
							showHeader: true,
							showFooter: true,
							showTabNav: true,
							authority: ['a'],
							title: '兜率宫',
							verifyLogin: true,
						},
					},
					{
						/*  */
						path: 'details/:vendor_id/:product_id',
						name: 'Details',
						component: () =>
							import(
								/* webpackChunkName: "details" */ '@/views/product/Details.vue'
							),
						meta: {
							showAside: true,
							showHeader: true,
							showFooter: true,
							showTabNav: true,
							authority: [],
							title: '产品编辑',
							verifyLogin: true,
						},
					},
					{
						/*  */
						path: 'edit-product/:vendor_id/:product_id',
						name: 'EditProduct',
						component: () =>
							import(
								/* webpackChunkName: "edit-product" */ '@/views/product/EditProduct.vue'
							),
						meta: {
							showAside: true,
							showHeader: true,
							showFooter: true,
							showTabNav: true,
							authority: [],
							title: '产品编辑',
							verifyLogin: true,
						},
					},
				],
			},
			{
				/* 股价 */
				path: '/stock',
				name: 'Stock',
				component: () =>
					import(/* webpackChunkName: "stock" */ '@/views/Stock.vue'),
				meta: {
					showAside: true,
					showHeader: true,
					showFooter: true,
					showTabNav: true,
					authority: [],
					title: '股价',
					verifyLogin: true,
				},
			},
			{
				/* 地府 */
				path: '/hell',
				component: () =>
					import(
						/* webpackChunkName: "router-view" */ '@/views/router-view.vue'
					),
				meta: {
					showAside: true,
					showHeader: true,
					showFooter: true,
					showTabNav: true,
					authority: [],
					title: '幽冥地府',
					verifyLogin: true,
				},
				children: [
					{
						/*  */
						path: '',
						name: 'Hell',
						component: () =>
							import(
								/* webpackChunkName: "hell" */ '@/views/hell/Hell.vue'
							),
						meta: {
							showAside: true,
							showHeader: true,
							showFooter: true,
							showTabNav: true,
							authority: [],
							title: '幽冥地府',
							verifyLogin: true,
						},
					},
					{
						/*  */
						path: 'danger-spot',
						name: 'DangerSpot',
						component: () =>
							import(
								/* webpackChunkName: "danger-spot" */ '@/views/hell/DangerSpot.vue'
							),
						meta: {
							showAside: true,
							showHeader: true,
							showFooter: true,
							showTabNav: true,
							authority: [],
							title: '鬼门关',
							verifyLogin: true,
						},
					},
					{
						/*  */
						path: 'reincarnation',
						name: 'Reincarnation',
						component: () =>
							import(
								/* webpackChunkName: "reincarnation" */ '@/views/hell/Reincarnation.vue'
							),
						meta: {
							showAside: true,
							showHeader: true,
							showFooter: true,
							showTabNav: true,
							authority: [],
							title: '六道轮回',
							verifyLogin: true,
						},
					},
				],
			},
			{
				/* 视频 */
				path: '/share',
				component: () =>
					import(
						/* webpackChunkName: "share" */ '@/views/share/Share.vue'
					),
				meta: {
					showAside: true,
					showHeader: true,
					showFooter: true,
					showTabNav: true,
					authority: [],
					title: '分享',
					verifyLogin: true,
				},
			},
			{
				/* 人界 */
				path: '/world',
				component: () =>
					import(
						/* webpackChunkName: "router-view" */ '@/views/router-view.vue'
					),
				meta: {
					showAside: true,
					showHeader: true,
					showFooter: true,
					showTabNav: true,
					authority: [],
					title: '人界',
					verifyLogin: true,
				},
				children: [
					{
						/*  */
						path: '',
						component: () =>
							import(
								/* webpackChunkName: "integrate" */ '@/views/world/Integrate.vue'
							),
						meta: {
							showAside: true,
							showHeader: true,
							showFooter: true,
							showTabNav: true,
							authority: [],
							title: '幽冥地府',
							verifyLogin: true,
						},
					},
					{
						/*  */
						path: 'territory/:continent',
						component: () =>
							import(
								/* webpackChunkName: "territory" */ '@/views/world/Territory.vue'
							),
						meta: {
							showAside: true,
							showHeader: true,
							showFooter: true,
							showTabNav: true,
							authority: [],
							title: '幽冥地府',
							verifyLogin: true,
						},
					},
				],
			},
			{
				path: '/user',
				component: () =>
					import(
						/* webpackChunkName: "router-view" */ '@/views/router-view.vue'
					),

				meta: {
					showAside: true,
					showHeader: true,
					showFooter: true,
					showTabNav: true,
					authority: [],
					title: '我的',
					verifyLogin: true,
				},
				children: [
					{
						path: '',
						name: 'My',
						component: () =>
							import(
								/* webpackChunkName: "my" */ '@/views/my/My.vue'
							),
						meta: {
							showAside: true,
							showHeader: true,
							showFooter: true,
							showTabNav: true,
							authority: [],
							title: '个人中心',
							verifyLogin: true,
						},
					},
					{
						path: 'backpack',
						name: 'Backpack',
						component: () =>
							import(
								/* webpackChunkName: "backpack" */ '@/views/my/Backpack.vue'
							),
						meta: {
							showAside: true,
							showHeader: true,
							showFooter: true,
							showTabNav: true,
							authority: [],
							title: '背包',
							verifyLogin: true,
						},
					},
				],
			},
		]
