import { image } from './../../../src/types/media'
import { DataTypes, Model, Optional } from 'sequelize'
import seque from '../controllers/mysql'
import { MediaAttributes } from './media'

interface VideoAttributes extends MediaAttributes {
	preview_image_id?: number
}

interface VideoCreationAttributes
	extends Optional<VideoAttributes, 'id' | 'type'> {}

class Video extends Model<VideoAttributes, VideoCreationAttributes>
	implements VideoAttributes {
	id: number
	type: string
	src: string
	alt: string
	width: number
	height: number
	variant_ids: string
}
Video.init(
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
		variant_ids: { type: DataTypes.STRING, allowNull: false },
	},
	{
		sequelize: seque,
		tableName: 'Videos',
		timestamps: true,
		underscored: true,
	}
)
export default Video
