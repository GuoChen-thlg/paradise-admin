/*
 * @Author: 天火流光
 * @Date: 2022-02-05 01:35:40
 * @LastEditTime: 2022-02-05 02:33:05
 * @LastEditors: 天火流光
 * @Description:
 * @FilePath: \paradise-admin\src\hooks\resize.ts
 *
 */
import { onMounted, onUnmounted } from 'vue'

/**
 * @description: 同 resize
 * @param {function} backHook
 * @return {voie}
 */
function useResize(backHook: () => void): void {
	onMounted(() => {
		window.addEventListener('resize', backHook)
		backHook()
	})
	onUnmounted(() => {
		window.removeEventListener('resize', backHook)
	})
}
export default useResize
