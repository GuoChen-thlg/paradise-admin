import Koa from 'koa'
const f = (): Koa.Middleware => async (
	ctx: Koa.ParameterizedContext,
	next: Koa.Next
) =>
	next().catch(err => {
		if (err) {
			console.log('处理错误', err)
		} else {
			throw err
		}
	})
export default f
