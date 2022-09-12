<!--
 * @Author: 天火流光
 * @Date: 2022-03-09 23:31:28
 * @LastEditTime: 2022-03-13 22:54:20
 * @LastEditors: 天火流光
 * @Description: therr 场景
 * @FilePath: \paradise-admin\src\views\index\3d\3d.vue
 * 
-->
<template>
	<div class="therr-box" ref="container"></div>
</template>

<script lang="ts">
	import { defineComponent, onMounted, ref } from 'vue'
	import {
		PerspectiveCamera,
		Scene,
		WebGLRenderer,
		LineBasicMaterial,
		Vector3,
		BufferGeometry,
		Line,
		Color,
		Fog,
		HemisphereLight,
		Mesh,
		BoxBufferGeometry,
		MeshStandardMaterial,
		AmbientLight,
		GridHelper,
		AxesHelper,
	} from 'three'
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
	import Stats from 'three/examples/jsm/libs/stats.module'
	import { useHookEvent } from '@/hooks'

	export default defineComponent({
		setup() {
			// 场景
			let scene: Scene | undefined = void 0
			// 相机
			let camera: PerspectiveCamera | undefined = void 0
			// 渲染器
			let renderer: WebGLRenderer | undefined = void 0
			// 加载器
			const loader = new GLTFLoader()
			// 手柄游标
			let gamepad_index: number | undefined

			const container = ref<HTMLDivElement>()
			const hookEvent = useHookEvent()
			onMounted(() => {
				handleInit()
			})

			function animationFrame() {
				window.requestAnimationFrame(() => {
					animationFrame()
				})
			}
			function handleInit() {
				// 初始化场景
				scene = new Scene()
				// 光源
				const ambientLight = new AmbientLight('#09f', 1)
				// 轴 辅助线
				const axesHelper = new AxesHelper(500)
				// 网格 辅助线
				const gridHelper = new GridHelper(200, 100)
				// 初始化相机
				camera = new PerspectiveCamera(
					75,
					window.innerWidth / window.innerHeight,
					1,
					1000
				)
				// 监视器
				const stats = Stats()
				// stats.domElement

				// 相机的坐标
				camera.position.set(20, 20, 20)
				// 相机看向的坐标
				camera.lookAt(new Vector3(0, 0, 0))
				camera.up = new Vector3(0, 1, 0)

				renderer = new WebGLRenderer()
				container.value &&
					container.value.appendChild(renderer.domElement)
				renderer.setSize(window.innerWidth, window.innerHeight, true)

				const box = new Mesh(
					new BoxBufferGeometry(10, 10, 10),
					new MeshStandardMaterial()
				)
				scene.add(ambientLight)
				scene.add(axesHelper)
				scene.add(gridHelper)
				scene.add(box)
				renderer.setClearColor('#fff')
				// renderer.clearColor()
				renderer.render(scene, camera)
				stats.update()
				// let i = 20
				// setInterval(() => {
				// 	if (renderer && scene && camera) {
				// 		renderer.render(scene, camera)
				// 	}
				// }, 1e3 )
				// 挂载到页面
			}
			return { container }
		},
	})
</script>
