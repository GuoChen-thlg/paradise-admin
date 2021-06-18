export interface media {
	/**媒体类型 */
	type: string
	/**媒体地址 */
	src: string
	/**描述 */
	alt: string
	/**宽 */
	width: number
	/**高 */
	height: number
	/**宽高比 */
	aspect_ratio: number
}
export interface image extends media {}
