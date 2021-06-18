import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
	const wrapper = shallowMount(HelloWorld)
	it('renders props.msg when passed', async () => {
		const msg = 'new message'
		await wrapper.setProps({ msg })
		expect(wrapper.text()).toMatch(msg)
	})
})
