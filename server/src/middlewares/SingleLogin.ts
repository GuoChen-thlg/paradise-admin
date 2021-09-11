import { ErrorCode } from './BeautifyResponse';
import User from '../models/user'
import Koa from 'koa'

const f = (): Koa.Middleware => async (
	ctx: Koa.ParameterizedContext,
	next: Koa.Next
) => {
	if (
		new RegExp(
			`^(${[
				'/api/v1/auth/register.json',
				'/api/v1/auth/login.json',
				'/api/v1/auth/emailer.json',
			].join('|')})`
		).test(ctx.path)
	) {
		await next()
	} else {
		const user = await User.findOne({
			attributes: ['random_id'],
			where: {
				account: ctx.state.user.account,
			},
		})
		const userJSON = <{ random_id: string }>user.toJSON()
		if (userJSON.random_id !== ctx.state.user.uuid) {
			ctx.throw(401, ErrorCode.err16)
		}
		await next()
	}
}

export default f
