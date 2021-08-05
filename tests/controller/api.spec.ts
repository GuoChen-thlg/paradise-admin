import request from 'supertest'
import app from '../../server/src/controllers/server'

import productsAPI from './modules/products'

const API_URL_BASE = '/api/v1'

// 测试顺序
// productsAPI(app, API_URL_BASE)
