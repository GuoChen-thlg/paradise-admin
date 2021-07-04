<template>
  <el-main>
    <canvas
      width="450"
      height="450"
      ref="canvas"
      style="display: block; margin: 0 auto"
      @click="bandleClick($event)"
    ></canvas>
    <!-- <el-button @click="init">Start</el-button> -->
  </el-main>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'DangerSpot', // 望乡台
  setup() {
    const canvas = ref<HTMLCanvasElement | null>(null)
    let me = true //true黑子， false， 白子
    let over = false
    let box: number[][] = [] //全部落子点
    let wins: boolean[][][] = [] //全部赢的方法 三维数组
    let context: null | undefined | CanvasRenderingContext2D = null
    let myWin: number[] = [] //
    let computerWin: number[] = []
    let count = 0 //总共赢的数量572种
    //走一步，画黑白子，并记录，黑子为1，白子为2
    function oneStep(i: number, j: number, me: boolean) {
      if (!context) return
      context.beginPath()
      context.arc(15 + i * 30, 15 + j * 30, 13, 0, Math.PI * 2)
      context.closePath()

      let gradient = context?.createRadialGradient(
        15 + i * 30 + 2,
        15 + j * 30 - 2,
        13,
        15 + i * 30 + 2,
        15 + j * 30 - 2,
        0
      )
      if (me) {
        //黑子
        gradient.addColorStop(0, '#0A0A0A')
        gradient.addColorStop(1, '#636766')
        box[i][j] = 1
      } else {
        //白子
        gradient.addColorStop(0, '#D1D1D1')
        gradient.addColorStop(1, '#F9F9F9')
        box[i][j] = 2
      }
      context.fillStyle = gradient
      context.fill()
    }
    function init() {
      context = canvas.value?.getContext('2d')
      if (!context) return

      for (let i = 0; i < 15; i++) {
        box[i] = []
        wins[i] = []
        for (let j = 0; j < 15; j++) {
          box[i][j] = 0
          wins[i][j] = []
        }
      }

      //横向
      for (let a = 0; a < 15; a++) {
        for (let b = 0; b < 11; b++) {
          //wins[0][0][0]
          //wins[0][1][0]
          //wins[0][2][0]
          for (let c = 0; c < 5; c++) {
            wins[a][b + c][count] = true
          }
          count++
        }
      }
      //纵向
      for (let a = 0; a < 15; a++) {
        for (let b = 0; b < 11; b++) {
          //wins[0][0][0]
          //wins[0][1][0]
          //wins[0][2][0]
          for (let c = 0; c < 5; c++) {
            wins[b + c][a][count] = true
          }
          count++
        }
      }

      //斜 '\'
      for (let a = 0; a < 11; a++) {
        for (let b = 0; b < 11; b++) {
          //a = 0, b = 10
          //win[0][10]
          //win[1][11]
          for (let c = 0; c < 5; c++) {
            wins[a + c][b + c][count] = true
          }
          count++
        }
      }
      //反斜 '/'
      for (let a = 0; a < 11; a++) {
        for (let b = 4; b < 15; b++) {
          //a = 0, b = 0
          //win[0][5]
          //win[1][4]
          for (let c = 0; c < 5; c++) {
            wins[a + c][b - c][count] = true
          }
          count++
        }
      }
      //我方、计算机方总共可以赢的数量，每在某一方式上可以赢的位置下一颗子，myWin[i]++
      //当myWin[i] == 5,说明我方在这个方式上赢的落子已经达到5颗，说明我方已经赢了

      for (let i = 0; i < count; i++) {
        myWin[i] = 0
        computerWin[i] = 0
      }

      //画纵横线条
      function drawLine() {
        if (!context) return
        context.strokeStyle = '#ccc'
        for (let i = 0; i < 15; i++) {
          context.moveTo(15 + 30 * i, 15)
          context.lineTo(15 + 30 * i, 435)
          context.stroke()

          context.moveTo(15, 15 + 30 * i)
          context.lineTo(435, 15 + 30 * i)
          context.stroke()
        }
      }
      context.clearRect(
        0,
        0,
        (canvas.value as HTMLCanvasElement).width,
        (canvas.value as HTMLCanvasElement).height
      )
 
      drawLine()
    }
    //计算机
    function computerAI() {
      let myScore: number[][] = [] //我方分数
      let computerScore: number[][] = [] //计算机分数
      let max = 0 //最大分数
      let u = 0,
        v = 0 //最大分数点
      for (let i = 0; i < 15; i++) {
        myScore[i] = []
        computerScore[i] = []
        for (let j = 0; j < 15; j++) {
          myScore[i][j] = 0
          computerScore[i][j] = 0
        }
      }

      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
          if (box[i][j] == 0) {
            //每个空闲点上进行计算分数
            for (let k = 0; k < count; k++) {
              //遍历所有可以赢的，数量
              if (wins[i][j][k]) {
                //可以赢的点进行算分

                if (myWin[k] == 1) {
                  myScore[i][j] += 200
                } else if (myWin[k] == 2) {
                  myScore[i][j] += 400
                } else if (myWin[k] == 3) {
                  myScore[i][j] += 2000
                } else if (myWin[k] == 4) {
                  myScore[i][j] += 10000
                }

                if (computerWin[k] == 1) {
                  computerScore[i][j] += 220
                } else if (computerWin[k] == 2) {
                  computerScore[i][j] += 420
                } else if (computerWin[k] == 3) {
                  computerScore[i][j] += 2100
                } else if (computerWin[k] == 4) {
                  computerScore[i][j] += 20000
                }
              }
            }

            //得出最大分数的点，并赋给u,v
            if (myScore[i][j] > max) {
              max = myScore[i][j]
              u = i
              v = j
            } else if (myScore[i][j] == max) {
              if (computerScore[i][j] > computerScore[u][v]) {
                u = i
                v = j
              }
            }

            if (computerScore[i][j] > max) {
              max = computerScore[i][j]
              u = i
              v = j
            } else if (computerScore[i][j] == max) {
              if (myScore[i][j] > myScore[u][v]) {
                u = i
                v = j
              }
            }
          } //所有空闲点上进行计算分数
        }
      }

      oneStep(u, v, false) //走一步

      for (let k = 0; k < count; k++) {
        //第几种赢法
        if (wins[u][v][k]) {
          computerWin[k]++
          myWin[k] = 6
          if (computerWin[k] == 5) {
            console.log('计算机赢了--')
            over = true
          }
        }
      }

      if (!over) {
        me = !me
      }
    }

    function bandleClick(e: MouseEvent) {
      if (over) return
      if (!me) return
      let x = Math.floor(e.offsetX / 30)
      let y = Math.floor(e.offsetY / 30)
      if (box[x][y] == 0) {
        //判断没有落子
        oneStep(x, y, me)
        // over = false

        for (let k = 0; k < count; k++) {
          //第几种赢法
          if (wins[x][y][k]) {
            myWin[k]++
            computerWin[k] = 6 //因为我方在这个点上已经落子，所以计算机不可能在这个点上赢，
            if (myWin[k] == 5) {
              console.log('你赢了')
              over = true
            }
          }
        }
        if (!over) {
          me = !me
          computerAI()
        }
      }
    }
    onMounted(() => {
      init()
    })
    return {
      canvas,
      bandleClick,
      init,
    }
  },
})
</script>
