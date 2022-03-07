/**
 * 笔刷 一部分
 */
export interface brushFragment {
	x: number
	y: number
}
/**
 * 一个点
 */
export interface brushPoint extends brushFragment {
	radius: number
	color?: string
	zIndex?: number
}
/**
 * 线端的头
 */
export interface brushLine extends brushFragment {
	width: number
	color?: string
	zIndex?: number
}
