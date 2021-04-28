import Mockjs, { Random } from 'mockjs'
import { MockRequest } from '@/mock/mock'
import { Code } from '@/mock/code'

Mockjs.mock('/mock/v1/personnel/list', 'get', (req: MockRequest) => {
	try {
		// const body = JSON.parse(req.body)
		const template = {
			'array|50': [
				{
					id: '@guid',
					name: '@clast@cname',
					date: '@date',
					department: '天兵天将',
					duties: '士兵',
				},
			],
		}
		return {
			code: Code.OK,
			data: Mockjs.mock(template).array,
		}
	} catch (error) {
		return {
			code: Code.EXPECTATION_FAILED,
			msg: '无效参数',
		}
	}
})
