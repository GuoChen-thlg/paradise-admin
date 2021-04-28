import { RootState } from '@/store/index.d'

import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

import sidebar from '@/store/modules/sidebar'
import crumbs from '@/store/modules/crumbs'
import user from '@/store/modules/user'
import docu from '@/store/modules/docu'
export const key: InjectionKey<Store<RootState>> = Symbol()
export default createStore<RootState>({
	modules: {
		crumbs,
		sidebar,
		user,
		docu,
	},
})
