<!--
 * @Author: 天火流光
 * @Date: 2022-01-09 18:50:28
 * @LastEditTime: 2022-02-20 15:31:05
 * @LastEditors: 天火流光
 * @Description: 测试
 * @FilePath: \paradise-admin\src\components\modules\base\TextArea.vue
 * 
-->
<template>
	<div class="text-area">
		<!-- <p>{{ num }}</p>
    <button @click="num++">num++</button> -->
	</div>
</template>
<script lang="ts">
	import { defineComponent, onMounted } from 'vue'
	export default defineComponent({
		name: 'TextArea',
		inheritAttrs: false,
		props: {
			props: {
				type: Object(),
			},
		},
		emits: [],
		setup(props) {
			return {}
		},
	})
</script>
