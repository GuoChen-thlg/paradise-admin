

export interface DangerSpotType {
	readonly id: number
	name: string
	born: string //出生
	death: string //死亡
	good: string[] //善
	evil: string[] //恶
	introduction: string //简介
	death_method: string //死亡方式
	readonly prior_id: number //前世id
	readonly after_id?: number //下世id
}
