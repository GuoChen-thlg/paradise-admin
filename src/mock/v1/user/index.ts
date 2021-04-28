import Mockjs from 'mockjs'


import userDB from './user.db'
import { Code } from '../../code'
import { MockRequest } from '@/mock/mock'

Mockjs.mock('/mock/v1/user', 'post', (req: MockRequest) => {
	try {
		const body = JSON.parse(req.body)
		if (
			['rootadmin', 'admin', 'test1', 'test2', 'test3'].includes(body.user) &&
			body.password === '123456'
		) {
			return {
				code: Code.OK,
				user: userDB['rootadmin'],
			}
		}

		return {
			code: Code.UNAUTHORIZED,
			msg: '',
		}
	} catch (error) {
		return {
			code: Code.EXPECTATION_FAILED,
			msg: '无效参数',
		}
	}
})
