import { Optional, Model, DataTypes } from 'sequelize'
import seque from '../controllers/mysql'

interface PermissionAttributes {
	id: number
	name: string
	describe: string
	flag_key: string
}
interface PermissionCreationAttributes
	extends Optional<PermissionAttributes, 'id'> {}

class Permission
	extends Model<PermissionAttributes, PermissionCreationAttributes>
	implements PermissionAttributes {
	id: number
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
