import { RootState } from '@/store/index.d'
import { Module, MutationTree } from 'vuex'
import { Menu } from '@/custom'

export interface Crumbs {
	currentMenu: Menu
	tabsList: Menu[]
	cacheList: String[]
}

const state: Crumbs = {
	currentMenu: {
		name: '首页',
		path: '/home',
	},
	tabsList: [],
	cacheList: [],
}
const mutations: MutationTree<Crumbs> = {
	addTab(state, menu: Menu) {
		state.currentMenu = menu
		if ('/home' !== menu.path) {
			const has = state.tabsList.some(tab => {
				return tab.path === menu.path
			})
			// if (!has) {
			state.tabsList.push(menu)
			console.log(menu.componentName)

			if (menu.componentName) {
				state.cacheList.push(`${menu.componentName}`)
			}
			// }
		}
	},
	switchTab(state, menu: Menu) {
		state.currentMenu = menu
	},
	removeTab(state, menu: Menu) {
		const index = state.tabsList.findIndex(tab => tab.path === menu.path)
		state.cacheList.splice(index, 1)
		state.tabsList.splice(index, 1)
	},
}

const module: Module<Crumbs, RootState> = {
	namespaced: true,
	state,
	mutations,
}
export default module
