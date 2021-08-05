import {
	Optional,
	Model,
	DataTypes,
	BelongsToMany,
	HasManyHasAssociationMixin,
	BelongsToManyGetAssociationsMixin,
	BelongsToManySetAssociationsMixin,
	BelongsToManySetAssociationsMixinOptions,
} from 'sequelize'

import seque from '../controllers/mysql'
import Role from './role'
import Product from './product'
interface UserAttributes {
	id: number
	account: string
	passwd: string
	email:string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes>
	implements UserAttributes {
	id: number
	account: string
	passwd: string
	email: string

	public getRoles: BelongsToManyGetAssociationsMixin<Role>
	public setRoles: BelongsToManySetAssociationsMixin<Role, number>
	public getProducts: BelongsToManyGetAssociationsMixin<Product>
	public setProducts: BelongsToManySetAssociationsMixin<Product, number>
	// public getinfo: BelongsToManyGetAssociationsMixin<Product>
	// public setinfo: BelongsToManySetAssociationsMixin<Product, number>
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
			comment: '账户',
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
	},
	{
		sequelize: seque,
		tableName: 'users',
		timestamps: true,
		underscored: true,
	}
)

export default User
