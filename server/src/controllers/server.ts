import http from 'http'
import koaBody from 'koa-body'
import Koa from 'koa'
import koajwt from '../middlewares/koajwt'
import router from '../routes'
import beautifyResponse from '../middlewares/BeautifyResponse'
import ErrorHandling from '../middlewares/ErrorHandling'
import koaCors from '../middlewares/koa2-cors'
import socket from '../middlewares/socket'
import SingleLogin from '../middlewares/SingleLogin'
const { SERVER_PKEYS } = process.env
const app = new Koa()
const server = http.createServer(app.callback())
socket(server)
app.proxy = true
app.keys = SERVER_PKEYS.replace(/\s/g, '').split(',')
app.on('error', (err, ctx) => {
	console.log('app', err)
})
	.use(ErrorHandling())
	.use(beautifyResponse())
	.use(koajwt())
	.use(SingleLogin())
	.use(koaCors())
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

export default server
