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
function processingTime(date: Date | number | string | undefined) {
	if ((!date && typeof date !== 'number') || date === '') {
		return new Date()
	} else if (date instanceof Date) {
		return date
	} else {
		return new Date(date)
	}
}
/**
 * @description Formatted time string
 * @example
 * // returns 2021
 * format(YYYY)
 * // returns 21
 * format(YY)
 * // returns 2021-02-01 09:00:00
 * format(YYYY-MM-DD hh:mm:ss)
 * // returns 21-2-1 9:0:0
 * format(YY-M-D h:m:s)
 * @param {String} [format='YYYY-MM-DD hh:mm:ss'] A format string defaults to YYYY-MM-DD hh:mm:ss
 * @param {(Date|String|Number)} [date=''] Can be a time object or a parameter of new Date
 * @returns {String} A formatted time string
 *
 */
export function format(
	format = 'YYYY-MM-DD hh:mm:ss',
	date: Date | number | string | undefined = ''
) {
	date = processingTime(date)
	let Y = date.getFullYear(),
		M = date.getMonth() + 1,
		D = date.getDate(),
		h = date.getHours(),
		m = date.getMinutes(),
		s = date.getSeconds(),
		replaces = [
			{ reg1: /MM/, reg2: /M/, str1: 'MM', str2: 'M', self: M },
			{ reg1: /DD/, reg2: /D/, str1: 'DD', str2: 'D', self: D },
			{ reg1: /hh/, reg2: /h/, str1: 'hh', str2: 'h', self: h },
			{ reg1: /mm/, reg2: /m/, str1: 'mm', str2: 'm', self: m },
			{ reg1: /ss/, reg2: /s/, str1: 'ss', str2: 's', self: s },
		]
	if (/Y{4}/.test(format)) {
		format = format.replace(/Y{4}/, Y.toString())
	} else if (/Y{2}/.test(format)) {
		format = format.replace(/Y{2}/, `${Y}`.substr(2))
	}
	replaces.forEach(({ reg1, reg2, str1, str2, self }) => {
		if (format.includes(str1)) {
			format = format.replace(
				reg1,
				self < 10 ? `0${self}` : self.toString()
			)
		} else if (format.includes(str2)) {
			format = format.replace(reg2, self.toString())
		}
	})
	return format
}

