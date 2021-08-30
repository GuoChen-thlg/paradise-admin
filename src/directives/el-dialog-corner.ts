import { App } from 'vue'

export default {
	install: (app: App): void => {
		app.directive('el-dialog-corenr', {
			mounted(el: HTMLDivElement) {
				const dragDom: HTMLElement | null =
					el.querySelector('.el-dialog') || el.closest('.el-dialog')
				const lineEl: HTMLElement | null = document.createElement('div')
				if (!lineEl || !dragDom) {
					return
				}
				lineEl.style.width = '6px'
				lineEl.style.height = '6px'
				lineEl.style.background = 'inherit'
				lineEl.style.position = 'absolute'
				lineEl.style.right = '0'
				lineEl.style.bottom = '0'
				lineEl.style.margin = 'auto'
				lineEl.style.zIndex = '1'
				lineEl.style.cursor = 'nwse-resize'

				lineEl.addEventListener(
					'mousedown',
					function(e) {
						// 鼠标按下，计算当前元素距离可视区的距离
						const startX = e.clientX
						const startY = e.clientY
						const {
							width,
							height,
						} = dragDom!.getBoundingClientRect()
		
						document.onmousemove = function(e) {
							e.preventDefault() // 移动时禁用默认事件
							const disX = e.clientX - startX
							const disY = e.clientY - startY

							if (width + disX > 0) {
								dragDom.style.width = `${width + disX}px`
							}
							if (height + disY > 0) {
								dragDom.style.height = `${height + disY}px`
							}
						}

						document.onmouseup = function(e) {
							document.onmousemove = null
							document.onmouseup = null
						}
					},
					false
				)
				dragDom.appendChild(lineEl)
			},
		})
	},
}
