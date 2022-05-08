<!--
 * @Author: 天火流光
 * @Date: 2022-02-02 12:48:56
 * @LastEditTime: 2022-03-27 17:59:59
 * @LastEditors: 天火流光
 * @Description: 组件列表
 * @FilePath: \paradise-admin\src\components\low_code\ComList.vue
 * 
-->
<template>
	<div class="com-menu">
		<ul class="type-tab">
			<!-- TODO 切换过渡动画 -->
			<li
				v-for="com in comList"
				:key="com.id"
				class="tab-item"
				:class="{ active: true }"
			>
				{{ com.type }}
			</li>
		</ul>
		<ul class="view-list classify-list">
			<!-- 组件分类 循环渲染 -->
			<li
				v-for="classify in comList"
				:key="classify.type"
				class="classify-item"
			>
				<div class="classify-title">{{ classify.name }}</div>
				<ul
					v-for="group in classify.list"
					:key="group.id"
					class="group-list"
				>
					<!-- 组件分组 -->
					<li class="group-item">
						<p class="group-title">{{ group.name }}</p>
						<!-- 组件 -->
						<draggable
							class="com-list"
							tag="ul"
							item-key="id"
							v-model="group.list"
							:group="{
								name: 'component',
								pull: 'clone',
								put: false,
								revertClone: false,
							}"
							:clone="handleDragClone"
							:fallbackOnBody="false"
							:animation="0"
							:sort="false"
						>
							<template #item="{element}">
								<li class="com-item">
									<div
										class="inner"
										draggable="true"
										@click="
											handleAddComponent(
												element.className
											)
										"
									>
										<div class>
											<img
												class="cover"
												draggable="false"
												:src="
													createImage(
														95,
														60,
														element.name
													)
												"
												:alt="element.name"
											/>
										</div>
										<p class="com-name">
											{{ element.name }}
										</p>
									</div>
								</li>
							</template>
						</draggable>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>
<script lang="ts">
	import { defineComponent, toRefs, unref } from 'vue'
	import comList from '@/modules/comList'
	import { createImage } from '@/utils/default/image'
	import { useStore } from 'vuex'
	import { key } from '@/store'
	import { template_mutations } from '@/store/modules/template'
	import { jsonClone } from '@/utils/util'
	// 组件数据
	import Base from '@/modules/base/Base'
	import BaseImage from '@/modules/base/BaseImage'
	import BaseContainer from '@/modules/base/BaseContainer'

	const componentMap: { [key: string]: () => Base | BaseContainer } = {
		Base: () => new Base(),
		BaseImage: () => new BaseImage(),
		BaseContainer: () => new BaseContainer(),
	}

	export default defineComponent({
		name: 'ComList',
		components: {},
		setup() {
			const store = useStore(key)
			const handleAddComponent = (com: string) => {
				//
				const { page } = toRefs(store.state.template)
				const comList = jsonClone(unref(page.value.blocks))
				comList.push(componentMap[com]())
				store.commit(template_mutations.SETBLOCK, comList)
			}
			function handleDragClone(evt: any) {
				console.log('clone--', evt)
				return jsonClone(componentMap[evt.className]())
			}
			return {
				comList,
				createImage,
				handleAddComponent,
				handleDragClone,
			}
		},
	})
</script>
<style lang="scss" scoped>
	.com-menu {
		display: flex;
		user-select: none;
		height: calc(100vh - 60px);
		min-height: 100%;
		.type-tab {
			$back-color: #f0f2f3;
			width: 60px;
			background-color: $back-color;
			.tab-item {
				cursor: pointer;
				width: 100%;
				height: 60px;
				line-height: 60px;
				text-align: center;
				border-top: 1px solid #cfcfcf;
				border-bottom: 1px solid #cfcfcf;
				&.active {
					color: #09f;
				}
			}
		}
		.view-list {
			width: calc(400px - 60px);
			height: 100%;
			overflow: hidden auto;
			border: 1px solid #cfcfcf;
		}
	}
	.classify-list {
		//
		&::-webkit-scrollbar {
			width: 4px;
		}
	}
	.classify-item {
		//
		.classify-title {
			font-size: 18px;
			font-weight: 600;
			height: 26px;
			line-height: 26px;
			padding: 0 12px;
		}
		.group-list {
			padding: 12px 0 0 0;
		}
	}
	.group-item {
		//
		.group-title {
			font-size: 14px;
			color: #c9c9c9;
			height: 22px;
			line-height: 22px;
			padding: 0 12px;
		}
		.com-list {
			padding: 12px 0 0 0;
		}
	}
	.com-item {
		display: inline-block;
		width: 33.33%;
		height: 120px;
		padding: 10px;
		.inner {
			cursor: pointer;
			width: 100%;
			height: 100%;
			text-align: center;
			&:hover {
				color: #09f;
			}
			.cover {
				min-width: 100%;
				min-height: 100%;
			}
		}
	}
</style>
