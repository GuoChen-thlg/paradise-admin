import { order } from './../../types/order'
import { product } from './../../types/product'
import { user } from '@/types/user'
import { verifyLogin } from '@/api'
import { RootState } from '@/store/index'
import { ActionTree, Module, MutationTree } from 'vuex'

import { AUTHORITY } from '@/enum'
/* 用户 */
export interface User extends user {
	/**
	 * 登录状态
	 */
	login_statu: boolean
	authority: string[]
}

const state: User = {
	id: 0,
	login_statu: false,
	name: '',
	authority: [
		AUTHORITY.PERSONNEL_C,
		AUTHORITY.PERSONNEL_D,
		AUTHORITY.PERSONNEL_R,
		AUTHORITY.PERSONNEL_U,
		AUTHORITY.PEUDUCT_C,
		AUTHORITY.PEUDUCT_D,
		AUTHORITY.PEUDUCT_R,
		AUTHORITY.PEUDUCT_U,
	],
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
}
const mutations: MutationTree<User> = {
	logIn(state) {
		state.login_statu = true
	},
	signOut(state) {
		state.login_statu = false
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
}
export const user_actions = {
	/**验证登录 */
	ASYNCVERIFYLOGIN: 'user/asyncVerifyLogin',
}
const actions: ActionTree<User, RootState> = {
	asyncVerifyLogin({ commit }) {
		verifyLogin()
			.then(data => {
				if (data && data.code === 2000) {
					commit('logIn')
				} else {
					commit('signOut')
				}
			})
			.catch(error => {
				commit('signOut')
			})
	},
}
const module: Module<User, RootState> = {
	namespaced: true,
	state,
	mutations,
	actions,
}

export default module
