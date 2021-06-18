import { user } from '@/types/user'
import { image } from './media'
export interface material_image extends image {
	/**资源地址*/
	src: string
	/**描述*/
	alt: string
	/**宽*/
	width: number
	/**高*/
	height: number
	/**宽高比 */
	aspect_ratio: number
}
export interface material {
	vendor: user
	title: string
	handle: string
	/**描述 */
	effect: string
	image: material_image
}
