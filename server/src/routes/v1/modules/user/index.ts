import Router from 'koa-router'
import Role from '../../../../models/role'
import Permission from '../../../../models/permission'
import { Op } from 'sequelize'
import User from '../../../../models/user'
import Menu from '../../../../models/menu'
import { arrayToTree, unique } from '../../../../utils/utils'

const router = new Router()
router
	.get(
		'/permissions.json',
		/**
		 *
		 * @api {GET} /api/v1/user/permissions.json 获取权限
		 * @apiHeader Authorization 认证 token
		 * @apiGroup User
		 * @apiUse v1
		 * @apiVersion 1.0.0
		 */
		async (ctx, next) => {
			const user = await User.findOne({
				where: {
					account: ctx.state.user.account,
				},
				include: [
					{
						model: Role,
						as: 'roles',
						through: { attributes: [] },
						attributes: ['name'],
						include: [
							{
								model: Permission,
								as: 'permissions',
								through: { attributes: [] },
								attributes: ['flag_key'],
							},
						],
					},
				],
			})
			const userJson = user.toJSON() as {
				account: string
				passwd: string
				roles: {
					name: string
					permissions: { flag_key: string }[]
				}[]
			}
			const permissions: string[] = []
			userJson.roles.forEach(role => {
				role.permissions.forEach(per => {
					permissions.push(per.flag_key)
				})
			})
			ctx.status = 200
			ctx.body = { permissions }
		}
	)
	.get(
		'/menus.json',
		/**
		 *
		 * @api {GET} /api/v1/user/menus.json 获取菜单
		 * @apiHeader Authorization 认证 token
		 * @apiGroup User
		 * @apiUse v1
		 * @apiVersion 1.0.0
		 */
		async (ctx, next) => {
			const user = await User.findOne({
				where: {
					account: ctx.state.user.account,
				},
				include: [
					{
						model: Role,
						as: 'roles',
						through: { attributes: [] },
						attributes: ['name'],
						include: [
							{
								model: Menu,
								as: 'menus',
								through: { attributes: [] },
								attributes: [
									'id',
									'name',
									'path',
									'icon',
									'parent_id',
								],
							},
						],
					},
				],
			})
			const userJson = user.toJSON() as {
				account: string
				passwd: string
				roles: {
					name: string
					menus: {
						id: 1
						name: string
						path: string
						icon: string
						parent_id: number
					}[]
				}[]
			}
			let menuList: unknown[] = []
			userJson.roles.forEach(role => {
				menuList = menuList.concat(menuList, role.menus)
			})
			menuList = unique(menuList, 'id')
			ctx.status = 200
			ctx.body = { menus: arrayToTree(menuList, 'id', 'parent_id') }
		}
	)
	.get('/materials.json', async (ctx, next) => {
		// 
	})
	.put(
		'/change-pass.json',
		/**
		 * @api {PUT} /api/v1/user/change-pass.json 修改密码
		 * @apiParam {String} newPass 旧密码
		 * @apiParam {String} oldPass 新密码
		 * @apiHeader Authorization 认证 token
		 * @apiGroup User
		 * @apiUse v1
		 * @apiVersion 1.0.0
		 */
		async (ctx, next) => {
			// 
		}
	)

export default router.routes()
