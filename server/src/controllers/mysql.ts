import { Sequelize } from 'sequelize'

const { DB_HOST, DB_PORT, DB_DBNAME, DB_USERNAME, DB_PASSWORD } = process.env

const seque = new Sequelize(DB_DBNAME, DB_USERNAME, DB_PASSWORD, {
	host: DB_HOST,
	port: parseInt(DB_PORT, 10) || 3306,
	dialect: 'mysql',
	dialectOptions: {
		charset: 'utf8',
	},
	define: {
		charset: 'utf8',
		timestamps: false,
	},
	pool: {
		max: 5,
		min: 0,
		idle: 10000,
	},
})
export default seque
