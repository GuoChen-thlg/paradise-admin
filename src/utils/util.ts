/**
 * @description 下载文件
 * @param url String
 * @param filename String
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function download(url: string, filename: string) {
	const a = document.createElement('a')
	a.download = filename
	a.href = url
	a.click()
}
/**
 * @description: 随机 ID
 * @param {*} prefix
 * @return {*}
 */
export function randomId(prefix = 'id_'): string {
	return (
		prefix +
		Math.random()
			.toString(36)
			.substring(2)
	)
}

export const isSafari = /^((?!chrome|android).)*safari/i.test(
	navigator.userAgent
)
export const isFirefox = /.*firefox.*/i.test(navigator.userAgent)
export const isEdge =
	// ie
	(document as any).documentMode || /edg/i.test(navigator.userAgent)

/**
 * @description 随机从区间中获取一个整数 例:[1,10]
 *
 * @param {Number} min
 * @param {Number} max
 * @returns {Number} randomInteger    — A numeric expression.
 */
export function closedInterval(min: number, max: number): number {
	return Math.floor(Math.random() * (max + 1 - min)) + min
}
/**
 * @description 随机从区间中获取一个整数 例:(1,10)
 *
 * @param {Number} min
 * @param {Number} max
 * @returns {Number} randomInteger    — A numeric expression.
 */
export function openInterval(min: number, max: number): number {
	return Math.floor(Math.random() * (max - (min + 1)) + min + 1)
}
/**
 * @description 随机从区间中获取一个浮点数 例:(1,10)
 *
 * @param {Number} min
 * @param {Number} max
 * @returns  randomFloating    — A numeric expression.
 */
export function openIntervalF(min: number, max: number): number {
	return min + Math.random() * (max - min)
}
/**
 * @description 随机从区间中获取一个整数 例:[1,10)
 *
 * @param {Number} min
 * @param {Number} max
 * @returns {Number} randomInteger    — A numeric expression.
 */
export function closeLeftOpenRight(min: number, max: number): number {
	return Math.ceil(Math.random() * (max - min)) + min
}
/**
 * @description 随机从区间中获取一个整数 例:(1,10]
 *
 * @param {Number} min
 * @param {Number} max
 * @returns {Number} randomInteger    — A numeric expression.
 */
export function openLeftCloseRight(min: number, max: number): number {
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
): string {
	date = processingTime(date)
	const Y = date.getFullYear(),
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

/**
 * @description  树状结构将转为一维数组
 * @param tree
 * @param childrenKey
 * @returns
 */
export function treeToArray(
	tree: { [k: string]: any }[] | { [k: string]: any },
	childrenKey: string
): { [k: string]: any }[] {
	const arr: { [k: string]: any }[] = []
	const a = (ls: { [k: string]: any }[]) => {
		if (ls instanceof Array) {
			ls.forEach(o => {
				const c = o[childrenKey]
				delete o[childrenKey]
				arr.push(o)
				a(c)
			})
		}
	}
	tree instanceof Array ? a(tree) : a([tree])
	return arr
}
/**
 * @description  将一维数组转为树状结构
 * @param arr 对象数组
 * @param id  ID 属性
 * @param pid 父对象 ID 属性
 * @returns
 */
export const arrayToTree = (arr: unknown[], id: string, pid: string) => {
	if (!id || id == '') {
		return []
	}
	if (arr instanceof Array) {
		const tree: unknown[] = []
		const treeMap: any = {}
		arr.forEach(o => {
			treeMap[o[id]] = o
		})
		arr.forEach(o => {
			const parent = treeMap[o[pid]]
			if (parent && o[id] != o[pid]) {
				if (!parent.children) {
					parent.children = []
				}
				parent.children.push(o)
			} else {
				tree.push(o)
			}
		})
		return tree
	} else {
		return [arr]
	}
}
/**
 * @description: 驼峰命名转连接线
 * @param {string} str
 * @return {string}
 */
export function parseToLink(str: string): string {
	const r1 = /([a-z])([A-Z])/g
	return str
		.replace(r1, function(_, g1, g2) {
			return g1 + '-' + g2.toLowerCase()
		})
		.toLowerCase()
}
/**
 * @description: 克隆 json 对象
 * @param {T} jsonObj
 * @return {T}
 */
export function jsonClone<T>(jsonObj: T): T {
	return JSON.parse(JSON.stringify(jsonObj))
}

/**
 * @description:
 * @param {T} oldObj
 * @param {string} path
 * @param {any} newVal
 * @param {boolean} isClone
 * @return {T} 返回修改后的对象
 */
export function jsonSet<T>(
	oldObj: T,
	path: string[] = [],
	newVal: any,
	isClone = true
): T {
	let obj = undefined
	let tem: any
	if (isClone) {
		obj = jsonClone(oldObj)
	} else {
		obj = oldObj
	}
	tem = obj
	if (path.length === 0) {
		return obj
	} 
	for (let i = 0; i < path.length; i++) {
		if (i === path.length - 1) {
			tem[path[i]] = newVal
			return obj
		} else {
			tem = tem[path[i]]
		}
	}
	return obj
}
