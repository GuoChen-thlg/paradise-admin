<template>
  <el-main class="share">
    <h1>录制视频</h1>
    <div class="preview-container">
      <!-- 视频流比例适配 -->
      <video
        id="preview-player-video"
        class="preview-player-video"
        ref="preview_player_video"
        autoplay
      ></video>
      <!-- 视频加工及预览 -->
      <canvas
        id="preview-player-canvas"
        class="preview-player-canvas"
        ref="preview_player_canvas"
        width="400"
      ></canvas>
      <!-- 布娃娃 -->
      <textarea
        class="coodoo-doll"
        :style="{
          resize: lock_canvas_size ? 'none' : 'both',
          zIndex: lock_canvas_size ? -99999 : 3,
        }"
        ref="coodoo_doll"
        disabled
      ></textarea>
    </div>
    <video id="video" controls autoplay></video>
    <div class="console-container">
      <el-button-group>
        <el-button :disabled="button_usable.start_disabled" @click="handleStartCapture">开始</el-button>
        <el-button :disabled="button_usable.stop_disabled" @click="handleStotCapture">结束</el-button>
      </el-button-group>
      <el-button-group>
        <el-button :disabled="button_usable.pause_disabled" @click="handlePauseRecorderCanvas">暂停</el-button>
        <el-button :disabled="button_usable.resume_disabled" @click="handleResumeRecorderCanvas">恢复</el-button>
        <el-button @click="downloadVideo">Download</el-button>
      </el-button-group>
      <el-input v-model.number="video_info.width" />
      <el-input v-model.number="video_info.height" />
      <el-switch v-model="lock_canvas_size"></el-switch>
    </div>
  </el-main>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  unref,
} from 'vue'
import { download } from '@/utils/util'
import { onBeforeRouteLeave } from 'vue-router'
import { brushLine, brushPoint } from '@/types/brush'
export default defineComponent({
  name: 'Share',
  setup() {
    const capture = ref<HTMLIFrameElement | null>(null)
    const preview_player_video = ref<HTMLVideoElement | null>(null)
    const preview_player_canvas = ref<HTMLCanvasElement | null>(null)
    const coodoo_doll = ref<HTMLTextAreaElement | null>(null)
    const video_aspect_ratio = ref(0)
    const lock_canvas_size = ref(true)
    const canvas_media_recorder = ref<any>(null)
    const allChunks: any[] = reactive([])
    const button_usable = reactive({
      start_disabled: false,
      stop_disabled: true,
      pause_disabled: true,
      resume_disabled: true,
    })
    const video_info = reactive({
      width: 1920,
      height: 1080,
    })
    

    /** 定时器 */
    let time: any = null
    const canvasDrawboard = reactive<{
      painting: boolean,
      line: brushLine[][],
      ciecle: brushPoint[]
    }>({
      painting: false,
      line: [],
      ciecle: []
    })






    /* 函数声明 */
    // const _postMessage = (message: any) => {
    //   capture.value?.contentWindow?.postMessage(message, '/')
    // }

    /**
     * @description 开始录制画布
     */
    const handleStartRecorderCanvas = () => {
      const canvasMediaStream = (preview_player_canvas.value as any)?.captureStream(
        60
      ) as MediaStream | null //  FPS 部分浏览器尚未实现

      if (canvasMediaStream) {
        canvas_media_recorder.value = new (window as any).MediaRecorder(
          canvasMediaStream,
          {
            mimeType: 'video/webm; codecs=vp9',
            videoBitsPerSecond: 8500000,
          }
        )
          ; (document.querySelector(
            '#video'
          ) as HTMLVideoElement).srcObject = canvasMediaStream


          ; (document.querySelector(
            '#video'
          ) as HTMLVideoElement).onloadeddata = () => {
            console.log()
              ; (document.querySelector(
                '#video'
              ) as any).requestPictureInPicture()
          }


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
    const handlePlayCanvas = (
      srcvideo: HTMLVideoElement,
      ctx: CanvasRenderingContext2D
    ) => {
      const _preview_player_video = preview_player_video.value as HTMLVideoElement
      let _offsetWidth = _preview_player_video.offsetWidth
      let _offsetHeight = _preview_player_video.offsetHeight
      video_aspect_ratio.value = _offsetWidth / _offsetHeight
      const {
        width,
        height,
      } = preview_player_canvas.value as HTMLCanvasElement
      ctx.clearRect(0, 0, width, height)
      ctx.beginPath()
      ctx.fillStyle = '#000'
      ctx.rect(0, 0, width, height)
      ctx.fill()
      ctx.closePath()
      if ((srcvideo.srcObject as MediaStream | null)?.active) {
        const startX = (width - _offsetWidth) / 2
        const startY = (height - _offsetHeight) / 2
        const stopX = startX + _offsetWidth
        const stopY = startY + _offsetHeight
        ctx.beginPath()
        ctx.drawImage(
          srcvideo,
          startX,
          startY,
          _offsetWidth,
          _offsetHeight
        )
        ctx.closePath()
        /* 绘画 */
        canvasDrawboard.ciecle.forEach(({ x, y, radius, color, zIndex }) => {
          ctx.beginPath()
          ctx.fillStyle = color || "#ff0000"
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fill()
          ctx.closePath()
        })


        /* 视频之外清除 */
        if (startX !== 0) ctx.clearRect(0, 0, startX, height)
        if (stopX !== width) ctx.clearRect(stopX, 0, width - stopX, height)
        if (startY !== 0) ctx.clearRect(0, 0, width, startY)
        if (startY !== height) ctx.clearRect(0, startY, width, height - stopY)
      }
      requestAnimationFrame(() => {
        if ((srcvideo.srcObject as MediaStream | null)?.active) {
          handlePlayCanvas(srcvideo, ctx)
        } else {
          button_usable.start_disabled = false
          button_usable.stop_disabled = true
          handleStopRecorderCanvas();
          (document as any).exitPictureInPicture()
          ctx.clearRect(0, 0, width, height)
        }
      })
    }

    /**
     * @description 开始捕获到画布
     */
    const handleStartCaptureToCanvas = () => {
      if (preview_player_video.value && preview_player_canvas.value) {
        const ctx = preview_player_canvas.value?.getContext('2d')
        ctx && handlePlayCanvas(preview_player_video.value, ctx)
      }
    }
    /**
     * @description 开始捕获
     */
    const handleStartCapture = async () => {


      try {
        const media = await (navigator.mediaDevices as any).getDisplayMedia({
          video: {
            cursor: 'always',
          },
          audio: false,
        })
        if (preview_player_video.value) {
          preview_player_video.value.srcObject = media
          button_usable.start_disabled = true
          button_usable.stop_disabled = false
          handleStartCaptureToCanvas()
          handleStartRecorderCanvas()
        }
      } catch (error) {
        console.log(error);

      }



    }
    /**
     * @description 停止捕获
     */
    const handleStotCapture = () => {
      if (preview_player_video.value) {
        const tracks = (preview_player_video.value.srcObject as any
        ).getTracks()
        tracks?.forEach((track: any) => track.stop())
        preview_player_video.value.srcObject = null
      }
    }
    /**
     * @description 使（textarea）coodoo_doll始终与 （canvas）preview_player_canvas 保持一致的位置
     */
    const handleCoodooDollAppendage = () => {
      if (coodoo_doll.value) {
        coodoo_doll.value.style.width =
          (video_info.width ||
            preview_player_canvas.value?.width) + 'px'
        coodoo_doll.value.style.height =
          (video_info.height ||
            preview_player_canvas.value?.height) + 'px'
        coodoo_doll.value.style.left =
          preview_player_canvas.value?.offsetLeft + 'px'
        coodoo_doll.value.style.top =
          preview_player_canvas.value?.offsetTop + 'px'
      }
    }

    /**
     *@description 使（canvas）preview_player_canvas 始终与 （textarea）coodoo_doll 保持一样的大小
     */
    const handleResizeCanvas = (entries: any[]) => {
      const roEntry = entries[0]
      console.log(roEntry);

      if (preview_player_canvas.value && preview_player_video.value) {
        preview_player_canvas.value.width =
          roEntry.borderBoxSize[0].inlineSize || 300
        preview_player_canvas.value.height =
          roEntry.borderBoxSize[0].blockSize || 150

        const { width, height } = preview_player_canvas.value
        video_info.width = width
        video_info.height = height
        const _preview_player_video = preview_player_video.value
        if (unref(video_aspect_ratio) < width / height) {
          _preview_player_video.style.width = `auto`
          _preview_player_video.style.height = `${height}px`
        } else {
          _preview_player_video.style.width = `${width}px`
          _preview_player_video.style.height = `auto`
        }
      }
    }
    const mousedown = (e: MouseEvent) => {
      // console.log(e);
    }
    const mousemove = (e: MouseEvent) => {
      // console.log(e);
    }
    const mouseup = (e: MouseEvent) => {
      // console.log(e);
    }
    const click = (e: MouseEvent) => {
      canvasDrawboard.ciecle.push({
        x: e.offsetX,
        y: e.offsetY,
        radius: 5
      })

    }
    const handleCanvasAddBrush = () => {
      if (!preview_player_canvas.value) return false
      const _canvas = preview_player_canvas.value
      _canvas.addEventListener("mousedown", mousedown)
      _canvas.addEventListener("mousemove", mousemove)
      _canvas.addEventListener("mouseup", mouseup)
      _canvas.addEventListener("click", click)
    }
    const handleCanvasRemoveBrush = () => {
      if (!preview_player_canvas.value) return false
      const _canvas = preview_player_canvas.value
      _canvas.removeEventListener("mousedown", mousedown)
      _canvas.removeEventListener("mousemove", mousemove)
      _canvas.removeEventListener("mouseup", mouseup)
      _canvas.removeEventListener("click", click)
    }



    const downloadVideo = () => {
      download(
        window.URL.createObjectURL(
          new Blob(allChunks, { type: 'video/mp4' })
        ),
        'video.mp4'
      )
    }
    /*************调用*************/

    const roTextarea = new window.ResizeObserver(handleResizeCanvas)
    onMounted(() => {
      time = setInterval(handleCoodooDollAppendage, 16)
      handleCanvasAddBrush()
      if (coodoo_doll.value) {
        roTextarea.observe(coodoo_doll.value)
      }
    })
    onUnmounted(() => {
      clearInterval(time)
      handleCanvasRemoveBrush()
      if (coodoo_doll.value) {
        roTextarea.unobserve(coodoo_doll.value)
      }
    })
    onBeforeRouteLeave(async () =>
      window.confirm('确认离开吗？(正在录制的视频会丢失)')
    )
    // window.addEventListener('message', ev => {
    //   const { data } = ev
    //   console.log('top', ev)
    //   switch (true) {
    //     case data.type === '=>top' &&
    //       data.data &&
    //       data.data.status === 200 &&
    //       data.data.action === 'startVideoStreams':
    //       button_usable.start_disabled = true
    //       button_usable.stop_disabled = false
    //       handleStartCaptureToCanvas()
    //       handleStartRecorderCanvas()
    //       break
    //     case data.type === '=>top' &&
    //       data.data &&
    //       data.data.status === 200 &&
    //       data.data.action === 'stopVideoStreams':
    //       button_usable.start_disabled = false
    //       button_usable.stop_disabled = true
    //       break

    //     default:
    //       break
    //   }
    // })
    return {
      capture,
      preview_player_canvas,
      preview_player_video,
      coodoo_doll,
      button_usable,
      lock_canvas_size,
      allChunks,
      video_info,
      downloadVideo,
      handleStartCapture,
      handleStotCapture,
      handlePlayCanvas,
      handlePauseRecorderCanvas,
      handleResumeRecorderCanvas,
    }
  },
})
</script>
<style lang="scss" scoped>
.preview-container {
  position: relative;
  display: flex;
}
.iframe-hidden {
  display: none;
}
.preview-player-video {
  position: fixed;
  z-index: -999999;
}
.preview-player-canvas {
  margin: 0 auto;
  background-color: #000;
}
.coodoo-doll {
  position: absolute;
  background-color: transparent;
  min-width: 300px;
  min-height: 150px;
  width: 300px;
  height: 150px;
  outline: none;
  left: 0;
  top: 0;
}
.el-input {
  width: 150px;
}
</style>
