import { App } from 'vue'

export default {
	install: (app: App): void => {
		app.directive('el-dialog-drag', {
			mounted(el: HTMLDivElement) {
				const dialogHeaderEl: HTMLElement | null =
					el.querySelector('.el-dialog__header') ||
					el.closest('.el-dialog__header')
				const dragDom: HTMLElement | null =
					el.querySelector('.el-dialog') || el.closest('.el-dialog')
				if (!dialogHeaderEl || !dragDom) {
					return
				}
				dialogHeaderEl.style.cursor = 'move'

				// 获取原有属性 ie dom 元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
				const style =
					(dragDom as any).currentStyle ||
					window.getComputedStyle(dragDom, null)

				function handleMousedownEvent(e: MouseEvent) {
					const startX = e.clientX
					const startY = e.clientY
					const {
						x,
						y,
						width,
						height,
					} = dragDom!.getBoundingClientRect()
					let originalX: number, originalY: number
					if (style.left.includes('%')) {
						originalX =
							width * (+style.left.replace(/%/g, '') / 100)
						originalY =
							height * (+style.top.replace(/%/g, '') / 100)
					} else {
						originalX = +style.left.replace(/\px/g, '')
						originalY = +style.top.replace(/\px/g, '')
					}
					const handleMousemoveEvent = (e: MouseEvent) => {
						const disX = e.clientX - startX
						const disY = e.clientY - startY
						// if (x + disX < 0) {
						// 	dragDom!.style.left = `${originalX +
						// 		disX +
						// 		Math.abs(x + disX)}px`
						// } else {
						// 	dragDom!.style.left = `${originalX + disX}px`
						// }
						// if (y + disY < 0) {
						// 	dragDom!.style.top = `${originalY +
						// 		disY +
						// 		Math.abs(y + disY)}px`
						// } else {
						// 	dragDom!.style.top = `${originalY + disY}px`
						// }
						dragDom!.style.top = `${originalY + disY}px`
						dragDom!.style.left = `${originalX + disX}px`
					}
					const handleMouseupEvent = () => {
						document.removeEventListener(
							'mousemove',
							handleMousemoveEvent
						)
						document.removeEventListener(
							'mouseup',
							handleMouseupEvent
						)
						// dialogHeaderEl!.removeEventListener(
						// 	'mouseout',
						// 	handleMouseupEvent
						// )
					}
					document.addEventListener('mousemove', handleMousemoveEvent)
					document.addEventListener('mouseup', handleMouseupEvent)
					// dialogHeaderEl!.addEventListener(
					// 	'mouseout',
					// 	handleMouseupEvent
					// )
				}
				dialogHeaderEl.addEventListener(
					'mousedown',
					handleMousedownEvent
				)
			},
		})
	},
}
