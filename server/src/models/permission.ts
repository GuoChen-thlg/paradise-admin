import { Optional, Model, DataTypes } from 'sequelize'
import seque from '../controllers/mysql'
import { PermissionAttributes } from '../types/permission'

interface PermissionCreationAttributes
	extends Optional<PermissionAttributes, 'id' | 'permission_id'> {}

class Permission
	extends Model<PermissionAttributes, PermissionCreationAttributes>
	implements PermissionAttributes {
	id: number
	permission_id: string
	describe: string
	flag_key: string
	name: string
}
Permission.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			unique: true,
			primaryKey: true,
			allowNull: false,
			comment: '自增id',
		},
		permission_id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			unique: true,
			allowNull: false,
			comment: '权限id',
		},
		name: { type: DataTypes.STRING },
		describe: {
			type: DataTypes.STRING,
			comment: '权限描述',
		},
		flag_key: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '权限标识',
			validate: {
				is: /^[A-Z_]+$/,
			},
		},
	},
	{
		sequelize: seque,
		tableName: 'permissions',
		timestamps: false,
	}
)

export default Permission
