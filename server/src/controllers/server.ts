import koaBody from 'koa-body'
import Koa from 'koa'

import router from '../routes'
import beautifyResponse from '../middlewares/BeautifyResponse'

const app = new Koa()
app.on('error', (err, ctx) => {
	console.log(err)
})
app.use(beautifyResponse())
app.use(
	koaBody({
		multipart: true,
		formidable: {
			keepExtensions: true,
		},
	})
)
app.use(router.routes())

export default app
