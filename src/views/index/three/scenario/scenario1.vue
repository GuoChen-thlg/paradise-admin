<script lang="ts" setup>
	import {
		BoxGeometry,
		BufferGeometry,
		Line,
		LineBasicMaterial,
		Mesh,
		MeshBasicMaterial,
		PerspectiveCamera,
		Scene,
		Vector3,
		WebGLRenderer,
	} from 'three'
	import { onMounted, ref } from 'vue'
	const rootEl = ref<HTMLDivElement>()
	// 场景
	const scene = new Scene()
	// 相机
	const camera = new PerspectiveCamera(
		75, // 视野角度
		window.innerWidth / window.innerHeight, // 长宽比
		0.1, // 近截面
		1e3 // 远截面
	)
	// 渲染器
	const renderer = new WebGLRenderer()
	renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)

	// 立方体
	const geometry = new BoxGeometry(1, 1, 1)

	// 材质 线
	const materialLine = new LineBasicMaterial({ color: 0xffff00 })
	// 几何体
	const geometryLine = new BufferGeometry().setFromPoints([
		new Vector3(-10, 0, 0),
		new Vector3(0, 10, 0),
		new Vector3(10, 0, 0),
	])
	const line = new Line(geometryLine, materialLine)
	// 材质
	const material = new MeshBasicMaterial({ color: 0x00ff00 })
	// 网格
	const cube = new Mesh(geometry, material)
	scene.add(cube)
	scene.add(line)
	// 相机移动 远离远端 0,0,0
	camera.position.z = 5
	// 挂载后渲染
	onMounted(() => {
		rootEl.value?.appendChild(renderer.domElement)
		const animate = () => {
			requestAnimationFrame(animate)
			cube.rotation.x += 0.01
			cube.rotation.y += 0.01
			renderer.render(scene, camera)
		}
		animate()
	})
</script>

<template>
	<div ref="rootEl">
		<h1>
			demo1
		</h1>
	</div>
</template>
