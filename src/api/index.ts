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
}): Promise<ResponseData | null> {
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

export async function acceptCode({
	email,
}: {
	email: string
}): Promise<ResponseData | null> {
	const response = await axios({
		url: '/auth/emailer.json',
		method: 'POST',
		data: { email },
	})
	return f(response)
}
export async function verifyLogin(): Promise<ResponseData | null> {
	const response = await axios({
		url:
			'/verifyLogin',
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
}): Promise<ResponseData | null> {
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
export async function getMenus(): Promise<ResponseData | null> {
	const response = await axios({
		url: '/user/menus.json',
		method: 'GET',
	})
	return f(response)
}

export async function getRoles(param?: {
	key: string
}): Promise<ResponseData | null> {
	if (param) {
		const { key } = param
		return f(
			await axios({
				url: `/system/roles/${key}.json`,
				method: 'GET',
			})
		)
	}
	return f(
		await axios({
			url: '/system/roles.json',
			method: 'GET',
		})
	)
}

export async function getRoleMneus({
	roleId,
}: {
	roleId: number
}): Promise<ResponseData | null> {
	const response = await axios({
		url: '/system/menus.json',
		params: { roleId },
		method: 'GET',
	})
	return f(response)
}
export async function personnelList(): Promise<ResponseData | null> {
	const response = await axios({
		url:
			'/personnel/list',
		method: 'GET',
	})
	return f(response)
}
export async function obituary(): Promise<ResponseData | null> {
	const response = await axios({
		url:
			'https://www.fastmock.site/mock/daf4bf7d1a1ae8cbc92a8bea8bc08a41/paradise_admin/api/v1/obituary',
		method: 'GET',
	})
	return f(response)
}

export async function randomQuotation(): Promise<ResponseData | null> {
	const response = await axios({
		url: 'https://api.66mz8.com/api/quotation.php?format=json',
		method: 'GET',
	})
	return f(response)
}

export async function getProducts(): Promise<ResponseData | null> {
// {
// 	// keyword
// 	// type
// 	// price
// 	// date
// }
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
