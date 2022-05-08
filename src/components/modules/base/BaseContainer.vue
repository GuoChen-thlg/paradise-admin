<!--
 * @Author: 天火流光
 * @Date: 2022-02-26 00:43:37
 * @LastEditTime: 2022-03-24 21:44:48
 * @LastEditors: 天火流光
 * @Description: 
 * @FilePath: \paradise-admin\src\components\modules\base\BaseContainer.vue
 * 
-->
<template>
	<draggable
		tag="div"
		class="base-container"
		item-key="id"
		:list="origin.blocks"
		:group="{
			name: 'page',
			pull: origin.blocks.length < 2,
			put: true,
			revertClone: false,
		}"
	>
		<template #item="{element,index}">
			<com-item
				:componentData="element"
				:editState="true"
				:index="index.toString()"
			></com-item>
		</template>
	</draggable>
</template>
<script lang="ts">
	import { key } from '@/store'
	import { defineComponent, onMounted, PropType } from 'vue'
	import { useStore } from 'vuex'
	import ComItem from '@/components/public/ComItem.vue'
	import Base from '@/modules/base/Base'
	import BaseContainer from '@/modules/base/BaseContainer'
	export default defineComponent({
		name: 'BaseContainer',
		inheritAttrs: false,
		props: {
			origin: {
				type: Object as PropType<BaseContainer>,
				required: true,
			},
		},
		emits: [],
		components: {
			ComItem,
		},
		setup(props) {
			//
			props.origin?.blocks
			const store = useStore(key)
			onMounted(() => {
				// console.log('base', props)
			})
		},
	})
</script>
<style lang="scss" scoped>
	.base-container {
		&:empty {
			width: 100%;
			height: 1.5rem;
			position: relative;
			background-color: #f6f6f6;
			&::before {
				content: '插槽(slot)拖拽组件到此处';
				display: block;
				position: absolute;
				width: 100%;
				text-align: center;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				color: #b1b1b1;
			}
		}
	}
</style>
