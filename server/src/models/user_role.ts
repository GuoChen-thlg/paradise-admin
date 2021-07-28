import seque from '../controllers/mysql'
import { DataTypes, Model, Optional } from 'sequelize'
import { UserRoleAttributes } from '../types/user_role'
interface UserRoleCreationAttributes
	extends Optional<UserRoleAttributes, 'id'> {}

class UserRole extends Model<UserRoleAttributes, UserRoleCreationAttributes>
	implements UserRoleAttributes {
	id: number
	user: string
	role_id: string
}
UserRole.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			unique: true,
			primaryKey: true,
			allowNull: false,
			comment: '自增id',
		},
		user: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize: seque,
		tableName: 'user_role',
		timestamps: false,
	}
)

export default UserRole
