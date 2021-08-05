import { RootState } from '@/store/index'
import { Module, MutationTree } from 'vuex'
/* 浏览器设备 */
export interface Device {
	scrollTop: number
	clientWidth: number
}

const state: Device = {
	scrollTop: document.documentElement.scrollTop || window.pageYOffset,
	clientWidth:
		document.documentElement.clientWidth || document.body.offsetWidth,
}
export const device_mutations = {
	/**更新数据 */
	update: 'device/update',
}
const mutations: MutationTree<Device> = {
	update(state) {
		state.scrollTop =
			window.pageYOffset || document.documentElement.scrollTop
		state.clientWidth =
			document.documentElement.clientWidth || document.body.offsetWidth
	},
}
const module: Module<Device, RootState> = {
	namespaced: true,
	state,
	mutations,
}
export default module
