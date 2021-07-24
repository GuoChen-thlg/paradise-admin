import { mount, shallowMount } from '@vue/test-utils'
import Cube from '@/components/Cube.vue'
import { h } from 'vue-demi'

describe('Crumbs.vue', () => {
	it('单个立方体 插槽显示字符', async () => {
		const wrapper = mount(Cube, {
			slots: {
				surface1: '1',
				surface2: '2',
				surface3: '3',
				surface4: '4',
				surface5: '5',
				surface6: '6',
			},
		})
		expect(wrapper.find('.surface:nth-child(1)').text()).toBe('1')
		expect(wrapper.find('.surface:nth-child(2)').text()).toBe('2')
		expect(wrapper.find('.surface:nth-child(3)').text()).toBe('3')
		expect(wrapper.find('.surface:nth-child(4)').text()).toBe('4')
		expect(wrapper.find('.surface:nth-child(5)').text()).toBe('5')
		expect(wrapper.find('.surface:nth-child(6)').text()).toBe('6')
	})
	it('单个立方体 插槽显示DOM', async () => {
		const wrapper = mount(Cube, {
			slots: {
				surface1: h('div', 1),
				surface2: h('div', 2),
				surface3: h('div', 3),
				surface4: h('div', 4),
				surface5: h('div', 5),
				surface6: h('div', 6),
			},
		})
		expect(wrapper.find('.surface:nth-child(1)>div').html()).toBe(
			'<div>1</div>'
		)
		expect(wrapper.find('.surface:nth-child(2)>div').html()).toBe(
			'<div>2</div>'
		)
		expect(wrapper.find('.surface:nth-child(3)>div').html()).toBe(
			'<div>3</div>'
		)
		expect(wrapper.find('.surface:nth-child(4)>div').html()).toBe(
			'<div>4</div>'
		)
		expect(wrapper.find('.surface:nth-child(5)>div').html()).toBe(
			'<div>5</div>'
		)
		expect(wrapper.find('.surface:nth-child(6)>div').html()).toBe(
			'<div>6</div>'
		)
	})
	it('单个立方体 传参', async () => {
		const wrapper = mount(Cube, {
			props: {
				theLen: '50px',
				offset: '10px',
				spread: true,
				rotate: true,
				angle: '90deg',
			},
			slots: {
				surface1: '0',
				surface2: '0',
				surface3: '0',
				surface4: '0',
				surface5: '0',
				surface6: '0',
			},
		})
		expect(wrapper.classes('cube')).toBe(true)
		expect(wrapper.classes()).toContain('turn-on')
		expect(wrapper.classes('rotate')).not.toBeFalsy()
	})
})
