<template>
	<el-main class="home">
		<object
			data="about:blank"
			class="filling-object-el"
			ref="filling"
			type="text/html"
		></object>
		<el-row type="flex" justify="space-between">
			<el-col :xs="23" :sm="23" :md="6" :lg="6" :xl="6">
				<el-row type="flex" class="row-flex" justify="space-between">
					<el-col class="chart-item" :xl="23">
						<v-chart
							class="chart"
							:theme="theme"
							:ref="(el:any) => chart(el)"
							:option="option1"
						/>
					</el-col>
					<el-col class="chart-item" :xl="23">
						<v-chart
							class="chart"
							:theme="theme"
							:ref="(el:any) => chart(el)"
							:option="option2"
						/>
					</el-col>
					<el-col class="chart-item" :xl="23">
						<v-chart
							class="chart"
							:theme="theme"
							:ref="(el:any) => chart(el)"
							:option="option3"
						/>
					</el-col>
				</el-row>
			</el-col>
			<el-col :xs="23" :sm="23" :md="11" :lg="11" :xl="11">
				<el-row type="flex" class="row-flex" justify="space-between">
					<el-col class="chart-item">
						<v-chart
							class="chart"
							:ref="(el:any) => chart(el)"
							:option="option4"
						/>
					</el-col>
					<el-col class="chart-item adaptability">
						<v-chart
							class="chart"
							:theme="theme"
							:ref="(el:any) => chart(el)"
							:option="option6"
						/>
					</el-col>
				</el-row>
			</el-col>

			<el-col :xs="23" :sm="23" :md="6" :lg="6" :xl="6">
				<el-row type="flex" class="row-flex" justify="space-between">
					<el-col class="chart-item" :xl="23">
						<v-chart
							class="chart"
							:ref="(el:any) => chart(el)"
							:option="option5"
						/>
					</el-col>
					<el-col class="chart-item" :xl="23">
						<v-chart
							class="chart"
							:theme="theme"
							:ref="(el:any) => chart(el)"
							:option="option3"
						/>
					</el-col>
					<el-col class="chart-item" :xl="23">
						<v-chart
							class="chart"
							:theme="theme"
							:ref="(el:any) => chart(el)"
							:option="option3"
						/>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
	</el-main>
</template>

<script lang="ts">
	// 0755 86013799
	// @ is an alias to /src
	import { ECharts } from 'echarts/core'
	import { vChart } from '@/plugins/echarts'
	import { defineComponent, onMounted, onUnmounted, reactive, ref } from 'vue'
	import { openIntervalF } from '@/utils/util'
	export default defineComponent({
		name: 'Home',
		components: { vChart },
		setup: () => {
			/* 柱状图  */
			const option1 = reactive({
				title: {
					text: '三界人口实时增量统计',
					textStyle: {},
				},
				grid: {
					left: 60,
					bottom: 40,
				},
				yAxis: {
					type: 'value',
					splitLine: {
						show: false,
					},
					axisLine: {
						show: true,
						lineStyle: {
							width: 2,
						},
					},
				},
				xAxis: {
					type: 'category',
					axisLine: {
						lineStyle: {
							width: 2,
						},
					},
					data: (function() {
						let now = new Date()
						let res = []
						let len = 5
						while (len--) {
							res.unshift(
								now.toLocaleTimeString().replace(/^\D*/, '')
							)
							now = new Date(now.getTime() - 2000)
						}
						return res
					})(),
				},
				series: [
					{
						data: (function() {
							return Array(5)
								.fill(0)
								.map(() => Math.random() * Math.random() * 1e3)
						})(),
						type: 'bar',
					},
				],
			})
			/* 更新数据 */
			{
				setInterval(() => {
					option1.xAxis.data.shift()
					option1.xAxis.data.push(
						new Date().toLocaleTimeString().replace(/^\D*/, '')
					)
					option1.series[0].data.shift()
					option1.series[0].data.push(
						Math.random() * Math.random() * 1e3
					)
				}, 1e3)
			}

			/* 柱状图 */
			const option2 = reactive({
				title: {
					text: '人口总量',
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow',
					},
				},
				legend: {
					data: ['2011年', '2012年'],
				},
				grid: {
					left: '3%',
					right: '10%',
					bottom: '3%',
					containLabel: true,
				},
				xAxis: {
					type: 'value',
					boundaryGap: [0, 0.01],
				},
				yAxis: {
					type: 'category',
					name: '人口(亿)',
					data: ['天', '地', '人'],
				},
				series: [
					{
						name: '2011年',
						type: 'bar',
						data: [18203, 23489, 29034],
					},
					{
						name: '2012年',
						type: 'bar',
						data: [19325, 23438, 31000],
					},
				],
			})

			/*  */

			let count = 11

			const option3 = reactive({
				grid: {
					show: true,
					left: '10%',
					top: '10%',
					right: '10%',
					bottom: '10%',
				},

				xAxis: [
					{
						type: 'category',
						boundaryGap: true,
						data: (function() {
							let now = new Date()
							let res = []
							let len = 10
							while (len--) {
								res.unshift(
									now.toLocaleTimeString().replace(/^\D*/, '')
								)
								now = new Date(now.getTime() - 2000)
							}
							return res
						})(),
					},
					{
						type: 'category',
						boundaryGap: true,
						data: (function() {
							let res = []
							let len = 10
							while (len--) {
								res.push(10 - len - 1)
							}
							return res
						})(),
					},
				],
				yAxis: [
					{
						type: 'value',
						scale: true,
						max: 30,
						min: 0,
						boundaryGap: [0.2, 0.2],
					},
					{
						type: 'value',
						scale: true,
						max: 1200,
						min: 0,
						boundaryGap: [0.2, 0.2],
					},
				],
				dataZoom: {
					show: false,
					start: 0,
					end: 100,
				},
				series: [
					{
						name: '预购队列',
						type: 'bar',
						xAxisIndex: 1,
						yAxisIndex: 1,
						data: (function() {
							let res = []
							let len = 10
							while (len--) {
								res.push(Math.round(Math.random() * 1000))
							}
							return res
						})(),
					},
					{
						name: '最新成交价',
						type: 'line',
						data: (function() {
							let res = []
							let len = 0
							while (len < 10) {
								res.push(
									parseFloat(
										(Math.random() * 10 + 5).toFixed(1)
									)
								)
								len++
							}
							return res
						})(),
					},
				],
			})
			setInterval(() => {
				let axisData = new Date()
					.toLocaleTimeString()
					.replace(/^\D*/, '')
				let data0 = option3.series[0].data
				let data1 = option3.series[1].data
				data0.shift()
				data0.push(Math.round(Math.random() * 1000))
				data1.shift()
				data1.push(parseFloat((Math.random() * 10 + 5).toFixed(1)))
				;(option3.xAxis[0].data as string[]).shift()
				;(option3.xAxis[0].data as string[]).push(axisData)
				;(option3.xAxis[1].data as number[]).shift()
				;(option3.xAxis[1].data as number[]).push(count++)
			}, 1e3)

			const option4 = reactive({
				backgroundColor: '#000',
				globe: {
					baseTexture:
						'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data-gl/asset/world.topo.bathy.200401.jpg',
					heightTexture:
						'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data-gl/asset/world.topo.bathy.200401.jpg',
					displacementScale: 0.04,
					shading: 'realistic',
					environment:
						'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data-gl/asset/starfield.jpg',
					realisticMaterial: {
						roughness: 0.9,
					},
					postEffect: {
						enable: true,
					},
					light: {
						main: {
							intensity: 4,
							shadow: true,
						},
						ambientCubemap: {
							texture:
								'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data-gl/asset/pisa.hdr',
							diffuseIntensity: 0.2,
						},
					},
				},
			})

			const option5 = reactive({
				grid: {
					right: 80,
					left: 80,
				},
				series: [
					{
						name: '访问来源',
						type: 'pie',
						radius: '55%',
						data: [
							{ value: 235, name: '视频广告' },
							{ value: 274, name: '联盟广告' },
							{ value: 310, name: '邮件营销' },
							{ value: 335, name: '直接访问' },
							{ value: 400, name: '搜索引擎' },
						],
					},
				],
			})
			/* 实力排行榜 */
			const option6_data = Array(9)
				.fill(0)
				.map((_, i) => {
					return {
						name: [
							'包奇文',
							'湛承泽',
							'喻敏才',
							'蔚乐生',
							'甘冠宇',
							'任瑾瑜',
							'吴高峯',
							'房俊才',
							'邬鸿晖',
							'薛鑫鹏',
							'蔡阳州',
							'广聪健',
							'蔚雨星',
							'梅乐章',
							'毛飞翮',
						][i],
						talent: parseFloat(openIntervalF(5, 100).toFixed(2)), //天赋 9
						intelligence: parseFloat(
							openIntervalF(50, 180).toFixed(2)
						), //智力 7
						bloodline: parseFloat(
							openIntervalF(10, 100).toFixed(2)
						), //血统 5
						defense: parseFloat(openIntervalF(50, 500).toFixed(2)), //防御 3
						demon: parseFloat(openIntervalF(50, 6000).toFixed(2)), //魔抗 4
						magic: parseFloat(openIntervalF(50, 8000).toFixed(2)), //法强 6
						attack: parseFloat(openIntervalF(600, 2000).toFixed(2)), //攻击力 4
						sum: 0, // 综合实力
					}
				})
			const rank = option6_data
				.map(r => {
					r.sum =
						r.talent * 9 +
						r.intelligence * 7 +
						r.bloodline * 5 +
						r.defense * 3 +
						r.demon * 4 +
						r.magic * 6 +
						r.attack * 4
					return r
				})
				.sort((a, b) => a.sum - b.sum)
			const option6 = reactive({
				title: {
					text: '实力排行',
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow',
					},
				},
				legend: {
					left: 150,
					data: [
						'综合实力',
						'法强',
						'攻击力',
						'法抗',
						'防御',
						'智力',
						'血统',
						'天赋',
					],
				},
				grid: {
					left: '3%',
					right: '10%',
					bottom: '3%',
					containLabel: true,
				},
				xAxis: {
					type: 'value',
					boundaryGap: [0, 0.01],
				},
				yAxis: {
					type: 'category',
					data: rank.map(r => r.name),
				},
				series: [
					{
						name: '综合实力',
						type: 'bar',
						data: rank.map(r => r.sum),
					},
					{
						name: '法强',
						type: 'bar',
						data: rank.map(r => r.magic),
					},
					{
						name: '攻击力',
						type: 'bar',
						data: rank.map(r => r.attack),
					},
					{
						name: '法抗',
						type: 'bar',
						data: rank.map(r => r.demon),
					},
					{
						name: '防御',
						type: 'bar',
						data: rank.map(r => r.defense),
					},
					{
						name: '智力',
						type: 'bar',
						data: rank.map(r => r.intelligence),
					},
					{
						name: '血统',
						type: 'bar',
						data: rank.map(r => r.bloodline),
					},
					{
						name: '天赋',
						type: 'bar',
						data: rank.map(r => r.talent),
					},
				],
			})
			/*  */
			const option7 = reactive({})

			/*  */
			const option8 = reactive({})

			/* ECharts 自适应容器大小变化 */
			const charts = reactive<ECharts[]>([])
			const chart = (el: ECharts) => {
				if (el) {
					charts.push(el)
				}
			}
			const filling = ref<HTMLObjectElement | null>(null)
			const resizeCd = () => {
				charts.forEach(el => {
					el && el.resize()
				})
			}
			onMounted(() => {
				filling.value?.contentWindow?.addEventListener(
					'resize',
					resizeCd
				)
				console.log(charts)
			})
			onUnmounted(() => {
				filling.value?.contentWindow?.removeEventListener(
					'resize',
					resizeCd
				)
			})
			return {
				theme: 'customize1',
				option1,
				option2,
				option3,
				option4,
				option5,
				option6,
				option7,
				option8,
				filling,
				chart,
			}
		},
	})
</script>
<style lang="scss" scoped>
	.home {
		position: relative;
		background-color: #031327;
		.row-flex {
			align-items: flex-start;
			justify-content: center;
		}
		.filling-object-el {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -9999;
		}
		.chart-item {
			--color: #032438;
			position: relative;
			background: linear-gradient(to top, var(--color), var(--color)) left
					top no-repeat,
				linear-gradient(to top, var(--color), var(--color)) top left
					no-repeat,
				linear-gradient(to top, var(--color), var(--color)) right top
					no-repeat,
				linear-gradient(to top, var(--color), var(--color)) top right
					no-repeat,
				linear-gradient(to bottom, var(--color), var(--color)) left
					bottom no-repeat,
				linear-gradient(to bottom, var(--color), var(--color)) bottom
					left no-repeat,
				linear-gradient(to bottom, var(--color), var(--color)) right
					bottom no-repeat,
				linear-gradient(to bottom, var(--color), var(--color)) bottom
					right no-repeat;
			background-size: 0.05rem 0.3rem, 0.3rem 0.05rem;
			box-shadow: 0 0 0.05rem var(--color);
			// background-color: rgb(220, 236, 231);
			border: 1px solid var(--color);
			margin-bottom: 5%;
			&::after {
				content: '';
				display: block;
				width: 100%;
				padding-bottom: 100%;
			}
			&.adaptability {
				&::after {
					padding-bottom: 64%;
					// @media (min-width: 1920px) {
					// }
					// @media (max-width: 1919px) and (min-width: 1200px) {
					// }

					// @media (max-width: 1199px) and (min-width: 990px) {
					// }

					// @media (max-width: 991px) and (min-width: 768px) {
					// }

					// @media (max-width: 767px) {
					// }
				}
			}
		}
	}
</style>
