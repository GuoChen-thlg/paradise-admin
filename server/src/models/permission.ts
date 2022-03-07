/*
 * @Author: 天火流光
 * @Date: 2022-02-20 22:05:58
 * @LastEditTime: 2022-03-07 23:26:39
 * @LastEditors: 天火流光
 * @Description: 
 * @FilePath: \paradise-admin\server\src\models\permission.ts
 * 
 */
import { Optional, Model, DataTypes } from 'sequelize'
import seque from '../controllers/mysql'

interface PermissionAttributes {
	id: number
	name: string
	describe: string
	flag_key: string
}
type PermissionCreationAttributes = Optional<PermissionAttributes, 'id'>

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
