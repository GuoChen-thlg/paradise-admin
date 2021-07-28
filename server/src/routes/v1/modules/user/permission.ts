import Router from 'koa-router'
import UserRole from '../../../../models/user_role'
import Role from '../../../../models/role'
import RolePermission from '../../../../models/role_permission'
import Permission from '../../../../models/permission'
import { Op } from 'sequelize'

const router = new Router()
router
	.get(
		'/permission.json',
		/**
		 *
		 * @api {GET} /api/v1/user/permission.json 获取权限
		 * @apiGroup User
		 * @apiUse v1
		 * @apiVersion 1.0.0
		 */
		async (ctx, next) => {
			const user_roles = await UserRole.findAll({
				where: {
					user: 'rootadmin',
				},
			})
			const roles = await Role.findAll({
				where: {
					[Op.or]: user_roles.map(u_r => ({
						role_id: `${u_r.role_id}`,
					})),
				},
			})
			const role_permission = await RolePermission.findAll({
				where: {
					[Op.or]: roles.map(r => ({ role_id: `${r.role_id}` })),
				},
			})
			const permission = await Permission.findAll({
				attributes: [
					'name',
					['flag_key', 'permission_key'],
					'describe',
				],
				where: {
					[Op.or]: role_permission.map(r_p => ({
						permission_id: `${r_p.permission_id}`,
					})),
				},
			})
			console.log(permission)
			ctx.body = {
				permission,
			}
		}
	)

	.get('/material.json', async (ctx, next) => {


		
	})

export default router.routes()
