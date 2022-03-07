/*
 * @Author: 天火流光
 * @Date: 2022-02-20 22:05:59
 * @LastEditTime: 2022-02-23 22:25:36
 * @LastEditors: 天火流光
 * @Description:
 * @FilePath: \paradise-admin\server\src\models\role.ts
 *
 */
import {
	Optional,
	Model,
	DataTypes,
	BelongsToManyGetAssociationsMixin,
	BelongsToManySetAssociationsMixin,
} from 'sequelize'
import seque from '../controllers/mysql'
import Permission from './permission'
import Menu from './menu'
interface RoleAttributes {
	id: number
	key: string
	name: string
	describe: string
}
type RoleCreationAttributes = Optional<RoleAttributes, 'id'>

class Role extends Model<RoleAttributes, RoleCreationAttributes>
	implements RoleAttributes {
	id: number
	key: string
	name: string
	describe: string

	getPermissions: BelongsToManyGetAssociationsMixin<Permission>
	setPermissions: BelongsToManySetAssociationsMixin<Permission, number>
	getMenus: BelongsToManyGetAssociationsMixin<Menu>
	setMenus: BelongsToManySetAssociationsMixin<Menu, number>
}
Role.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			unique: true,
			primaryKey: true,
			allowNull: false,
			comment: '自增id',
		},
		key: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			comment: '角色 key',
		},
		name: { type: DataTypes.STRING, allowNull: false, comment: '角色名' },
		describe: { type: DataTypes.STRING, comment: '描述' },
	},
	{
		sequelize: seque,
		tableName: 'roles',
		timestamps: true,
		underscored: true,
	}
)
Permission.belongsToMany(Role, { through: 'role_permissions' })
Role.belongsToMany(Permission, {
	through: 'role_permissions',
	as: 'permissions',
})

Menu.belongsToMany(Role, { through: 'role_menus' })
Role.belongsToMany(Menu, { through: 'role_menus', as: 'menus' })

export default Role
