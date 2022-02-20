/*
 * @Author: 天火流光
 * @Date: 2022-01-16 17:07:32
 * @LastEditTime: 2022-02-20 12:16:25
 * @LastEditors: 天火流光
 * @Description:
 * @FilePath: \paradise-admin\src\store\modules\template.ts
 *
 */
import { RootState } from '@/store/index'
import { Module, MutationTree } from 'vuex'
import { jsonClone, randomId } from '@/utils/util'
import { Base } from '@/modules/base/Base'
/* 页面数据 */
export interface Template {
	page: {
		title: string
		id: string
		blocks: Base[]
		[key: string]: string | Base[]
	}
	candidateComponent: {
		name: string
	}
	active: {
		id: string
		path: string
	}
}

const state: Template = {
	candidateComponent: {
		name: '',
	},
	page: {
		title: '',
		id: '',
		blocks: [],
	},
	active: {
		id: '',
		path: '',
	},
}
export const template_mutations = {
	/**设置页面数据 */
	SETPAGE: 'template/setPage',
	/**设置组件 */
	SETBLOCK: 'template/setBlock',
	/**设置选中的组件路径 */
	SETACTIVE: 'template/setActive',
}

const mutations: MutationTree<Template> = {
	setPage(state, page: Template['page']) {
		state.page = {
			title: page.title || '默认Title',
			id: page.id || randomId('page-id-'),
			blocks: jsonClone(page.blocks),
		}
	},
	setBlock(state, blocks: Base[] = []) {
		state.page.blocks = jsonClone(blocks)
	},
	setActive(state, { id, path } = {}) {
		if (id !== undefined) {
			state.active.id = id
		}
		if (path !== undefined) {
			state.active.path = path
		}
	},
}
const module: Module<Template, RootState> = {
	namespaced: true,
	state,
	mutations,
}
export default module
