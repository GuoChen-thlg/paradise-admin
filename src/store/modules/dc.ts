import { RootState } from '@/store/index.d'
import { Module, MutationTree } from 'vuex'
export interface Ua {
	isMobile: boolean
}

const state: Ua = {
	isMobile: false,
}
const mutations: MutationTree<Ua> = {
	update(state) {},
}
const module: Module<Ua, RootState> = {
	namespaced: true,
	state,
	mutations,
}
export default module
