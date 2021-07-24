import Koa from 'koa'
import request from 'supertest'
const productsAPI = (
	app: Koa<Koa.DefaultState, Koa.DefaultContext>,
	API_URL_BASE: string
) => {
	describe('产品 API', () => {
		it('获取产品信息', async () => {
			const response = await request(app.callback()).get(
				`${API_URL_BASE}/products.json`
			)
			expect(response.status).toBe(200)
		})
	})
}
export default productsAPI
