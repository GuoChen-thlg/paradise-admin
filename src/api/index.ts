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
		console.log(response.data)

		return response.data
	}
	return null
}
export async function verifyLogin() {
	const response = await axios({
		url: '/verifyLogin',
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
export async function login(data: any) {
	const response = await axios({
		url: '/auth/login',
		method: 'POST',
		data,
	})
	return f(response)
}
/**
 * @description 获取用户权限信息 菜单 路由
 * @returns Promise<ResponseData | null>
 */
export async function getAuthInfo() {
	const response = await axios({
		url: '/auth/authorityinfo',
		method: 'GET',
	})
	return f(response)
}

export async function personnelList() {
	const response = await axios({
		url: '/personnel/list',
		method: 'GET',
	})
	return f(response)
}
export async function obituary() {
	const response = await axios({
		url: '/obituary',
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
		url: '/dan-medicines',
		method: 'GET',
		data: {
			priority: true,
		},
	})
	return f(response)
}
