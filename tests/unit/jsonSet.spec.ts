/*
 * @Author: 天火流光
 * @Date: 2022-02-19 17:28:26
 * @LastEditTime: 2022-02-20 02:09:24
 * @LastEditors: 天火流光
 * @Description:
 * @FilePath: \paradise-admin\tests\unit\jsonSet.spec.ts
 *
 */
import { jsonSet } from '@/utils/util'

const oldObj = {
	a: {
		b: {
			c: 'c string',
		},
	},
	arr: [
		{
			a: {
				b: {
					c: {
						d: {
							e: {
								f: 'f string',
								e: 100,
								r: [
									{
										a: 'a string',
									},
								],
							},
						},
					},
				},
			},
		},
	],
}
function copy<T>(data: T): T {
	return JSON.parse(JSON.stringify(data))
}
describe('测试 jsonSet 设置深层属性值', () => {
	it('当路径为空时', () => {
		const original = copy(oldObj)
		expect(jsonSet(original, [], '123', false)).toBe(original)
	})
	it('一个路径节点', () => {
		const original = {
			a: 'a string',
		}
		expect(jsonSet(original, ['a'], 'string', false)).toBe(original)
	})
	it('返回原数据', () => {
		const original = copy(oldObj)
		expect(jsonSet(original, ['a', 'b', 'c'], 'string', false)).toBe(
			original
		)
	})
	it('返回拷贝数据', () => {
		const original = copy(oldObj)
		expect(
			JSON.stringify(jsonSet(original, ['a', 'b', 'c'], '123', false))
		).toBe(JSON.stringify(original))
	})
	it('改变数组的值', () => {
		const original = {
			arr: ['1 sstring', '2 sstring', '3 sstring', '4 sstring'],
		}
		const val = copy(original)
		val.arr[2] = 'string'
		expect(JSON.stringify(jsonSet(original, ['arr', '2'], 'string'))).toBe(
			JSON.stringify(val)
		)
	})
	it('改变数组的对象值', () => {
		const original = {
			arr: [
				{
					a: {
						b: {
							c: {
								d: {
									e: {
										f: 'f string',
										e: 100,
										r: [
											{
												a: 'a string',
											},
										],
									},
								},
							},
						},
					},
				},
			],
		}
		const val = copy(original)
		val.arr[0].a.b.c.d.e.f = 'string'
		debugger
		expect(
			JSON.stringify(
				jsonSet(
					original,
					['arr', '0', 'a', 'b', 'c', 'd', 'e', 'f'],
					'string'
				)
			)
		).toBe(JSON.stringify(val))
	})
})
