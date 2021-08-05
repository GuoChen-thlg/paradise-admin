import koaBody from 'koa-body'
import Koa from 'koa'

import koajwt from '../middlewares/koajwt'
import router from '../routes'
import beautifyResponse from '../middlewares/BeautifyResponse'
import ErrorHandling from '../middlewares/ErrorHandling'
const { SERVER_PKEYS } = process.env
const app = new Koa()
app.keys = SERVER_PKEYS.replace(/\s/g, '').split(',')
app.on('error', (err, ctx) => {
	console.log('app', err)
})
	.use(beautifyResponse())
	.use(ErrorHandling())
	.use(koajwt())
	.use(
		koaBody({
			multipart: true,
			formidable: {
				keepExtensions: true,
			},
		})
	)
	.use(router.routes())
	.use(router.allowedMethods())
export default app
