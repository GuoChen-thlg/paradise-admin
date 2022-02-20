/*
 * @Author: 天火流光
 * @Date: 2022-02-02 16:05:06
 * @LastEditTime: 2022-02-20 13:20:52
 * @LastEditors: 天火流光
 * @Description:
 * @FilePath: \paradise-admin\src\modules\base\BaseImage.ts
 *
 */
import comBaseImage from '@/components/modules/base/BaseImage.vue'
import createImage from '@/utils/default/image'
import Base from '@/modules/base/Base'
const Loading: Ienum = {
	eager: '0', // 立即加载
	lazy: '1', //懒加载
	'0': 'eager',
	'1': 'lazy',
}
const ObjectFit: Ienum = {
	none: '0',
	fill: '1',
	contain: '2',
	cover: '3',
	'scale-down': '4',
	'0': 'none',
	'1': 'fill',
	'2': 'contain',
	'3': 'cover',
	'4': 'scale-down',
}
interface baseImageOption extends Base {
	props: {
		src: string
		alt: string
		loading: string
		object_fit: string
	}
}
const defaultProps: baseImageOption['props'] = {
	src: createImage(750, 300, '默认图片', '#999'),
	alt: '',
	loading: Loading.eager,
	object_fit: ObjectFit.fill,
}

class BaseImage extends Base {
	props = {}
	constructor(option?: baseImageOption) {
		super({
			componentKey: comBaseImage.name,
			name: 'base-image',
			events: {
				click: {
					label: '点击事件',
					emit: true,
					description:
						'点击图片后触发 用于触发其他组件的事件或执行某些动作',
				},
			},
		})
		this.props = Object.assign(defaultProps, option?.props || {})
	}
}

export default BaseImage
