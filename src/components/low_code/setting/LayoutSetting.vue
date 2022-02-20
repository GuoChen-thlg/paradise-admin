<!--
 * @Author: 天火流光
 * @Date: 2022-02-03 16:38:21
 * @LastEditTime: 2022-02-20 19:25:39
 * @LastEditors: 天火流光
 * @Description: 
 * @FilePath: \paradise-admin\src\components\low_code\setting\LayoutSetting.vue
 * 
-->
<template>
	<div class="layout-setting">
		<el-form
			:inline-message="true"
			:model="componentStyle"
			label-width="70px"
		>
			<el-form-item
				v-show="handleIsShow(width)"
				prop="width"
				label="宽"
				:rules="validator.width"
			>
				<!-- :required="true"
				error="不可为空" -->
				<t-input-css-val v-model="width"></t-input-css-val>
			</el-form-item>
			<el-form-item label="高" v-show="handleIsShow(height)">
				<t-input-css-val v-model="height"></t-input-css-val>
			</el-form-item>
		</el-form>
	</div>
</template>
<script lang="ts">
	import Base from '@/modules/base/Base'
	import { key } from '@/store'
	import { computed, defineComponent } from 'vue'
	import { useStore } from 'vuex'
	import { jsonClone, jsonSet } from '@/utils/util'
	import { template_mutations } from '@/store/modules/template'
	import BaseContainer from '@/modules/base/BaseContainer'
	import TInputCssVal from '@/components/low_code/form/TInputCssVal.vue'
	export default defineComponent({
		name: 'LayoutSetting',
		components: { TInputCssVal },
		setup() {
			const store = useStore(key)
			const pathStr = computed(() => store.state.template.active.path)
			const indexArr = computed(() => pathStr.value.split('-'))

			const componentStyle = computed<Base['style']>(() => {
				let tem: null | Base | BaseContainer = null
				for (let index = 0; index < indexArr.value.length; index++) {
					if (index === 0) {
						tem =
							store.state.template.page.blocks[
								parseInt(indexArr.value[index], 10)
							]
					} else if (index !== indexArr.value.length - 1 && tem) {
						tem = ((tem as unknown) as BaseContainer)['blocks'][
							parseInt(indexArr.value[index], 10)
						]
					}
					if (index === indexArr.value.length - 1 && tem) {
						return jsonClone(tem.style)
					}
				}
				return {}
			})

			const [
				width,
				height,
				opacity,
				position,
				top,
				right,
				bottom,
				left,
				marginTop,
				marginLeft,
				marginRight,
				marginBottom,
			] = [
				'width',
				'height',
				'opacity',
				'position',
				'top',
				'right',
				'bottom',
				'left',
				'margin-top',
				'margin-left',
				'margin-right',
				'margin-bottom',
			].map(key => {
				return computed<string>({
					get() {
						return componentStyle.value[key]
					},
					set(val) {
						const path = pathStr.value
							.replace(/-/g, '-blocks-')
							.split('-')
						path.push('style', key)
						store.commit(
							template_mutations.SETBLOCK,
							jsonSet(
								jsonClone(store.state.template.page.blocks),
								path,
								val
							)
						)
					},
				})
			})

			// 判断是否有当前的属性
			const handleIsShow = (val: string | number | undefined | unknown) =>
				val !== undefined
			const validator = {
				width: {
					trigger: 'blur',
					validator(rule: string, value: string, callback: any) {
						if (
							!/^\d/.test(width.value.trim()) &&
							!/auto/.test(width.value.trim())
						) {
							callback(new Error('不可为空'))
						}
					},
				},
			}
			// as { [key: string]: RuleItem | RuleItem[] }
			return {
				componentStyle,
				handleIsShow,
				validator,
				width,
				height,
				opacity,
				position,
				top,
				right,
				bottom,
				left,
				marginTop,
				marginLeft,
				marginRight,
				marginBottom,
			}
		},
	})
</script>
