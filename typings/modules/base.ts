/*
 * @Author: 天火流光
 * @Date: 2022-02-01 21:43:12
 * @LastEditTime: 2022-02-24 23:35:03
 * @LastEditors: 天火流光
 * @Description:
 * @FilePath: \paradise-admin\typings\modules\base.ts
 *
 */

export interface IBase {
	readonly type: string
	readonly id: string
	readonly version: string
	readonly name: string
	style: any
	//  {
	// 	[key: string]: string | number | StyleValue
	// }
	props: {
		[key: string]: string | number
	}
	readonly componentKey: string
	events: {
		click?: {
			label: string
			emit: boolean
			description: string
		}
	}
	actions: {
		event: 'click'
		name: string
		key: string
		handle: {
			name: string
			key: string
		}[]
	}[]
	animations: {
		/** 简介 */
		label: string
		// 动画名 内置
		name: string
		/** 一个动画周期的时长 1s 2s*/
		duration: string
		timing?:
			| 'ease'
			| 'ease-in'
			| 'ease-out'
			| 'ease-in-out'
			| 'linear'
			| 'step-start'
			| 'step-end'
		// 延时
		delay?: string
		count: 'infinite' | number
		direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
		fill_mode?: 'none' | 'forwards' | 'backwards' | 'both'
	}[]
}
export type BaseOption = Partial<IBase>