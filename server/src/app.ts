import dotenv from 'dotenv'
if ((process.env.NODE_ENV || '').trim() === 'production') {
	dotenv.config({ path: '.env' })
} else {
	dotenv.config({ path: '.env.local' })
}

import { passwd } from './utils'
import app from './controllers/server'
import seque from './controllers/mysql'

import permissions from './config/permission'
import Permission from './models/permission'
import Role from './models/role'
import RolePermission from './models/role_permission'
import User from './models/user'
import UserRole from './models/user_role'
const { SERVER_PORT, NGINX_PORT } = process.env

const port = SERVER_PORT ? parseInt(SERVER_PORT) : 3000

async function start() {
	try {
		await seque.authenticate()
		console.info('\x1B[32m%s\x1B[0m', `[mysql] 数据库连接成功`)
		// 数据库初始化
		if ((process.env.NODE_ENV || '').trim() === 'production') {
			await seque.sync()
		} else {
			await seque.sync({})
		}
		await dbInit()
		// 启动服务器
		app.listen(port, () => {
			console.info(
				'\x1B[32m%s\x1B[0m',
				`[koa-server] 服务器启动成功\n Server: http://localhost:${port}\n Nginx: http://localhost:${NGINX_PORT}`
			)
			process.once('SIGUSR2', async () => {
				await seque.close()
				process.kill(process.pid, 'SIGUSR2')
			})
		})
	} catch (err) {
		console.error(err)
		process.exit(1)
	}
}
start()

/**
 * 数据库初始化
 */
async function dbInit() {
	if ((await Permission.findAndCountAll()).count === 0) {
		const t = await seque.transaction()
		try {
			// 权限列表初始化
			const permissionList = await Permission.bulkCreate(
				[...permissions],
				{ transaction: t }
			)
			//  角色初始化
			const role_rootadmin = await Role.create(
				{
					name: 'rootadmin',
					describe: '这是超级管理员角色',
				},
				{ transaction: t }
			)
			const role_people = await Role.create(
				{
					name: '草民',
					describe: '一般级别 没有任何特殊权利 基本权利',
				},
				{ transaction: t }
			)
			//  角色权限分配
			await RolePermission.bulkCreate(
				permissionList.map(p => ({
					role_id: role_rootadmin.role_id,
					permission_id: p.permission_id,
				})),
				{ transaction: t }
			)
			// 初始化超级管理员账号
			const user = await User.create(
				{
					name: 'rootadmin',
					passwd: passwd('root'),
				},
				{ transaction: t }
			)
			// 超级管理员账号关联角色
			await UserRole.create(
				{
					user: user.name,
					role_id: role_rootadmin.role_id,
				},
				{ transaction: t }
			)
			await t.commit()
		} catch (err) {
			console.log(err)
			t.rollback()
			process.exit(1)
		}
	}
}
