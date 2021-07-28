import { UserAttributes } from './../types/user.d'
import { Optional, Model, DataTypes } from 'sequelize'
import seque from '../controllers/mysql'

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes>
	implements UserAttributes {
	id: number
	name: string
	passwd: string
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			unique: true,
			primaryKey: true,
			allowNull: false,
			comment: '自增id',
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		passwd: {
			type: DataTypes.STRING(510),
			allowNull: false,
		},
	},
	{
		sequelize: seque,
		tableName: 'users',
		timestamps: true,
		underscored: true,
	}
)

export default User
