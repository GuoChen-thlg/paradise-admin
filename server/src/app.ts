import Koa from 'koa'
import dotenv from 'dotenv'
//
import router from './routes'

if (process.env.NODE_ENV === 'production') {
	dotenv.config({ path: '.env' })
} else {
	dotenv.config({ path: '.env.local' })
}
const app = new Koa()
const port = process.env.PORT || 3000

app.use(router.routes())









app.listen(port, () => {
	console.log(app.env);
	
	console.log('http://localhost:%s', port)
})
