<!--
 * @Author: 天火流光
 * @Date: 2022-02-27 01:04:00
 * @LastEditTime: 2022-02-27 16:30:10
 * @LastEditors: 天火流光
 * @Description: 边距模型 设置外边距 内边距
 * @FilePath: \paradise-admin\src\components\low_code\setting\MarginModel.vue
 * 
-->
<template>
	<div class="layout-box-container">
		<div
			v-for="item in marginList"
			:class="item.className"
			:key="item.className"
		>
			<span class="help-txt" v-if="item.help">{{ item.help }}</span>
			<span class="medium-input">
				<input
					placeholder="0"
					:maxlength="3"
					height="100%"
					autocomplete="off"
					:value="item.value"
					@input="$emit(item.emit, ($event.target as HTMLInputElement).value)"
				/>
			</span>
		</div>
	</div>
</template>
<script lang="ts">
	import { computed, defineComponent } from 'vue'

	export default defineComponent({
		props: {
			marginTop: { type: String, required: true, default: '' },
			marginRight: { type: String, required: true, default: '' },
			marginBottom: { type: String, required: true, default: '' },
			marginLeft: { type: String, required: true, default: '' },
			paddingTop: { type: String, required: true, default: '' },
			paddingRight: { type: String, required: true, default: '' },
			paddingBottom: { type: String, required: true, default: '' },
			paddingLeft: { type: String, required: true, default: '' },
		},
		emits: [
			'update:marginTop',
			'update:marginRight',
			'update:marginBottom',
			'update:marginLeft',
			'update:paddingTop',
			'update:paddingRight',
			'update:paddingBottom',
			'update:paddingLeft',
		],
		setup(props) {
			type emitType =
				| 'update:marginTop'
				| 'update:marginRight'
				| 'update:marginBottom'
				| 'update:marginLeft'
				| 'update:paddingTop'
				| 'update:paddingRight'
				| 'update:paddingBottom'
				| 'update:paddingLeft'
			interface IMargin {
				className: string
				value: string
				emit: emitType
				help?: string
			}
			document.querySelector('input')
			const marginList = computed<IMargin[]>(() => [
				{
					className: 'margin-top-div',
					value: props.marginTop,
					emit: 'update:marginTop',
				},
				{
					className: 'margin-right-div',
					value: props.marginRight,
					emit: 'update:marginRight',
				},
				{
					className: 'margin-bottom-div',
					value: props.marginBottom,
					emit: 'update:marginBottom',
					help: 'MARGIN',
				},
				{
					className: 'margin-left-div',
					value: props.marginLeft,
					emit: 'update:marginLeft',
				},
				{
					className: 'padding-top-div',
					value: props.paddingTop,
					emit: 'update:paddingTop',
				},
				{
					className: 'padding-right-div',
					value: props.paddingRight,
					emit: 'update:paddingRight',
				},
				{
					className: 'padding-bottom-div',
					value: props.paddingBottom,
					emit: 'update:paddingBottom',
					help: 'PADDING',
				},
				{
					className: 'padding-left-div',
					value: props.paddingLeft,
					emit: 'update:paddingLeft',
				},
			])
			return { marginList }
		},
	})
</script>
<style lang="scss" scoped>
	$border-color: #d6e4ff;
	$border-color-hover: #bfd4fb;
	.layout-box-container {
		position: relative;
		padding-bottom: 75%;

		.margin-top-div {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: 0;
			border-left: 20px solid transparent;
			border-right: 20px solid transparent;
			border-top: 20px solid $border-color;
			transition: all 0.3s ease;
		}
		.margin-right-div {
			position: absolute;
			top: 5px;
			bottom: 5px;
			right: 0;
			width: 0;
			border-top: 20px solid transparent;
			border-bottom: 20px solid transparent;
			border-right: 20px solid $border-color;
			transition: all 0.3s ease;
		}
		.margin-bottom-div {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 0;
			border-left: 20px solid transparent;
			border-right: 20px solid transparent;
			border-bottom: 20px solid $border-color;
			transition: all 0.3s ease;
		}
		.margin-left-div {
			position: absolute;
			top: 5px;
			bottom: 5px;
			left: 0;
			width: 0;
			border-top: 20px solid transparent;
			border-bottom: 20px solid transparent;
			border-left: 20px solid $border-color;
			transition: all 0.3s ease;
		}
		.padding-top-div {
			position: absolute;
			top: 25px;
			left: 25px;
			right: 25px;
			height: 0;
			border-left: 20px solid transparent;
			border-right: 20px solid transparent;
			border-top: 20px solid $border-color;
			transition: all 0.3s ease;
		}
		.padding-right-div {
			position: absolute;
			top: 30px;
			bottom: 30px;
			right: 25px;
			width: 0;
			border-top: 20px solid transparent;
			border-bottom: 20px solid transparent;
			border-right: 20px solid $border-color;
			transition: all 0.3s ease;
		}
		.padding-bottom-div {
			position: absolute;
			bottom: 25px;
			left: 25px;
			right: 25px;
			height: 0;
			border-left: 20px solid transparent;
			border-right: 20px solid transparent;
			border-bottom: 20px solid $border-color;
			transition: all 0.3s ease;
		}
		.padding-left-div {
			position: absolute;
			top: 30px;
			bottom: 30px;
			left: 25px;
			width: 0;
			border-top: 20px solid transparent;
			border-bottom: 20px solid transparent;
			border-left: 20px solid $border-color;
			transition: all 0.3s ease;
		}
		.medium-input {
			position: absolute;
			display: table;
			width: 100%;
			height: 20px;
			background: transparent;
			input {
				position: absolute;
				display: block;
				top: 0;
				bottom: 0;
				width: 100%;
				height: 20px;
				text-align: center;
				background: transparent;
				line-height: 20px;
				border: none;
				outline: none;
			}
		}
		.help-txt {
			display: inline-block;
			position: relative;
			font-size: 12px;
			margin-left: -10px;
			transform: scale(0.65);
		}
		[class*='top'] .medium-input,
		[class*='bottom'] .medium-input {
			left: 0;
			right: 0;
			height: 20px;
		}
		[class*='top'] .medium-input {
			top: -20px;
		}
		[class*='bottom'] .medium-input {
			bottom: -20px;
		}
		[class*='left'] .medium-input,
		[class*='right'] .medium-input {
			top: 0;
			bottom: 0;
			width: 20px;
			margin: auto;
		}
		[class*='left'] .medium-input {
			left: -20px;
		}
		[class*='right'] .medium-input {
			right: -20px;
		}

		[class*='top']:hover {
			border-top: 20px solid $border-color-hover;
		}
		[class*='right']:hover {
			border-right: 20px solid $border-color-hover;
		}
		[class*='bottom']:hover {
			border-bottom: 20px solid $border-color-hover;
		}
		[class*='left']:hover {
			border-left: 20px solid $border-color-hover;
		}
	}
</style>
