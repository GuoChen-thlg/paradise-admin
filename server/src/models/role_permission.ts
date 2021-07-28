import seque from '../controllers/mysql'
import { DataTypes, Model, Optional } from 'sequelize'
import { RolePermissionAttributes } from '../types/role_permission'
interface RolePermissionCreationAttributes
	extends Optional<RolePermissionAttributes, 'id'> {}

class RolePermission
	extends Model<RolePermissionAttributes, RolePermissionCreationAttributes>
	implements RolePermissionAttributes {
	id: number
	role_id: string
	permission_id: string
}
RolePermission.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			unique: true,
			allowNull: false,
			autoIncrement: true,
		},
		role_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		permission_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize: seque,
		tableName: 'role_permission',
		timestamps: false,
		validate: {
			permissionAssignmentRepeat() {
				if (this.role_id === this.permission_id) {
					throw new Error('permission assignment repeat')
				}
			},
		},
	}
)

export default RolePermission
