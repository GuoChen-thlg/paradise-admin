<template>
  <el-main class="backpack">
    <!-- 背包 -->
    <div class="shell">
      <div class="">
        <el-button-group>
          <el-button>全部</el-button>
          <el-button>全部1</el-button>
          <el-button>全部2</el-button>
        </el-button-group>
      </div>
      <div class="container">
        <div class="item" v-for="i in list" :key="i">
          <div class="content" @contextmenu="handleContextMenu($event, 123)">
            {{ i }}
          </div>
        </div>
      </div>
      <div class="context-menu" :style="ctm_style">
        <h1>菜单</h1>
        <h1>菜单1</h1>
        <h1>菜单2</h1>
        <h1>菜单3</h1>
      </div>
    </div>
    <div></div>
  </el-main>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'Backpack',

  setup() {
    const ctm_style = reactive({
      display: 'none',
      top: '0',
      left: '0',
    })
    function handleContextMenu(ev: MouseEvent, a: number) {
      ev.preventDefault()
      const { clientX, clientY } = ev
      ctm_style.display = 'block'
      ctm_style.left = `${clientX}px`
      ctm_style.top = `${clientY}px`
      console.log(screenX, screenY, a, ev)
    }
    window.addEventListener('click', () => {
      ctm_style.display = 'none'
    })
    return {
      show: true,
      ctm_style,
      list: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ],
      handleContextMenu,
    }
  },
})
</script>
<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 120px);
  justify-content: space-around;
  grid-column-gap: 3px;
  grid-row-gap: 6px;
  cursor: pointer;
  .item {
    position: relative;
    background-color: rgba(0, 0, 0, 0.3);
    .content {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    &::after {
      content: '';
      display: block;
      width: 100%;
      margin-bottom: 100%;
      height: 0;
      z-index: -1;
    }
  }
}
.context-menu {
  position: absolute;
  width: 200px;
  height: 300px;
  display: none;
  border: 1px solid;
  box-shadow: 5px red;
}
</style>