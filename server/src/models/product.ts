import {
	DataTypes,
	Model,
	ModelAttributeColumnOptions,
	ModelAttributes,
	Optional,
} from 'sequelize'
import seque from '../controllers/mysql'
import { ProductAttributes } from '../types/products'

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
		| 'vendor_id'
	> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes>
	implements ProductAttributes {
	media_ids: string
	id: number
	barcode: string
	qr_code: string
	tags: string
	vendor_id: number
	product_type: string
	published_at: string
	active: Boolean
	price: number
	price_max: number
	price_min: number
	product_category: string
	variant_ids: string
	title: string
	effect: string
	image_id: number
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
		vendor_id: { type: DataTypes.INTEGER },
		product_type: { type: DataTypes.JSON },
		published_at: DataTypes.DATE,
		active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
		price: { type: DataTypes.FLOAT ,allowNull:false },
		price_max: { type: DataTypes.FLOAT },
		price_min: { type: DataTypes.FLOAT },
		product_category: { type: DataTypes.STRING },
		effect: { type: DataTypes.VIRTUAL },
		image_id: { type: DataTypes.INTEGER },
		media_ids: { type: DataTypes.JSON },
		variant_ids: { type: DataTypes.JSON },
	},
	{
		sequelize: seque,
		tableName: 'products',
		timestamps: true,
		underscored: true,
	}
)
export default Product
