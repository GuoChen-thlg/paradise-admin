/*
 * @Author: 天火流光
 * @Date: 2022-02-20 22:06:20
 * @LastEditTime: 2022-03-05 16:48:32
 * @LastEditors: 天火流光
 * @Descripttypev
 * @FilePath: \paradise-admin\typings\pay.ts
 *
 */
export type payType = 'SJ' | 'QQ' | 'WX' | 'ZFB'

export interface pay {
	type: payType
	account: string
	balance: number
}
