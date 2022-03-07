/*
 * @Author: 天火流光
 * @Date: 2022-03-06 13:19:48
 * @LastEditTime: 2022-03-06 14:13:36
 * @LastEditors: 天火流光
 * @Description: 事件
 * @FilePath: \paradise-admin\src\hooks\hookEvent.ts
 *
 */
import Event from '@/utils/public/event'

const event = new Event()
function useHookEvent(): Event {
	return event
}
export default useHookEvent
