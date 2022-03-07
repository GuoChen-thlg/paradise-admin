<!--
 * @Author: 天火流光
 * @Date: 2022-02-02 22:34:17
 * @LastEditTime: 2022-03-07 23:08:45
 * @LastEditors: 天火流光
 * @Description: 
 * @FilePath: \paradise-admin\src\components\public\ComItem.vue
 * 
-->
<template>
	<div
		class="com-item"
		:class="{ active: isActvie }"
		@click.stop="handleSelect"
		v-menus="contextMenus(componentData)"
		:style="componentData.style"
	>
		<component
			:is="componentData.componentKey"
			v-bind="componentData.props"
			:index="indexPrefix + index"
		></component>
		<drag-vertex v-if="isActvie"></drag-vertex>
	</div>
</template>
<script lang="ts">
	import { defineComponent, computed, onMounted, PropType } from 'vue'
	import { ElMessageBox } from 'element-plus'
	import { useStore } from 'vuex'
	import { key } from '@/store'
	import { template_mutations } from '@/store/modules/template'
	import { Base } from '@/modules/base/Base'
	import DragVertex from '@/components/public/DragVertex.vue'
	//
	import comBase from '@/components/modules/base/Base.vue'
	import comBaseImage from '@/components/modules/base/BaseImage.vue'
	import useHookEvent from '@/hooks/hookEvent'
	export default defineComponent({
		name: 'ComItem',
		props: {
			componentData: {
				type: Object as PropType<Base>,
				required: true,
			},
			editState: {
				type: Boolean,
				default: false,
			},
			indexPrefix: {
				type: String,
				default: '',
			},
			index: {
				type: String,
				default: '',
			},
		},
		components: {
			DragVertex,
			// 无代码组件
			Base: comBase,
			BaseImage: comBaseImage,
		},
		setup(props) {
			const store = useStore(key)
			const hookEvent = useHookEvent()
			/**
			 * @description: 处理组件编辑状态下的点击事件
			 */
			const handleSelect = () => {
				handleSetActive()
			}
			hookEvent.on('deag-move', evt => {
				if (props.componentData.id == store.state.template.active.id) {
					handleSetActive()
					console.log(
						'选中组件***',
						props.componentData.id,
						props.index,
						evt
					)
				}
			})
			onMounted(() => {
				handleSetActive()
			})
			/**
			 * @description: 右键菜单配置
			 * @param {*} e
			 * @return {*}
			 */
			const contextMenus = (e: Base) => ({
				menus: [
					{
						label: '返回(B)',
						tip: '数据信息',
						click: () => {
							//
						},
					},
					{
						label: '删除',
						click: () => {
							console.log(e)
						},
					},
				],
			})
			/**
			 * @description: 设置选中的组件
			 */
			function handleSetActive() {
				store.commit(template_mutations.SETACTIVE, {
					id: props.componentData.id,
					path: `${
						props.indexPrefix == ''
							? props.index
							: props.indexPrefix + '-' + props.index
					}`,
				})
			}
			// 当前组件是否被选中
			const isActvie = computed(
				() => props.componentData.id == store.state.template.active.id
			)

			return { isActvie, handleSelect, contextMenus, store, props }
		},
	})
</script>
<style lang="scss" scoped>
	.com-item {
		position: relative;
		user-select: none;
		&.active {
			border: 1px solid;
		}
	}
</style>
