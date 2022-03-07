<!--
 * @Author: 天火流光
 * @Date: 2022-02-26 01:31:22
 * @LastEditTime: 2022-03-03 22:41:32
 * @LastEditors: 天火流光
 * @Description: 收纳盒
 * @FilePath: \paradise-admin\src\components\public\StorageBox.vue
 * 
-->
<template>
	<div class="storage-box">
		<p class="title label" @click="handleSwitch">
			<svg
				:class="['arrow-left-s', { spread: isSpread }]"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="24"
				height="24"
			>
				<path fill="none" d="M0 0h24v24H0z" />
				<path
					d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"
				/>
			</svg>
			<span v-if="label">{{ label }}</span>
		</p>
		<!-- TODO 收起动画 -->
		<div
			ref="collapsibleContainer"
			:class="['inside', { empty: !isSpread }]"
			v-show="isSpread"
		>
			<slot></slot>
		</div>
	</div>
</template>
<script lang="ts">
	import { defineComponent, ref } from 'vue'

	export default defineComponent({
		name: 'StorageBox',
		props: {
			label: {
				type: String,
				default: '',
			},
			spread: {
				type: Boolean,
				default: true,
				required: true,
			},
		},
		setup(props) {
			const isSpread = ref(props.spread)
			const collapsibleContainer = ref<HTMLDivElement>()
			const handleSwitch = () => {
				isSpread.value = !isSpread.value
			}

			return {
				handleSwitch,
				isSpread,
				collapsibleContainer,
			}
		},
	})
</script>
<style lang="scss" scoped>
	.storage-box {
		.title {
			background-color: #f2f3f7;
			padding: 5px 10px;
			cursor: pointer;
			user-select: none;
			border-radius: 4px 4px 0 0;
			border-bottom: 1px solid #dcdee3;
			.arrow-left-s {
				transform: rotateZ(180deg);
				vertical-align: middle;
				transition: transform 0.3s;
				&.spread {
					transform: rotateZ(270deg);
				}
			}
		}
		.inside {
			border: 1px solid #dcdee3;
			padding: 12px 16px;
			overflow: hidden;
			&.empty,
			&:empty {
				display: none;
			}
		}
		.inside > :deep(*:last-child) {
			margin-bottom: 0;
		}
	}
</style>
