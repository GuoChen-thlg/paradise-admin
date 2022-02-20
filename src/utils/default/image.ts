/**
 *
 * @param w 宽
 * @param h 高
 * @param t 文字
 * @param c 字体颜色
 * @param bc 背景颜色
 * @returns base64
 */
export const createImage = (
	w = 60,
	h = 60,
	t = `image`,
	c = '#cfc8cc',
	bc = '#f5f7fa'
): string => {
	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

	canvas.width = w
	canvas.height = h
	ctx.beginPath()
	ctx.fillStyle = bc
	ctx.rect(0, 0, w, h)
	ctx.fill()
	ctx.closePath()
	ctx.beginPath()
	ctx.fillStyle = c
	ctx.font = `${h / 4}px auto`
	ctx.textAlign = 'center'
	ctx.textBaseline = 'middle'
	ctx.fillText(t, w / 2, h / 2)
	ctx.closePath()

	return canvas.toDataURL()
}
export default createImage
