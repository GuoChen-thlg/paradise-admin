<template>
  <el-container class="container">
    <el-aside
      v-show="showAside"
      :width="isMobile ? '0' : isCollapse ? '64px' : '200px'"
      class="hidder-scrollbar aside-sidebar hidden-xs-only"
    >
      <!-- 侧边栏导航 -->
      <sidebar-control />
    </el-aside>

    <el-drawer direction="ltr" size="200" v-model="drawer" custom-class="hiddem-sm-and-up">
      <sidebar-control />
    </el-drawer>

    <el-container class="main-container">
      <el-header v-show="showHeader" class="head-navigation" height="var(--header-height)">
        <div class="control-container">
          <div class="open-close hidden-xs-only" @click="on_off">
            <i :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']" />
          </div>
          <div class="open-close hidden-sm-and-up" @click="drawer = true">
            <i class="el-icon-s-unfold" />
          </div>

          <div class="slogan-box">
            <p class="slogan">此项目正在开发中，所有数据均为 mock 数据 !!!</p>
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
          <div class="open-close hidden-xs-only" @click="on_off">
            <i
              :class="{
                'el-icon-s-fold': !isCollapse,
                'el-icon-s-unfold': isCollapse
              }"
            />
          </div>
          <div class="open-close hidden-sm-and-up" @click="drawer = true">
            <i class="el-icon-s-unfold" />
          </div>
          <div class="slogan-box">
            <p class="slogan">此项目正在开发中，所有数据均为 mock 数据 切勿当真！！！</p>
          </div>
          <head-user />
        </div>
      </el-header>
      <!-- TAB 标签 -->
      <ceumbs v-show="showTabNav"></ceumbs>

      <!-- 路由 -->
      <router-view v-slot="{ Component }">
        <keep-alive max="10" :include="cacheList" exclude="Home">
          <component :is="Component" />
        </keep-alive>
      </router-view>

      <el-footer v-show="showFooter">
        @2021|THLG
        <el-backtop></el-backtop>
      </el-footer>
    </el-container>
  </el-container>
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
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Nprogress from 'nprogress'
import { key } from '@/store'
import SidebarControl from '@/components/SidebarControl.vue'
import Ceumbs from '@/components/Crumbs.vue'
import HeadUser from '@/components/HeadUser.vue'
import { sidebar_actions, sidebar_mutations } from '@/store/modules/sidebar'
import { useResize } from '@/hooks'
export default defineComponent({
  name: 'App',
  components: {
    SidebarControl,
    Ceumbs,
    HeadUser
  },
  setup() {
    const route = useRoute()
    const store = useStore(key)
    const isShow = reactive({
      showAside: true,
      showHeader: true,
      showFooter: true,
      showTabNav: true
    })
    /**侧边栏在移动端时 收缩展开*/
    const drawer = ref(false)

    const { isCollapse } = toRefs(store.state.sidebar)
    const { scrollTop } = toRefs(store.state.device)
    const { cacheList } = toRefs(store.state.crumbs)

    Nprogress.inc()
    /* 设置主题 */
    const themeJson = JSON.parse(localStorage.getItem('themejson') || '{}')
    // themeJson?._name || '默认主题'
    for (const key in themeJson) {
      if (
        Object.prototype.hasOwnProperty.call(themeJson, key) &&
        /^--/.test(key)
      ) {
        document.documentElement.style.setProperty(key, themeJson[key])
      }
    }

    /* 若页面刷新 则请求菜单数据 */
    if (store.state.user.login_statu) {
      store.dispatch(sidebar_actions.ASYNCREFRESHMENU)
    }
    /* 登录后 请求菜单数据 */
    watch(
      () => store.state.user.login_statu,
      newVal => {
        if (newVal) {
          store.dispatch(sidebar_actions.ASYNCREFRESHMENU)
        }
      }
    )

    /* 当页面发生改变时 */
    watch(
      () => route.path,
      () => {
        isShow.showAside =
          route.meta.showAside === undefined
            ? true
            : (route.meta.showAside as boolean)
        isShow.showHeader =
          route.meta.showHeader === undefined
            ? true
            : (route.meta.showHeader as boolean)
        isShow.showFooter =
          route.meta.showFooter === undefined
            ? true
            : (route.meta.showFooter as boolean)
        isShow.showTabNav =
          route.meta.showTabNav === undefined
            ? true
            : (route.meta.showTabNav as boolean)
      }
    )
    /* 请求通知权限 */
    Notification.requestPermission()

    document.addEventListener('scroll', () => {
      store.commit('device/update')

    })
    useResize(() => {
      console.log('123resize');
      store.commit('device/update')
    })
    // document.addEventListener('resize', )
    onBeforeMount(() => {
      Nprogress.set(0.9)
      document.querySelector(".loader[role='loader']")?.remove()
      document.querySelector("[role='loader-style']")?.remove()
    })
    onMounted(() => {
      Nprogress.done()
    })
    return {
      ...toRefs(isShow),
      isCollapse,
      scrollTop,
      isMobile: false,
      cacheList,
      on_off: () => store.commit(sidebar_mutations.SWITCH),
      drawer
    }
  }
})
</script>

<style lang="scss">
@import "@/assets/scss/global-default.scss";
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
  // color: var(--theme-font-color);
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
  content: "";
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
    max-height: 88vh;
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