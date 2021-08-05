import Koa from 'koa'
const f = () => async (cxt: Koa.ParameterizedContext, next: Koa.Next) =>
	next().catch(err => {
		if (err) {
			console.log('ErrorHandling',
			
			err.message,
			typeof err
			
			)
		} else {
			throw err
		}
	})
export default f
