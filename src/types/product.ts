import { user } from '@/types/user'
import { image, media } from './media'
import { material } from './material'

export interface product_image extends image {
	/**产品的id*/
	readonly product_id: number
	/**对应的变体id*/
	variant_ids: number[]
	/**创建时间 */
	created_at: string
}
export interface product_media extends media {
	/**产品id */
	readonly product_id: number
	/**对应的变体id */
	variant_ids: number[]

	/**位置下标 */
	index: number
	/**创建时间 */
	created_at: string
}
export interface variant {
	readonly id: number
	title: string
	/**价格 */
	price: number
	weight: number
	/**条形码 */
	barcode: string
	/**二维码 */
	qr_code: string
	/**产品展示图片 */
	image: product_image
	/**产品媒体列表 */
	media: media[]
	created_at: string
	updated_at: string
	/**是否可售 */
	available: boolean
}
export interface product extends material {
	readonly id: string
	/**条形码 */
	barcode: string
	/**二维码 */
	qr_code: string
	tags: string[]
	/**供应商 */
	vendor: user
	/**产品类型 */
	product_type: string[]
	created_at: string
	updated_at: string
	/**开售时间 */
	published_at: string
	/**销售范围 */
	published_scope: string[]
	/**是否销售 */
	active: string
	/**价格 */
	price: number
	/**最大价格 */
	price_max: number
	/**最小价格 */
	price_min: number
	/**产品分类 */
	product_category: string
	image: product_image
	media: media[]
	variants: variant[]
}
