import axios from '@/utils/request'
import { AxiosResponse } from 'axios'
import { ResponseData } from '@/custom'

const f = (response: AxiosResponse<ResponseData>): ResponseData | null => {
	if (response) {
		console.log(response.data)

		return response.data
	}
	return null
}
export function verifyLogin(data: any) {
	return axios({
		url: '/verifyLogin',
		method: 'POST',
		data,
	})
}
export function login(data: any) {
	return axios({
		url: '/user',
		method: 'POST',
		data,
	}).then(f)
}
export function personnelList() {
	return axios({
		url: '/personnel/list',
		method: 'GET',
	}).then(f)
}
