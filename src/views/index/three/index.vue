<script lang="ts" setup>
	import { ref, shallowRef } from 'vue'
	import scenario1 from '@/views/index/three/scenario/scenario1.vue'
	import scenario2 from '@/views/index/three/scenario/scenario2.vue'
	// 减少不必要的开销
	const component = shallowRef(scenario1)
</script>

<template>
	<el-main>
		<el-button-group>
			<el-button type="primary" text @click="component = scenario1">
				Previous Page
			</el-button>
			<el-button type="primary" text @click="component = scenario2">
				Next Page
			</el-button>
		</el-button-group>
		<component :is="component"></component>
	</el-main>
</template>
