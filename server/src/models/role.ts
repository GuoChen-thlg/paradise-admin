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
	name: string
	describe: string
}
interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> {}

class Role extends Model<RoleAttributes, RoleCreationAttributes>
	implements RoleAttributes {
	id: number
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

		name: { type: DataTypes.STRING, allowNull: false, unique: true },
		describe: { type: DataTypes.STRING },
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
