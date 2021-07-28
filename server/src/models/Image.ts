import { DataTypes, Model, Optional } from 'sequelize'
import seque from '../controllers/mysql'
import { ImageAttributes } from '../types/media'

interface ImageCreationAttributes
	extends Optional<ImageAttributes, 'id' | 'type'> {}

class Image extends Model<ImageAttributes, ImageCreationAttributes>
	implements ImageAttributes {
	id: number
	type: string
	src: string
	alt: string
	width: number
	height: number
	variant_ids: string
}
Image.init(
	{
		id: {
			type: DataTypes.INTEGER,
			unique: true,
			autoIncrement: true,
			primaryKey: true,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
			set() {
				this.setDataValue('type', 'image')
			},
		},
		src: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		alt: { type: DataTypes.STRING, allowNull: false },
		width: { type: DataTypes.FLOAT, allowNull: false },
		height: { type: DataTypes.FLOAT, allowNull: false },
		variant_ids: { type: DataTypes.STRING, allowNull: false },
	},
	{
		sequelize: seque,
		tableName: 'images',
		timestamps: true,
		underscored: true,
	}
)
export default Image
