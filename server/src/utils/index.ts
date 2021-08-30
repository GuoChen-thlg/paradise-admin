import crypto from 'crypto'
/**
 * @description  加密字符串
 * @param pass
 * @returns
 */
export const passwd = (pass: string) =>
	crypto.pbkdf2Sync(pass, '', 100, 255, 'sha256').toString('hex')

/**
 * @description  随机返回区间内的整数
 * @param min
 * @param max
 * @returns
 */
export const closedInterval = (min: number, max: number): number =>
	Math.floor(Math.random() * (max + 1 - min)) + min

/**
 * @description  树状结构将转为一维数组
 * @param tree
 * @param childrenKey
 * @returns
 */
export const treeToArray = (
	tree: { [k: string]: any }[] | { [k: string]: any },
	childrenKey: string
) => {
	let arr: { [k: string]: any }[] = []
	const a = (ls: { [k: string]: any }[]) => {
		if (ls instanceof Array) {
			ls.forEach(o => {
				let c = o[childrenKey]
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
		let tree: unknown[] = []
		let treeMap: any = {}
		arr.forEach(o => {
			treeMap[o[id]] = o
		})
		arr.forEach(o => {
			let parent = treeMap[o[pid]]
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
 *
 * @description 根据提供的对象属性 生成唯一 对象数组
 * @param arr
 * @param key
 * @returns
 */
export const unique = (arr: { [k: string]: any }[], key: string) => {
	const map: Map<string, any> = new Map()
	arr.forEach(item => {
		if (!map.has(item[key])) {
			map.set(item[key], item)
		}
	})
	return [...map.values()]
}
