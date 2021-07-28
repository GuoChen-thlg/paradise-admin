import Koa from 'koa'

interface ResponseBody {
	code: number
	msg: string
	[key: string]: unknown
}
export const enum ErrorCode {
	/**
	 * @description 成功
	 */
	ok = 2000,
	/**
	 * @description 请求参数无效
	 */
	err31 = 4031,
	/**
	 * @description 请求参数为空
	 */
	err32 = 4032,
	/**
	 * @description 请求参数类型错误
	 */
	err33 = 4033,
	/**
	 * @description 请求参数缺失
	 */
	err34 = 4034,
	/**
	 * @description Authentication 为空
	 */
	err11 = 4011,
	/**
	 * @description Authentication 过期
	 */
	err12 = 4012,
	/**
	 * @description Authentication 无效
	 */
	err13 = 4013,
}
function beautifyResponse(): Koa.Middleware<{}, {}> {
	return async function(ctx: Koa.ParameterizedContext, next: Koa.Next) {
		try {
			await next()
			if (/^\/api/.test(ctx.path) && ctx.status === 200 && ctx.body) {
				;(ctx.body as ResponseBody).code = 2000
				;(ctx.body as ResponseBody).msg = '成功'
			}
		} catch (err) {
			ctx.body = {}
			switch (err.status) {
				case 500:
					ctx.status = 500
					;(ctx.body as ResponseBody).code = 500
					;(ctx.body as ResponseBody).msg = '服务器内部错误'
					break
			}
			switch (err.message) {
				case '4031':
					ctx.status = 403
					;(ctx.body as ResponseBody).code = 4031
					;(ctx.body as ResponseBody).msg = '请求参数无效'
					break
				case '4032':
					ctx.status = 403
					;(ctx.body as ResponseBody).code = 4032
					;(ctx.body as ResponseBody).msg = '请求参数为空'
					break
				case '4033':
					ctx.status = 403
					;(ctx.body as ResponseBody).code = 4033
					;(ctx.body as ResponseBody).msg = '请求参数类型错误'
					break
				case '4034':
					ctx.status = 403
					;(ctx.body as ResponseBody).code = 4034
					;(ctx.body as ResponseBody).msg = '请求参数缺失'
					break
				case '4011':
					ctx.status = 401
					;(ctx.body as ResponseBody).code = 4011
					;(ctx.body as ResponseBody).msg = 'Authentication 为空'
					break
				case '4012':
					ctx.status = 401
					;(ctx.body as ResponseBody).code = 4012
					;(ctx.body as ResponseBody).msg = 'Authentication 过期'
					break
				case '4013':
					ctx.status = 401
					;(ctx.body as ResponseBody).code = 4013
					;(ctx.body as ResponseBody).msg = 'Authentication 无效'
					break
			}
		}
	}
}
export default beautifyResponse
