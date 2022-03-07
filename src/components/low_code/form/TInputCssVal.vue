<!--
 * @Author: 天火流光
 * @Date: 2022-02-20 16:05:48
 * @LastEditTime: 2022-02-27 19:25:52
 * @LastEditors: 天火流光
 * @Description: 用于设置 css 属性值（长度 px rem %）
 * @FilePath: \paradise-admin\src\components\low_code\form\TInputCssVal.vue
 * 
-->
<template>
	<el-input :type="type" v-model.trim="numberValue">
		<!-- :disabled="modelValue == 'auto'" -->
		<template #append v-if="units">
			<el-select v-model="units" size="large">
				<el-option
					v-for="item in unitsList"
					:key="item"
					:label="item"
					:value="item"
				>
				</el-option>
			</el-select>
		</template>
	</el-input>
</template>
<script lang="ts">
	import { regCssUnits } from '@/utils/regexp'
	import { defineComponent, PropType, computed } from 'vue'

	export default defineComponent({
		name: 'TInputCssVal',
		props: {
			modelValue: {
				type: [String, Number],
				default: '',
			},
			type: {
				type: String,
				default: 'text',
			},
			unitsList: {
				type: Array as PropType<string[]>,
				default: ['px', 'rem', '%'],
			},
		},
		emits: ['update:modelValue'],
		setup(props, context) {
			const units = computed({
				get() {
					if (regCssUnits.test(`${props.modelValue}`)) {
						const result = regCssUnits.exec(`${props.modelValue}`)
						return result?.groups?.units
					} else {
						return ''
					}
				},
				set(val) {
					console.log(props.modelValue, numberValue.value, val)
					context.emit(
						'update:modelValue',
						`${numberValue.value}${val}`
					)
				},
			})
			const numberValue = computed({
				get() {
					return props.modelValue
						.toString()
						.replace(/(px|rem|%)$/, '')
				},
				set(val: string) {
					context.emit('update:modelValue', `${val}${units.value}`)
				},
			})
			return {
				units,
				numberValue,
			}
		},
	})
</script>
<style lang="scss" scoped>
	:deep(.el-input-group__append) {
		width: 80px;
	}
</style>
