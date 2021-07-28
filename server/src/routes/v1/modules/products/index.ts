import Router from 'koa-router'
import Product from '../../../../models/product'

const router = new Router()
router
	.post(
		'.json',
		/**
		 * @api {POST} /api/v1/products.json   创建新产品
		 * @apiDescription 向数据库添加一个产品
		 * @apiParam {String} title  产品名称
		 * @apiParam {String} effect 产品类型
		 * @apiParam {String} [tags] 标签
		 * @apiParam {String} product_type 产品类型
		 * @apiParam {String} [published_at] 开售时间
		 * @apiParam {Boolean} [active] 是否可售
		 * @apiParam {Number} price 价格
		 * @apiParam {Number} [price_max] 最大价格
		 * @apiParam {Number} [price_min] 最小价格
		 * @apiParam {String} product_category 产品分类
		 * @apiGroup Products
		 * @apiSuccess {String} product 产品对象
		 * @apiSuccessExample {json} 请求例子:
		 *     // post  请求数据
		 *     {
		 *       "product": {
		 * 				"title":"product title"
		 * 			}
		 *     }
		 * @apiSuccessExample {json} 成功响应:
		 *     HTTP/1.1 200 OK
		 *     {
		 *       "product": {
		 * 				"title":"product title"
		 * 			}
		 *     }
		 * @apiError {Nunber} 500 Internal Server Error
		 * @apiErrorExample {json} Error-500:
		 *      Error 500: Internal Server Error
		 *		{
		 *		  "code": 500,
		 *		  "msg": "服务器内部错误"
		 *		}
		 * @apiUse v1
		 * @apiVersion 1.0.0
		 */
		async (ctx, next) => {
			const { title } = ctx.request.body
			const p = await Product.create({
				price: 1234,
				media_ids: 'sadsdsada',
				variant_ids: 'asdsadsad,asdsadasd,dasdsad,dasdasd,adsadsa',
				title: '产品1号',
				effect: '简单的介绍',
				image_id: 123,
			})

			ctx.body = { product: p }
		}
	)
	.delete(
		'/:id.json',
		/**
		 *
		 * @param ctx
		 */
		async ctx => {}
	)
	.put(
		'/:id.json',
		/**
		 *
		 * @param ctx
		 */
		async ctx => {}
	)
	.get(
		'.json',
		/**
		 * @api {GET} /api/v1/products.json  获取产品
		 * @apiName GetProducts
		 * @apiDescription 获取所有产品
		 * @apiParam {Number[]} [ids] 产品 ID
		 * @apiGroup Products
		 * @apiSuccess {Nunber} 200 资源
		 * @apiSuccessExample {json} Success-Response:
		 *     HTTP/1.1 200 OK
		 *     {
		 *       "firstname": "John",
		 *       "lastname": "Doe"
		 *     }
		 * @apiUse v1
		 * @apiVersion 1.0.0
		 */
		async ctx => {
			const p = await Product.findAll({})
			console.log(JSON.stringify(p))

			ctx.status = 200
			ctx.type = 'application/json'
			ctx.body = {}
		}
	)
	.get('/:id.json', async ctx => {
		ctx.body = 'hello world 2' + ctx.params.id
	})

	.post('/:product_id.images.json', async ctx => {})
	.delete('/:product_id/images/:image_id.json', async ctx => {})
	.put('/:product_id/images/:image_id.json', async ctx => {})
	.get('/:product_id.images.json', async ctx => {})
	.get('/:product_id.images/:image_id.json', async ctx => {})

export default router.routes()
