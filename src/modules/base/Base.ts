/*
 * @Author: 天火流光
 * @Date: 2022-01-09 17:39:27
 * @LastEditTime: 2022-02-20 13:09:23
 * @LastEditors: 天火流光
 * @Description:
 * @FilePath: \paradise-admin\src\modules\base\base.ts
 *
 */
import { jsonClone, randomId } from '@/utils/util'
import { parseToLink } from '@/utils/util'
import comBase from '@/components/modules/base/Base.vue'
// 默认样式
const defaultStyle: IBaseOption['style'] = {
	width: '3.75rem',
	height: 'auto',
	opacity: 1,
	position: 'initial',
	top: '',
	right: '',
	bottom: '',
	left: '',
	'margin-top': '0px',
	'margin-left': '0px',
	'margin-right': '0px',
	'margin-bottom': '0px',
}
// 组件版本号
const VERSION = '1.0.0'
export class Base {
	type = ''
	id = ''
	version = ''
	name = ''
	componentKey = ''
	style = defaultStyle
	props = {}
	animations: IBaseOption['animations'] = []
	actions: IBaseOption['actions'] = []
	events: IBaseOption['events'] = {}
	constructor(option?: IBaseOption) {
		this.type = option?.type || 'base'
		this.id = option?.id || randomId()
		this.style = Object.assign(defaultStyle, option?.style || {})
		this.props = option?.props || {}
		this.version = option?.version || VERSION
		this.name = (option?.name || 'base').toLocaleLowerCase()
		this.componentKey = parseToLink(option?.componentKey || comBase.name)
		this.animations = jsonClone(option?.animations || [])
		this.actions = jsonClone(option?.actions || [])
		this.events = jsonClone(option?.events || {})
	}
}

export default Base
