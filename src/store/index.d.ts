import { Crumbs } from '@/store/modules/crumbs'
import { Sidebar } from '@/store/modules/sidebar'
import { User } from '@/store/modules/user'
import { Docu } from '@/store/modules/docu'
import { Ua } from '@/store/modules/dc'

export interface RootState {
	/* 模块类型 */
	user: User
	sidebar: Sidebar
	crumbs: Crumbs
	docu: Docu
	ua: Ua
}
