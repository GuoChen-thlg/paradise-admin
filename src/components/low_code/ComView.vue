<!--
 * @Author: 天火流光
 * @Date: 2022-02-02 18:40:10
 * @LastEditTime: 2022-03-07 22:06:02
 * @LastEditors: 天火流光
 * @Description: 页面搭建预览
 * @FilePath: \paradise-admin\src\components\low_code\ComView.vue
 * 
-->
<template>
	<div class="com-view">
		<div
			class="simulator"
			ref="simulatorRef"
			:class="{ 'show-device': isShowDevice }"
		>
			<div class="simulator-view page-view">
				<div class="page-scroll">
					<div class="page-body" @click.self="handleClick">
						<!-- "Start", "Add", "Remove", "Update", "End" -->
						<!-- "Choose", "Unchoose", "Sort", "Filter", "Clone" -->
						<draggable
							:list="components"
							item-key="id"
							group="page"
							@move="handleDragMove"
							@add="handleDragAdd"
							@update="handleDragUpdate"
							@end="hadnleDragEnd"
						>
							<template #item="{element,index}">
								<com-item
									:componentData="element"
									:editState="true"
									:index="index.toString()"
								></com-item>
							</template>
						</draggable>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
	import { defineComponent, toRefs, ref, computed, unref } from 'vue'
	import { useStore } from 'vuex'
	import ComItem from '@/components/public/ComItem.vue'
	import draggable from 'vuedraggable'
	import { key } from '@/store'
	import { useResize } from '@/hooks'
	import { Base } from '@/modules/base/Base'
	import { template_mutations } from '@/store/modules/template'
	import useHookEvent from '@/hooks/hookEvent'
	export default defineComponent({
		name: 'ComView',
		components: {
			ComItem,
			draggable,
		},
		setup() {
			const store = useStore(key)
			const { page } = toRefs(store.state.template)
			const hookEvent = useHookEvent()
			const scale = ref(1)
			const isShowDevice = ref(false)
			useResize(() => {
				// 模拟器随窗口变化而变化
				scale.value =
					(window.innerHeight - 90) / (isShowDevice.value ? 875 : 664)
			})
			function handleDragUpdate(evt: any) {
				console.log('update', evt)
			}
			function handleDragAdd(evt: any) {
				//
				console.log('add', evt)
			}
			function handleDragMove(evt: any) {
				hookEvent.emit('deag-move', evt)
				console.log('move ...')
			}
			function hadnleDragEnd(evt: any) {
				hookEvent.emit('deag-move', evt)
				console.log('hadnleEnd')
			}
			function handleClick() {
				// 选中页面
				console.log('click me')
			}

			const components = computed<Base[]>({
				get() {
					return page.value.blocks
				},
				set(val) {
					store.commit(template_mutations.SETBLOCK, unref(val))
				},
			})

			return {
				page,
				scale,
				components,
				isShowDevice,
				handleClick,
				handleDragMove,
				handleDragUpdate,
				hadnleDragEnd,
				handleDragAdd,
			}
		},
	})
</script>
<style lang="scss" scoped>
	.com-view {
		width: 100%;
		height: 100%;
		padding-top: 20px;
		.simulator {
			position: relative;
			width: 430px;
			height: 664px;
			margin: 0 auto;
			transform-origin: 50% 0;
			// 根据js动态计算出缩放比
			// transform: scale(v-bind(scale), v-bind(scale));
			zoom: v-bind(scale);
			.simulator-view {
				position: relative;
				width: 375px;
				height: 664px;
				box-sizing: content-box;
				border: 1px solid silver;
				background-color: #fff;
			}
			&.show-device {
				height: 875px;
				background: url('~@/assets/image/low_code/com_view/ios.png') top
					center / 100% auto no-repeat;
				border-radius: 68px;
				.simulator-view {
					// position: absolute;
					// left: 28px;
					// top: 105px;
					transform: translate(28px, 105px);
					border: none;
				}
			}
		}
		.page-view {
			cursor: pointer;
			& > *,
			[class^='page-'] {
				width: 100%;
				height: 100%;
			}
			.page-scroll {
				overflow: hidden auto;
				&::-webkit-scrollbar {
					display: none;
				}
				.page-body {
					& > *:not(.com-item) {
						height: 100%;
					}
				}
			}
			// transform: translateY(80px);
			// .com-item {
			// }
		}
	}
</style>
