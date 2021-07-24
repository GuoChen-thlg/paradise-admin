import request from 'supertest'
import app from '../../server/src/controllers/server'

import productsAPI from './modules/products'

const API_URL_BASE = '/api/v1'

describe('测试当前版本 URL:/version', () => {
	it('版本号验证', async () => {
		const response = await request(app.callback()).get('/version')
		expect(response.status).toBe(200)
		expect(/\d+\.\d+\.\d+/.test(response.body.version)).toBeTruthy()
	})
})
// 测试顺序
productsAPI(app, API_URL_BASE)
