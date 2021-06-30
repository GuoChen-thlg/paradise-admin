export const enum payType {
	$sj = '三界币',
	QQ = 'QQ',
	WX = 'WX',
	ZFB = 'ZFB',
	// ...
}
export interface pay {
	type: payType
	account: string
	balance: number
}
