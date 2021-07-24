import Router from 'koa-router'

import products from './models/products'

const router = new Router()
/**
 * @apiDefine v1
 * @apiHeader Authentication
 * @apiError 404
 * @apiErrorExample Error-response:
 *      HTTP/1.1 404 Not Found
 *      {
 *          "error":"not 404 dound"
 *      }
 */
router.use('/products', products)

export default router.routes()
