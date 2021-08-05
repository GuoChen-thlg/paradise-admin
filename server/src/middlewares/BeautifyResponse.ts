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
function beautifyResponse(): Koa.Middleware<{}, {}> {
	return async function(ctx: Koa.ParameterizedContext, next: Koa.Next) {
		try {
			await next()
			if (/^\/api/.test(ctx.path) && ctx.status === 200 && ctx.body) {
				;(ctx.body as ResponseBody).msg = '成功'
			}
		} catch (err) {
			console.log(err)
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
			}
		}
	}
}
export default beautifyResponse
