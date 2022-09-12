import dotenv from 'dotenv'

if ((process.argv.splice(2)[0] || '').trim() === 'production') {
	dotenv.config({ path: '.env' })
} else {
	dotenv.config({ path: '.env.development.local' })
}

import { passwd } from './utils/utils'
import server from './controllers/server'
import seque from './controllers/mysql'

import { permissions, menuTree } from './config/dbInit'
// 数据库表
import Permission from './models/permission'
import Role from './models/role'
import User from './models/user'
import Menu from './models/menu'
import { treeToArray } from './utils/utils'

const { SERVER_PORT, NGINX_PORT, EMAIL_USER } = process.env
const port = SERVER_PORT ? parseInt(SERVER_PORT) : 3000

async function start() {
	try {
		await seque.authenticate()
		console.info('\x1B[32m%s\x1B[0m', `[mysql] 数据库连接成功`)
		if ((process.env.NODE_ENV || '').trim() === 'production') {
			await seque.sync()
		} else {
			// 数据库初始化
			// await seque.query('DROP TABLE IF EXISTS `devdb`.`menu_permission`;')
			// await seque.query('DROP TABLE IF EXISTS `devdb`.`role_permission`;')
			// await seque.query('DROP TABLE IF EXISTS `devdb`.`user_roles`;')
			// await seque.drop()
			await seque.sync({})
		}
		/* 初次初始化数据库 */
		await dbInit()
		// 启动服务器
		server.listen(port, () => {
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
			const permissionList = await Permission.bulkCreate(permissions, {
				transaction: t,
			})
			const befMenus = treeToArray(menuTree, 'children')
			const aftMenus = (befMenus.sort((a, b) => {
				return (
					(((a as unknown) as any)?.id || 0) -
					(((b as unknown) as any)?.id || 0)
				)
			}) as unknown) as Menu[]
			const menus = await Menu.bulkCreate(aftMenus, { transaction: t })

			const role_rootadmin = await Role.create(
				{
					key: 'rootadmin',
					name: 'rootadmin',
					describe: '超级管理员角色',
				},
				{ transaction: t }
			)
			await role_rootadmin.setMenus(menus, { transaction: t })

			await role_rootadmin.setPermissions(permissionList, {
				transaction: t,
			})

			// 初始化超级管理员账号
			const rootuser = await User.create(
				{
					account: 'rootadmin',
					passwd: passwd('rootadmin'),
					email: EMAIL_USER,
				},
				{ transaction: t }
			)
			const rootuser1 = await User.create(
				{
					account: 'rootadmin1',
					passwd: passwd('rootadmin'),
					email: EMAIL_USER,
				},
				{ transaction: t }
			)
			// 超级管理员账号关联角色
			await rootuser.setRoles([role_rootadmin], { transaction: t })
			await rootuser1.setRoles([role_rootadmin], { transaction: t })
			await t.commit()
		} catch (err) {
			console.log(err)
			t.rollback()
			process.exit(1)
		}
	}
}
