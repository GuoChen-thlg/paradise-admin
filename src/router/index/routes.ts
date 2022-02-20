import { RouteRecordRaw } from 'vue-router'
import store from '@/store/index'
import Login from '@/views/index/login/Login.vue'

import { AUTHORITY } from '@/enum'

export const routes: Array<RouteRecordRaw> = [
			{
				/*  */
				path: '/',
				redirect: '/home', //() => (store.state.user.login_statu ? '/home' : '/login'),
			},
			{
				/* 基础页面  */
				path: '/about',
				name: 'About',
				component: () =>
					import(
						/* webpackChunkName: "about" */ '@/views/public/about/About.vue'
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
				beforeEnter: (to, from) => {
					if (store.state.user.login_statu) {
						return '/home'
					}
				},
			},
			{
				/* 未找到 */
				path: '/404',
				name: 'NotFound',
				component: () =>
					import(
						/* webpackChunkName: "not-fount" */ '@/views/public/error/NotFount.vue'
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
			{
				/* 首页 */
				path: '/home',
				name: 'Home',
				component: () =>
					import(
						/* webpackChunkName: "home" */ '@/views/index/Home.vue'
					),
				meta: {
					showAside: true,
					showHeader: true,
					showFooter: true,
					showTabNav: true,
					title: '管理系统',
					authority: [],
					verifyLogin: true,
					tabSwitch: true,
				},
			},
			/* *********************************************************************** */
			{
				/* 人员列表 不可增删改同等级及以上人员信息 */
				path: '/personnel',
				name: 'Personnel',
				component: () =>
					import(
						/* webpackChunkName: "personnel" */ '@/views/index/personnel-bureau/Personnel.vue'
					),
				meta: {
					showAside: true,
					showHeader: true,
					showFooter: true,
					showTabNav: true,
					authority: [AUTHORITY.PERSONNEL_R],
					title: '人员信息',
					verifyLogin: true,
					tabSwitch: true,
					cache: true,
				},
				children: [
					{
						/*  */
						path: ':id(\\d+)',
						name: 'Personnel',
						component: () =>
							import(
								/* webpackChunkName: "edit-personnel" */ '@/views/index/personnel-bureau/EditPersonnel.vue'
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
							tabSwitch: true,
						},
					},
					{
						/*  */
						path: 'create',
						name: 'Addnew',
						component: () =>
							import(
								/* webpackChunkName: "add-new" */ '@/views/index/personnel-bureau/AddNew.vue'
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
							tabSwitch: true,
						},
					},
				],
			},
			{
				/* 系统设置 */
				path: '/system',
				name: 'System',
				component: () =>
					import(
						/* webpackChunkName: "router-view" */ '@/views/public/router-view.vue'
					),
				children: [],
			},
			{
				/* 系统设置 */
				path: '/setting',
				name: 'Setting',
				component: () =>
					import(
						/* webpackChunkName: "router-view" */ '@/views/public/router-view.vue'
					),
				children: [
					{
						path: 'authority',
						name: 'Authority',
						component: () =>
							import(
								/* webpackChunkName: "authority" */ '@/views/index/setting/Authority.vue'
							),
						meta: {
							showAside: true,
							showHeader: true,
							showFooter: true,
							showTabNav: true,
							authority: [],
							title: '权限控制',
							verifyLogin: true,
							tabSwitch: true,
						},
					},
					{
						path: 'role',
						name: 'Role',
						component: () =>
							import(
								/* webpackChunkName: "router-view" */ '@/views/public/router-view.vue'
							),
						children: [
							{
								path: '',
								component: () =>
									import(
										/* webpackChunkName: "role" */ '@/views/index/setting/Role.vue'
									),
								meta: {
									showAside: true,
									showHeader: true,
									showFooter: true,
									showTabNav: true,
									authority: [],
									title: '角色权限',
									verifyLogin: true,
									tabSwitch: true,
								},
							},
							{
								path: ':key',
								name: 'EditRole',
								component: () =>
									import(
										/* webpackChunkName: "edit-role" */ '@/views/index/setting/EditRole.vue'
									),
								meta: {
									showAside: true,
									showHeader: true,
									showFooter: true,
									showTabNav: true,
									authority: [],
									title: '角色权限编辑',
									verifyLogin: true,
									tabSwitch: true,
								},
							},
						],
					},
				],
			},
			{
				/* 产品页面 */
				path: '/product',
				name: 'Product',
				component: () =>
					import(
						/* webpackChunkName: "router-view" */ '@/views/public/router-view.vue'
					),
				children: [
					{
						/*  */
						path: '',
						component: () =>
							import(
								/* webpackChunkName: "product" */ '@/views/index/product/Product.vue'
							),
						meta: {
							showAside: true,
							showHeader: true,
							showFooter: true,
							showTabNav: true,
							authority: ['a'],
							title: '兜率宫',
							verifyLogin: true,
							tabSwitch: true,
						},
					},
					{
						/*  */
						path: 'details/:vendor_id/:product_id',
						name: 'Details',
						component: () =>
							import(
								/* webpackChunkName: "details" */ '@/views/index/product/Details.vue'
							),
						meta: {
							showAside: true,
							showHeader: true,
							showFooter: true,
							showTabNav: true,
							authority: [],
							title: '产品详情',
							verifyLogin: true,
						},
					},
					{
						/*  */
						path: 'edit-product/:vendor_id/:product_id',
						name: 'EditProduct',
						component: () =>
							import(
								/* webpackChunkName: "edit-product" */ '@/views/index/product/EditProduct.vue'
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
					import(
						/* webpackChunkName: "stock" */ '@/views/index/Stock.vue'
					),
				meta: {
					showAside: true,
					showHeader: true,
					showFooter: true,
					showTabNav: true,
					authority: [],
					title: '股价',
					verifyLogin: true,
					tabSwitch: true,
				},
			},
			{
				/* 地府 */
				path: '/hell',
				name: 'Hell',
				component: () =>
					import(
						/* webpackChunkName: "router-view" */ '@/views/public/router-view.vue'
					),
				children: [
					{
						/*  */
						path: '',
						component: () =>
							import(
								/* webpackChunkName: "hell" */ '@/views/index/hell/Hell.vue'
							),
						meta: {
							showAside: true,
							showHeader: true,
							showFooter: true,
							showTabNav: true,
							authority: [],
							title: '幽冥地府',
							verifyLogin: true,
							tabSwitch: true,
						},
					},
					{
						/*  */
						path: 'danger-spot',
						name: 'DangerSpot',
						component: () =>
							import(
								/* webpackChunkName: "danger-spot" */ '@/views/index/hell/DangerSpot.vue'
							),
						meta: {
							showAside: true,
							showHeader: true,
							showFooter: true,
							showTabNav: true,
							authority: [],
							title: '鬼门关',
							verifyLogin: true,
							tabSwitch: true,
						},
					},
					{
						/*  */
						path: 'reincarnation',
						name: 'Reincarnation',
						component: () =>
							import(
								/* webpackChunkName: "reincarnation" */ '@/views/index/hell/Reincarnation.vue'
							),
						meta: {
							showAside: true,
							showHeader: true,
							showFooter: true,
							showTabNav: true,
							authority: [],
							title: '六道轮回',
							verifyLogin: true,
							tabSwitch: true,
						},
					},
					{
						/*  */
						path: 'township',
						name: 'Township',
						component: () =>
							import(
								/* webpackChunkName: "reincarnation" */ '@/views/index/hell/Township.vue'
							),
						meta: {
							showAside: true,
							showHeader: true,
							showFooter: true,
							showTabNav: true,
							authority: [],
							title: '望乡台',
							verifyLogin: true,
							tabSwitch: true,
						},
					},
					{
						/*  */
						path: 'meng-po-pavilion',
						name: 'MengPoPavilion',
						component: () =>
							import(
								/* webpackChunkName: "meng-po-pavilion" */ '@/views/index/hell/MengPoPavilion.vue'
							),
						meta: {
							showAside: true,
							showHeader: true,
							showFooter: true,
							showTabNav: true,
							authority: [],
							title: '孟婆亭',
							verifyLogin: true,
							tabSwitch: true,
						},
					},
					{
						/*  */
						path: 'obituary',
						name: 'Obituary',
						component: () =>
							import(
								/* webpackChunkName: "obituary" */ '@/views/index/hell/Obituary.vue'
							),
						meta: {
							showAside: true,
							showHeader: true,
							showFooter: true,
							showTabNav: true,
							authority: [],
							title: '生死簿',
							verifyLogin: true,
							tabSwitch: true,
						},
					},
				],
			},
			{
				/* 视频 */
				path: '/share',
				name: 'Share',
				component: () =>
					import(
						/* webpackChunkName: "router-view" */ '@/views/public/router-view.vue'
					),

				children: [
					{
						path: '',
						component: () =>
							import(
								/* webpackChunkName: "share" */ '@/views/index/share/Share.vue'
							),
						meta: {
							showAside: true,
							showHeader: true,
							showFooter: true,
							showTabNav: true,
							authority: [],
							title: '分享',
							verifyLogin: true,
							tabSwitch: true,
						},
					},
					{
						path: 'socket',
						name: 'Socket',
						component: () =>
							import(
								/* webpackChunkName: "socket" */ '@/views/index/share/Socket.vue'
							),
						meta: {
							showAside: true,
							showHeader: true,
							showFooter: true,
							showTabNav: true,
							authority: [],
							title: '通信',
							verifyLogin: true,
							tabSwitch: true,
						},
					},
				],
			},
			{
				/* 人界 */
				path: '/world',
				name: 'Integrate',
				component: () =>
					import(
						/* webpackChunkName: "router-view" */ '@/views/public/router-view.vue'
					),
				children: [
					{
						/*  */
						path: '',
						component: () =>
							import(
								/* webpackChunkName: "integrate" */ '@/views/index/world/Integrate.vue'
							),
						meta: {
							showAside: true,
							showHeader: true,
							showFooter: true,
							showTabNav: true,
							authority: [],
							title: '人界',
							verifyLogin: true,
							tabSwitch: true,
						},
					},
					{
						/*  */
						path: 'territory/:continent',
						component: () =>
							import(
								/* webpackChunkName: "territory" */ '@/views/index/world/Territory.vue'
							),
						meta: {
							showAside: true,
							showHeader: true,
							showFooter: true,
							showTabNav: true,
							authority: [],
							title: '大陆',
							verifyLogin: true,
							tabSwitch: true,
						},
					},
				],
			},
			{
				path: '/user',
				name: 'My',
				component: () =>
					import(
						/* webpackChunkName: "router-view" */ '@/views/public/router-view.vue'
					),

				children: [
					{
						path: '',
						component: () =>
							import(
								/* webpackChunkName: "my" */ '@/views/index/my/My.vue'
							),
						meta: {
							showAside: true,
							showHeader: true,
							showFooter: true,
							showTabNav: true,
							authority: [],
							title: '个人中心',
							verifyLogin: true,
							tabSwitch: true,
						},
					},
					{
						path: 'backpack',
						name: 'Backpack',
						component: () =>
							import(
								/* webpackChunkName: "backpack" */ '@/views/index/my/Backpack.vue'
							),
						meta: {
							showAside: true,
							showHeader: true,
							showFooter: true,
							showTabNav: true,
							authority: [],
							title: '背包',
							verifyLogin: true,
							tabSwitch: true,
						},
					},
				],
			},
			{
				path: '/construct',
				name: 'Construct',
				component: () =>
					import(
						/* webpackChunkName: "construct" */ '@/views/index/construct/Construct.vue'
					),
				meta: {
					showAside: false,
					showHeader: false,
					showFooter: false,
					showTabNav: false,
					authority: [],
					title: '低代码搭建',
					verifyLogin: true,
					tabSwitch: true,
				},
			},
		]
