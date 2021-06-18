import { mount, shallowMount } from '@vue/test-utils'
import Cube from '@/components/Cube.vue'

describe('Crumbs.vue', () => {
	it('单个立方体 ', async () => {
		const wrapper = mount(Cube)
		expect(wrapper.find('.surface:nth-child(1)').text()).toBe('1')
		expect(wrapper.find('.surface:nth-child(2)').text()).toBe('2')
		expect(wrapper.find('.surface:nth-child(3)').text()).toBe('3')
		expect(wrapper.find('.surface:nth-child(4)').text()).toBe('4')
		expect(wrapper.find('.surface:nth-child(5)').text()).toBe('5')
		expect(wrapper.find('.surface:nth-child(6)').text()).toBe('6')
	})
})
