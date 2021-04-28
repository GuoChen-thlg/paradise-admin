import { RootState } from '@/store/index.d'
import { Menu } from '@/custom'

import { Module, MutationTree } from 'vuex'
export interface Sidebar {
	isCollapse: boolean
	menu: Menu[]
}

const state: Sidebar = {
	isCollapse: false,
	menu: /^\[.*\]$/.test(
		unescape(`${localStorage.getItem('permissions_menu')}`)
	)
		? JSON.parse(unescape(`${localStorage.getItem('permissions_menu')}`))
		: [],

}

const mutations: MutationTree<Sidebar> = {
	switch(state) {
		state.isCollapse = !state.isCollapse
	},
	setMenu(state, newMenu: Menu[]) {
		if (newMenu instanceof Array) {
			localStorage.setItem(
				'permissions_menu',
				escape(JSON.stringify(newMenu))
			)
			state.menu = newMenu
		}
	},
}

const module: Module<Sidebar, RootState> = {
	namespaced: true,
	state,
	mutations,
}
export default module
