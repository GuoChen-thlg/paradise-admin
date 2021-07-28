import { RoleAttributes } from './../types/role.d'
import { Optional, Model, DataTypes } from 'sequelize'
import seque from '../controllers/mysql'

interface RoleCreationAttributes
	extends Optional<RoleAttributes, 'id' | 'role_id'> {}

class Role extends Model<RoleAttributes, RoleCreationAttributes>
	implements RoleAttributes {
	id: number
	role_id: string
	describe: string
	name: string
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
		role_id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			unique: true,
			allowNull: false,
			comment: '角色id',
		},
		name: { type: DataTypes.STRING, allowNull: false },
		describe: { type: DataTypes.STRING },
	},
	{
		sequelize: seque,
		tableName: 'roles',
		timestamps: true,
		underscored: true,
	}
)

export default Role
