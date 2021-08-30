import { DataTypes, Model, Optional } from 'sequelize'
import seque from '../controllers/mysql'


interface MediaAttributes {
	id: number
	/**媒体类型 */
	type: string
	/**媒体地址 */
	src: string
	/**描述 */
	alt: string
	/**宽 */
	width: number
	/**高 */
	height: number
}

interface MediaCreationAttributes
	extends Optional<MediaAttributes, 'id' | 'type'> {}

class Media extends Model<MediaAttributes, MediaCreationAttributes>
	implements MediaAttributes {
	id: number
	type: string
	src: string
	alt: string
	width: number
	height: number
}
Media.init(
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
				this.setDataValue('type', 'Video')
			},
		},
		src: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		alt: { type: DataTypes.STRING, allowNull: false },
		width: { type: DataTypes.FLOAT, allowNull: false },
		height: { type: DataTypes.FLOAT, allowNull: false },
	},
	{
		sequelize: seque,
		tableName: 'medias',
		timestamps: true,
		underscored: true,
	}
)
export default Media
