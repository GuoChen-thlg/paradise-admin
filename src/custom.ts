import { RouteLocationRaw } from 'vue-router'
/**
 * 侧边导航栏 数据类型
 */
export interface Menu {
	name: string
	path?: RouteLocationRaw
	componentName?: string
	isGroup?: boolean
	icon?: string
	child?: Menu[]
}
/**
 * 响应数据类型
 */
export interface ResponseData {
	code: number
	[name: string]: any
}
