import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	Canceler,
} from 'axios'
import { ElMessage } from 'element-plus'
import { ResponseData } from '@/custom'
import Cookie from 'js-cookie'

const config: AxiosRequestConfig = {
	baseURL: process.env.VUE_APP_API,
	headers: {
		// x-www-form-urlencoded
		'Content-Type': 'application/json',
	},
}

const _axios: AxiosInstance = axios.create(config)
const station: Map<string, Canceler> = new Map()

const registReq = (reqConfig: AxiosRequestConfig): AxiosRequestConfig => {
	const key = `${reqConfig.method}-${reqConfig.url}`
	reqConfig.cancelToken = new axios.CancelToken(cancel => {
		if (reqConfig.data && station.has(key)) {
			reqConfig?.data.priority === true && cancel()
		} else {
			if (station.has(key)) {
				const oldCancel = station.get(key)
				if (oldCancel) {
					oldCancel()
				}
			}
			station.set(key, cancel)
		}
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

const handlingError = (err: any) => {
	ElMessage({
		message: err?.response?.data?.msg || '发生了错误',
		type: 'error',
	})
	return Promise.reject(err)
}

_axios.interceptors.request.use(
	(reqConfig: AxiosRequestConfig) => {
		/* 权限控制 token */
		if (Cookie.get('authorization')) {
			reqConfig.headers.Authorization = `Bearer ${Cookie.get(
				'authorization'
			) || localStorage.getItem('authorization')}`
		}

		return registReq(reqConfig)
	},
	err => {
		console.log('请求拦截err', err)
	}
)
_axios.interceptors.response.use(
	(res: AxiosResponse<ResponseData>) => {
		console.log('响应拦截', res)
		return removeReq(res)
	},
	err => {
		console.log('响应拦截err', err, err.response)
		return handlingError(err)
	}
)
export default _axios
