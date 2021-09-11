import {
	Optional,
	Model,
	DataTypes,
	BelongsToManyGetAssociationsMixin,
	BelongsToManySetAssociationsMixin,
} from 'sequelize'

import seque from '../controllers/mysql'
import Role from './role'
import Product from './product'
interface UserAttributes {
	id: number
	account: string
	passwd: string
	email: string
	random_id: string
	state:boolean
}

interface UserCreationAttributes
	extends Optional<UserAttributes, 'id' | 'random_id'|'state'> {}

class User extends Model<UserAttributes, UserCreationAttributes>
	implements UserAttributes {
	id: number
	account: string
	passwd: string
	email: string
	random_id: string
	state:boolean

	public getRoles: BelongsToManyGetAssociationsMixin<Role>
	public setRoles: BelongsToManySetAssociationsMixin<Role, number>
	public getProducts: BelongsToManyGetAssociationsMixin<Product>
	public setProducts: BelongsToManySetAssociationsMixin<Product, number>
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
		account: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			comment: '账户 用户名 3-18位',
			validate: {
				is: /^\w{3,18}$/,
			},
		},
		passwd: {
			type: DataTypes.STRING(510),
			allowNull: false,
			comment: '密码 加密后',
		},
		email: {
			type: DataTypes.STRING(),
			allowNull: false,
			comment: '邮箱',
			validate: {
				isEmail: true,
			},
		},
		random_id: {
			type: DataTypes.UUID,
			comment: '单一登陆对比ID',
		},
		state:{
			type:DataTypes.BOOLEAN,
			allowNull:false,
			comment:'账号状态',
			defaultValue:true
		}
	},
	{
		sequelize: seque,
		tableName: 'users',
		timestamps: true,
		underscored: true,
	}
)
Role.belongsToMany(User, { through: 'user_roles' })
User.belongsToMany(Role, { through: 'user_roles', as: 'roles' })

User.hasMany(Product, { foreignKey: 'user_id' })
Product.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' })

export default User
