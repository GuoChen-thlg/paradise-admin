import { pay } from './pay'
import { material } from './material'
import { product } from './product'
import { order } from './order'

interface userProduct extends product {
	quantity: number
}
interface userMaterial extends material {
	quantity: number
}

export interface user {
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
