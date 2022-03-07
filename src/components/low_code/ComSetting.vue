<!--
 * @Author: 天火流光
 * @Date: 2022-02-02 21:21:56
 * @LastEditTime: 2022-03-03 22:30:49
 * @LastEditors: 天火流光
 * @Description: 配置组件数据
 * @FilePath: \paradise-admin\src\components\low_code\ComSetting.vue
 * 
-->
<template>
	<div class="com-setting" v-if="active.path !== ''">
		<el-tabs
			v-model="activeTabName"
			type="border-card"
			class="setting-tabs"
			:stretch="true"
		>
			<el-tab-pane name="LAYER" label="布局">
				<layout-setting></layout-setting>
			</el-tab-pane>
			<el-tab-pane name="SETTING" label="数据">
				<data-setting></data-setting>
			</el-tab-pane>
			<el-tab-pane name="ANIMATION" label="动画">
				<animation-setting></animation-setting>
			</el-tab-pane>
			<el-tab-pane name="EVENT" label="事件">
				<event-setting></event-setting>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script lang="ts">
	import { defineComponent, ref, toRefs } from 'vue'
	import LayoutSetting from '@/components/low_code/setting/LayoutSetting.vue'
	import DataSetting from '@/components/low_code/setting/DataSetting.vue'
	import AnimationSetting from '@/components/low_code/setting/Animationsetting.vue'
	import EventSetting from '@/components/low_code/setting/EventSetting.vue'
	import { key } from '@/store'
	import { useStore } from 'vuex'
	export default defineComponent({
		name: 'ComSetting',
		components: {
			LayoutSetting,
			DataSetting,
			AnimationSetting,
			EventSetting,
		},
		setup() {
			const store = useStore(key)
			const { active } = toRefs(store.state.template)

			const activeTabName = ref('LAYER')

			return { activeTabName, active }
		},
	})
</script>
<style lang="scss" scoped>
	.com-setting {
		height: 100%;
		.setting-tabs {
			height: 100%;
			:deep(.el-tabs__item) {
				user-select: none;
			}
			:deep(.el-tabs__content) {
				height: calc(100% - 38px);
				overflow-y: scroll;
			}
		}
	}
	// :deep(.el-form-item) {
	// 	border: 1px solid #cfcfcf;
	// 	border-radius: 4px;
	// }
</style>
