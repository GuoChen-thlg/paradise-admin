<!--
 * @Author: 天火流光
 * @Date: 2022-02-03 16:38:21
 * @LastEditTime: 2022-03-06 19:50:39
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
			<storage-box :spread="true" label="布局">
				<el-form-item
					label="布局模式"
					props="display"
					v-show="handleIsShow(display)"
				>
					<el-select
						v-model="display"
						placeholder="Select"
						size="large"
					>
						<el-option
							v-for="option in DISPLAY_OPTIONS"
							:key="option.value"
							:label="option.label"
							:value="option.value"
						>
						</el-option>
					</el-select>
				</el-form-item>

				<margin-model
					:margin-top="marginTop"
					@update:margin-top="val => (marginTop = val)"
					:margin-right="marginRight"
					@update:margin-right="val => (marginRight = val)"
					:margin-bottom="marginBottom"
					@update:margin-bottom="val => (marginBottom = val)"
					:margin-left="marginLeft"
					@update:margin-left="val => (marginLeft = val)"
					:padding-top="paddingTop"
					@update:padding-top="val => (paddingTop = val)"
					:padding-right="paddingRight"
					@update:padding-right="val => (paddingRight = val)"
					:padding-bottom="paddingBottom"
					@update:padding-bottom="val => (paddingBottom = val)"
					:padding-left="paddingLeft"
					@update:padding-left="val => (paddingLeft = val)"
				></margin-model>
				<el-form-item
					v-show="handleIsShow(width)"
					prop="width"
					label="宽"
					:rules="validator.width"
				>
					<t-input-css-val v-model="width"></t-input-css-val>
				</el-form-item>
				<el-form-item
					label="高"
					props="height"
					:rules="validator.height"
					v-show="handleIsShow(height)"
				>
					<t-input-css-val v-model="height"></t-input-css-val>
				</el-form-item>
			</storage-box>
			<storage-box :spread="true" label="文字">
				<el-form-item></el-form-item>
			</storage-box>
			<storage-box :spread="true" label="位置">
				<el-form-item label="定位类型"> </el-form-item>
				<el-form-item label="层叠顺序"> </el-form-item>
				<el-form-item label="浮动"> </el-form-item>
				<el-form-item label="清除浮动"> </el-form-item>
			</storage-box>
			<storage-box :spread="true" label="边框">
				<el-form-item label="圆角"> </el-form-item>
				<el-form-item label="边框"> </el-form-item>
			</storage-box>
			<storage-box :spread="true" label="背景">
				<el-form-item label="背景类型"> </el-form-item>
			</storage-box>
		</el-form>
	</div>
</template>
<script lang="ts">
	import Base from '@/modules/base/Base'
	import { key } from '@/store'
	import { computed, defineComponent, unref } from 'vue'
	import { useStore } from 'vuex'
	import { jsonClone, jsonSet } from '@/utils/util'
	import { template_mutations } from '@/store/modules/template'
	import BaseContainer from '@/modules/base/BaseContainer'
	import TInputCssVal from '@/components/low_code/form/TInputCssVal.vue'
	import StorageBox from '@/components/public/StorageBox.vue'
	import MarginModel from '@/components/low_code/setting/MarginModel.vue'
	import { regCssUnits, regCssVal, regMargin } from '@/utils/regexp'
	import useHookEvent from '@/hooks/hookEvent'

	const DISPLAY_OPTIONS = [
		{ label: '弹性布局', value: 'flex' },
		{ label: '块级布局', value: 'block' },
		{ label: '内联块布局', value: 'inline-block' },
		{ label: '隐藏', value: 'none' },
	]

	export default defineComponent({
		name: 'LayoutSetting',
		components: { TInputCssVal, StorageBox, MarginModel },
		setup() {
			const store = useStore(key)
			const pathStr = computed<string>(
				() => store.state.template.active.path
			)
			const indexArr = computed(() => pathStr.value.split('-'))

			const hookEvent = useHookEvent()

			// 当前组件的样式信息
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

			// 通过计算属性获得组件的样式信息
			const [
				display,
				width,
				height,
				opacity,
				position,
				top,
				right,
				bottom,
				left,
				marginTop,
				marginRight,
				marginBottom,
				marginLeft,
				paddingTop,
				paddingRight,
				paddingBottom,
				paddingLeft,
			] = [
				'display',
				'width',
				'height',
				'opacity',
				'position',
				'top',
				'right',
				'bottom',
				'left',
				'margin-top',
				'margin-right',
				'margin-bottom',
				'margin-left',
				'padding-top',
				'padding-right',
				'padding-bottom',
				'padding-left',
			].map(key => {
				return computed<string>({
					get() {
						if (regMargin.test(key)) {
							return (
								unref(componentStyle)[key]?.replace(
									regCssUnits,
									''
								) || ''
							)
						}
						return componentStyle.value[key]
					},
					set(val) {
						if (regMargin.test(key) && /^\d+$/.test(val)) {
							val = val + 'px'
						}
						console.log(val)

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
					validator: (rule: any, value: string, callback: any) => {
						if (!regCssVal.test(value.trim())) {
							console.log(rule)
							width.value = 'auto'
						}
					},
				},
				height: {
					trigger: 'blur',
					validator: (rule: any, value: string, callback: any) => {
						if (!regCssVal.test(value.trim())) {
							height.value = 'auto'
						}
					},
				},
				// opacity,
				// position,
				// top,
				// right,
				// bottom,
				// left,
				// marginTop,
				// marginRight,
				// marginBottom,
				// marginLeft,
				// paddingTop,
				// paddingRight,
				// paddingBottom,
				// paddingLeft,
			}
			return {
				DISPLAY_OPTIONS,
				componentStyle,
				handleIsShow,
				validator,
				display,
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
				paddingTop,
				paddingRight,
				paddingBottom,
				paddingLeft,
			}
		},
	})
</script>
<style lang="scss" scoped>
	:deep(.layout-box-container) {
		margin-bottom: 22px;
	}
</style>
