import axios from '@/utils/request'
import { AxiosResponse } from 'axios'
import { ResponseData } from '@/custom'
/*
priority 
true 优先请求第一个发出的请求（重复请求的接口）
false 优先请求最后发出的请求（重复请求的接口）
*/
const f = (response: AxiosResponse<ResponseData>): ResponseData | null => {
	if (response) {
		return response.data
	}
	return null
}
export async function register({
	account,
	pass,
	email,
	code,
}: {
	[key: string]: string
}) {
	const response = await axios({
		url: '/auth/register.json',
		method: 'POST',
		data: {
			account,
			pass,
			email,
			code,
		},
	})
	return f(response)
}

export async function acceptCode({ email }: { email: string }) {
	const response = await axios({
		url: '/auth/emailer.json',
		method: 'POST',
		data: { email },
	})
	return f(response)
}
export async function verifyLogin() {
	const response = await axios({
		url:
			'https://www.fastmock.site/mock/daf4bf7d1a1ae8cbc92a8bea8bc08a41/paradise_admin/api/v1/verifyLogin',
		method: 'POST',
	})
	return f(response)
}
/**
 *
 * @param data  用户账号密码
 * { username , password }
 * @returns Promise<ResponseData | null>
 */
export async function login({
	account,
	pass,
}: {
	account: string
	pass: string
}) {
	const response = await axios({
		url: '/auth/login.json',
		method: 'POST',
		data: { account, pass },
	})
	return f(response)
}
/**
 * @description 获取用户  菜单 路由
 * @returns Promise<ResponseData | null>
 */
export async function getMenus() {
			const response = await axios({
				url: '/user/menus.json',
				method: 'GET',
			})
			return f(response)
		}

export async function personnelList() {
	const response = await axios({
		url:
			'https://www.fastmock.site/mock/daf4bf7d1a1ae8cbc92a8bea8bc08a41/paradise_admin/api/v1/personnel/list',
		method: 'GET',
	})
	return f(response)
}
export async function obituary() {
	const response = await axios({
		url:
			'https://www.fastmock.site/mock/daf4bf7d1a1ae8cbc92a8bea8bc08a41/paradise_admin/api/v1/obituary',
		method: 'GET',
	})
	return f(response)
}

export async function randomQuotation() {
	const response = await axios({
		url: 'https://api.66mz8.com/api/quotation.php?format=json',
		method: 'GET',
	})
	return f(response)
}

export async function getProducts(
	{
		// keyword
		// type
		// price
		// date
	}
) {
	const response = await axios({
		url:
			'https://www.fastmock.site/mock/daf4bf7d1a1ae8cbc92a8bea8bc08a41/paradise_admin/api/v1/dan-medicines',
		method: 'GET',
		data: {
			priority: true,
		},
	})
	return f(response)
}
