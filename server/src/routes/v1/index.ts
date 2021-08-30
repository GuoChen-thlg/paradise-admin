import Router from 'koa-router'

import products from './modules/products'
import user from './modules/user'
import login from './modules/auth'
import system from './modules/system'


const router = new Router()
/**
 * @apiDefine v1
 * @apiError {Nunber} code 错误代码
 * @apiError {String} msg 错误信息
 * @apiErrorExample {json} Error-4011:
 *  Error 401: Unauthorized
 *	{
 *	  "msg": "Authentication 为空"
 *	}
 * @apiErrorExample {json} Error-4012:
 *  Error 401: Unauthorized
 *	{
 *	  "msg": "Authentication 过期"
 *	}
 * @apiErrorExample {json} Error-4013:
 *  Error 401: Unauthorized
 *	{
 *	  "msg": "Authentication 无效"
 *	}
 * @apiErrorExample {json} Error-4031:
 *  Error 403: Forbidden
 *	{
 *	  "msg": "请求参数无效"
 *	}
 * @apiErrorExample {json} Error-4032:
 *  Error 403: Forbidden
 *	{
 *	  "msg": "请求参数为空"
 *	}
 * @apiErrorExample {json} Error-4033:
 *  Error 403: Forbidden
 *	{
 *	  "msg": "请求参数类型错误"
 *	}
 * @apiErrorExample {json} Error-4034:
 *  Error 403: Forbidden
 *	{
 *	  "msg": "请求参数缺失"
 *	}
 */

router.use('/auth', login)

router.use('/products', products)

router.use('/user', user)

router.use('/system', system)

export default router.routes()
