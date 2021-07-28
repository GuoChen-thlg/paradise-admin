import Router from 'koa-router'
import Permissions from '../../../../models/permission'
const router = new Router()

router.get(
	'permission.json',
	/**
	 * @api {POST} /api/v1/system/permission.json  获取权限列表
	 * @apiDescription 获取权限列表
	 * @apiGroup System
	 * @apiUse v1
	 * @apiVersion 1.0.0
	 */

	async (ctx, next) => {
		console.log(ctx.headers)
		const permissionList = await Permissions.findAll({
			attributes: [
				'permission_id',
				'describe',
				['flag_key', 'permission_key'],
				'name',
			],
		})
		ctx.body = {
			permissions: permissionList,
		}
	}
)

export default router.routes()
