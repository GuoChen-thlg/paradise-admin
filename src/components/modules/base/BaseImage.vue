<!--
 * @Author: 天火流光
 * @Date: 2022-02-02 16:02:58
 * @LastEditTime: 2022-02-20 15:21:23
 * @LastEditors: 天火流光
 * @Description: 图片组件 基础组件
 * @FilePath: \paradise-admin\src\components\modules\base\BaseImage.vue
 * 
-->
<template>
	<div class="base-image">
		<img class="inner-image" :src="src" :alt="alt" :loading="loading_val" />
	</div>
</template>
<script lang="ts">
	import { computed, defineComponent } from 'vue'
	const Loading: Ienum = {
		eager: '0', // 立即加载
		lazy: '1', //懒加载
		'0': 'eager',
		'1': 'lazy',
	}
	const ObjectFit: Ienum = {
		none: '0',
		fill: '1',
		contain: '2',
		cover: '3',
		'scale-down': '4',
		'0': 'none',
		'1': 'fill',
		'2': 'contain',
		'3': 'cover',
		'4': 'scale-down',
	}
	export default defineComponent({
		name: 'BaseImage',
		inheritAttrs: false,
		props: {
			src: String,
			alt: String,
			loading: {
				type: String,
				default: Loading.eager,
			},
			object_fit: {
				type: String,
				default: ObjectFit.fill,
			},
		},
		setup(props) {
			const loading_val = computed(() => Loading[props.loading])
			const object_fit_val = computed(() => ObjectFit[props.object_fit])
			return {
				loading_val,
				object_fit_val,
			}
		},
	})
</script>
<style lang="scss" scoped>
	.base-image {
		width: 100%;
		height: 100%;
		font-size: 0;
		.inner-image {
			width: 100%;
			height: 100%;
			object-fit: v-bind(object_fit_val);
		}
	}
</style>
