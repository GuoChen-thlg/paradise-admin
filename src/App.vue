<template>
  <el-container class="container">
    <el-aside
      v-show="showAside"
      :width="isMobile ? '0' : isCollapse ? '64px' : '200px'"
      class="hidder-scrollbar aside-sidebar"
    >
      <!-- 侧边栏导航 -->
      <sidebar-control />
    </el-aside>
    <el-container class="main-container">
      <el-header
        v-show="showHeader"
        class="head-navigation"
        height="var(--header-height)"
      >
        <div class="control-container">
          <div class="open-close" @click="on_off">
            <i
              :class="{
                'el-icon-s-fold': !isCollapse,
                'el-icon-s-unfold': isCollapse,
              }"
            />
          </div>
          <head-user />
        </div>
      </el-header>
      <el-header
        v-show="scrollTop > 60 && showHeader"
        class="head-navigation fixed"
        height="var(--header-height)"
        :style="{ left: isCollapse ? '64px' : '200px' }"
      >
        <div class="control-container">
          <div class="open-close" @click="on_off">
            <i
              :class="{
                'el-icon-s-fold': !isCollapse,
                'el-icon-s-unfold': isCollapse,
              }"
            />
          </div>
          <head-user />
        </div>
      </el-header>
      <!-- TAB 标签 -->
      <ceumbs v-if="showTabNav" />

      <!--  -->
      <router-view v-slot="{ Component }">
        <keep-alive max="10" :include="cacheList" exclude="Home">
          <component :is="Component" />
        </keep-alive>
      </router-view>

      <el-footer v-show="showFooter"> @2021|THLG </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent, reactive, watch, toRefs, } from '@vue/runtime-core'
import { useRoute, } from 'vue-router'
import { useStore } from 'vuex'
import SidebarControl from '@/components/SidebarControl'
import Ceumbs from '@/components/Crumbs'

import HeadUser from '@/components/HeadUser'
import { key } from '@/store'
import '@/mock'


export default defineComponent({
  name: 'App',
  components: {
    'sidebar-control': SidebarControl,
    ceumbs: Ceumbs,
    'head-user': HeadUser
  },
  beforeRouteEnter () {
    console.log('app route');
  },
  setup () {
    const route = useRoute()
    const store = useStore(key)
    const isShow = reactive({
      showAside: true,
      showHeader: true,
      showFooter: true,
      showTabNav: true,
    })
    store.dispatch('user/verifyLogin')
    const { isCollapse } = toRefs(store.state.sidebar)
    const { scrollTop } = toRefs(store.state.docu)
    const { cacheList } = toRefs(store.state.crumbs)
    watch(() => route.path, () => {
      isShow.showAside = route.meta.showAside === undefined ? true : route.meta.showAside
      isShow.showHeader = route.meta.showHeader === undefined ? true : route.meta.showHeader
      isShow.showFooter = route.meta.showFooter === undefined ? true : route.meta.showFooter
      isShow.showTabNav = route.meta.showTabNav === undefined ? true : route.meta.showTabNav
    })

    document.addEventListener('scroll', () => {
      store.commit('docu/update')
    })
    document.addEventListener('resize', () => {
      store.commit('docu/update')

    })

    return {
      ...toRefs(isShow),
      isCollapse,
      scrollTop,
      isMobile: false,
      cacheList,
      on_off: () => store.commit('sidebar/switch')

    }
  },


})
</script>

<style>
*,
*:after,
*:before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  font-size: 100px !important;
}
@media screen and (max-width: 541px) {
  html {
    font-size: calc(100vw / 3.75) !important;
  }
}
body {
  font-size: 0.16rem;
}
.hidder-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hidder-scrollbar::-webkit-scrollbar {
  display: none;
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
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  &.fixed {
    position: fixed;
    right: 0;
    top: 0;
    z-index: 9999;
    transition: left 0.3s cubic-bezier(0.4, 0, 1, 1);
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
</style>
