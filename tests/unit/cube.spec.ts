import { mount, shallowMount } from '@vue/test-utils'
import Cube from '@/components/Cube.vue'

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
				surface1: '<div>1</div>',
				surface2: '<div>2</div>',
				surface3: '<div>3</div>',
				surface4: '<div>4</div>',
				surface5: '<div>5</div>',
				surface6: '<div>6</div>',
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
