<template>
  <el-main class="reincarnation">
    <div class="container">
      <div id="wheel-of-fate"></div>
    </div>
    <h1>{{ result }}</h1>
    <!-- 善 <el-input /> 恶 <el-input /> -->
    <el-button @click="handleStart"> Start </el-button>
  </el-main>
</template>
<script lang="ts">
import Konva from 'konva'
import { Group } from 'konva/lib/Group'
import { Shape } from 'konva/lib/Shape'
import { Animation } from 'konva/lib/Animation'
import { Text } from 'konva/lib/shapes/Text'
import { Stage } from 'konva/lib/Stage'
import { defineComponent, onMounted, ref } from 'vue'
import { IFrame } from 'konva/lib/types'
import { Wedge } from 'konva/lib/shapes/Wedge'

export default defineComponent({
  name: 'Reincarnation',
  setup() {
    const result = ref('')

    const six = ['天道', '人道', '修罗道', '地狱道', '饿鬼道', '畜生道']

    let angularVelocity = 20
    let lastRotation = 0
    const angularVelocities: number[] = []

    const angle = (2 * Math.PI) / 6

    let controlled = false
    const angularFriction = 0.2

    let target: Wedge
    let activeWedge: Shape
    let stage: Stage

    let wheel: Group //
    let pointer: Wedge // 指针
    let finished = false // 完成
    let anim: Animation

    Konva.angleDeg = false

    // 平均角速度
    const handleAverageAngularVelocity = () =>
      angularVelocities.length === 0
        ? 0
        : angularVelocities.reduce((count, s) => count + s, 0) /
          angularVelocities.length

    function animate(frame: IFrame | undefined) {
      // handle wheel spin
      const angularVelocityChange =
        (angularVelocity * (frame as IFrame).timeDiff * (1 - angularFriction)) /
        1000
      angularVelocity -= angularVelocityChange

      // 指针当前选中的图形
      const shape = stage.getIntersection({
        x: stage.width() / 2,
        y: 100,
      })

      if (controlled) {
        if (angularVelocities.length > 10) {
          angularVelocities.shift()
        }
        angularVelocities.push(
          ((wheel.rotation() - lastRotation) * 1000) /
            (frame as IFrame).timeDiff
        )
      } else {
        const diff = ((frame as IFrame).timeDiff * angularVelocity) / 1000
        if (diff > 0.0001) {
          wheel.rotate(diff)
        } else if (!finished && !controlled) {
          if (shape) {
            const text = (
              shape.getParent().findOne('Text') as unknown as Text
            ).text()
            const price = text.split('\n').join('')
            anim?.stop()
            result.value = price
            console.log('------------*------------' + price)
          }
          finished = true
        }
      }
      lastRotation = wheel.rotation()

      if (shape) {
        if (shape && (!activeWedge || shape._id !== activeWedge._id)) {
          pointer.y(20)
          new Konva.Tween({
            node: pointer,
            duration: 0.3,
            y: 30,
            easing: Konva.Easings.ElasticEaseOut,
          }).play()

          activeWedge?.fillPriority('radial-gradient')

          shape.fillPriority('fill')
          activeWedge = shape
        }
      }
    }

    function init() {
      // 初始化
      stage = new Konva.Stage({
        container: 'wheel-of-fate',
        width: 400,
        height: 400,
      })
      const layer = new Konva.Layer()
      //   轮盘
      wheel = new Konva.Group({
        x: stage.width() / 2,
        y: stage.height() / 2,
      })
      six.forEach((t, i) => {
        //   组
        const group_wedge = new Konva.Group({
          rotation: (2 * i * Math.PI) / 6,
        })
        //  背景
        const wedgeBackground = new Konva.Wedge({
          radius: 200,
          angle: angle,
          fillRadialGradientStartPoint: { x: 0, y: 0 },
          fillRadialGradientStartRadius: 0,
          fillRadialGradientEndPoint: { x: 0, y: 0 },
          fillRadialGradientEndRadius: 200,
          fillRadialGradientColorStops: [0, '#f4f6f2', 1, '#5f68f6'],
          fill: '#64e9f8',
          fillPriority: 'radial-gradient',
          stroke: '#ccc',
          strokeWidth: 2,
        })

        group_wedge.add(wedgeBackground)

        // 文字
        const text = new Konva.Text({
          text: t,
          fontFamily: 'Calibri',
          fontSize: 30,
          fill: 'white',
          align: 'center',
          stroke: 'yellow',
          strokeWidth: 1,
          rotation: (Math.PI + angle) / 2,
          x: (stage.width() / 8) * 3,
          y: stage.width() / 8,
          listening: false,
        })

        group_wedge.add(text)
        group_wedge.id(`${group_wedge.rotation()}`)
        wheel.add(group_wedge)
      })
      //   console.log(layer)

      //   指针
      pointer = new Konva.Wedge({
        fillRadialGradientStartPoint: { x: 0, y: 0 },
        fillRadialGradientStartRadius: 0,
        fillRadialGradientEndPoint: { x: 0, y: 0 },
        fillRadialGradientEndRadius: 30,
        fillRadialGradientColorStops: [0, 'white', 1, 'red'],
        stroke: 'white',
        strokeWidth: 2,
        lineJoin: 'round',
        angle: 1,
        radius: 30,
        x: stage.width() / 2,
        y: 30,
        rotation: -90,
        shadowColor: 'black',
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowBlur: 2,
        shadowOpacity: 0.5,
      })

      layer.add(wheel)
      layer.add(pointer)
      stage.add(layer)

      wheel.on('mousedown touchstart', function (evt) {
        angularVelocity = 0
        controlled = true
        target = evt.target as Wedge
        finished = false
      })
      stage.addEventListener('mousemove touchmove', function () {
        var mousePos = stage.getPointerPosition()
        if (controlled && mousePos && target) {
          var x = mousePos.x - wheel.x()
          var y = mousePos.y - wheel.y()
          var atan = Math.atan(y / x)
          var rotation = x >= 0 ? atan : atan + Math.PI
          var targetGroup = target.getParent()

          wheel.rotation(
            rotation - parseFloat(targetGroup.id()) - target.angle() / 2
          )
        }
      })
      stage.addEventListener('mouseup touchend', function () {
        controlled = false
        angularVelocity = handleAverageAngularVelocity() * 5

        if (angularVelocity > 20) {
          angularVelocity = 20
        } else if (angularVelocity < -20) {
          angularVelocity = -20
        }
        angularVelocities.forEach(() => {
          angularVelocities.shift()
        })
      })

      anim = new Konva.Animation(animate, layer)
    }
    const handleStart = () => {
      let i = 5
      while (i) {
        let j = Math.floor(Math.random() * i--)
        ;[six[j], six[i]] = [six[i], six[j]]
      }
      finished = false
      angularVelocity = 15
      result.value=''
      ;(stage.getChildren()[0].getChildren()[0] as Group)
        .getChildren()
        .forEach((c, i) => {
          ((c as Group).getChildren()[1] as Text).text(six[i])
        })
      console.log(stage)
      anim?.start()
    }

    onMounted(() => {
      init()
    })
    return {
      handleStart,
      result,
    }
  },
})
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>