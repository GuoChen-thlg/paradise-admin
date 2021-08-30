import { App } from 'vue'

export default {
	install: (app: App): void => {
		app.directive('el-dialog-drag-width', {
			mounted(el: HTMLDivElement) {
				const dragDom: HTMLElement | null =
					el.querySelector('.el-dialog') || el.closest('.el-dialog')
				if (!dragDom) {
					return
				}
				const lineEl = document.createElement('div')
				lineEl.style.width = '2px'
				lineEl.style.background = 'inherit'
				lineEl.style.height = '80%'
				lineEl.style.position = 'absolute'
				lineEl.style.right = '0'
				lineEl.style.top = '0'
				lineEl.style.bottom = '0'
				lineEl.style.margin = 'auto'
				lineEl.style.zIndex = '1'
				lineEl.style.opacity = '0'
				lineEl.style.cursor = 'w-resize'

				// 获取原有属性 ie dom 元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
				const style =
					(dragDom as any).currentStyle ||
					window.getComputedStyle(dragDom, null)

				lineEl.addEventListener(
					'mousedown',
					event => {
						const startX = event.clientX
						const { width } = dragDom.getBoundingClientRect()
						document.onmousemove = function(e) {
							e.preventDefault() // 移动时禁用默认事件

							// 通过事件委托，计算移动的距离
							const disX = e.clientX - startX
							console.log(disX)

							dragDom.style.width = `${width + disX}px`
						}

						document.onmouseup = function() {
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
