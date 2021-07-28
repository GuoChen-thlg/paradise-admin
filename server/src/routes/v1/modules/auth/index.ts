import Router from 'koa-router'
import { passwd } from '../../../../utils/index'

import User from '../../../../models/user'
import { ErrorCode } from '../../../../middlewares/BeautifyResponse'
const router = new Router()

router
	.post(
		'/login.json',
		/**
		 *
		 * @api {POST} /api/v1/auth/login.json 登录
		 * @apiDescription 登录接口
		 * @apiHeader {String} [Authentication] 认证 tonken
		 * @apiParam {String} account  账号
		 * @apiParam {String} pass 密码
		 * @apiGroup Auth
		 * @apiUse v1
		 * @apiVersion 1.0.0
		 */
		async (ctx, next) => {
			const { account, pass, a } = ctx.request.body
			console.log(a)

			if (account === undefined || pass === undefined) {
				ctx.throw(ErrorCode.err34)
			}
			if (`${account}`.trim() === '' || `${pass}`.trim() === '') {
				ctx.throw(ErrorCode.err32)
			}
			// 响应前
			const user = await User.findOne({
				where: {
					name: `${account}`,
					passwd: passwd(pass),
				},
			})
			if (user) {
				ctx.status = 200
				ctx.body = {}
			} else {
				ctx.throw(ErrorCode.err11)
			}
		}
	)
	.post(
		'/register.json',
		/**
		 *
		 * @api {POST} /api/v1/auth/register.json 注册
		 * @apiDescription 注册接口
		 * @apiHeader {String} [Authentication]  认证 tonken 不填
		 * @apiParam {String} account  账号
		 * @apiParam {String} pass 密码
		 * @apiGroup Auth
		 * @apiUse v1
		 * @apiVersion 1.0.0
		 */
		async (ctx, next) => {
			if (ctx.request.body) {
			}
			const { account, pass } = ctx.request.body
			if (account === undefined || pass === undefined) {
				ctx.throw(ErrorCode.err32)
			}
			if (`${account}`.trim() === '' || `${pass}`.trim() === '') {
				ctx.throw('4032')
			}
			ctx.body = {}
		}
	)
export default router.routes()
