import Router from 'koa-router'

const router = new Router()

router
	.get(
		'.json',
		/**
		 * @api {GET} /api/v1/products.json
		 * @apiVersion 1.0.0
		 * @apiDescription 获取所有产品
		 * @apiGroup Products
		 * @apiUse v1
		 */
		async ctx => {
			ctx.type = 'application/json'
			ctx.body = {
				msg: 'hello world',
			}
		}
	)
	.get('/:id.json', async ctx => {
		ctx.body = 'hello world 2' + ctx.params.id
	})
	.post('/', async ctx => {})
	.put('/', async ctx => {})
	.delete('/', async ctx => {})

export default router.routes()
