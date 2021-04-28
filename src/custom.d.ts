import { RouteLocationRaw } from 'vue-router'

export interface Menu {
	name: string
	path?: RouteLocationRaw
	componentName?: string
	isGroup?: boolean
	icon?: string
	child?: Menu[]
}

export interface ResponseData {
	code: number
	[name: string]: any
}
