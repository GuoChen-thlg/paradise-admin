import {
	BelongsToManySetAssociationsMixin,
	DataTypes,
	HasManySetAssociationsMixin,
	HasManySetAssociationsMixinOptions,
	Model,
	Optional,
} from 'sequelize'
import seque from '../controllers/mysql'
import Permission from './permission'

interface MenuAttributes {
	id: number
	name: string
	path: string
	icon: string
	parent_id: number
}

interface MenuCreationAttributes
	extends Optional<MenuAttributes, 'id' | 'icon' | 'path'> {}

class Menu extends Model<MenuAttributes, MenuCreationAttributes>
	implements MenuAttributes {
	id: number
	name: string
	path: string
	icon: string
	parent_id: number

	public setPermiss: BelongsToManySetAssociationsMixin<Permission, string>
}
Menu.init(
	{
		id: {
			type: DataTypes.INTEGER,
			unique: true,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		path: {
			type: DataTypes.STRING,
		},
		icon: {
			type: DataTypes.STRING,
		},
		parent_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize: seque,
		tableName: 'menus',
		timestamps: true,
		underscored: true,
	}
)
export default Menu
