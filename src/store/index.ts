/*
 * @Author: 天火流光
 * @Date: 2021-06-18 16:10:21
 * @LastEditTime: 2022-02-02 15:44:20
 * @LastEditors: 天火流光
 * @Description: 
 * @FilePath: \paradise-admin\src\store\index.ts
 * 
 */
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

import sidebar, { Sidebar } from '@/store/modules/sidebar'
import crumbs, { Crumbs } from '@/store/modules/crumbs'
import user, { User } from '@/store/modules/user'
import device, { Device } from '@/store/modules/device'
import template, { Template } from '@/store/modules/template'
export interface RootState {
	/* 模块类型 */
	user: User
	sidebar: Sidebar
	crumbs: Crumbs
	device: Device
	template: Template
}
export const key: InjectionKey<Store<RootState>> = Symbol()
export default createStore<RootState>({
	modules: {
		crumbs,
		sidebar,
		user,
		device,
		template,
	},
})
