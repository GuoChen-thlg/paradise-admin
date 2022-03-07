<!--
 * @Author: 天火流光
 * @Date: 2022-02-26 00:43:37
 * @LastEditTime: 2022-02-26 01:04:23
 * @LastEditors: 天火流光
 * @Description: 
 * @FilePath: \paradise-admin\src\components\modules\base\BaseContainer.vue
 * 
-->
<template>
	<div class="base-container-item">
        
    </div>
</template>
<script lang="ts">
	import { defineComponent, onMounted } from 'vue'
	import { useStore } from 'vuex'

	export default defineComponent({
		name: 'BaseContainer',
		inheritAttrs: false,
		props: {
			props: {
				type: Object(),
			},
		},
		emits: [],
		setup(props) {
			//
			useStore
			onMounted(() => {
				// console.log('base', props)
			})
		},
	})
</script>
