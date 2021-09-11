import { ErrorCode } from './../../../../middlewares/BeautifyResponse'
import Router from 'koa-router'
import Menu from '../../../../models/menu'
import Role from '../../../../models/role'
import User from '../../../../models/user'
import { arrayToTree, unique } from '../../../../utils'
import Permission from '../../../../models/permission'
const router = new Router()

router
	.get(
		'/roles.json',
		/**
		 *
		 * @api {GET} /api/v1/system/roles.json 获取所有角色
		 * @apiHeader Authorization 认证 token
		 * @apiGroup System
		 * @apiVersion 1.0.0
		 */
		async (ctx, next) => {
			const roles = await Role.findAll({
				attributes: ['id', 'key', 'name', 'describe'],
				include: [
					{
						model: Permission,
						as: 'permissions',
						through: { attributes: [] },
						attributes: ['id', 'flag_key', 'describe'],
					},
					{
						model: Menu,
						as: 'menus',
						through: { attributes: [] },
						attributes: ['id', 'name', 'path', 'icon', 'parent_id'],
					},
				],
			})
			if (!roles) {
				ctx.status = 404
				ctx.body = { msg: '未查询到' }
				ctx.throw(404)
			}
			const rolesJson = roles.map(role => role.toJSON()) as {
				id: number
				name: string
				describe: string
				permissions: { id: number; flag_key: string }[]
				menus: {
					id: number
					name: string
					path: string | null
					icon: string | null
					parent_id: number
				}[]
			}[]
			rolesJson.forEach(role => {
				role.menus = arrayToTree(
					role.menus,
					'id',
					'parent_id'
				) as typeof role.menus
			})
			ctx.body = {
				roles: rolesJson,
			}
		}
	)
	.get(
		'/roles/:key.json',
		/**
		 *
		 * @api {GET} /api/v1/system/roles.json 获取所有角色
		 * @apiHeader Authorization 认证 token
		 * @apiGroup System
		 * @apiVersion 1.0.0
		 */
		async (ctx, next) => {
			const role = await Role.findOne({
				where: {
					key: ctx.params.key,
				},
				attributes: ['id', 'key', 'name', 'describe'],
				include: [
					{
						model: Permission,
						as: 'permissions',
						through: { attributes: [] },
						attributes: ['id', 'flag_key', 'describe'],
					},
					{
						model: Menu,
						as: 'menus',
						through: { attributes: [] },
						attributes: ['id', 'name', 'path', 'icon', 'parent_id'],
					},
				],
			})
			if (!role) {
				ctx.status = 404
				ctx.body = { msg: '未查询到' }
				ctx.throw(404)
			}
			const roleJson = role.toJSON() as {
				id: number
				name: string
				describe: string
				permissions: { id: number; flag_key: string }[]
				menus: {
					id: number
					name: string
					path: string | null
					icon: string | null
					parent_id: number
				}[]
			}

			roleJson.menus = arrayToTree(
				roleJson.menus,
				'id',
				'parent_id'
			) as typeof roleJson.menus

			ctx.body = {
				role: roleJson,
			}
		}
	)
	.get(
		'/permissions/:role_id.json',
		/**
		 *
		 * @api {GET} /api/v1/system/permissions/{role_id}.json 获取权限
		 * @apiHeader Authorization 认证 token
		 * @apiGroup System
		 * @apiUse v1
		 * @apiVersion 1.0.0
		 */
		async (ctx, next) => {
			if (ctx.params.role_id === undefined) {
				ctx.throw(ErrorCode.err34)
			}
			if (ctx.query.role_id.toString().trim() === '') {
				ctx.throw(ErrorCode.err32)
			}
			const role = await Role.findOne({
				where: {
					id: parseInt(ctx.query.role_id.toString()),
				},
				include: [
					{
						model: Permission,
						as: 'permissions',
						through: { attributes: [] },
						attributes: ['flag_key'],
					},
				],
			})
			if (!role) {
				ctx.status = 404
				ctx.body = { msg: '未查询到' }
				ctx.throw(404)
			}
			const roleJson = role.toJSON() as {
				name: string
				permissions: { flag_key: string }[]
			}
			const permissions: string[] = []
			roleJson.permissions.forEach(per => {
				permissions.push(per.flag_key)
			})

			ctx.status = 200
			ctx.body = { permissions }
		}
	)
	.get(
		'/menus.json',
		/**
		 *
		 * @api {GET} /api/v1/system/menus.json 获取菜单
		 * @apiHeader Authorization 认证 token
		 * @apiParam {number} roleId 角色id
		 * @apiGroup System
		 * @apiUse v1
		 * @apiVersion 1.0.0
		 */
		async (ctx, next) => {
			if (ctx.query.roleId === undefined) {
				ctx.throw(ErrorCode.err34)
			}
			if (ctx.query.roleId.toString().trim() === '') {
				ctx.throw(ErrorCode.err32)
			}
			const role = await Role.findOne({
				where: {
					id: parseInt(ctx.query.roleId.toString()),
				},
				attributes: ['name'],
				include: [
					{
						model: Menu,
						as: 'menus',
						through: { attributes: [] },
						attributes: ['id', 'name', 'path', 'icon', 'parent_id'],
					},
				],
			})
			if (!role) {
				ctx.status = 404
				ctx.body = { msg: '未查询到' }
				ctx.throw(404)
			}
			const roleJson = role.toJSON() as {
				name: string
				menus: {
					id: number
					name: string
					path: string
					icon: string
					parent_id: number
				}[]
			}

			ctx.status = 200
			ctx.body = { menus: arrayToTree(roleJson.menus, 'id', 'parent_id') }
		}
	)
export default router.routes()
