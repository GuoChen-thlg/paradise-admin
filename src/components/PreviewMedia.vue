<template>
  <div class="preview-media__wrapper" :style="{ 'z-index': zIndex }">
    <div
      class="media-viewer__mask"
      @click="() => (hideOnClickModal ? hide() : void 0)"
    ></div>
    <span class="media-viewer__btn media-viewer__close" @click="hide">
      <i class="el-icon-close"> </i>
    </span>
    <span class="media-viewer__btn media-viewer__prev" @click="prev">
      <i class="el-icon-arrow-left"> </i>
    </span>
    <span class="media-viewer__btn media-viewer__next" @click="next">
      <i class="el-icon-arrow-right"></i>
    </span>
    <div class="media-viewer__btn media-viewer__actions">
      <div class="media-viewer__actions__inner">
        <i class="el-icon-zoom-out" @click="handleActions('zoomOut')"> </i>
        <i class="el-icon-zoom-in" @click="handleActions('zoomIn')"> </i>
        <i class="media-viewer__actions__divider"> </i>
        <i class="el-icon-full-screen" @click="toggleMode"> </i>
        <i class="media-viewer__actions__divider"> </i>
        <i class="el-icon-refresh-left" @click="handleActions('anticlocelise')">
        </i>
        <i class="el-icon-refresh-right" @click="handleActions('clocelise')">
        </i>
      </div>
    </div>
    <div class="media-viewer__canvas">
      <template v-for="(media, i) in mediaList" :key="media.id">
        <template v-if="media.type === 'image'">
          <img
            :src="media.src"
            alt=""
            :style="{
              ...mediaStyle,
              display: index === i ? 'initial' : 'none',
            }"
          />
        </template>
        <template v-else-if="media.type === 'video'">
          <video
            :src="media.src"
            :style="{
              ...mediaStyle,
              display: index === i ? 'initial' : 'none',
            }"
            controls
          ></video>
        </template>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
const CLOSE_EVENT = 'close'
const SWITCH_EVENT = 'switch'
const Mode = {
  CONTAIN: {
    name: 'contain',
    icon: 'el-icon-full-screen',
  },
  ORIGINAL: {
    name: 'original',
    icon: 'el-icon-c-scale-to-original',
  },
}
export default defineComponent({
  name: 'PreviewMedia',
  props: {
    mediaList: {
      type: Array,
      default: () => [],
    },
    zIndex: {
      type: Number,
      default: 2000,
    },
    initialIndex: {
      type: Number,
      default: 0,
    },
    infinite: {
      type: Boolean,
      default: true,
    },
    hideOnClickModal: {
      type: Boolean,
      default: false,
    },
  },
  emits: [CLOSE_EVENT, SWITCH_EVENT],
  setup(props, { emit }) {
    let keyDownHandler: any = null
    let mouseWheelHandler: any = null
    // let dragHandler: any = null
    const bodyStyleOver = ref('')
    const index = ref(props.initialIndex)
    const mode = ref(Mode.CONTAIN)
    let transform = ref({
      scale: 1,
      deg: 0,
      offsetX: 0,
      offsetY: 0,
      enableTransition: false,
    })
    const isSingle = computed(() => {
      const { mediaList } = props
      return mediaList.length <= 1
    })
    const isFirst = computed(() => {
      return index.value === 0
    })
    const isLast = computed(() => {
      return index.value === props.mediaList.length - 1
    })
    const currentMedia = computed(() => {
      return props.mediaList[index.value]
    })
    const reset = () => {
      transform.value = {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false,
      }
    }
    const prev = () => {
      if (isFirst.value && !props.infinite) return
      const len = props.mediaList.length
      index.value = (index.value - 1 + len) % len
    }
    const next = () => {
      if (isLast.value && !props.infinite) return
      const len = props.mediaList.length
      index.value = (index.value + 1) % len
    }
    const toggleMode = () => {
      mode.value =
        mode.value.name === Mode.CONTAIN.name ? Mode.ORIGINAL : Mode.CONTAIN
      reset()
    }
    const handleActions = (action: string, options = {}) => {
      const { zoomRate, rotateDeg, enableTransition } = Object.assign(
        { zoomRate: 0.2, rotateDeg: 90, enableTransition: true },
        options
      )
      switch (action) {
        case 'zoomOut':
          if (transform.value.scale > 0.2) {
            transform.value.scale = parseFloat(
              (transform.value.scale - zoomRate).toFixed(3)
            )
          }
          break
        case 'zoomIn':
          transform.value.scale = parseFloat(
            (transform.value.scale + zoomRate).toFixed(3)
          )
          break
        case 'clocelise':
          transform.value.deg += rotateDeg
          break
        case 'anticlocelise':
          transform.value.deg -= rotateDeg
          break
      }
      transform.value.enableTransition = enableTransition
    }
    const mediaStyle = computed(() => {
      const { scale, deg, offsetX, offsetY, enableTransition } = transform.value
      const style: {
        transform: string
        transition: string
        marginLeft: string
        marginTop: string
        maxWidth?: string
        maxHeight?: string
      } = {
        transform: `scale(${scale}) rotate(${deg}deg)`,
        transition: enableTransition ? 'transform .3s' : '',
        marginLeft: `${offsetX}px`,
        marginTop: `${offsetY}px`,
      }
      if (mode.value.name === Mode.CONTAIN.name) {
        style.maxWidth = style.maxHeight = '100%'
      }
      return style
    })
    const deviceSupportInstall = () => {
      keyDownHandler = (e: KeyboardEvent) => {
        switch (e.code) {
          case 'ArrowUp':
            handleActions('zoomIn')
            break
          case 'ArrowDown':
            handleActions('zoomOut')
            break
          case 'ArrowLeft':
            prev()
            break
          case 'ArrowRight':
            next()
            break
          case 'Space':
            toggleMode()
            break
          case 'Escape':
            hide()
            break
        }
      }
      mouseWheelHandler = (e: WheelEvent) => {
        const delta = (e as any).wheelDelta | -e.detail
        if (delta > 0) {
          handleActions('zoomIn', {
            zoomRate: 0.015,
            enableTransition: false,
          })
        } else {
          handleActions('zoomOut', {
            zoomRate: 0.015,
            enableTransition: false,
          })
        }
      }
      document.addEventListener('keydown', keyDownHandler)
      document.addEventListener('mousewheel', mouseWheelHandler)
      document.addEventListener('DOMMouseScroll', mouseWheelHandler)
    }
    const deviceSupportUninstall = () => {
      document.removeEventListener('keydown', keyDownHandler)
      document.removeEventListener('mousewheel', mouseWheelHandler)
      document.removeEventListener('DOMMouseScroll', mouseWheelHandler)
      keyDownHandler = null
      mouseWheelHandler = null
    //   dragHandler = null
    }

    const hide = () => {
      deviceSupportUninstall()
      ;(document.querySelector('body') as HTMLBodyElement).style.overflow =
        bodyStyleOver.value
      emit(CLOSE_EVENT)
    }

    onMounted(() => {
      deviceSupportInstall()
      bodyStyleOver.value = (document.querySelector(
        'body'
      ) as HTMLBodyElement).style.overflow
      ;(document.querySelector('body') as HTMLBodyElement).style.overflow =
        'hidden'
    })

    return {
      mediaStyle,
      index,
      handleActions,
      prev,
      next,
      toggleMode,
      hide,
    }
  },
})
</script>
<style lang="scss" scoped>
.preview-media__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .media-viewer__mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0.5;
    background: #000;
  }
}
.media-viewer__btn {
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  opacity: 0.8;
  cursor: pointer;
  box-sizing: border-box;
  user-select: none;
}
.media-viewer__close {
  top: 40px;
  right: 40px;
  width: 44px;
  height: 44px;
  font-size: 24px;
  color: #fff;
  background-color: #606266;
  border-color: #fff;
}

.media-viewer__next,
.media-viewer__prev {
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  font-size: 24px;
  color: #fff;
  background-color: #606266;
  border-color: #fff;
}
.media-viewer__prev {
  left: 40px;
}
.media-viewer__next {
  right: 40px;
  text-indent: 2px;
}
.media-viewer__actions {
  left: 50%;
  bottom: 0.3rem;
  transform: translateX(-50%);
  width: 2.82rem;
  height: 0.44rem;
  padding: 0 0.23rem;
  background-color: #606266;
  border-color: #fff;
  border-radius: 0.22rem;
  [class^='el-icon-'] {
    cursor: pointer;
  }
  .media-viewer__actions__inner {
    width: 100%;
    height: 100%;
    text-align: justify;
    cursor: default;
    font-size: 0.23rem;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
.media-viewer__canvas {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
