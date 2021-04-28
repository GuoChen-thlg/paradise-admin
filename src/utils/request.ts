import { ResponseData } from '@/custom'
import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	Canceler,
} from 'axios'

const config: AxiosRequestConfig = {
	baseURL:
		process.env.NODE_ENV === 'production'
			? process.env.VUE_APP_API
			: process.env.VUE_APP_DEV_API,

	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
	},
}

const _axios: AxiosInstance = axios.create(config)
const station: Map<string, Canceler> = new Map()

const registReq = (reqConfig: AxiosRequestConfig): AxiosRequestConfig => {
	const key = `${reqConfig.method}-${reqConfig.url}`
	reqConfig.cancelToken = new axios.CancelToken(cancel => {
		if (station.has(key)) {
			const oldCancel = station.get(key)
			if (oldCancel) {
				oldCancel()
			}
		}
		station.set(key, cancel)
	})
	return reqConfig
}
const removeReq = (
	res: AxiosResponse<ResponseData>
): AxiosResponse<ResponseData> => {
	const key = `${res.config.method}-${res.config.url}`
	if (station.has(key)) {
		station.delete(key)
	}
	return res
}

const handlingError = (error: any) => {
	
	return Promise.reject(error)
}

_axios.interceptors.request.use(
	(reqConfig: AxiosRequestConfig) => {
		/* 权限控制 token */
		// reqConfig.headers.Authorization = `${token}`

		return registReq(reqConfig)
	},
	error => {
		console.log('请求拦截', error)
	}
)
_axios.interceptors.response.use(
	(res: AxiosResponse<ResponseData>) => {
		console.log(res)

		return removeReq(res)
	},
	error => {
		console.log('响应拦截', error)
		return handlingError(error)
	}
)
export default _axios
