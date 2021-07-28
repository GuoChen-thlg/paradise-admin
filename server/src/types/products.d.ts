import { MaterialAttributes } from './material'

export interface ProductAttributes extends MaterialAttributes {
	// user group
	barcode: string
	/**二维码 */
	qr_code: string
	/**产品标签 "tag1, tag2" */
	tags: string
	/**供应商 */
	vendor_id: number
	/**产品类型 */
	product_type: string
	/**开售时间 */
	published_at: string
	/**是否销售 */
	active: Boolean
	/**价格 */
	price: number
	/**最大价格 */
	price_max: number
	/**最小价格 */
	price_min: number
	/**产品分类 */
	product_category: string
	media_ids: string
	variant_ids: string
}
