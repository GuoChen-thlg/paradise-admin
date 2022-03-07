/*
 * @Author: 天火流光
 * @Date: 2022-02-20 22:06:21
 * @LastEditTime: 2022-02-23 23:47:50
 * @LastEditors: 天火流光
 * @Description: 用户类型声明
 * @FilePath: \paradise-admin\typings\user\user.d.ts
 * 
 */
import { pay } from '../pay'
import { material } from '../material'
import { product } from '../product'
import { order } from '../order'

interface userProduct extends product {
	quantity: number
}
interface userMaterial extends material {
	quantity: number
}

export interface IUser {
	readonly id: number
	name: string
	backpack: (userProduct | userMaterial)[]
	cart: order[]
	wishlist: {
		id: number
		vendor: {
			id: number
		}
	}[]
	purse: pay[]
}
