import { arrayToTree } from './../../../../utils/index'
import Router from 'koa-router'
import jsonwebtoken from 'jsonwebtoken'
import RSA from 'node-rsa'
import { Op } from 'sequelize'

import { passwd } from '../../../../utils/index'
import User from '../../../../models/user'
import { ErrorCode } from '../../../../middlewares/BeautifyResponse'
import { emailer } from './emailer'
import Permission from '../../../../models/permission'
import Role from '../../../../models/role'
import Menu from '../../../../models/menu'
import { unique } from '../../../../utils'
const router = new Router()

const { JWT_PRIVATEKEY, SERVER_PRIVATEKEY } = process.env
const decryptKey = new RSA(SERVER_PRIVATEKEY, undefined, {
	encryptionScheme: 'pkcs1',
})
const decrypt = (str: string) => {
	try {
		return decryptKey.decrypt(str, 'utf8')
	} catch (err) {
		return false
	}
}

router
	.post(
		'/login.json',
		/**
		 *
		 * @api {POST} /api/v1/auth/login.json 登录
		 * @apiDescription 登录接口
		 * @apiParam {String} account  账号
		 * @apiParam {String} pass 密码 jsencrypt 加密
		 * @apiGroup Auth
		 * @apiUse v1
		 * @apiVersion 1.0.0
		 */
		async (ctx, next) => {
			const { account, pass } = ctx.request.body

			if (account === undefined || pass === undefined) {
				ctx.throw(ErrorCode.err34, 403)
			}
			if (`${account}`.trim() === '' || `${pass}`.trim() === '') {
				ctx.throw(ErrorCode.err32, 403)
			}
			// 响应前
			const user = await User.findOne({
				where: {
					account: `${account}`,
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
			const _pass = decrypt(pass)
			if (
				user &&
				user.account === account &&
				_pass &&
				user.passwd === passwd(_pass)
			) {
				const userJson = user.toJSON() as { account: string, passwd: string, roles: { name: string ,permissions: { flag_key: string }[] ,menus: { id: 1 ,name: string ,path: string ,icon: string ,parent_id: number }[] }[] }
				const permissions: string[] = []
				let menuList: unknown[] = []
				userJson.roles.forEach(role => {
					role.permissions.forEach(per => {
						permissions.push(per.flag_key)
					})
					menuList = menuList.concat(menuList, role.menus)
				})
				menuList = unique(menuList, 'id')
				const cookieVal = jsonwebtoken.sign(
					{
						account: user.account,
						email: user.email,
						permissions,
					},
					JWT_PRIVATEKEY,
					{
						expiresIn: '1d',
					}
				)

				ctx.cookies.set('authorization', cookieVal, {
					maxAge: 1e3 * 60 * 60 * 24,
					sameSite: 'strict',
					path: '/',
					httpOnly: false,
					expires: new Date(
						new Date().getTime() + 1e3 * 60 * 60 * 24
					),
					signed: true,
					overwrite: true,
				})

				ctx.status = 200
				ctx.body = {
					token: cookieVal,
					menus: arrayToTree(menuList, 'id', 'parent_id'),
					permissions: Array.from(new Set(permissions)),
				}
			} else if (!user) {
				ctx.status = 401
				ctx.body = { msg: '该账号尚未注册' }
				ctx.throw('该账号尚未注册', 401)
			} else {
				ctx.status = 401
				ctx.body = { msg: '账号或密码错误' }
				ctx.throw('账号或密码错误', 401)
			}
		}
	)
	.post(
		'/register.json',
		/**
		 *
		 * @api {POST} /api/v1/auth/register.json 注册
		 * @apiDescription 注册接口
		 * @apiParam {String} account 账号 包含字母或数字
		 * @apiParam {String} pass 密码 jsencrypt 加密 最少六位  包含字母 数字 符号
		 * @apiParam {String} email 邮箱
		 * @apiParam {String} code 验证码 六位数
		 * @apiGroup Auth
		 * @apiUse v1
		 * @apiVersion 1.0.0
		 */
		async (ctx, next) => {
			const cookie_name = 'verification-code'
			if (!ctx.request.body) {
				ctx.throw(ErrorCode.err34, 403)
			}
			console.log(ctx.request.body)

			const { account, pass, email, code } = ctx.request.body
			if (account === undefined || pass === undefined) {
				ctx.throw(ErrorCode.err34, 403)
			}
			if (`${account}`.trim() === '' || `${pass}`.trim() === '') {
				ctx.throw(ErrorCode.err32, 403)
			}
			if (!ctx.cookies.get(cookie_name)) {
				ctx.throw(ErrorCode.err15, 403)
			}
			const _pass = decrypt(pass)
			if (!_pass) {
				ctx.throw(ErrorCode.err15, 401)
			}
			try {
				const jwtPly = jsonwebtoken.verify(
					ctx.cookies.get(cookie_name),
					JWT_PRIVATEKEY
				) as jsonwebtoken.JwtPayload
				const new_user = await User.findOne({
					where: {
						account: `${account}`,
					},
				})
				if (new_user) {
					ctx.status = 401
					ctx.body = { msg: '该账号已注册' }
					ctx.throw('该账号已注册', 401)
				}
				if (email == jwtPly.email && code == jwtPly.code) {
					await User.create({
						account: account,
						passwd: passwd(_pass as string),
						email: email,
					})
					ctx.status = 200
					ctx.body = { account: account, email: email }
				} else {
					ctx.throw(ErrorCode.err15, 401)
				}
			} catch (error) {
				ctx.throw(ErrorCode.err15, 401)
			}
		}
	)

router.post(
	'/emailer.json',
	/**
	 *
	 * @api {POST} /api/v1/auth/emailer.json 获取验证码
	 * @apiHeader {String} authentication  认证 tonken 不填
	 * @apiParam {String} email 邮箱地址
	 * @apiGroup Auth
	 * @apiUse v1
	 * @apiVersion 1.0.0
	 */
	emailer
)

export default router.routes()
