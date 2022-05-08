/*
 * @Author: 天火流光
 * @Date: 2022-02-20 13:07:04
 * @LastEditTime: 2022-03-20 20:29:18
 * @LastEditors: 天火流光
 * @Description:
 * @FilePath: \paradise-admin\src\modules\base\BaseContainer.ts
 *
 */
import {
	IBaseContainer,
	BaseContainerOption,
} from '@type/modules/baseContainer'

import { jsonClone, parseToLink } from '@/utils/util'
import Base from '@/modules/base/Base'
import comBaseContainer from '@/components/modules/base/BaseContainer.vue'

export class BaseContainer extends Base {
	blocks: IBaseContainer['blocks'] = []
	constructor(option?: BaseContainerOption) {
		super(option)
		this.type = 'base-container'
		this.name = (option?.name || 'base').toLocaleLowerCase()
		this.componentKey = parseToLink(
			option?.componentKey || comBaseContainer.name
		)
		this.blocks = jsonClone(option?.blocks || [])
	}
}
export default BaseContainer
