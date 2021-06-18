<template>
  <el-main class="home">
    <object
      data="about:blank"
      class="filling-object-el"
      ref="filling"
      type="text/html"
    ></object>
    <el-row>
      <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
        <el-row type="flex" class="row-flex">
          <el-col class="chart-item" :xl="23">
            <v-chart
              class="chart"
              :ref="chart"
              :theme="theme"
              :option="option1"
            />
          </el-col>
          <el-col class="chart-item" :xl="23">
            <v-chart
              class="chart"
              :ref="chart"
              :theme="theme"
              :option="option2"
            />
          </el-col>
          <el-col class="chart-item" :xl="23">
            <v-chart
              class="chart"
              :ref="chart"
              :theme="theme"
              :option="option3"
            />
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-row type="flex" class="row-flex">
          <el-col class="chart-item">
            <v-chart
              class="chart"
              :ref="chart"
              :theme="theme"
              :option="option4"
            />
          </el-col>
          <el-col class="">
            <!-- <v-chart
              class="chart"
              :ref="chart"
              :theme="theme"
              :option="option5"
            /> -->
          </el-col>
        </el-row>
      </el-col>

      <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
        <el-row type="flex" class="row-flex">
          <el-col class="chart-item" :xl="23">
            <v-chart
              class="chart"
              :ref="chart"
              :theme="theme"
              :option="option5"
            />
          </el-col>
          <el-col class="chart-item" :xl="23">
            <v-chart
              class="chart"
              :ref="chart"
              :theme="theme"
              :option="option3"
            />
          </el-col>
          <el-col class="chart-item" :xl="23">
            <v-chart
              class="chart"
              :ref="chart"
              :theme="theme"
              :option="option3"
            />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-main>
</template>

<script lang="ts">
// @ is an alias to /src

import { ECharts, registerMap } from 'echarts/core'
import { defineComponent, onMounted, onUnmounted, reactive, ref } from 'vue'

export default defineComponent({
  name: 'Home',
  //   beforeRouteEnter (to, from) {
  //     // 请求数据
  //     // console.log(to);
  //     // console.log(from);
  //   },

  setup: () => {
    /* 柱状图  */
    const option1 = reactive({
      title: {
        text: '三界人口实时增量统计',
      },
      grid: {
        left: 60,
        bottom: 40,
      },
      xAxis: {
        type: 'category',
        data: (function () {
          let now = new Date()
          let res = []
          let len = 5
          while (len--) {
            res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''))
            now = new Date(now.getTime() - 2000)
          }
          return res
        })(),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: (function () {
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
        option1.series[0].data.push(Math.random() * Math.random() * 1e3)
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
        nameRotate: 90,
        data: ['天', '地', '人', '人口(亿)'],
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
    const app = reactive({
      count: 11,
    })
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
          data: (function () {
            let now = new Date()
            let res = []
            let len = 10
            while (len--) {
              res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''))
              now = new Date(now.getTime() - 2000)
            }
            return res
          })(),
        },
        {
          type: 'category',
          boundaryGap: true,
          data: (function () {
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
          // name: '价格',
          max: 30,
          min: 0,
          boundaryGap: [0.2, 0.2],
        },
        {
          type: 'value',
          scale: true,
          // name: '预购量',
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
          data: (function () {
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
          data: (function () {
            let res = []
            let len = 0
            while (len < 10) {
              res.push(((Math.random() * 10 + 5).toFixed(1) as any) - 0)
              len++
            }
            return res
          })(),
        },
      ],
    })
    setInterval(() => {
      let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '')
      let data0 = option3.series[0].data
      let data1 = option3.series[1].data
      data0.shift()
      data0.push(Math.round(Math.random() * 1000))
      data1.shift()
      data1.push(parseFloat((Math.random() * 10 + 5).toFixed(1)))

      option3.xAxis[0].data.shift()
      option3.xAxis[0].data.push(axisData as never)
      option3.xAxis[1].data.shift()
      option3.xAxis[1].data.push(app.count++ as never)
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
    const option6 = reactive({})
    const option7 = reactive({})
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
      charts.forEach((el) => {
        el.resize()
      })
    }
    onMounted(() => {
      filling.value?.contentWindow?.addEventListener('resize', resizeCd)
      console.log(charts)
    })
    onUnmounted(() => {
      filling.value?.contentWindow?.removeEventListener('resize', resizeCd)
    })
    return {
      theme: 'dark',
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
    --color: pink;
    position: relative;
    background: linear-gradient(to top, var(--color), var(--color)) left top
        no-repeat,
      linear-gradient(to top, var(--color), var(--color)) top left no-repeat,
      linear-gradient(to top, var(--color), var(--color)) right top no-repeat,
      linear-gradient(to top, var(--color), var(--color)) top right no-repeat,
      linear-gradient(to bottom, var(--color), var(--color)) left bottom
        no-repeat,
      linear-gradient(to bottom, var(--color), var(--color)) bottom left
        no-repeat,
      linear-gradient(to bottom, var(--color), var(--color)) right bottom
        no-repeat,
      linear-gradient(to bottom, var(--color), var(--color)) bottom right
        no-repeat;
    background-size: 0.05rem 0.3rem, 0.3rem 0.05rem;
    box-shadow: 0 0 0.05rem var(--color);
    background-color: rgb(220, 236, 231);
    margin-bottom: 0.35rem;
    &::after {
      content: '';
      display: block;
      width: 100%;
      padding-bottom: 100%;
    }
  }
}
</style>
