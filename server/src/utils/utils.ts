/*
 * @Author: 天火流光
 * @Date: 2022-02-20 22:06:00
 * @LastEditTime: 2022-02-24 00:18:47
 * @LastEditors: 天火流光
 * @Description:
 * @FilePath: \paradise-admin\server\src\utils\utils.ts
 *
 */
import crypto from 'crypto'

/**
 * @description  加密字符串
 * @param {string} pass
 * @returns
 */
export const passwd = (pass: string): string =>
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
export function treeToArray<T, K extends keyof T>(
	tree: T,
	childrenKey: K
): T[] {
	const arr: T[] = []
	const a = (ls: T[]) => {
		if (ls instanceof Array) {
			ls.forEach(o => {
				const c = (o[childrenKey] as unknown) as T[]
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
