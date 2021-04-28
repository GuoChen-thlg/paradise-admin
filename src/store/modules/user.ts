import { verifyLogin } from '@/api'
import { RootState } from '@/store/index.d'
import { ActionTree, Module, MutationTree } from 'vuex'
export interface User {
	login_status: boolean
}

const state: User = {
	login_status: false,
}
const mutations: MutationTree<User> = {
	logIn(state) {
		state.login_status = true
	},
	signOut(state) {
		state.login_status = false
	},
}
const actions: ActionTree<User, RootState> = {
	verifyLogin({ commit }) {
		if (localStorage.getItem('token')) {
			verifyLogin('')
				.then(data => {
					console.log(data)
					commit('logIn')
					localStorage.setItem('token', '******sd*as*d****.*.**.*')
				})
				.catch(error => {
					console.log(error)
					commit('signOut')
					localStorage.removeItem('token')
				})
		}
	},
}

const module: Module<User, RootState> = {
	namespaced: true,
	state,
	mutations,
	actions,
}
export default module
