/*
 * @Author: 天火流光
 * @Date: 2022-01-09 17:39:27
 * @LastEditTime: 2022-03-06 00:27:41
 * @LastEditors: 天火流光
 * @Description:
 * @FilePath: \paradise-admin\src\modules\base\Base.ts
 *
 */
import { jsonClone, randomId } from '@/utils/util'
import { parseToLink } from '@/utils/util'
import comBase from '@/components/modules/base/Base.vue'
import { IBase, BaseOption } from '@type/modules/base'
import type * as CSS from 'csstype';


// 默认样式
const defaultStyle: CSS.Properties = {
	display: 'block',
	width: '3.75rem',
	height: 'rem',
	opacity: 1,
	position: 'relative', //'initial',
	top: '',
	right: '',
	bottom: '',
	left: '',
	marginTop: '',
	marginLeft: '',
	marginRight: '',
	marginBottom: '',
	paddingTop: '',
	paddingRight: '',
	paddingBottom: '',
	paddingLeft: '',
}
// 组件版本号
const VERSION = '1.0.0'

export class Base {
			type = ''
			id = ''
			version = ''
			name = ''
			componentKey = ''
			style: CSS.Properties = jsonClone(defaultStyle)
			props = {}
			animations: IBase['animations'] = []
			actions: IBase['actions'] = []
			events: IBase['events'] = {}
			constructor(option?: BaseOption) {
				this.type = option?.type || 'base'
				this.id = option?.id || randomId()
				this.style = Object.assign(
					jsonClone(defaultStyle),
					option?.style || {}
				)
				this.props = option?.props || {}
				this.version = option?.version || VERSION
				this.name = (option?.name || 'base').toLocaleLowerCase()
				this.componentKey = parseToLink(
					option?.componentKey || comBase.name
				)
				this.animations = jsonClone(option?.animations || [])
				this.actions = jsonClone(option?.actions || [])
				this.events = jsonClone(option?.events || {})
			}
		}

export default Base
