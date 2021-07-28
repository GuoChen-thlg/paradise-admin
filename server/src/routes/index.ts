import Router from 'koa-router'
import apiv1 from './v1'
const router = new Router()
// 当前运行的版本
router.get('/version', async ctx => {
	ctx.type = 'application/json'
	ctx.body = { version: '1.0.0' }
})

router.use('/api/v1', apiv1)

export default router
