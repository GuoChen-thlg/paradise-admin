import { order } from '../../../typings/order'
import { product } from '../../../typings/product'
import { IUser } from '../../../typings/user/user'
import { verifyLogin } from '@/api'
import { RootState } from '@/store/index'
import { ActionTree, Module, MutationTree } from 'vuex'

import { AUTHORITY } from '@/enum'
import Cookies from 'js-cookie'
import { json } from 'sequelize/types'
/* 用户 */
export interface User extends IUser {
	/**
	 * 登录状态
	 */
	login_statu: boolean
	permissions: string[]
}

const state: User = {
	id: 0,
	login_statu: JSON.parse(/* 默认为登陆状态 */
		localStorage.getItem('login_statu') || JSON.stringify({ statu: true })
	).statu,
	name: '',
	permissions: JSON.parse(
		localStorage.getItem('permissions') || JSON.stringify([])
	),
	backpack: [],
	cart: [],
	wishlist: JSON.parse(localStorage.getItem('user_wishlis') || '[]') as {
		id: number
		vendor: { id: number }
	}[],
	purse: [],
}
export const user_mutations = {
	/**改变登录状态 登录 */
	LOGIN: 'user/logIn',
	/**改变登录状态 退出 */
	SIGNOUT: 'user/signOut',
	/** @param product*/
	ADDTOWISHLIST: 'user/addToWishlist',
	/** @param product*/
	REMOVEFROMWISHLIST: 'user/removeFromWishlist',
	/**添加到购物车 */
	ADDTOCART: 'user/addToCart',
	/**设置用户当前权限 */
	SETPERMISSIONS: 'user/setPermissions',
}
const mutations: MutationTree<User> = {
	logIn(state) {
		state.login_statu = true
		localStorage.setItem('login_statu', JSON.stringify({ statu: true }))
	},
	signOut(state) {
		console.log('退出')
		Cookies.set('authorization', '', {
			path: '/',
			expires: new Date(),
		})
		Cookies.set('authorization.sig', '', {
			path: '/',
			expires: new Date(),
		})
		localStorage.removeItem('authorization')
		state.login_statu = false
		localStorage.setItem('login_statu', JSON.stringify({ statu: false }))
	},
	addToWishlist(state, product: product) {
		if (
			!state.wishlist.some(
				p => p.id === product.id && p.vendor.id === product.vendor.id
			)
		) {
			state.wishlist.push({
				id: product.id,
				vendor: {
					id: product.vendor.id,
				},
			})
			localStorage.setItem('user_wishlis', JSON.stringify(state.wishlist))
		}
	},
	removeFromWishlist(state, product: product) {
		if (
			state.wishlist.some(
				p => p.id === product.id && p.vendor.id === product.vendor.id
			)
		) {
			state.wishlist.forEach((p, i) => {
				if (p.id === product.id && p.vendor.id === product.vendor.id) {
					state.wishlist.splice(i, 1)
				}
			})
			localStorage.setItem('user_wishlis', JSON.stringify(state.wishlist))
		}
	},
	addToCart(state, order: order) {
		if (
			!state.cart.some(
				o =>
					o.product_id === order.product_id &&
					o.vendor_id === order.vendor_id
			)
		) {
			state.cart.push(order)
		} else {
			state.cart.forEach((o, i) => {
				if (
					o.product_id === order.product_id &&
					o.vendor_id === order.vendor_id
				) {
					state.cart.splice(i, 1, {
						...order,
						quantity: o.quantity + order.quantity,
					})
				}
			})
		}
	},
	setPermission(state, permissions: string[]) {
		state.permissions = permissions
		localStorage.setItem('permissions', JSON.stringify(permissions))
	},
}

const module: Module<User, RootState> = {
	namespaced: true,
	state,
	mutations,
}

export default module
