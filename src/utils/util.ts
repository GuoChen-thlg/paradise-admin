/**
 * @description 下载文件
 * @param url String
 * @param filename String
 */
export function download(url: string, filename: string) {
	const a = document.createElement('a')
	a.download = filename
	a.href = url
	a.click()
}

export const randomId = () => {
	return (
		'id_' +
		Math.random()
			.toString(36)
			.substr(2)
	)
}

export const isSafari = /^((?!chrome|android).)*safari/i.test(
	navigator.userAgent
)

export const isFirefox = /.*firefox.*/i.test(navigator.userAgent)

export const isEdge =
	(document as any).documentMode || /edg/i.test(navigator.userAgent)

/**
 * @description 随机从区间中获取一个整数 例:[1,10]
 *
 * @param {Number} min
 * @param {Number} max
 * @returns {Number} randomInteger    — A numeric expression.
 */
export function closedInterval(min: number, max: number) {
	return Math.floor(Math.random() * (max + 1 - min)) + min
}
/**
 * @description 随机从区间中获取一个整数 例:(1,10)
 *
 * @param {Number} min
 * @param {Number} max
 * @returns {Number} randomInteger    — A numeric expression.
 */
export function openInterval(min: number, max: number) {
	return Math.floor(Math.random() * (max - (min + 1)) + min + 1)
}
/**
 * @description 随机从区间中获取一个浮点数 例:(1,10)
 *
 * @param {Number} min
 * @param {Number} max
 * @returns  randomFloating    — A numeric expression.
 */
export function openIntervalF(min: number, max: number) {
	return min + Math.random() * (max - min)
}
/**
 * @description 随机从区间中获取一个整数 例:[1,10)
 *
 * @param {Number} min
 * @param {Number} max
 * @returns {Number} randomInteger    — A numeric expression.
 */
export function closeLeftOpenRight(min: number, max: number) {
	return Math.ceil(Math.random() * (max - min)) + min
}
/**
 * @description 随机从区间中获取一个整数 例:(1,10]
 *
 * @param {Number} min
 * @param {Number} max
 * @returns {Number} randomInteger    — A numeric expression.
 */
export function openLeftCloseRight(min: number, max: number) {
	return Math.floor(Math.random() * (max - min)) + min
}
