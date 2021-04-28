<template>
  <nav class="nav-container">
    <!-- hidder-scrollbar -->
    <!-- <span class="indicate-btn"> <i class="el-icon-d-arrow-left"></i> </span> -->
    <el-tag
      key="首页"
      :effect="'/home' === $route.path ? 'dark' : 'plain'"
      @click="handleTo({ path: '/home' })"
    >
      <i class="el-icon-s-home" />
      首页
    </el-tag>
    <div class="sliding-window">
      <el-tag
        v-for="(tag, i) in tabsList"
        :key="`${tag.name}-${tag.path}`"
        closable
        :effect="tag.path === $route.path ? 'dark' : 'plain'"
        @close="handleClose(tag, i)"
        @click="handleTo(tag)"
      >
        <i :data-index="i" :class="tag.icon" /> {{ tag.name }}
      </el-tag>
    </div>
    <!-- <span class="indicate-btn"> <i class="el-icon-d-arrow-right"></i> </span> -->
  </nav>
</template>
<script lang="ts">
import { useStore } from 'vuex'
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { RouteLocationRaw } from 'vue-router'
import { Menu } from '@/custom'
import { key } from '@/store'

import 'swiper/swiper.scss'
export default defineComponent({
  name: 'Crumbs',

  setup() {
    const store = useStore(key)
    const { currentMenu, tabsList } = toRefs(store.state.crumbs)

    const swiperEl = ref(null)
    const options = reactive({})
    return {
      currentMenu,
      tabsList,
      swiperEl,
      options,
      switchTab: (route: Menu) => store.commit('crumbs/switchTab', route),
      removeTab: (route: Menu) => store.commit('crumbs/removeTab', route),
    }
  },
  methods: {
    handleTo(route: Menu) {
      this.switchTab(route)
      this.$router.push(route.path as RouteLocationRaw)
    },
    handleClose(route: Menu, index: number) {
      console.log(
        index,
        this.currentMenu.path,
        route.path,
        index !== this.tabsList.length - 1
      )

      if (this.currentMenu.path === route.path) {
        if (index === 0 && this.tabsList && this.tabsList.length === 1) {
          this.$router.push('/home')
        } else {
          if (index !== this.tabsList.length - 1) {
            console.log('A')

            this.$router.push(this.tabsList[index + 1].path as RouteLocationRaw)
          } else {
            console.log('B')

            this.$router.push(this.tabsList[index - 1].path as RouteLocationRaw)
          }
        }
      }
      this.removeTab(route)
    },
  },
})
</script>
<style lang="scss" scoped>
.nav-container {
  display: flex;
  padding: 0.03rem 0.05rem;
  border-bottom: 1px solid #999;
  .indicate-btn {
    display: inline-block;
    width: 0.5rem;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    border-radius: 2px;
    border: 1px solid rgb(211, 211, 211);
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
  .sliding-window {
    display: flex;
    flex-grow: 1;
    overflow-x: auto;
    overflow-y: hidden;

    &::-webkit-scrollbar {
      width: 3px;
    }
  }
}
:deep(.el-tag) {
  cursor: pointer;
  margin: 0 2px;
}
</style>