import koaJWT from 'koa-jwt'
const { JWT_PRIVATEKEY } = process.env
const koa_jwt = () =>
	koaJWT({ secret: JWT_PRIVATEKEY }).unless({
		path: [
			'/api/v1/auth/register.json',
			'/api/v1/auth/login.json',
			'/api/v1/auth/emailer.json',
		],
	})

export default koa_jwt
