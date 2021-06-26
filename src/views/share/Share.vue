<template>
  <el-main class="share">
    <div class="toolbar">
      <div class="tools">
        <div class="tool-item">
          <el-tooltip
            effect="dark"
            placement="bottom-start"
            content="打开预览窗"
          >
            <el-button
              :disabled="button_usable.stop_disabled"
              @click="handleRequestPIP"
              size="small"
              icon="iconfont icon-huazhonghua-01"
            ></el-button>
          </el-tooltip>
        </div>
        <div class="tool-item">
          <el-tooltip
            effect="dark"
            placement="bottom-start"
            content="重置视频大小"
          >
            <el-button
              :disabled="button_usable.stop_disabled"
              @click="handleResetVideoSize"
              size="small"
              icon="iconfont icon-fuwei"
            ></el-button>
          </el-tooltip>
        </div>
        <div class="tool-item">
          <el-tooltip effect="dark" placement="bottom-start" content="开始">
            <el-button
              :disabled="button_usable.start_disabled"
              @click="handleStartCapture"
              size="small"
              icon="iconfont icon-qidong"
            ></el-button>
          </el-tooltip>
        </div>
        <div class="tool-item">
          <el-tooltip effect="dark" placement="bottom-start" content="停止">
            <el-button
              :disabled="button_usable.stop_disabled"
              @click="handleStotCapture"
              size="small"
              icon="iconfont icon-stop"
            ></el-button>
          </el-tooltip>
        </div>
        <div class="tool-item">
          <el-tooltip effect="dark" placement="bottom-start" content="暂停">
            <el-button
              :disabled="button_usable.pause_disabled"
              @click="handlePauseRecorderCanvas"
              size="small"
              icon="iconfont icon-zantingtingzhi"
            ></el-button>
          </el-tooltip>
        </div>
        <div class="tool-item">
          <el-tooltip effect="dark" placement="bottom-start" content="继续">
            <el-button
              :disabled="button_usable.resume_disabled"
              @click="handleResumeRecorderCanvas"
              size="small"
              icon="iconfont icon-jixu"
            ></el-button>
          </el-tooltip>
        </div>
        <div class="tool-item">
          <el-tooltip effect="dark" placement="bottom-start" content="下载">
            <el-button
              @click="downloadVideo"
              size="small"
              icon="iconfont icon-upload-demo"
            ></el-button>
          </el-tooltip>
        </div>

        <div class="tool-item">
          <el-popover trigger="click" placement="bottom-end" width="210px">
            <template #reference>
              <el-button
                size="small"
                icon="iconfont icon-tiaojiedaxiao"
              ></el-button>
            </template>
            <div class="popover">
              <el-row>
                <el-col>
                  <span class="label">宽:</span>
                  <el-input
                    type="number"
                    min="300"
                    v-model.number="tools.video.width"
                  />
                </el-col>
                <el-col>
                  <span class="label">高:</span>
                  <el-input
                    type="number"
                    min="150"
                    v-model.number="tools.video.height"
                  />
                </el-col>
                <el-col>
                  <el-tooltip
                    effect="dark"
                    placement="bottom-start"
                    content="当锁定时方可使用工具操作"
                  >
                    <div>
                      <span class="label">拖动</span>
                      <el-switch
                        v-model="tools.video.lock_canvas_size"
                      ></el-switch>
                    </div>
                  </el-tooltip>
                </el-col>
              </el-row>
            </div>
          </el-popover>
        </div>

        <div class="tool-item">
          <el-tooltip effect="dark" placement="bottom-start" content="画笔">
            <el-button
              icon="iconfont icon-pen"
              size="small"
              :class="{
                active: tools.pen,
              }"
              @click="handleSelectTool('pen')"
            ></el-button>
          </el-tooltip>
        </div>

        <div class="tool-item">
          <el-popover trigger="click" placement="bottom-end" width="210px">
            <template #reference>
              <el-button
                icon="iconfont icon-fangxing"
                size="small"
                :class="{
                  active:
                    tools.shapes.rect ||
                    tools.shapes.circle ||
                    tools.shapes.ellipse,
                }"
              ></el-button>
            </template>
            <div class="popover">
              <el-button
                icon="iconfont icon-fangxing"
                size="small"
                :class="{
                  active: tools.shapes.rect,
                }"
                @click="handleSelectTool('rect')"
              ></el-button>
              <el-button
                icon="iconfont icon-chevronleftcircle1"
                size="small"
                :class="{
                  active: tools.shapes.circle,
                }"
                @click="handleSelectTool('circle')"
              ></el-button>
              <el-button
                icon="iconfont icon-ellipse"
                size="small"
                :class="{
                  active: tools.shapes.ellipse,
                }"
                @click="handleSelectTool('ellipse')"
              ></el-button>
            </div>
          </el-popover>
        </div>
        <div class="tool-item">
          <el-tooltip effect="dark" placement="bottom-start" content="线">
            <el-button
              icon="iconfont icon-line"
              size="small"
              :class="{
                active: tools.line,
              }"
              @click="handleSelectTool('line')"
            ></el-button>
          </el-tooltip>
        </div>

        <!-- <div class="tool-item">
          <el-popover trigger="click" placement="bottom-end" width="210px">
            <template #reference>
              <el-button
                icon="iconfont icon-icon-big-head-arrow"
                size="small"
                :class="{
                  active:
                    tools.arrow.line_arrow ||
                    tools.arrow.bezier_arrow ||
                    tools.arrow.big_head_arrow,
                }"
              ></el-button>
            </template>
            <div class="popover">
              <el-button
                icon="iconfont icon-line-arrow"
                size="small"
                :class="{
                  active: tools.arrow.line_arrow,
                }"
                @click="handleSelectTool('line_arrow')"
              ></el-button>
              <el-button
                icon="iconfont icon-icon-bezier-arrow"
                size="small"
                :class="{
                  active: tools.arrow.bezier_arrow,
                }"
                @click="handleSelectTool('bezier_arrow')"
              ></el-button>
              <el-button
                icon="iconfont icon-icon-big-head-arrow"
                size="small"
                :class="{
                  active: tools.arrow.big_head_arrow,
                }"
                @click="handleSelectTool('big_head_arrow')"
              ></el-button>
            </div>
          </el-popover>
        </div> -->

        <div class="tool-item">
          <el-tooltip effect="dark" placement="bottom-start" content="文字">
            <el-button
              icon="iconfont icon-Text"
              size="small"
              :class="{
                active: tools.text,
              }"
              @click="handleSelectTool('text')"
            ></el-button>
          </el-tooltip>
        </div>
        <div class="tool-item">
          <el-tooltip effect="dark" placement="bottom-start" content="模糊">
            <el-button
              icon="iconfont icon-blur"
              size="small"
              :class="{
                active: tools.rect_blur,
              }"
              @click="handleSelectTool('rect_blur')"
            ></el-button>
          </el-tooltip>
        </div>
        <div class="tool-item">
          <el-tooltip effect="dark" placement="bottom-start" content="高亮">
            <el-button
              icon="iconfont icon-high-light"
              size="small"
              :class="{
                active: tools.highlight,
              }"
              @click="handleSelectTool('highlight')"
            ></el-button>
          </el-tooltip>
        </div>

        <div class="tool-item">
          <el-popover trigger="click" placement="bottom-end" width="210px">
            <template #reference>
              <el-button
                icon="iconfont icon-stickerchajian"
                size="small"
              ></el-button>
            </template>
            <div class="popover">
              <el-button
                icon="iconfont icon-line-arrow"
                size="small"
                @click="handleSelectTool('line_arrow')"
              ></el-button>
            </div>
          </el-popover>
        </div>

        <div class="tool-item">
          <el-tooltip
            effect="dark"
            placement="bottom-start"
            content="自定义贴图"
          >
            <el-button
              icon="iconfont icon-icon-sticker"
              size="small"
            ></el-button>
          </el-tooltip>
        </div>

        <div class="tool-item">
          <el-color-picker
            :show-alpha="true"
            color-format="rgb"
            size="small"
            v-model="tools.color"
          ></el-color-picker>
        </div>
        <div class="tool-item">
          <el-input
            size="small"
            min="1"
            type="number"
            v-model.number="tools.size"
          >
            <template #append>px</template>
          </el-input>
        </div>
      </div>
    </div>
    <h1>视频</h1>
    <div class="preview-container">
      <!-- 视频流比例适配 -->
      <div class="black-hole">
        <video
          id="crude-player-video"
          class="crude-player-video"
          ref="crude_player_video"
          autoplay
        ></video>
        <video
          id="preview-player-video"
          class="preview-player-video"
          ref="preview_player_video"
          autoplay
        ></video>
      </div>
      <!-- 视频加工及预览 -->
      <div
        id="konva"
        ref="preview_player_canvas_box"
        class="preview-player-canvas"
      ></div>
      <!-- 布娃娃 -->
      <textarea
        class="coodoo-doll"
        :style="{
          width: tools.video.width + 'px',
          height: tools.video.height + 'px',
          resize: !tools.video.lock_canvas_size ? 'both' : 'none',
          zIndex: !tools.video.lock_canvas_size ? 3 : -99999,
        }"
        ref="coodoo_doll"
        disabled
      ></textarea>
    </div>
    <teleport to="body">
      <textarea
        class="tool-textarea"
        tabindex="1"
        v-model="val"
        :style="style"
        ref="el"
      />
    </teleport>
  </el-main>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import Konva from 'konva'
import { Stage } from 'konva/lib/Stage'
import { Layer } from 'konva/lib/Layer'
import { Image } from 'konva/lib/shapes/Image'
import { Animation } from 'konva/lib/Animation'
import { AnimationFn, IFrame } from 'konva/lib/types'
import { Line } from 'konva/lib/shapes/Line'
import { Shape } from 'konva/lib/Shape'
import { Rect } from 'konva/lib/shapes/Rect'
import { Transformer } from 'konva/lib/shapes/Transformer'
import { Circle } from 'konva/lib/shapes/Circle'
import { Ellipse } from 'konva/lib/shapes/Ellipse'
import { Text } from 'konva/lib/shapes/Text'
import { download, randomId } from '@/utils/util'

export default defineComponent({
  name: 'Share',
  setup() {
    /**原始图像 VideoElement*/
    const crude_player_video = ref<HTMLVideoElement | null>(null)
    let crude_media: MediaStream | null = null
    /**canvas 预览图像 CanvasElement */
    const preview_player_canvas = ref<HTMLCanvasElement | null>(null)
    const preview_player_canvas_box = ref<HTMLDivElement | null>(null)
    /**预览合成图像 VideoElement*/
    const preview_player_video = ref<HTMLVideoElement | null>(null)
    /**preview_player_canvas 的伴生 TextAreaElement */
    const coodoo_doll = ref<HTMLTextAreaElement | null>(null)
    const tool_ta = reactive<{
      el: HTMLTextAreaElement | null
      val: string
      isPaint: boolean
      style: {
        top: string
        left: string
        width: string
        height: string
        display: string
        color: string
        fontSize: string
        fontFamily: string
        transform: string
        lineHeight: string
      }
    }>({
      el: null,
      val: '',
      isPaint: false,
      style: {
        top: '0',
        left: '0',
        color: '#000',
        width: '0px',
        height: '0px',
        display: 'none',
        fontSize: '32px',
        fontFamily: 'Arial',
        transform: 'rotate(0deg)',
        lineHeight: '1',
      },
    })
    /** */
    let tr: Transformer | null = null
    let stage: Stage | null = null
    let layer: Layer | null = null
    let tr_layer: Layer | null = null
    let video_shape: Image | null = null
    let anim: Animation | null = null
    /**  */
    let isPaint = false
    let tool_line: Line | null = null
    let tool_rect: Rect | null = null
    let tool_circle: Circle | null = null
    let tool_ellipse: Ellipse | null = null
    let tool_text: Text | null = null
    let tool_image: Image | null = null
    let temStorage: { [k: string]: any } | null = null
    /** */
    const tools = reactive({
      video: {
        width: 700,
        height: 400,
        // lock_aspect_ratio: false,
        lock_canvas_size: true,
        visible: false,
      },
      pen: false,
      shapes: {
        rect: false,
        circle: false,
        ellipse: false,
      },
      line: false,
      arrow: {
        line_arrow: false,
        bezier_arrow: false,
        big_head_arrow: false,
      },
      text: false,
      rect_blur: false,
      highlight: false,
      sticker: {},
      image: false,
      color: 'rgba(255,0,0,1)',
      size: 4,
    })

    /**canvas 媒体录制 */
    const canvas_media_recorder = ref<any>(null)
    /**录制数据 */
    const allChunks: any[] = reactive([])
    /**按钮禁用 */
    const button_usable = reactive({
      start_disabled: false,
      stop_disabled: true,
      pause_disabled: true,
      resume_disabled: true,
    })
    /** 定时器 */
    let time: any = null
    const handles: {
      [k: string]: (b: boolean) => void
    } = {
      pen: (b) => {
        tools.pen = b
        if (b) {
          tools.size = 4
          tools.color = `${
            (
              tools.color.match(/[rgba]{3,4}\((\d+,\s*){3}/) as RegExpMatchArray
            )[0]
          }1)`

          handleStageReplaceClass('cursor_pen')
        }
      },
      rect: (b) => {
        tools.shapes.rect = b
        if (b) {
          tools.color = `${
            (
              tools.color.match(/[rgba]{3,4}\((\d+,\s*){3}/) as RegExpMatchArray
            )[0]
          }1)`
          handleStageReplaceClass('cursor_rect')
        }
      },
      circle: (b) => {
        tools.shapes.circle = b
        if (b) {
          tools.color = `${
            (
              tools.color.match(/[rgba]{3,4}\((\d+,\s*){3}/) as RegExpMatchArray
            )[0]
          }1)`
          handleStageReplaceClass('cursor_circle')
        }
      },
      ellipse: (b) => {
        tools.shapes.ellipse = b
        if (b) {
          tools.color = `${
            (
              tools.color.match(/[rgba]{3,4}\((\d+,\s*){3}/) as RegExpMatchArray
            )[0]
          }1)`
          handleStageReplaceClass('cursor_ellipse')
        }
      },
      line: (b) => {
        tools.line = b
        if (b) {
          tools.color = `${
            (
              tools.color.match(/[rgba]{3,4}\((\d+,\s*){3}/) as RegExpMatchArray
            )[0]
          }1)`
          handleStageReplaceClass('cursor_line')
        }
      },
      line_arrow: (b) => {
        tools.arrow.line_arrow = b
        if (b) {
          tools.color = `${
            (
              tools.color.match(/[rgba]{3,4}\((\d+,\s*){3}/) as RegExpMatchArray
            )[0]
          }1)`
          handleStageReplaceClass('cursor_line_arrow')
        }
      },
      bezier_arrow: (b) => {
        tools.arrow.bezier_arrow = b
        if (b) {
          tools.color = `${
            (
              tools.color.match(/[rgba]{3,4}\((\d+,\s*){3}/) as RegExpMatchArray
            )[0]
          }1)`
          // handleStageReplaceClass('')
        }
      },
      big_head_arrow: (b) => {
        tools.arrow.big_head_arrow = b
        if (b) {
          tools.color = `${
            (
              tools.color.match(/[rgba]{3,4}\((\d+,\s*){3}/) as RegExpMatchArray
            )[0]
          }1)`
          // handleStageReplaceClass('')
        }
      },
      text: (b) => {
        tools.text = b
        if (b) {
          tools.size = 32
          tools.color = `${
            (
              tools.color.match(/[rgba]{3,4}\((\d+,\s*){3}/) as RegExpMatchArray
            )[0]
          }1)`
          handleStageReplaceClass('cursor_text')
        }
      },
      rect_blur: (b) => {
        tools.rect_blur = b
        if (b) {
          tools.color = `${
            (
              tools.color.match(/[rgba]{3,4}\((\d+,\s*){3}/) as RegExpMatchArray
            )[0]
          }1)`
          handleStageReplaceClass('cursor_cert_blur')
        }
      },
      highlight: (b) => {
        tools.highlight = b
        if (b) {
          tools.size = 16
          tools.color = `${
            (
              tools.color.match(/[rgba]{3,4}\((\d+,\s*){3}/) as RegExpMatchArray
            )[0]
          }0.6)`
          handleStageReplaceClass('cursor_highlight')
        }
      },
    }

    /*****************************************函数声明*****************************************/

    /**
     * @description 更新底片 更新 rect_blur 功能中  image 图像
     */
    const handleUpdateFilm = (shape?: Image) => {
      if (layer && layer.find<Image>('.rect_blur').length > 0) {
        const _layer = layer.clone()
        _layer.getChildren().forEach((c) => {
          if (c.hasName('rect_blur')) {
            c.destroy()
          }
        })
        const _canvas = _layer.toCanvas()
        if (shape) {
          shape.image(_canvas)
          shape.crop({
            x: shape.x(),
            y: shape.y(),
            width: shape.getWidth(),
            height: shape.getHeight(),
          })
          if (shape.width() !== 0 && shape.height() != 0) shape.cache()
          shape.filters([Konva.Filters.Blur])
        } else {
          layer.find<Image>('.rect_blur').forEach((c) => {
            c.image(_canvas)
            c.crop({
              x: c.x(),
              y: c.y(),
              width: c.getWidth(),
              height: c.getHeight(),
            })
            if (c.width() !== 0 && c.height() != 0) c.cache()
            c.filters([Konva.Filters.Blur])
          })
        }
      }
    }

    /**
     * @description
     * @param reverse
     * true
     * 当前选中的文字对象 （tool_text）的位置同步到 tr_layer 上显示的图形上
     *
     * fasle
     * 将选中编辑的位置状态 同步到当前选中的文字对象 （tool_text）上
     */
    function handleSynchronizeLordToAuxiliary(id: string, reverse = true) {
      const Lord: Text | null = layer?.getChildren(
        (c) => c.id() === `${id}`
      )[0] as Text | null
      const Auxiliary: Text | null = tr_layer?.getChildren(
        (c) => c.id() === `${id}`
      )[0] as Text | null
      if (!Lord || !Auxiliary) return
      console.log(Lord, Auxiliary)

      if (reverse) {
        const {
          x,
          y,
          width,
          height,
          fill,
          text,
          fontSize,
          fontFamily,
          lineHeight,
          rotation,
        } = Lord.getAttrs()
        Lord.visible(false)
        Auxiliary.setAttrs({
          x,
          y,
          width,
          height,
          fill,
          text,
          fontSize,
          fontFamily,
          lineHeight,
          rotation,
          visible: true,
        })
      } else {
        const {
          x,
          y,
          width,
          height,
          fill,
          fontSize,
          fontFamily,
          lineHeight,
          rotation,
          text,
        } = Auxiliary.getAttrs()
        Auxiliary.visible(false)
        Lord.setAttrs({
          x,
          y,
          text,
          width,
          height,
          fill,
          fontSize,
          fontFamily,
          lineHeight,
          rotation,
          visible: true,
        })
      }
      console.log(Lord, Auxiliary)
    }

    /**
     * @description
     * 动画回调
     *
     */
    let handleAnimBack: AnimationFn = (frame?: IFrame | undefined) => {
      handleUpdateFilm()

      if (crude_media?.active === false) {
        layer?.destroyChildren()
        anim?.stop()
        ;(document as any)?.exitPictureInPicture()
        canvas_media_recorder.value?.stop()
        button_usable.start_disabled = false
        button_usable.stop_disabled = true
        button_usable.pause_disabled = true
        button_usable.resume_disabled = true
        handleResetVideoSize()
      }
    }
    /**
     * @description 清除所有鼠标样式类 并添加一个
     */
    function handleStageReplaceClass(className: string) {
      const classList = (stage as Stage).container().classList
      classList.forEach((c) => {
        if (/^cursor_/.test(c)) {
          classList.remove(c)
        }
      })
      classList.add(className)
      ;(stage as Stage).container().className = classList.toString()
    }
    /**
     * @description 添加或移除一个类名
     * @param className
     * @param flage
     * true 添加
     * false 移除
     */
    function handleStageClass(className: string, flage: boolean) {
      const classList = (stage as Stage).container().classList
      if (flage) {
        classList.add(className)
      } else {
        classList.remove(className)
      }
      if (stage) stage.container().className = classList.toString()
    }

    /**
     * @description 选择工具
     */
    const handleSelectTool = (handle: string) => {
      isPaint = false
      for (const key in handles) {
        if (Object.prototype.hasOwnProperty.call(handles, key)) {
          if (key !== handle) {
            handles[key](false)
          } else {
            handles[key](true)
          }
        }
      }
    }
    /**
     * @description
     * 初始化舞台 画布 动画
     */
    const handleInitKonva = () => {
      //
      stage = new Konva.Stage({
        container: 'konva',
        width: 400,
        height: 300,
      })
      layer = new Konva.Layer()
      anim = new Konva.Animation((frame) => handleAnimBack(frame), layer)
      preview_player_canvas.value = layer.canvas._canvas
      stage.add(layer)
      tr_layer = new Konva.Layer()
      tr = new Konva.Transformer({
        id: 'Transformer',
        anchorStroke: '#fff',
        anchorFill: '#0081ff',
        anchorCornerRadius: 5,
        anchorSize: 10,
        keepRatio: false,
      })
      tr_layer.add(tr)
      stage.add(tr_layer)
      stage.draw()
    }
    /**
     *@description Shape 移入事件
     */
    const handleShapeOnMouseenter = (shape: Shape) => {
      shape.on('mouseenter', function () {
        if (isPaint) return
        this.draggable(true)
        handleStageMousedown(false)
        handleStageClass('cursor_move', true)
      })
    }
    /**
     *@description Shape 移出事件
     */
    const handleShapeOnMouseleave = (shape: Shape) => {
      shape.on('mouseleave', function () {
        if (isPaint) return
        this.draggable(false)
        handleStageMousedown(true)
        handleStageClass('cursor_move', false)
      })
    }
    /**
     * @description Shape 点击事件
     */
    const handleShapeOnClick = (shape: Shape) => {
      shape.on('click', function (e) {
        e.cancelBubble = true
        if (tr_layer && tr) {
          const _selfCopy = this.clone()
          this.hide()
          tr_layer.add(_selfCopy)
          tr_layer.add(tr)
          tr.setNodes([_selfCopy])
          tr.show()
          tr.moveToTop()
          tr_layer.draw()
        }
        console.log('shpae click')
      })
    }
    /**
     * @description
     * 打扫 tr_layer
     */
    function handleCleanTrLayer() {
      tr_layer
        ?.getChildren((c) => c.id() !== 'Transformer')
        .forEach((c) => {
          c.destroy()
        })
      tr?.nodes([])
      tr?.hide()
      tr_layer?.draw()
    }

    /**
     * @description
     * 处理 textarea 处境
     */
    function handleTextareaFollowUp() {
      const id = tool_ta.el?.dataset['targetId']
      if (!/text_/.test(`${id}`) || !tool_ta.isPaint) return

      if (tool_ta.style.display !== 'none') {
        console.log('文本框可见')
        tool_ta.style.display = 'none'
        if (tool_ta.val.trim().length === 0) {
          console.log('无内容 清除')
          handleCleanTrLayer()
          layer
            ?.getChildren((c) => c.id() === `${id}`)
            .forEach((c) => {
              c.destroy()
            })
          if (tr?.isVisible() === false) {
            setTimeout(() => {
              tool_ta.isPaint = false
              console.log('关闭绘制')
            })
          }
          return
        }
        console.log('有文本 隐藏文本框 显示副本')

        tr_layer
          ?.getChildren((c) => c.id() === `${id}`)
          .forEach((c) => {
            c.x(c.x() + 6)
            c.width(c.width() - 12)
            ;(c as Text).text(tool_ta.val)
            c.show()
            tr?.show()
            tr_layer?.draw()
          })
        return false
      }
      console.log('文本框不可见 清空副本 显示主体')

      handleSynchronizeLordToAuxiliary(`${id}`, false)
      handleCleanTrLayer()

      if (tr?.isVisible() === false) {
        tool_ta.isPaint = false
        console.log('关闭绘制')
      }
      //
    }

    /**
     * @description text 事件
     */
    const handleShapeTextOnClick = (shape_text: Text) => {
      shape_text.on('click', async function (e) {
        e.cancelBubble = true

        if (tr_layer && tr && stage) {
          const _selfCopy = this.clone() as Text
          this.hide()
          _selfCopy.on('dblclick', function () {
            this.hide()
            tr?.hide()
            const tta = tool_ta.el
            if (!stage || !tta) return
            tta.setAttribute('data-target-id', this.id())
            tool_ta.val = this.text()
            this.width(this.width() + 12)
            this.x(this.x() - 6)
            tool_ta.style = {
              top:
                document.documentElement.scrollTop +
                stage.container().getBoundingClientRect().y +
                this.y() +
                'px',
              left:
                stage.container().getBoundingClientRect().x + this.x() + 'px',
              width: this.width() + 'px',
              height: this.height() + 'px',
              display: 'block',
              color: this.fill(),
              fontSize: this.fontSize() + 'px',
              fontFamily: this.fontFamily(),
              transform: `rotateZ(${this.rotation()}deg)`,
              lineHeight: `${this.lineHeight()}`,
            }
            setTimeout(() => {
              tta.focus()
            }, 500)
          })
          tr_layer.add(_selfCopy)
          tr_layer.add(tr)
          tr.setNodes([_selfCopy])
          tr.show()
          tr.moveToTop()
          tr_layer.draw()
        }
        console.log('shpae click')
      })
    }

    /**
     * @description  Stage 鼠标按下
     * @param flage
     * true 绑定
     * false 解除
     */
    function handleStageMousedown(flage = true) {
      if (!flage) {
        stage?.off('mousedown')
        return
      }
      stage?.on('mousedown', function () {
        console.log('down ****', tr && tr.nodes().length === 1)

        if (tr && tr.nodes().length === 1) return
        const pos = this.getPointerPosition()
        switch (true) {
          case tools.pen || tools.highlight:
            isPaint = true
            if (pos) {
              tool_line = new Konva.Line({
                id: randomId(),
                stroke: tools.color,
                strokeWidth: tools.size,
                points: [pos.x, pos.y],
                strokeScaleEnabled: false,
              })
              handleShapeOnMouseenter(tool_line)
              handleShapeOnMouseleave(tool_line)
              if (tools.pen) {
                tool_line.globalCompositeOperation('source-over')
              } else if (tools.highlight) {
                tool_line.globalCompositeOperation('lighten')
              }
              // destination-out 橡皮
              layer?.add(tool_line)
            }
            break
          case tools.shapes.rect:
            isPaint = true
            if (pos) {
              tool_rect = new Konva.Rect({
                id: randomId(),
                x: pos.x,
                y: pos.y,
                width: 0,
                height: 0,
                stroke: tools.color,
                strokeWidth: tools.size,
                strokeScaleEnabled: false,
              })
              handleShapeOnMouseenter(tool_rect)
              handleShapeOnMouseleave(tool_rect)
              handleShapeOnClick(tool_rect)
              layer?.add(tool_rect)
            }
            break
          case tools.shapes.circle:
            isPaint = true
            if (pos) {
              temStorage = {
                x: pos.x,
                y: pos.y,
                circle: true,
              }
              tool_circle = new Konva.Circle({
                id: randomId(),
                x: pos.x,
                y: pos.y,
                radius: 0,
                stroke: tools.color,
                strokeWidth: tools.size,
                strokeScaleEnabled: false,
              })
              handleShapeOnMouseenter(tool_circle)
              handleShapeOnMouseleave(tool_circle)
              handleShapeOnClick(tool_circle)
              layer?.add(tool_circle)
            }
            break
          case tools.shapes.ellipse:
            isPaint = true
            if (pos) {
              temStorage = {
                x: pos.x,
                y: pos.y,
                ellipse: true,
              }
              tool_ellipse = new Konva.Ellipse({
                id: randomId(),
                x: pos.x,
                y: pos.y,
                radiusX: 0,
                radiusY: 0,
                stroke: tools.color,
                strokeWidth: tools.size,
                strokeScaleEnabled: false,
              })
              handleShapeOnMouseenter(tool_ellipse)
              handleShapeOnMouseleave(tool_ellipse)
              handleShapeOnClick(tool_ellipse)
              layer?.add(tool_ellipse)
            }

            break
          case tools.line:
            isPaint = true
            if (pos) {
              tool_line = new Konva.Line({
                id: randomId(),
                stroke: tools.color,
                strokeWidth: tools.size,
                lineCap: 'round',
                lineJoin: 'round',
                points: [pos.x, pos.y],
                strokeScaleEnabled: false,
              })
              handleShapeOnMouseenter(tool_line)
              handleShapeOnMouseleave(tool_line)
              handleShapeOnClick(tool_line)
              layer?.add(tool_line)
            }
            break
          case tools.rect_blur:
            isPaint = true
            if (pos && preview_player_video.value) {
              tool_image = new Konva.Image({
                id: randomId(),
                image: preview_player_video.value,
                x: pos.x,
                y: pos.y,
                width: 0,
                height: 0,
                name: 'rect_blur',
                strokeScaleEnabled: false,
                crop: {
                  x: pos.x,
                  y: pos.y,
                  width: 0,
                  height: 0,
                },
              })
              tool_image.on('dragmove', function () {
                handleUpdateFilm(this)
                layer?.batchDraw()
              })
              handleShapeOnMouseenter(tool_image)
              handleShapeOnMouseleave(tool_image)
              handleShapeOnClick(tool_image)
              layer?.add(tool_image)
            }
            break

          default:
            break
        }
      })
    }

    /**
     *@description  Stage 鼠标移动
     * @param flage
     * true 绑定
     * false 解除
     */
    function handleStageMousemove(flage = true) {
      if (!flage) {
        stage?.off('mousemove')
        return
      }
      stage?.on('mousemove', function () {
        let pos = (stage as Stage).getPointerPosition()
        let new_points: any
        switch (true) {
          case tools.pen || tools.highlight:
            if (!isPaint) return
            if (tool_line && pos) {
              new_points = tool_line.points().concat([pos.x, pos.y])
              tool_line?.points(new_points)
              layer?.batchDraw()
            }
            break
          case tools.shapes.rect:
            if (!isPaint) return
            if (tool_rect && pos) {
              const [start_x, start_y] = [tool_rect.x(), tool_rect.y()]
              tool_rect.width(pos.x - start_x)
              tool_rect.height(pos.y - start_y)
              // if (tool_rect.width() !== 0 && tool_rect.height() !== 0) {
              //   tool_rect.cache()
              //   tool_rect.drawHitFromCache()
              // }
              layer?.batchDraw()
            }
            break
          case tools.shapes.circle:
            if (!isPaint) return
            if (
              tool_circle &&
              pos &&
              temStorage &&
              temStorage.circle &&
              temStorage.x &&
              temStorage.y
            ) {
              const [start_x, start_y] = [temStorage.x, temStorage.y]
              const [x, y] = [(pos.x + start_x) / 2, (pos.y + start_y) / 2]
              tool_circle.x(x)
              tool_circle.y(y)
              tool_circle.radius(
                Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2))
              )
              // if (tool_circle.radius() !== 0) {
              //   tool_circle.cache()
              //   tool_circle.drawHitFromCache()
              // }
              layer?.batchDraw()
            }
            break
          case tools.shapes.ellipse:
            if (!isPaint) return
            if (
              tool_ellipse &&
              pos &&
              temStorage &&
              temStorage.ellipse &&
              temStorage.x &&
              temStorage.y
            ) {
              const [start_x, start_y] = [temStorage.x, temStorage.y]
              tool_ellipse.x((pos.x + start_x) / 2)
              tool_ellipse.y((pos.y + start_y) / 2)
              tool_ellipse.radiusX(Math.abs((pos.x - start_x) / 2))
              tool_ellipse.radiusY(Math.abs((pos.y - start_y) / 2))
              // if (
              //   tool_ellipse.radiusX() !== 0 &&
              //   tool_ellipse.radiusY() !== 0
              // ) {
              //   tool_ellipse.cache()
              //   tool_ellipse.drawHitFromCache()
              // }
              layer?.batchDraw()
            }
            break
          case tools.line:
            if (!isPaint) return
            if (tool_line && pos) {
              new_points = [
                tool_line.points()[0],
                tool_line.points()[1],
                pos.x,
                pos.y,
              ]
              tool_line?.points(new_points)
              layer?.batchDraw()
            }
            break
          case tools.rect_blur:
            if (!isPaint) return
            if (tool_image && pos) {
              const [start_x, start_y] = [tool_image.x(), tool_image.y()]
              tool_image.width(pos.x - start_x)
              tool_image.height(pos.y - start_y)
              tool_image.cropWidth(pos.x - start_x)
              tool_image.cropHeight(pos.y - start_y)
              tool_image.blurRadius(20)
              if (tool_image.width() !== 0 && tool_image.height() != 0)
                tool_image.cache()
              tool_image.filters([Konva.Filters.Blur])
              layer?.batchDraw()
            }
            break

          default:
            break
        }
      })
    }

    /**
     * @description  Stage 鼠标抬起
     * @param flage
     * true 绑定
     * false 解除
     */
    function handleStageMouseup(flage = true) {
      if (!flage) {
        stage?.off('mouseup')
        return
      }
      stage?.on('mouseup', function (e) {
        const pos = this.getPointerPosition()
        switch (true) {
          case tools.pen:
          case tools.highlight:
          case tools.shapes.rect:
          case tools.shapes.circle:
          case tools.shapes.ellipse:
          case tools.line:
          case tools.rect_blur:
            isPaint = false
            temStorage = null
            break
          case tools.text:
            handleTextareaFollowUp()

            if (pos && !tool_ta.isPaint) {
              console.log(`文本开启 绘制 `)
              tool_ta.isPaint = true
              tool_text = new Konva.Text({
                id: `text_${randomId()}`,
                text: '',
                x: pos.x,
                y: pos.y,
                width: tools.size,
                height: tools.size,
                draggable: true,
                fill: tools.color,
                fontSize: tools.size,
                strokeScaleEnabled: false,
                visible: false,
              })
              tool_text.on('mouseenter', function () {
                handleStageMouseup(false)
                handleStageMousedown(false)
                handleStageClass('cursor_move', true)
              })
              tool_text.on('mouseleave', function () {
                handleStageMouseup(true)
                handleStageMousedown(true)
                handleStageClass('cursor_move', false)
              })
              handleLordCloneEdit(tool_text)
              tr?.hide()
              // const _tool_text = tool_text.clone() as Text
              tool_text.on('click', function (e) {
                console.log('点击我了', e.target)
                if (!tools.text) return
                handleLordCloneEdit(this)
                // handleSynchronizeLordToAuxiliary(true)
              })

              tr_layer
                ?.getChildren((c) => c.id() === tool_text?.id())
                .forEach((c) => {
                  c.fire('dblclick')
                })

              layer?.add(tool_text)
            }
            break
          default:
            break
        }
      })
    }
    function handleStageMouseleave(flage = true) {
      if (!flage) {
        stage?.off('mouseleave')
        return
      }
      stage?.on('mouseleave', function () {
        // do ...
      })
    }
    /**
     * @description
     * 在文本初建 或在点击时 在操作层绘制副本
     */
    function handleLordCloneEdit(target: Text) {
      const _selfCopy = target.clone() as Text
      _selfCopy.off('click')
      _selfCopy.on('dblclick', function () {
        this.hide()
        tr?.hide()
        this.width(this.width() + 12)
        this.x(this.x() - 6)
        handleTextareaReset(this)
      })
      console.log(_selfCopy)

      tr_layer?.add(_selfCopy)
      tr?.nodes([_selfCopy])
      tr?.resizeEnabled(false)
      tr?.show()
      target.hide()
      _selfCopy.show()
      tr_layer?.draw()
    }
    /**
     * @description 文本编辑器 定位到
     */
    function handleTextareaReset(shape: Text) {
      if (!tool_ta.el || !stage) return
      const tta = tool_ta.el
      tta.setAttribute('data-target-id', shape.id())
      tool_ta.val = shape.text()
      tool_ta.style = {
        top:
          document.documentElement.scrollTop +
          stage.container().getBoundingClientRect().y +
          shape.y() +
          'px',
        left:
          stage.container().getBoundingClientRect().x + shape.x() - 6 + 'px',
        width: shape.width() + 'px',
        height: shape.height() + 'px',
        display: 'block',
        color: shape.fill(),
        fontSize: shape.fontSize() + 'px',
        fontFamily: shape.fontFamily(),
        transform: `rotateZ(${shape.rotation()}deg)`,
        lineHeight: `${shape.lineHeight()}`,
      }
      setTimeout(() => {
        tta.focus()
      }, 500)
    }

    /**
     *@description  初始化工具栏 绑定事件
     */
    function handleInitTool() {
      handleStageMousedown()
      handleStageMousemove()
      handleStageMouseup()

      // stage.on('click mouseleave', function () {
      //   console.log('stage click')
      //   handleStageMousedown()
      //   if (
      //     tr_layer &&
      //     tr_layer.getChildren((c) => c.id() === 'Transformer').length === 1 &&
      //     tr &&
      //     tr.nodes().length > 0
      //   ) {
      //     const node = tr.nodes()[0]
      //     if (/^text_if_/.test(node.id())) {
      //       //
      //     } else {
      //       layer?.getChildren().forEach((c) => {
      //         if (c.id() === node.id()) {
      //           c.width(node.width() * node.scaleX())
      //           c.height(node.height() * node.scaleY())
      //           c.x(node.x())
      //           c.y(node.y())
      //           c.rotation(node.rotation())
      //           c.show()
      //         }
      //       })
      //     }

      //     tr_layer
      //       .getChildren((c) => c.id() !== 'Transformer')
      //       .forEach((c) => {
      //         c.destroy()
      //       })
      //     tr.nodes([])
      //     tr.hide()
      //     tr_layer.draw()
      //   }
      // })
    }
    /************************************************ konva 操作********************************************** */
    /**
     * @description 开启画中画
     */
    const handleRequestPIP = async () => {
      if (!('pictureInPictureEnabled' in document)) {
        // TODO 提示不支持画中画
        return false
      }
      if (preview_player_video.value) {
        const ppv = preview_player_video.value
        try {
          // 获取画中画窗体
          const pIP = await (ppv as any).requestPictureInPicture()
        } catch (err) {
          // TODO 错误处理
          console.log(err)
        }
      }
    }

    /**
     * @description 开始录制画布
     */
    const handleStartRecorderCanvas = () => {
      const canvasMediaStream = (
        preview_player_canvas.value as any
      )?.captureStream(60) as MediaStream | null //  FPS

      if (canvasMediaStream) {
        canvas_media_recorder.value = new (window as any).MediaRecorder(
          canvasMediaStream,
          {
            mimeType: 'video/webm; codecs=vp9',
            videoBitsPerSecond: 8500000,
          }
        )
        if (preview_player_video.value)
          preview_player_video.value.srcObject = canvasMediaStream

        allChunks.forEach(() => {
          allChunks.shift()
        })
        canvas_media_recorder.value.ondataavailable = (ev: any) => {
          allChunks.push(ev.data)
        }
        canvas_media_recorder.value.start(100)
      } else {
        console.log('浏览器不支持 captureStream')
      }
      button_usable.pause_disabled = false
      button_usable.resume_disabled = true
    }
    /**
     * @description 暂停录制画布
     */
    const handlePauseRecorderCanvas = () => {
      canvas_media_recorder.value?.pause()
      button_usable.pause_disabled = true
      button_usable.resume_disabled = false
    }
    /**
     * @description 恢复录制画布
     */
    const handleResumeRecorderCanvas = () => {
      canvas_media_recorder.value?.resume()
      button_usable.pause_disabled = false
      button_usable.resume_disabled = true
    }
    /**
     * @description 停止录制画布
     */
    const handleStopRecorderCanvas = () => {
      canvas_media_recorder.value?.stop()
      button_usable.pause_disabled = true
      button_usable.resume_disabled = true
    }

    /**
     * @description 绘制 canvas
     */
    const handlePlayCanvas = (srcvideo: HTMLVideoElement) => {
      if (!layer || !crude_player_video.value) return false
      const _crude_player_video = crude_player_video.value
      let _offsetWidth = _crude_player_video.offsetWidth
      let _offsetHeight = _crude_player_video.offsetHeight

      const [width, height] = [layer.width(), layer.height()]

      video_shape = new Konva.Image({
        image: srcvideo,
        x: (width - _offsetWidth) / 2,
        y: (height - _offsetHeight) / 2,
        width: _offsetWidth,
        height: _offsetHeight,
        name: 'video_shape',
      })
      layer.add(video_shape)

      anim?.start()
    }
    /**
     *@description 重置视频大小
     */
    function handleResetVideoSize() {
      if (crude_player_video.value) {
        crude_player_video.value.style.width = `auto`
        crude_player_video.value.style.height = `auto`
        tools.video.width = crude_player_video.value.offsetWidth
        tools.video.height = crude_player_video.value.offsetHeight
      }
    }

    /**
     * @description 开始捕获到画布
     */
    const handleStartCaptureToCanvas = () => {
      if (crude_player_video.value && preview_player_canvas.value) {
        handlePlayCanvas(crude_player_video.value)
      }
    }
    /**
     * @description 开始捕获
     */
    const handleStartCapture = async () => {
      try {
        crude_media = await (navigator.mediaDevices as any).getDisplayMedia({
          video: {
            cursor: 'always',
          },
          audio: false,
        })

        if (crude_player_video.value) {
          crude_player_video.value.srcObject = crude_media
          button_usable.start_disabled = true
          button_usable.stop_disabled = false
          handleStartCaptureToCanvas()
          handleStartRecorderCanvas()
        }
      } catch (error) {
        console.log(error)
      }
    }
    /**
     * @description 停止捕获
     */
    const handleStotCapture = () => {
      if (crude_player_video.value) {
        const tracks = (crude_player_video.value.srcObject as any).getTracks()
        tracks?.forEach((track: any) => track.stop())
        crude_player_video.value.srcObject = null
      }
    }
    /**
     * @description 使（textarea）coodoo_doll始终与 （canvas）preview_player_canvas 保持一致的位置
     */
    const handleCoodooDollAppendage = () => {
      if (coodoo_doll.value) {
        coodoo_doll.value.style.width =
          (tools.video.width || layer?.width()) + 'px'
        coodoo_doll.value.style.height =
          (tools.video.height || layer?.height()) + 'px'
        coodoo_doll.value.style.left =
          preview_player_canvas_box.value?.offsetLeft + 'px'
        coodoo_doll.value.style.top =
          preview_player_canvas_box.value?.offsetTop + 'px'
      }
    }

    /**
     *@description 使（canvas）preview_player_canvas 始终与 （textarea）coodoo_doll 保持一样的大小 保持视频比例
     */
    const handleResize = (entries: any[]) => {
      const roEntry = entries[0]
      if (stage && crude_player_video.value) {
        stage.width(roEntry.borderBoxSize[0].inlineSize)
        stage.height(roEntry.borderBoxSize[0].blockSize)
        const [width, height] = [stage.width(), stage.height()]
        stage.getChildren().forEach((c) => {
          c.canvas._canvas.width = width
          c.canvas._canvas.height = height
        })
        tools.video.width = width
        tools.video.height = height
        const _crude_player_video = crude_player_video.value
        _crude_player_video.style.width = `${width}px`
        _crude_player_video.style.height = `auto`

        if (_crude_player_video.offsetHeight > height) {
          _crude_player_video.style.width = `auto`
          _crude_player_video.style.height = `${height}px`
          video_shape?.width(_crude_player_video.offsetWidth)
          video_shape?.height(height)
        } else {
          _crude_player_video.style.width = `${width}px`
          _crude_player_video.style.height = `auto`
          video_shape?.width(width)
          video_shape?.height(_crude_player_video.offsetHeight)
        }
        video_shape?.x((width - _crude_player_video.offsetWidth) / 2)
        video_shape?.y((height - _crude_player_video.offsetHeight) / 2)
      }
    }
    /**
     * @description 下载
     */
    const downloadVideo = () => {
      download(
        window.URL.createObjectURL(new Blob(allChunks, { type: 'video/webm' })),
        'video.webm'
      )
    }

    watch(
      () => tool_ta.val,
      (newVal: string) => {
        console.log(newVal, tr_layer)

        if (!tools.text || !tr) return false
        const _tool_text = tr.nodes()[0] as Text | null
        if (!_tool_text) return
        _tool_text.text(tool_ta.val)
        newVal.length !== 0
          ? _tool_text.setSize({
              width: 'auto',
              height: 'auto',
            })
          : _tool_text.setSize({
              width: _tool_text.fontSize() - 12,
              height: _tool_text.fontSize(),
            })
        tool_ta.style.width = _tool_text.width() + 'px'
        tool_ta.style.height = _tool_text.height() + 'px'
        _tool_text.width(_tool_text.width() + 12)
        tool_ta.style.top =
          document.documentElement.scrollTop +
          (stage as Stage).container().getBoundingClientRect().y +
          _tool_text.y() +
          'px'
      }
    )
    /*************调用*************/

    const roTextarea = new window.ResizeObserver(handleResize)
    onMounted(() => {
      handleInitKonva()
      handleInitTool()
      time = setInterval(handleCoodooDollAppendage, 16)
      if (coodoo_doll.value) {
        roTextarea.observe(coodoo_doll.value)
      }
    })
    onUnmounted(() => {
      clearInterval(time)
      if (coodoo_doll.value) {
        roTextarea.unobserve(coodoo_doll.value)
      }
    })
    onBeforeRouteLeave(async () =>
      window.confirm('确认离开吗？(正在录制的视频会丢失)')
    )

    return {
      preview_player_canvas_box,
      preview_player_canvas,
      crude_player_video,
      preview_player_video,
      coodoo_doll,
      ...toRefs(tool_ta),
      button_usable,
      tools,
      allChunks,
      downloadVideo,
      handleRequestPIP,
      handleStartCapture,
      handleStotCapture,
      handlePauseRecorderCanvas,
      handleResumeRecorderCanvas,
      handleResetVideoSize,
      handleSelectTool,
    }
  },
})
</script>
<style lang="scss" scoped>
.toolbar {
  margin: -20px -20px 0;
  background-color: #32343e;
  .tools {
    display: flex;
    justify-content: center;
    .tool-item {
      cursor: pointer;
      .active {
        background-color: #191a1f;
      }
    }
  }
}
.tool-item,
.popover {
  :deep(.el-button) {
    background-color: #32343e;
    border-color: #191a1f;
    padding: 4px;
    color: #c0c4cc;
    &.is-disabled,
    .is-disabled:hover,
    .is-disabled:focus {
      color: #606266;
    }
    &.active {
      background-color: #191a1f;
    }
    .iconfont {
      margin: 0;
    }
  }
  :deep(.el-color-picker__trigger) {
    padding: 0;
  }
}
.label {
  display: inline-block;
  font-size: 14px;
  width: 30px;
}
.el-col {
  margin-bottom: 10px;
}
.preview-container {
  position: relative;
  display: flex;
  .preview-player-canvas {
    margin: 0 auto;
    background-color: #000;
  }
  .coodoo-doll {
    position: absolute;
    background-color: transparent;
    min-width: 300px;
    min-height: 150px;
    outline: none;
    left: 0;
    top: 0;
  }
}
.black-hole {
  position: fixed;
  z-index: -999999;
}
.el-input {
  width: 150px;
}
.tool-textarea {
  position: absolute;
  display: none;
  outline: none;
  resize: none;
  background-color: transparent;
  border: 1px solid;
  overflow: clip;
  padding: 0 6px;
  box-sizing: content-box;
  transform-origin: left top;
}
.cursor_pen {
  cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAeCAMAAAB3ypxcAAABblBMVEUAAAAAAAA5od0kaZFPsekBBAU4oN08pN8+peA4od03n9xUs+k1nttLrudIrOU1nts1nttFqeQ1nttDqOJPsekCAgJDqOM1nts6ot45ot45od41nts4od04od01nts3oN0AAABebHQOKDdPc4hOruY1nttFquQYNUVPsekAAAA1nttLqN1KreY1nttCqOI1ntsdQFRCp+I1nttPselBp+JPsekAAAA1nttApuEFBQU3n9wAAABBp+FPsek/peAAAAA1nts+peAAAAAAAAAhZIpFquQAAAA7ot45od01nttPsek1ntsAAABNsOhMr+g3n91EqeM+pOCg3P+e2/6b2v1guu1KrudIrOVBp+I6ot5mZmai3f+W1/yU1vuM0vp/yvZ5x/RvwvFqwPFkvO9ZtutXtetRs+qQ1PqJ0PiGzvdGq+VhYWEsLCyZ2P2CzPZ8yfV1xfNkuOgzj8QxibwiZIsgWn1HR0dFRUUeHh4VFRWV3dacAAAASnRSTlMAMwsD+/qET0Y5HP779vLw6eLe1svIraSQZls9LicVDwn8/Pn38+rp3t7Y0czMycnHw8C9ure0sZ+amZmWgXt7eHJXSzk0LSEGBlKiPSEAAAFdSURBVDjLlZFlVwJBGIVHQFJKBAEpu7u7a2Zkl11K6QbB7n/vrofYDzOuPp+fc9/z3guWJ3ZPgTx9EE5vBmS1VZVqvGE/6hL5NW4Bf35gke4tBV0L2DGu128EhnM2Hd1TbgtJX433wSe+YthT0sW1n5MvbKnC5xfPqdqxqL3FoxBmuZrRTT07ifFQKHYFISwk7yIOP8Xbx93PbBCKlGuJrFVL1s7wK8OKYSJ5PmVwXhC9k1mE4sGmV0zzOZuH6F2qEbqOtQKzXHXkEBAZ6EUM2wqMJMORFT3R8/cjFIo2vfJ94sGkAUTcZsTctj8Jp0ob5JH1S0Jg5xMuZ6WMfNAj+eSRq6rU5JE9U4iJSz4pzHmJnsIpVBNtBpYziYzJBYhoLaizSSGcKu6QPd+6pJpSOqMFFFyjkmpmABXvfHtkowLQUapb1Ui3oI/sADIoxJHHgDwas8UH/oBeB/7DNwa5abtU8pZqAAAAAElFTkSuQmCC')
      1 1,
    crosshair;
}
.cursor_rect {
  cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAVFBMVEUAAAAAAQEBAQEAAQEAAQEAAQH6+voAAQEAAQH///8AAQEAAQEBAQH6+vr29vYAAQH9/f3X19cBAQHz8/Pb29vW1tb39/f///8Amf8AAAAPDw8JCQnBqEODAAAAF3RSTlMAF0UPBwznAhz1My8S1m0n1I4G3Ix9fDmxnp0AAACfSURBVDjL1dHLDsIgEIVhWmYoBVpsvYzY939PIcYIZULswoX/+gs5gDjSSFVjAeheRYcBFXGgz2JBl8UCkfW/oOj7px7m0zy0AEyPCVrfjRQIhXCm32XcC8gIpBCr63a5tQB8N0WxQLG0tE5t4V1aWnf5nHC+IgO0t9ZEYKz1HTAAUEodgZYSod5Q34IHalNNgItasAVAew0tMEDa96uenzAb6U3BJUoAAAAASUVORK5CYII=')
      8 23,
    crosshair;
}
.cursor_circle {
  cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABZ0lEQVRYR+2WwUrDQBCGv6m9+gCCN8GbePIsglR9BpGCSlOPgg/gAwgebYoKRXwGtQji2ZN4E7wJPoBX7ciSBGpM3G5imgrZa2Z2vsz8MztCyUf+JH5HFxGWgNnwvleUB9ryaLs/H0BXN4B9Biwg3AIvYcA5lFVqPAHHtOQqDSQ7gK+HgMeAA/bkMjHAiW5S4wjw8cTY/zjZAILgDeqssSPvv6b5TKf54AboJ0G4A5i0K+fUmbcGj8gCiGeE7Xg5sgD0+aSXmva0dJhyTNGkJY1hEzcAo3a4pi0zNnUnfu/oG7A+3B1uAL7uAst4spUJwNcL4B5PTiN/V4BAySmKtkIF4v3m/+8ASi5B6SI09etqiW0YAJQ8iAzEGEbxXdhSK6mtVfBjZAeIylHQczwaQJSeAhYSNwDrCEw3iCZhfFlohi69mGviUpEjPhMDEP+JsZegApi4DOQRtpOv20LidPVoxhVAlYEvLJ6aIW75hEMAAAAASUVORK5CYII=')
      8 23,
    crosshair;
}
.cursor_ellipse {
  cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAvVBMVEUAAAAAAQEAAQEBAQEAAQEAAQEAAQH6+voAAQEAAQH6+vr+/v4BAQEAAQEAAQEAAQH6+vr///8AAQH9/f3Z2dnT09Pt7e3///+8vLzX19fz8/MBAQEBAQHz8/Pb29vW1tb39/f///////8Amf8AAADw+f+u3/9Ftf+l2/8epf8SoP/1+//U7v9NuP8tq/8kqP/5/f89sf/z+v/p9v/O7P/C5/+04f+h2f+b1/9owv9avf9Uu/8PDw8JCQk5sP/TE3LJAAAAInRSTlMAEAYDGAwK5zUdbPhJMC4o1i0j1Mi4t6mQjolPQNyMfXxMRVxzdgAAAU9JREFUOMu1kNdywjAQRWNZcqFD6JB2F3ds02vI/39W7GAgRh5m8pDztDt7tLrS058pIaNUOG5i5h4ioujgzvAhzwHXowwvUaS55RA57tSypm5aWbjfH1K0AsrtdhlYRRSimV9gU2yhYtRbrbpRgRWTjbzg0AY1LpiqMsFr2JBzJ/hkdTX13Kha1yJfEoLhrR0GkuDkLoUtXWGTt8S1W3r3IRUcKV4D5V6vDKxjOkLJCRqCkOhrm37Udk4UBtBygsqBnU8Z/g7glyeVnktpycw+FvZ+7nnzvb1A32TZUdb4bLCfghsdZHQMzi67BSYQ513CrI4ro1FlXDWF+iv+5JpX1RSeoGQ/Kgky7zqAREhIk8rop8mFNKnM623Dy5tWIPB6rWokglGt1XnRBiYUxUwEU1EEkzPIrygW9JP+UBADfSAeCYy3cvkkVKYl+f6Lb/I3KtiRoGfXAAAAAElFTkSuQmCC')
      8 23,
    crosshair;
}
.cursor_line {
  cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAUVBMVEUAAAD///8AAQEAAQEAAQEAAQEAAQEAAQH4+PgAAQH6+vrZ2dn29vb9/f39/f0AAQHz8/PW1tb39/f////q9/8tq/8AAAAAmf9Cs/8MDAzS7f95fmi/AAAAE3RSTlMA/AYaDzEMCugn1o1t5NQc3H18YZz/NQAAAJlJREFUOMvlkMsSgyAMRXmEgKK1bZSC//+hDYt2Q4MznXHlWbDg3LmQqH/RpPt+zbvu+u2Vqe+3VR95f+CtuahXlEU/3abasGfBm7GMfO81Cf1IiZBzdhDeBw5AbfLs5YDAcyYmEVN/2jKX9KH+tCWGb8P94VWLHZxzHODz9wwGARYOLADIvjuFDIQSugGMIaKs2x231B2fxhubCwvXcfvwOAAAAABJRU5ErkJggg==')
      8 23,
    crosshair;
}
.cursor_line_arrow {
  cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAtFBMVEUAAAAAAQEAAQEAAQEAAQEAAQEAAQH8/Pz////39/cAAQH///8BAQH+/v7+/v7Z2dn29vYAAQEBAQH09PT19fUAAQHb29v////z8/Pf39/W1tb39/eZmZkBAQEAmf////8AAAAKnv/W7/9As/8gpv+o3P+Bzf9mwv/2+//P7P+/5v9+y/9qxP9Uu/9OuP8rq/8PDw8JCQnt+P/k9P/b8f/M6/+c1/+Hz/9gv/85sP8Yo/8SoP87kalpAAAAHnRSTlMABg8bLwwK1fzoKPkT9OSNbTMh4toXtKekon18fD3AVYQ2AAABDklEQVQ4y7WR13LCQAxFvc0NY2MD6Vm5G0IL6eX//yueTMxGwvFMHjiv98yVtGv9G8eFb9zz3ngEed28l7uieX2E8XEOy0If2Dy5R/ldpn/xsQTS3+aIzzzEBYUmvAEWMirsiFBSoSDCigov+I4Ld4vzNXAk2OPFWhuyGma2hQimkDc/i5SrB7jkFobN5RSg0rp+XgCc+YFFYTyRsMkq8G5upVAmmDiTThlV2xziRAQ2Mzlz7h1mPnTsc4abFaSgOjlIhE1Hc0jNxcx0U6Gf6xBaUmjpNsWE+7Sj2xQTeYeG2ZXdIwhfyrgVYin9eV8DU5yLVhCcK5QPX0EFb+8NCiryIjUkMOGLv+ab5z0ZXwHTJhKr3VNIAAAAAElFTkSuQmCC')
      8 23,
    crosshair;
}
.cursor_curve_arrow {
  cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAq1BMVEUAAAAAAQEBAQEBAQEAAQEAAQH7/v/+/v4AAQEAAQH4+Pj+/v4AAQH////+/v76+vrZ2dn29vYBAQEAAQH///8AAQEAAQEAAQH6+vrz8/P4+PjW1tb39/fY2NiDg4NiYmL///8Amf8AAABHtv+w4P9fv/8vrP8Mnv/z+v/q9//e8v+Gz/9Suv9Cs/8Pn/8PDw8JCQnM6/+95f+c1/+Q0/+K0P9sxP8/sv8kp//ZASEmAAAAIHRSTlMADhIEBwv+8ika6NQ09eXWjW09JX0wLxfd3K99fF9XOnPWdPcAAAELSURBVDjLtZHHbsMwEETZVSzJshTb6dlVdY/T8/9flmUQGwFICcgh76KDHgfDIfsrKZxJvQLs8Yc9+IUaT/iFAAjz+jko8LAwq3okQfI70yG2z1bwA2/YNwAjQocvkAwLF2s8mAcxLAQN1sDZsADvuDV2jxp8+RPY9Li5/t4jcH5nsH7aHrAFbfcIuZu+Q+JjdSlpD63lr3Vmk5kkoe27XWNS96iaPk4VYxMggvuldAQNFWj6lEWRlEIyB04Ct+8gBFfMgyBBsAFuMyAqIGxTl+xYnbBNXfL4nHB1oz1CFC7mCQnJfBEufQmKqkckRIJr5XZwb+EX4mM8KvA8zvmYoKIyUmOCVLbff/EFSDAdwARbIYAAAAAASUVORK5CYII=')
      8 23,
    crosshair;
}
.cursor_highlight {
  cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABO1BMVEUAAAAAAQAAAQAAAQAAAQAAAQAAAQAAAQCioqIAAQD+/v74+PgAAQD8/PzOzs79/f34+Pj09PTFxcXPz8/8/Pzx8fH09PTR0dHZ2dnt7e35+fnr6+v8/PwAAQAAAQDj4+MAAQBsbWwAAQBUVVT5+fn4+Pj09PTS0tLi4uL4+Pjh4eHv7+/v7+/V1dXq6urDw8OPj4/q6urT09O7u7vu7u7i4uKvr6/q6uq7u7uxsbGampqKiorMzMwvMC+Hh4c1NjVThur///9Vh+r7/P++0ff5+/7A0/eGqvCEqPB7ou/3+f6hvvTD1filwPTn7vzf6fvK2vmKrPFql+1Ziuvs8v3O3fm5zve2zPawx/WtxvWcufOVtfKQsfGMrvF+pe92n+5wm+5nlOxdjevx9f3v9P3X4/rS4PpjkexbjOu/lhjaAAAAQHRSTlMAAwgGDRILD0Ee93MWvWL13MhlWubOwL+9uritoT83Ni4mJB3j0s/Ft7GxsKOenYmGg2lSTUdAPjw7NTItJiIdqacGdQAAAcBJREFUOMt1k9dS40AQRT3SSLK8stdeMiwsYXPOeZe5tkVwDuSc4f+/gJ6R5AZK3CdV3aPu06pShiMe5HP5b5YtMqmhHjpD0hLp/Y9X2O9vE+GkEuIxgEulmsCjNEI8QbjV2FXphPHDpopSJ8JjU/ZrqwFRycpbhPg6iW6/q5Js4PlQTLDfiRpkJWwDBY882K/Z2LvRN8pNIsg03j+p/bivNMrGtBCbar/1u70mioFrgDz2T7o3+iXqdc7xRRoA6KuUfrWCfzKeUB30y9zX8NqPgL85VMsp/fhs7GD9NITpq9y/mJ6P77RlNgf9JvdqGxib8eOPKSwv+5AI7ik7wEvfIyAiHCIuTM/n1DAxp0ckM4poJfs75uHoDCO/mZCLJVQTvw3zcNzG0zk3IWz3V3TLagigaYirdQz/p0MS4ru+5SDE2EdgTx+91evgrbQzCSHJdA0Yn575gPBQHQBrRyg6FpUD0xJG3s3O+/4UTnu7AI4x7LgZJqTzx/cDR8pgAq1ep1bfwRsG9BbLla5l27a7MIrW8mE9xGe9goko2nihBJ2pwEhyeJb3afTZ+0Jw738qLNdzHE/e+6sLGkKxaeE1LwGGK+iTur8AAAAASUVORK5CYII=')
      8 10,
    default;
}
.cursor_pointer {
  cursor: pointer;
}
.cursor_text {
  cursor: text;
}
.cursor_image {
  cursor: crosshair;
}
.cursor_cert_blur {
  cursor: crosshair;
}
.cursor_move {
  cursor: move !important;
}
</style>

