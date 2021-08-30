import {
	DataTypes,
	Model,
	ModelAttributeColumnOptions,
	ModelAttributes,
	Optional,
} from 'sequelize'
import seque from '../controllers/mysql'
import { MaterialAttributes } from './material'
import Media from './media'

interface ProductAttributes extends MaterialAttributes {
	// user group
	barcode: string
	/**二维码 */
	qr_code: string
	/**产品标签 "tag1, tag2" */
	tags: string
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
}

interface ProductCreationAttributes
	extends Optional<
		ProductAttributes,
		| 'id'
		| 'barcode'
		| 'qr_code'
		| 'active'
		| 'tags'
		| 'product_type'
		| 'published_at'
		| 'price_max'
		| 'price_min'
		| 'product_category'
	> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes>
	implements ProductAttributes {
	media_ids: string
	id: number
	barcode: string
	qr_code: string
	tags: string
	product_type: string
	published_at: string
	active: Boolean
	price: number
	price_max: number
	price_min: number
	product_category: string
	title: string
	effect: string
}

Product.init(
	{
		id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true,
			comment: '自增ID',
		},

		title: { type: DataTypes.STRING, allowNull: false },
		barcode: { type: DataTypes.STRING },
		qr_code: { type: DataTypes.STRING },
		tags: { type: DataTypes.JSON },
		product_type: { type: DataTypes.JSON },
		published_at: DataTypes.DATE,
		active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
		price: { type: DataTypes.FLOAT, allowNull: false },
		price_max: { type: DataTypes.FLOAT },
		price_min: { type: DataTypes.FLOAT },
		product_category: { type: DataTypes.STRING },
		effect: { type: DataTypes.VIRTUAL },
	},
	{
		sequelize: seque,
		tableName: 'products',
		timestamps: true,
		underscored: true,
	}
)
Product.hasMany(Media, { foreignKey: 'product_id' })
Media.belongsTo(Product, { foreignKey: 'Product_id', targetKey: 'id' })

export default Product
