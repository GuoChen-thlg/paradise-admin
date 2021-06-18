import { RootState } from '@/store/index'
import { Menu } from '@/custom'
import { ActionTree, Module, MutationTree } from 'vuex'
/* 侧边栏菜单 */
export interface Sidebar {
	isCollapse: boolean
	menu: Menu[]
}
import { getAuthInfo } from '@/api'

const state: Sidebar = {
	isCollapse: false,
	menu: [],
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
const actions: ActionTree<Sidebar, RootState> = {
	/**
	 *@description 刷新侧边栏菜单数据
	 *
	 */
	asyncRefreshMenu({ commit }) {
		getAuthInfo().then(data => {
			if (data && data.code === 2000) {
				commit('setMenu', data.data)
				console.log('获取菜单成功');
				
			}
		})
	},
}
const module: Module<Sidebar, RootState> = {
	namespaced: true,
	state,
	mutations,
	actions,
}
export default module
