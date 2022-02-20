<!--
 * @Author: 天火流光
 * @Date: 2022-01-09 19:03:35
 * @LastEditTime: 2022-02-06 18:37:10
 * @LastEditors: 天火流光
 * @Description: 低代码搭建页面 编辑页
 * @FilePath: \paradise-admin\src\views\index\construct\Construct.vue
 * 
-->
<template>
	<el-main class="construct-main">
		<el-container>
			<el-header> <h1>顶部</h1> </el-header>
			<el-container class="edit-container">
				<el-aside>
					<com-list></com-list>
				</el-aside>
				<el-main class="preview-content">
					<com-view></com-view>
				</el-main>
				<el-aside>
					<com-setting></com-setting>
				</el-aside>
			</el-container>
		</el-container>
	</el-main>
</template>
<script lang="ts">
	import { defineComponent } from 'vue'
	// import Base from '@/components/modules/base/Base.vue'
	import TextArea from '@/components/modules/base/TextArea.vue'
	import ComList from '@/components/low_code/ComList.vue'
	import ComView from '@/components/low_code/ComView.vue'
	import ComSetting from '@/components/low_code/ComSetting.vue'
	export default defineComponent({
		name: 'Construct',
		components: {
			// Base,
			// eslint-disable-next-line vue/no-unused-components
			TextArea,
			ComList,
			ComView,
			ComSetting,
		},
		setup() {
			//
		},
	})
</script>
<style lang="scss" scoped>
	.construct-main {
		padding: 0;
		.edit-container {
			height: calc(100vh - 60px);
		}
		.preview-content {
			min-width: 480px;
			padding: 0;
			background-color: #f0f2f3;
		}
	}
</style>
