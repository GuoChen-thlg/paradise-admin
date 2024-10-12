import cors from 'koa2-cors'
const f = () =>
	cors({
		origin: ctx => {
			// if (ctx.app.env === 'production') {
			// 	return 'https://paradise-admin.thlg.xyz'
			// }
			return '*'
		},
		credentials: true,
		maxAge: 5,
		// exposeHeaders: [],
		allowHeaders: ['Content-Type', 'Authorization'],
		allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	})

export default f
