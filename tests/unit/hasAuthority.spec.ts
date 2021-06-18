import hasAuthority from '@/utils/hasAuthority'

describe('测试 hasAuthority 函数', () => {
	it('有一个符合', () => {
		expect(hasAuthority(['c'], ['c', 'd', 'u'])).not.toBeFalsy()
	})
	it('有多个符合', () => {
		expect(hasAuthority(['c','d'], ['c', 'd', 'u'])).not.toBeFalsy()
	})
	it('不符合', () => {
		expect(hasAuthority(['c'], ['a', 'd', 'u'])).toBeFalsy()
	})
	it('没有权限限制', () => {
		expect(hasAuthority([], ['a', 'd', 'u'])).not.toBeFalsy()
	})
})
