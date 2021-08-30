import { RootState } from '@/store/index'
import { Menu } from '@/custom'
import { ActionTree, Module, MutationTree } from 'vuex'
/* 侧边栏菜单 */
export interface Sidebar {
	isCollapse: boolean
	menu: Menu[]
}
import { getMenus } from '@/api'

const state: Sidebar = {
	isCollapse: false,
	menu: [],
}
export const sidebar_mutations = {
	/**侧边栏切换 */
	SWITCH: 'sidebar/switch',
	/**设置侧边栏数据 */
	SETMENU: 'sidebar/setMenu',
}
const mutations: MutationTree<Sidebar> = {
	switch(state) {
		state.isCollapse = !state.isCollapse
	},
	setMenu(state, newMenu: Menu[]) {
		if (newMenu instanceof Array) {
			state.menu = newMenu
		}
	},
}
export const sidebar_actions = {
	/**刷新侧边栏菜单数据 */
	ASYNCREFRESHMENU: 'sidebar/asyncRefreshMenu',
}
const actions: ActionTree<Sidebar, RootState> = {
	async asyncRefreshMenu({ commit }) {
		try {
			const result = await getMenus()
			commit('setMenu', result?.menus || [])
		} catch (err) {
			console.error(err)
		}
	},
}
const module: Module<Sidebar, RootState> = {
	namespaced: true,
	state,
	mutations,
	actions,
}
export default module
