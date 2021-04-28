import { RootState } from '@/store/index.d'
import { Module, MutationTree } from 'vuex'
export interface Docu {
	scrollTop: number
	clientWidth: number
}

const state: Docu = {
	scrollTop: document.documentElement.scrollTop || window.pageYOffset,
	clientWidth:
		document.documentElement.clientWidth || document.body.offsetWidth,
}
const mutations: MutationTree<Docu> = {
	update(state) {
		state.scrollTop = window.pageYOffset || document.documentElement.scrollTop
		state.clientWidth =
			document.documentElement.clientWidth || document.body.offsetWidth
	},
}
const module: Module<Docu, RootState> = {
	namespaced: true,
	state,
	mutations,
}
export default module
