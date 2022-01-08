<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  watch,
  toRefs,
  ref,
  onMounted,
  onBeforeMount
} from 'vue'

import Nprogress from 'nprogress'
export default defineComponent({
  name: 'App',

  setup() {
    Nprogress.inc()

    onBeforeMount(() => {
      Nprogress.set(0.9)
      document.querySelector(".loader[role='loader']")?.remove()
      document.querySelector("[role='loader-style']")?.remove()
    })
    onMounted(() => {
      Nprogress.done()
    })
    return {}
  }
})
</script>

<style lang="scss">
*,
*:after,
*:before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul,
ol,
li {
  list-style: none;
}
html {
  font-size: 100px !important;
}
@media screen and (max-width: 541px) {
  html {
    font-size: calc(100vw / 3.75) !important;
  }
}
@media screen and (max-width: 375px) {
  html {
    font-size: calc(100vw / 3.75) !important;
  }
}
body {
  font : {
    size: 0.16rem;
  }
  color: var(--theme-font-color);
}
// #app {

// }
.hidder-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
.clearfix::after {
  content: '';
  display: block;
  width: 0;
  height: 0;
  clear: both;
  font-size: 0;
  visibility: hidden;
  overflow: hidden;
}
x-vue-echarts {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.1rem;
}
// .el-main {
//   background: var(--theme-background-linear-gradient);
// }
.el-popper {
  & > .el-menu--vertical {
    max-height: 90vh;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.container {
  min-height: 100vh;

  // .el-main {
  //   // padding: 0;
  // }
}
.head-navigation {
  display: flex;
  padding: 0 !important;
  background-color: var(--header-background-color);
  // border-bottom: 3px solid var(--theme-border-color);
  &.fixed {
    position: fixed;
    right: 0;
    top: 0;
    z-index: 9e6;
    transition: left 0.3s cubic-bezier(0.4, 0, 1, 1);
    box-shadow: rgb(0 0 0 / 40%) 0px 10px 8px;
    border: none;
    @media only screen and (max-width: 768px) {
      left: 0 !important;
    }
  }
  .control-container {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
// .main-container {
// }
.aside-sidebar {
  background-color: var(--sidebar-background-color);
  transition: width 0.3s ease-in-out;
}
.open-close {
  display: inline-block;
  height: 100%;
  .el-icon-s-fold,
  .el-icon-s-unfold {
    height: 100%;
    width: 0.6rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 0.24rem;
    cursor: pointer;
  }
}

.el-footer {
  background-color: var(--theme-background-color);
}
.slogan-box {
  overflow: hidden;
}
.slogan {
  position: relative;
  background: -webkit-linear-gradient(
    0deg,
    rgb(255, 0, 0),
    rgb(255, 165, 0),
    rgb(255, 255, 0),
    rgb(0, 255, 0),
    rgb(0, 127, 255),
    rgb(0, 0, 255),
    rgb(139, 0, 255)
  );
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: wave 9s linear infinite;
}
@keyframes wave {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
