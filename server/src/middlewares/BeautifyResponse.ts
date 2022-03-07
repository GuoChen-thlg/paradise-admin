import Koa from 'koa'
interface ResponseBody {
	msg: string
	[key: string]: unknown
}
export const ErrorCode = {
	/**
	 * @description 请求参数无效
	 */
	err31: '4031',
	/**
	 * @description 请求参数为空
	 */
	err32: '4032',
	/**
	 * @description 请求参数类型错误
	 */
	err33: '4033',
	/**
	 * @description 请求参数缺失
	 */
	err34: '4034',
	/**
	 * @description 请求频繁
	 */
	err35: '4035',
	/**
	 * @description 被踢掉
	 */
	err16: '4016',
	/**
	 * @description Authentication 为空
	 */
	err11: '4011',
	/**
	 * @description Authentication 过期
	 */
	err12: '4012',
	/**
	 * @description Authentication 无效
	 */
	err13: '4013',
	/**
	 * @description 缺失必要的 cookie
	 */
	err14: '4014',
	/**
	 * @description 请重新获取验证码
	 */
	err15: '4015',
}
function beautifyResponse(): Koa.Middleware<
	Koa.DefaultState,
	Koa.DefaultContext,
	ResponseBody
> {
	return async function(
		ctx: Koa.ParameterizedContext<
			Koa.DefaultState,
			Koa.DefaultContext,
			ResponseBody
		>,
		next: Koa.Next
	) {
		console.log(ctx.request.ip, ctx.request.ips)

		try {
			await next()
			if (/^\/api/.test(ctx.path) && ctx.status === 200 && ctx.body) {
				ctx.body.msg = '成功'
			}
		} catch (err) {
			console.log('美化', err)
			if (!/^\d+$/.test(err.message)) {
				switch (err.status) {
					case 500:
						ctx.status = 500
						ctx.body = {
							msg: '服务器内部错误',
						}
						break
					case 401:
						ctx.status = 401
						ctx.body = {
							msg: '尚未授权',
						}
						break
				}
			}
			switch (err.message) {
				case ErrorCode.err31:
					ctx.status = 403
					ctx.body = { msg: '请求参数无效' }
					break
				case ErrorCode.err32:
					ctx.status = 403
					ctx.body = { msg: '请求参数为空' }
					break
				case ErrorCode.err33:
					ctx.status = 403
					ctx.body = { msg: '请求参数类型错误' }
					break
				case ErrorCode.err34:
					ctx.status = 403
					ctx.body = { msg: '请求参数缺失' }
					break
				case ErrorCode.err35:
					ctx.status = 403
					ctx.body = { msg: '请求过于频繁，请稍后再试' }
					break

				case ErrorCode.err11:
					ctx.status = 401
					ctx.body = { msg: 'Authentication 为空' }
					break
				case ErrorCode.err12:
					ctx.status = 401
					ctx.body = { msg: 'Authentication 过期' }
					break
				case ErrorCode.err13:
					ctx.status = 401
					ctx.body = { msg: 'Authentication 无效' }
					break
				case ErrorCode.err14:
					ctx.status = 401
					ctx.body = { msg: '未提供必要的 cookie' }
					break
				case ErrorCode.err15:
					ctx.status = 401
					ctx.body = { msg: '请重新获取验证码' }
					break
				case ErrorCode.err16:
					ctx.status = 401
					ctx.body = {
						msg:
							'由于该账号已重新登录，如果不是本人操作，请及时修改密码',
					}
					break
			}
		}
	}
}
export default beautifyResponse
