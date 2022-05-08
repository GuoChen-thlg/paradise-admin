<!--
 * @Author: 天火流光
 * @Date: 2022-02-20 15:21:19
 * @LastEditTime: 2022-03-20 19:58:24
 * @LastEditors: 天火流光
 * @Description: 
 * @FilePath: \paradise-admin\src\components\modules\base\BaseText.vue
 * 
-->
<template>
	<div class="base-text">
		<p class="inner-text"></p>
	</div>
</template>
<script lang="ts">
	import { computed, defineComponent } from 'vue'

	export default defineComponent({
		name: 'BaseText',
		inheritAttrs: false,
		props: {
			text: {
				type: String,
				default: '',
			},
			fontSize: {
				type: String,
                
			},
		},
		setup(props) {
			return {}
		},
	})
</script>
<style lang="scss" scoped>
	.base-text {
		width: 100%;
		height: 100%;
		.inner-text {
			width: 100%;
			height: 100%;
		}
	}
</style>
