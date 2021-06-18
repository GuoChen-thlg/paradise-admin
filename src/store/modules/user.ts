import { user } from '@/types/user'
import { verifyLogin } from '@/api'
import { RootState } from '@/store/index'
import { ActionTree, Module, MutationTree } from 'vuex'

import { AUTHORITY } from '@/enum'
/* 用户 */
export interface User extends user {
	/**
	 * 登录状态
	 */
	login_statu: boolean
	authority: AUTHORITY[]
}

const state: User = {
	id: 0,
	login_statu: false,
	name: '',
	authority: [
		AUTHORITY.PERSONNEL_C,
		AUTHORITY.PERSONNEL_D,
		AUTHORITY.PERSONNEL_R,
		AUTHORITY.PERSONNEL_U,
		AUTHORITY.PEUDUCT_C,
		AUTHORITY.PEUDUCT_D,
		AUTHORITY.PEUDUCT_R,
		AUTHORITY.PEUDUCT_U,
	],
	backpack: [],
}
const mutations: MutationTree<User> = {
	logIn(state) {
		state.login_statu = true
	},
	signOut(state) {
		state.login_statu = false
	},
}
const actions: ActionTree<User, RootState> = {
	asyncVerifyLogin({ commit }) {
		verifyLogin()
			.then(data => {
				if (data && data.code === 2000) {
					commit('logIn')
				} else {
					commit('signOut')
				}
			})
			.catch(error => {
				commit('signOut')
			})
	},
}
const module: Module<User, RootState> = {
	namespaced: true,
	state,
	mutations,
	actions,
}

export default module
