<template>
  <ul
    :class="['cube', { 'turn-on': spread }, { rotate: rotate }]"
    :style="style"
  >
    <template v-for="i in [1, 2, 3, 4, 5, 6]" :key="i">
      <li class="surface">
        <slot :name="`surface${i}`">
          <img :src="createImage(500, 500)" alt="" srcset="" />
        </slot>
      </li>
    </template>
    <li>
      <slot></slot>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { createImage } from '@/utils/default/image'
export default defineComponent({
  name: 'Cube',
  props: {
    // 棱长
    theLen: {
      type: String,
      default: '200px',
    },
    // 鼠标悬浮偏移距离
    offset: {
      type: String,
      default: '50px',
    },
    //鼠标悬浮是否可以打开
    spread: {
      type: Boolean,
      default: false,
    },
    // 旋转动画
    rotate: {
      type: Boolean,
      default: false,
    },
    // 角度
    angle: {
      type: String,
      default: '45deg',
    },
  },
  setup(props) {
    const style = reactive({
      '--theLen': props.theLen,
      '--offset': props.offset,
      '--angle': props.angle,
    })
    return {
      createImage,
      style,
    }
  },
})
</script>
<style lang="scss" scoped>
.cube {
  position: relative;
  list-style-type: none;
  width: var(--theLen);
  height: var(--theLen);
  transform: rotate3d(0.7, 0.5, 0.5, var(--angle));
  transform-style: preserve-3d;
  &.rotate {
    animation: rotate 10s infinite linear both;
  }
  & > li {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--theLen);
    height: var(--theLen);
    &.surface {
      border: 1px solid #000;
      overflow: hidden;
      opacity: 0.8;

      img {
        max-width: 100%;
      }
    }
  }
  & > .surface:nth-of-type(1) {
    transform: translateZ(calc(var(--theLen) / 2));
  }
  & > .surface:nth-of-type(2) {
    transform: rotateY(90deg) translateZ(calc(var(--theLen) / 2));
  }
  & > .surface:nth-of-type(3) {
    transform: rotateY(180deg) translateZ(calc(var(--theLen) / 2));
  }
  & > .surface:nth-of-type(4) {
    transform: rotateY(-90deg) translateZ(calc(var(--theLen) / 2));
  }
  & > .surface:nth-of-type(5) {
    height: var(--theLen);
    transform: rotateX(-90deg) translateZ(calc(var(--theLen) / 2));
  }
  & > .surface:nth-of-type(6) {
    height: var(--theLen);
    transform: rotateX(90deg) translateZ(calc(var(--theLen) / 2));
  }
  & > li:nth-of-type(7) {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid transparent;
  }
  &.turn-on:hover {
    & > .surface:nth-of-type(1) {
      transform: translateZ(calc(var(--offset) + var(--theLen) / 2));
    }
    & > .surface:nth-of-type(2) {
      transform: rotateY(90deg)
        translateZ(calc(var(--offset) + var(--theLen) / 2));
    }
    & > .surface:nth-of-type(3) {
      transform: rotateY(180deg)
        translateZ(calc(var(--offset) + var(--theLen) / 2));
    }
    & > .surface:nth-of-type(4) {
      transform: rotateY(-90deg)
        translateZ(calc(var(--offset) + var(--theLen) / 2));
    }
    & > .surface:nth-of-type(5) {
      height: var(--theLen);
      transform: rotateX(-90deg)
        translateZ(calc(var(--offset) + var(--theLen) / 2));
    }
    & > .surface:nth-of-type(6) {
      height: var(--theLen);
      transform: rotateX(90deg)
        translateZ(calc(var(--offset) + var(--theLen) / 2));
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotatex(0deg) rotateY(180deg) rotateZ(360deg);
  }
  // 20% {
  //   transform: rotate3d(1, 0.3, 0.3, 360deg);
  // }
  // 40% {
  //   transform: rotate3d(0.3, 1, 0.3, 0deg);
  // }
  // 60% {
  //   transform: rotate3d(0.3, 1, 0.3, 360deg);
  // }
  // 80% {
  //   transform: rotate3d(0.3, 0.3, 1, 0deg);
  // }
  100% {
    transform: rotatex(360deg) rotateY(180deg) rotateZ(0deg);
  }
}
</style>