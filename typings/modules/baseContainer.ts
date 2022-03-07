/*
 * @Author: 天火流光
 * @Date: 2022-02-24 22:54:03
 * @LastEditTime: 2022-02-24 23:34:25
 * @LastEditors: 天火流光
 * @Description:
 * @FilePath: \paradise-admin\typings\modules\baseContainer.ts
 *
 */
import { IBase } from './base'
export interface IBaseContainer extends IBase {
	blocks: Array<IBaseContainer | IBase>
}
export type BaseContainerOption = Partial<IBaseContainer>
