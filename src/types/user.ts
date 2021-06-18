import { material } from './material'
import { product } from './product'
export interface user {
	readonly id: number
	name: string
	backpack?: (product | material)[]
}
