import crypto from 'crypto'
export const passwd = (pass: string) =>
	crypto.pbkdf2Sync(pass, '', 100, 255, 'sha256').toString('hex')

export const closedInterval = (min: number, max: number): number =>
	Math.floor(Math.random() * (max + 1 - min)) + min

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
 *
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

export const unique = (arr: { [k: string]: any }[], key: string) => {
	const map: Map<string, any> = new Map()
	arr.forEach(item => {
		if (!map.has(item[key])) {
			map.set(item[key], item)
		}
	})
	return [...map.values()]
}
