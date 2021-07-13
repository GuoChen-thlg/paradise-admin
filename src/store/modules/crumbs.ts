import { RootState } from '@/store/index'
import { Module, MutationTree } from 'vuex'
import { RouteLocationNormalized } from 'vue-router'
/* TAB 切换  */
export interface Crumbs {
	/**
	 * tab 列表
	 */
	tabsList: RouteLocationNormalized[]
	/**
	 * 需要缓存的组件名称 列表
	 */
	cacheList: string[]
}

const state: Crumbs = {
	tabsList: [],
	cacheList: [],
}
export const enum crumbs_mutations {
	ADDTAB = 'crumbs/addTab',
	REMOVETAB = 'crumbs/removeTab',
}

const mutations: MutationTree<Crumbs> = {
	addTab(state, route: RouteLocationNormalized) {
		if ('/home' !== route.path) {
			const has = state.tabsList.some(tab => {
				return tab.path === route.path
			})
			if (!has && route.meta.tabSwitch) {
				state.tabsList.push(route)
				if (route.name && route.meta.cache) {
					state.cacheList.push(route.name.toString())
				}
			}
		}
	},
	removeTab(state, route: RouteLocationNormalized) {
		const index = state.tabsList.findIndex(tab => tab.path === route.path)
		state.tabsList.splice(index, 1)
		if (
			state.cacheList.some(name => {
				return name === route.name?.toString()
			})
		) {
			state.cacheList.splice(
				state.cacheList.findIndex(
					name => name === route.name?.toString()
				),
				1
			)
		}
	},
}

const module: Module<Crumbs, RootState> = {
	namespaced: true,
	state,
	mutations,
}
export default module
