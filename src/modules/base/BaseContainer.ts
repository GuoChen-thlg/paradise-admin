/*
 * @Author: 天火流光
 * @Date: 2022-02-20 13:07:04
 * @LastEditTime: 2022-02-20 13:20:33
 * @LastEditors: 天火流光
 * @Description:
 * @FilePath: \paradise-admin\src\modules\base\BaseContainer.ts
 *
 */
import  Base  from '@/modules/base/base'
export class BaseContainer extends Base {
	blocks = []
	constructor(option?: IBaseContainerOption) {
		super(option)
		this.type = 'base-container'
	}
}
export default BaseContainer