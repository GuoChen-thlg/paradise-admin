import Koa from 'koa'
import dotenv from 'dotenv'
//
import router from '../routes'

const app = new Koa()

if (process.env.NODE_ENV === 'production') {
	dotenv.config({ path: '.env' })
} else {
	dotenv.config({ path: '.env.local' })
}

app.use(router.routes())

export default app
