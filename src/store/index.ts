import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

import sidebar, { Sidebar } from '@/store/modules/sidebar'
import crumbs, { Crumbs } from '@/store/modules/crumbs'
import user, { User } from '@/store/modules/user'
import device, { Device } from '@/store/modules/device'
export interface RootState {
	/* 模块类型 */
	user: User
	sidebar: Sidebar
	crumbs: Crumbs
	device: Device
}
export const key: InjectionKey<Store<RootState>> = Symbol()
export default createStore<RootState>({
	modules: {
		crumbs,
		sidebar,
		user,
		device,
	},
})
