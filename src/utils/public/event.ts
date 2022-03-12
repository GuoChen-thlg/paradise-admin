/*
 * @Author: 天火流光
 * @Date: 2022-02-01 13:37:22
 * @LastEditTime: 2022-03-12 19:36:01
 * @LastEditors: 天火流光
 * @Description: 事件类 用于绑定事件触发事件
 * @FilePath: \paradise-admin\src\utils\public\event.ts
 *
 */
interface hookEvent {
	once: boolean // 是否只执行一次
	step: number // 执行次数
	handler: (...param: unknown[]) => void // 钩子函数
}

function defaultHook(...param: any[]): void {
	console.warn(new Error('未绑定处理事件').stack)
}

export class Event {
	private _events: Map<string, hookEvent[]>
	constructor() {
		this._events = new Map()
	}
	/**
	 * @description:用于绑定事件
	 * @param {string} handle
	 * @param {function} hook
	 * @param {boolean} is_once // 默认为 false 用于区别事件是否为单次触发
	 * @return {void}
	 */
	private _add(handle = '', hook = defaultHook, is_once = false): void {
		if (!this._events.has(handle)) {
			this._events.set(handle, [])
		}
		const hooks = this._events.get(handle) as Array<hookEvent>
		// 当多次绑定同一事件时 只绑定一次
		if (hooks.filter(_hook => _hook.handler === hook).length == 0) {
			hooks.push({ once: is_once, step: 0, handler: hook })
			this._events.set(handle, hooks)
		}
	}
	/**
	 * @description: 用于绑定事件
	 * @param {string} handle
	 * @param {function} hook
	 * @return {void}
	 */
	on(handle = '', hook = defaultHook): void {
		this._add(handle, hook, false)
	}
	/**
	 * @description: 绑定只触发一次的事件
	 * @param {string} handle
	 * @param {function} hook
	 * @return {void}
	 */

	once(handle = '', hook = defaultHook): void {
		this._add(handle, hook, true)
	}

	/**
	 * @description: 触发事件
	 * @param {string} handle
	 * @param {unknown[]} param
	 * @return {void}
	 */

	emit(handle = '', ...param: unknown[]): void {
		if (this._events.has(handle)) {
			const hooks = this._events.get(handle) as hookEvent[]
			let clearFlag = false
			hooks?.forEach(hook => {
				hook.handler.call(this, ...param)
				hook.step = +1
				if (hook.once) {
					clearFlag = true
				}
			})
			if (clearFlag) {
				for (let index = 0; index < hooks.length; index++) {
					if (hooks[index].once) {
						hooks.splice(index, 1)
						index--
						this._events.set(handle, hooks)
					}
				}
			}
		} else {
			console.warn(new Error(`没有绑定 \`${handle}\` 监听事件`).stack)
		}
	}
	/**
	 * @description:移除一个监听的处理函数或者移除全部的处理函数
	 * @param {string} handle
	 * @param {function|null} hook
	 * @return {void}
	 */

	off(handle = '', hook: null | ((...param: any[]) => void)): void {
		if (this._events.has(handle)) {
			const hooks = this._events.get(handle) as hookEvent[]
			if (hook) {
				for (let index = 0; index < hooks.length; index++) {
					if (hooks[index]) {
						hooks.splice(index, 1)
						return
					}
				}
				this._events.set(handle, hooks)
			} else {
				this._events.delete(handle)
			}
		}
	}
}
export default Event
