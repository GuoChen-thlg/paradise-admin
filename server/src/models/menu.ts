/*
 * @Author: 天火流光
 * @Date: 2022-02-20 22:05:58
 * @LastEditTime: 2022-02-23 22:24:23
 * @LastEditors: 天火流光
 * @Description:
 * @FilePath: \paradise-admin\server\src\models\menu.ts
 *
 */
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

type MenuCreationAttributes = Optional<MenuAttributes, 'id' | 'icon' | 'path'>

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
