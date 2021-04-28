<template>
  <el-main class="home">
    <object
      data="about:blank"
      class="filling-object-el"
      ref="filling"
      type="text/html"
    ></object>
    <el-row> </el-row>
    <!-- <div>
          <v-chart
          class="chart"
          :option="option"
          autoresize
        />
        </div> -->

    <el-row :gutter="20">
      <el-col :span="12" class="chart-item">
        <v-chart class="chart" :ref="chart" :option="optionLine" />
      </el-col>
      <el-col :span="12" class="chart-item">
        <v-chart class="chart" :ref="chart" :option="option" />
      </el-col>
      <el-col :span="24" class="chart-item">
        <v-chart class="chart" :ref="chart" :option="option1" />
      </el-col>
      <el-col :span="8" class="chart-item">
        <v-chart class="chart" :ref="chart" :option="optionPie" />
      </el-col>
      <el-col :span="8" class="chart-item">
        <v-chart class="chart" :ref="chart" :option="option" />
      </el-col>
      <el-col :span="8" class="chart-item">
        <v-chart class="chart" :ref="chart" :option="option" />
      </el-col>
    </el-row>
    <p>123</p>
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
    const optionLine = reactive({
      grid: {
        left: 40,
        top: 20,
        right: 20,
        bottom: 30,
      },
      xAxis: {
        type: 'category',
        nameLocation: 'start',
        nameTextStyle: {
          color: '#fff',
          fontSize: 35,
        },
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          type: 'line',
          data: [150, 230, 224, 218, 135, 147, 260],
        },
      ],
    })

    const optionPie = reactive({
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
    const app = reactive({
      count: 11,
    })
    const option = reactive({
      grid: {
        show: true,
        left: '10%',
        top: '10%',
        right: '10%',
        bottom: '10%',
      },
      // tooltip: {
      //   trigger: 'axis',
      //   axisPointer: {
      //     type: 'cross',
      //     label: {
      //       backgroundColor: '#283b56'
      //     }
      //   }
      // },

      // toolbox: {
      //   show: true,
      //   feature: {
      //     dataView: { readOnly: false },
      //     restore: {},
      //     saveAsImage: {}
      //   }
      // },

      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: (function () {
            var now: any = new Date()
            var res = []
            var len = 10
            while (len--) {
              res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''))
              now = new Date(now - 2000)
            }
            return res
          })(),
        },
        {
          type: 'category',
          boundaryGap: true,
          data: (function () {
            var res = []
            var len = 10
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
            var res = []
            var len = 10
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
            var res = []
            var len = 0
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
      var axisData = new Date().toLocaleTimeString().replace(/^\D*/, '')

      var data0 = option.series[0].data
      var data1 = option.series[1].data
      data0.shift()
      data0.push(Math.round(Math.random() * 1000))
      data1.shift()
      data1.push(((Math.random() * 10 + 5).toFixed(1) as any) - 0)

      option.xAxis[0].data.shift()
      option.xAxis[0].data.push(axisData)
      option.xAxis[1].data.shift()
      option.xAxis[1].data.push(app.count++)
    }, 1e3)

    registerMap(
      'HK',
      {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [-327.568359375, 29.76437737516313],
                  [-325.546875, 27.605670826465445],
                  [-316.23046875, 12.46876014482322],
                  [-309.55078125, 14.519780046326085],
                  [-304.365234375, 16.88865978738161],
                  [-302.16796875, 19.228176737766262],
                  [-300.234375, 22.268764039073968],
                  [-303.662109375, 25.3241665257384],
                  [-311.923828125, 30.06909396443887],
                  [-317.98828125, 41.50857729743935],
                  [-329.4140625, 41.178653972331674],
                  [-333.80859375, 39.90973623453719],
                  [-329.0625, 36.66841891894786],
                  [-325.634765625, 36.527294814546245],
                  [-324.31640625, 36.66841891894786],
                  [-324.140625, 34.52466147177172],
                  [-325.1953125, 31.80289258670676],
                  [-327.568359375, 29.76437737516313],
                ],
              ],
            },
          },
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [-417.12890625, 5.965753671065536],
                  [-420.8203125, 10.833305983642491],
                  [-435.9375, 6.664607562172573],
                  [-442.265625, -4.915832801313164],
                  [-429.2578125, -18.312810846425442],
                  [-434.53125, -40.17887331434695],
                  [-434.53125, -51.17934297928927],
                  [-428.90624999999994, -52.696361078274464],
                  [-424.3359375, -44.33956524809713],
                  [-418.798828125, -39.232253141714885],
                  [-415.01953125, -35.675147436084664],
                  [-409.921875, -30.145127183376115],
                  [-408.251953125, -26.35249785815401],
                  [-404.912109375, -24.287026865376422],
                  [-399.55078125, -19.228176737766248],
                  [-398.232421875, -14.434680215297268],
                  [-394.8046875, -7.710991655433217],
                  [-395.947265625, -4.653079918274038],
                  [-400.95703125, -3.074695072369682],
                  [-407.63671874999994, -0.8788717828324148],
                  [-409.921875, 1.4939713066293239],
                  [-413.173828125, 5.441022303717974],
                  [-417.12890625, 5.965753671065536],
                ],
              ],
            },
          },
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [-377.9296875, 15.961329081596647],
                  [-367.03125, 6.664607562172573],
                  [-351.9140625, 4.915832801313164],
                  [-345.9375, -8.059229627200192],
                  [-345.234375, -25.16517336866393],
                  [-338.5546875, -34.30714385628803],
                  [-324.84375, -25.16517336866393],
                  [-316.7578125, -10.833305983642491],
                  [-313.59375, 2.1088986592431382],
                  [-307.96875, 11.178401873711785],
                  [-327.65625, 27.994401411046148],
                  [-334.3359375, 31.653381399664],
                  [-352.96874999999994, 36.31512514748051],
                  [-370.8984375, 30.14512718337613],
                  [-377.9296875, 15.961329081596647],
                ],
              ],
            },
          },
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [-335.07931709289545, 70.07438012824336],
                  [-347.0324420928955, 68.45713867604051],
                  [-341.05587959289556, 54.66333908925777],
                  [-321.71994209289556, 44.20070497766346],
                  [-299.9230670928955, 23.063040383493625],
                  [-278.12619209289556, 9.950981571967395],
                  [-245.78244209289542, 12.02157655922618],
                  [-229.61056709289545, 37.56503306408686],
                  [-213.08712959289548, 58.895274506095525],
                  [-179.6886920928955, 64.23671019573705],
                  [-192.3449420928955, 70.66487512676484],
                  [-217.30587959289554, 72.12236765469444],
                  [-248.94650459289545, 72.96587515241966],
                  [-281.6418170928955, 72.44331972562074],
                  [-299.9230670928955, 70.19384761827423],
                  [-335.07931709289545, 70.07438012824336],
                ],
              ],
            },
          },
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [-165.9375, 64.77412531292873],
                  [-157.85156249999997, 58.63121664342478],
                  [-136.7578125, 57.326521225217064],
                  [-127.96875, 49.15296965617042],
                  [-120.234375, 33.7243396617476],
                  [-101.953125, 16.636191878397664],
                  [-79.1015625, 28.613459424004414],
                  [-73.125, 38.8225909761771],
                  [-62.22656249999999, 47.989921667414194],
                  [-66.09375, 59.5343180010956],
                  [-86.484375, 65.07213008560697],
                  [-111.09374999999999, 68.65655498475735],
                  [-145.546875, 70.8446726342528],
                  [-165.9375, 70.61261423801925],
                  [-168.3984375, 65.80277639340238],
                  [-165.9375, 64.77412531292873],
                ],
              ],
            },
          },
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [-83.3203125, -1.0546279422758742],
                  [-81.9140625, -5.266007882805485],
                  [-69.2578125, -17.978733095556155],
                  [-73.828125, -46.55886030311717],
                  [-67.5, -51.618016548773696],
                  [-53.4375, -41.244772343082076],
                  [-42.1875, -25.799891182088306],
                  [-35.5078125, -8.059229627200192],
                  [-42.5390625, -0.3515602939922709],
                  [-71.3671875, 10.833305983642491],
                  [-83.3203125, -1.0546279422758742],
                ],
              ],
            },
          },
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [-75.9375, 83.06877413473718],
                  [-84.72656249999999, 82.49482361179574],
                  [-97.3828125, 81.20141954209073],
                  [-110.74218749999999, 79.17133464081945],
                  [-129.37499999999997, 77.76758238272801],
                  [-124.8046875, 73.42842364106816],
                  [-92.10937499999999, 72.0739114882038],
                  [-67.85156249999997, 70.37785394109227],
                  [-20.039062499999975, 70.25945200030641],
                  [-16.874999999999975, 71.74643171904148],
                  [-12.656249999999977, 74.59010800882325],
                  [-10.1953125, 79.81230226556366],
                  [-10.898437499999975, 82.21421714106773],
                  [-27.07031249999998, 83.75391084911273],
                  [-44.6484375, 83.19489563661588],
                  [-61.17187499999999, 83.02621885344846],
                  [-75.9375, 83.06877413473718],
                ],
              ],
            },
          },
        ],
      },
      {
        bei: {
          left: -400,
          top: 130,
          width: 350,
        },
        nan: {
          left: -340,
          top: 0,
          width: 200,
        },
      }
    )
    const option1 = reactive({
      title: {
        text: '香港18区人口密度 （2011）',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}<br/>{c} (p / km2)',
      },

      series: [
        {
          name: '香港18区人口密度',
          type: 'map',
          mapType: 'HK', // 自定义扩展图表类型
          label: {
            show: true,
          },
        },
      ],
    })

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
      optionLine,
      optionPie,
      filling,
      chart,
      option,
      option1,
    }
  },
})
</script>
<style lang="scss" scoped>
.home {
  position: relative;
  .filling-object-el {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -9999;
  }
  .chart-item {
    position: relative;
    &::after {
      content: '';
      display: block;
      width: 100%;
      padding-bottom: 100%;
    }
  }
}
</style>
