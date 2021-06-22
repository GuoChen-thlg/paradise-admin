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
          <el-input size="small" type="number" v-model.number="tools.size">
            <template #append>px</template>
          </el-input>
        </div>
      </div>
    </div>
    <h1>录制视频</h1>
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
          resize: tools.video.lock_canvas_size ? 'none' : 'both',
          zIndex: tools.video.lock_canvas_size ? -99999 : 3,
        }"
        ref="coodoo_doll"
        disabled
      ></textarea>
    </div>
  </el-main>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, ref } from 'vue'
import { download } from '@/utils/util'
import { onBeforeRouteLeave } from 'vue-router'
import Konva from 'konva'
import { Stage } from 'konva/lib/Stage'
import { Layer } from 'konva/lib/Layer'
import { Image } from 'konva/lib/shapes/Image'
import { Animation } from 'konva/lib/Animation'
import { AnimationFn, IFrame, Vector2d } from 'konva/lib/types'
import { Line } from 'konva/lib/shapes/Line'
import { Shape } from 'konva/lib/Shape'
import { Rect } from 'konva/lib/shapes/Rect'
import { Circle } from 'konva/lib/shapes/Circle'
import { Ellipse } from 'konva/lib/shapes/Ellipse'
import { Text } from 'konva/lib/shapes/Text'
import { pen } from '@/utils/style/cursor'
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
    /** */
    let stage: Stage | null = null
    let layer: Layer | null = null
    let video_shape: Image | null = null
    let anim: Animation | null = null
    let global_index = 0
    /**  */
    let isPaint = false
    let tool_line: Line | null = null
    let tool_rect: Rect | null = null
    let tool_circle: Circle | null = null
    let tool_ellipse: Ellipse | null = null
    let tool_text: Text | null = null
    let tool_image: Image | null = null
    let temStorage: any = null
    /** */
    const tools = reactive({
      video: {
        width: 305,
        height: 150,
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
    /**视频信息 */
    const video_info = reactive({
      width: 1778,
      height: 1000,
    })
    /** 定时器 */
    let time: any = null

    /*****************************************函数声明*****************************************/
    /**动画回调 */
    let handleAnimBack: AnimationFn = (frame?: IFrame | undefined) => {
      //
      if (crude_media?.active === false) {
        anim?.stop()
        button_usable.start_disabled = false
        button_usable.stop_disabled = true
        canvas_media_recorder.value?.stop()
        button_usable.pause_disabled = true
        button_usable.resume_disabled = true
      }
    }
    /**
     * @description 选择工具
     */
    const handleSelectTool = (handle: string) => {
      const handles: {
        [k: string]: (b: boolean) => void
      } = {
        pen: (b) => {
          tools.pen = b
          if (b) {
            tools.size = 4
            tools.color = `${
              (
                tools.color.match(
                  /[rgba]{3,4}\((\d+,\s*){3}/
                ) as RegExpMatchArray
              )[0]
            }1)`
            ;(stage as Stage).container().style.cursor = pen
            console.log('pen')
          }
        },
        rect: (b) => {
          tools.shapes.rect = b
          if (b) {
            ;(stage as Stage).container().style.cursor = ''
          }
        },
        circle: (b) => {
          tools.shapes.circle = b
          if (b) {
            ;(stage as Stage).container().style.cursor = ''
          }
        },
        ellipse: (b) => {
          tools.shapes.ellipse = b
          if (b) {
            ;(stage as Stage).container().style.cursor = ''
          }
        },
        line: (b) => {
          tools.line = b
          if (b) {
            ;(stage as Stage).container().style.cursor = ''
          }
        },
        line_arrow: (b) => {
          tools.arrow.line_arrow = b
          if (b) {
            ;(stage as Stage).container().style.cursor = ''
          }
        },
        bezier_arrow: (b) => {
          tools.arrow.bezier_arrow = b
          if (b) {
            ;(stage as Stage).container().style.cursor = ''
          }
        },
        big_head_arrow: (b) => {
          tools.arrow.big_head_arrow = b
          if (b) {
            ;(stage as Stage).container().style.cursor = ''
          }
        },
        text: (b) => {
          tools.text = b
          if (b) {
            tools.size = 16
            ;(stage as Stage).container().style.cursor = ''
          }
        },
        rect_blur: (b) => {
          tools.rect_blur = b
          if (b) {
            ;(stage as Stage).container().style.cursor = ''
          }
        },
        highlight: (b) => {
          tools.highlight = b
          if (b) {
            tools.size = 16
            tools.color = `${
              (
                tools.color.match(
                  /[rgba]{3,4}\((\d+,\s*){3}/
                ) as RegExpMatchArray
              )[0]
            }0.6)`
            ;(stage as Stage).container().style.cursor = ''
          }
        },
      }
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
      stage.draw()
    }

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

    const handleInitTool = () => {
      if (!stage) return false
      stage.on('mousedown', function () {
        const pos = (stage as Stage).getPointerPosition()
        switch (true) {
          case tools.pen || tools.highlight:
            isPaint = true
            if (pos) {
              tool_line = new Konva.Line({
                stroke: tools.color,
                strokeWidth: tools.size,
                points: [pos.x, pos.y],
              })
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
                x: pos.x,
                y: pos.y,
                width: 0,
                height: 0,
                stroke: tools.color,
                strokeWidth: tools.size,
              })

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
                x: pos.x,
                y: pos.y,
                radius: 0,
                stroke: tools.color,
                strokeWidth: tools.size,
              })
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
                x: pos.x,
                y: pos.y,
                radiusX: 0,
                radiusY: 0,
                stroke: tools.color,
                strokeWidth: tools.size,
              })
              layer?.add(tool_ellipse)
            }

            break
          case tools.line:
            isPaint = true
            if (pos) {
              tool_line = new Konva.Line({
                stroke: tools.color,
                strokeWidth: tools.size,
                lineCap: 'round',
                lineJoin: 'round',
                points: [pos.x, pos.y],
              })
              layer?.add(tool_line)
            }
            break
          case tools.text:
            isPaint = true
            if (pos) {
              tool_text = new Konva.Text({
                text: 'text',
                x: pos.x,
                y: pos.y,
                draggable: true,
                fill: tools.color,
                fontSize: tools.size,
              })
              layer?.add(tool_text)
            }
            break
          case tools.rect_blur:
            isPaint = true
            if (pos && preview_player_canvas.value) {
              tool_image = new Konva.Image({
                image: preview_player_canvas.value,
                x: pos.x,
                y: pos.y,
                width: 0,
                height: 0,
                crop: {
                  x: pos.x,
                  y: pos.y,
                  width: 0,
                  height: 0,
                },
              })
              layer?.add(tool_image)
            }
            break

          default:
            break
        }
        console.log('mousedown', isPaint)
      })
      stage.on('mouseup touchend', function () {
        switch (true) {
          case tools.pen:
          case tools.highlight:
          case tools.shapes.rect:
          case tools.shapes.circle:
          case tools.shapes.ellipse:
          case tools.line:
          case tools.text:
          case tools.rect_blur:
            isPaint = false
            temStorage = null
            break

          default:
            break
        }
      })
      stage.on('mouseleave', function () {
        isPaint = false
        console.log('mouseleave')
      })
      stage.on('mousemove', function () {
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
              tool_image.cache()
              tool_image.filters([Konva.Filters.Blur])

              layer?.batchDraw()
            }
            break

          default:
            break
        }
        console.log('mousemove', isPaint)
      })
    }

    /**
     * @description 开始录制画布
     */
    const handleStartRecorderCanvas = () => {
      const canvasMediaStream = (
        preview_player_canvas.value as any
      )?.captureStream(60) as MediaStream | null //  FPS 部分浏览器尚未实现

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
        console.log('重新开始')
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
      video_shape.zIndex(global_index)
      global_index++
      anim?.start()
    }
    const handleResetVideoSize = () => {
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
        ;(preview_player_canvas.value as HTMLCanvasElement).width = width
        ;(preview_player_canvas.value as HTMLCanvasElement).height = height
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

    const downloadVideo = () => {
      download(
        window.URL.createObjectURL(new Blob(allChunks, { type: 'video/mp4' })),
        'video.mp4'
      )
    }
    /*************调用*************/
    //

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
      button_usable,
      tools,
      allChunks,
      video_info,
      downloadVideo,
      handleRequestPIP,
      handleStartCapture,
      handleStotCapture,
      handlePlayCanvas,
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
</style>
