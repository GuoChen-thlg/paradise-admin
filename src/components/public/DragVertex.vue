<!--
 * @Author: 天火流光
 * @Date: 2022-03-05 23:20:24
 * @LastEditTime: 2022-03-06 01:33:08
 * @LastEditors: 天火流光
 * @Description: 拖动端点
 * @FilePath: \paradise-admin\src\components\public\DragVertex.vue
 * 
-->
<template>
	<ul class="drag-vertex-list">
		<li class="drag-vertex left-top"></li>
		<li class="drag-vertex top"></li>
		<li class="drag-vertex right-top"></li>
		<li class="drag-vertex right"></li>
		<li class="drag-vertex right-bottom"></li>
		<li class="drag-vertex bottom"></li>
		<li class="drag-vertex left-bottom"></li>
		<li class="drag-vertex left"></li>
	</ul>
</template>
<script lang="ts">
	import { defineComponent } from 'vue'

	export default defineComponent({
		setup() {
			return {}
		},
	})
</script>
<style lang="scss" scoped>
	.drag-vertex-list {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		.drag-vertex {
			position: absolute;
			width: 10px;
			height: 10px;
			background-color: transparent;
		}

		[class*='top'] {
			top: 0;
		}

		[class*='left'] {
			left: 0;
		}

		[class*='right'] {
			right: 0;
		}

		[class*='bottom'] {
			bottom: 0;
		}
		.top,
		.bottom {
			width: calc(100% - 40px);
			left: 50%;
			transform: translateX(-50%);
			cursor: ns-resize;
		}
		.left,
		.right {
			height: calc(100% - 40px);
			top: 50%;
			transform: translateY(-50%);
			cursor: ew-resize;
		}
		.left-top,
		.right-bottom {
			cursor: nwse-resize;
		}
		.right-top,
		.left-bottom {
			cursor: nesw-resize;
		}
	}
</style>
