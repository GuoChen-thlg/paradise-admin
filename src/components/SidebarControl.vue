<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical side-navigation hidder-scrollbar"
    background-color="var(--sidebar-background-color)"
    text-color="var(--sidebar-text-color)"
    active-text-color="var(--sidebar-active-text-color)"
    :collapse="isCollapse"
    :unique-opened="true"
    :router="true"
  >
    <router-link to="/home" custom v-slot="{ navigate }">
      <li class="logo" @click="navigate">管理系统</li>
    </router-link>

    <template v-for="(menu_item, i) in menu" :key="i">
      <el-submenu
        :index="`${i}`"
        v-if="menu_item.child && menu_item.child.length !== 0"
      >
        <template #title>
          <i :class="menu_item.icon" v-if="menu_item.icon" />
          <span>
            {{ menu_item.name }}
          </span>
        </template>
        <el-menu-item-group>
          <template v-for="(submenu, j) in menu_item.child">
            <template
              v-if="!submenu.child || submenu.child.length === 0"
              :key="`${i}-${j}-o`"
            >
              <el-menu-item :index="submenu.path">
                <i :class="submenu.icon" v-if="submenu.icon" />
                {{ submenu.name }}
              </el-menu-item>
            </template>
            <template v-else-if="submenu.isGroup" :key="`${i}-${j}-t`">
              <el-menu-item-group>
                <template #title>
                  <i :class="submenu.icon" v-if="submenu.icon" />
                  <span>{{ submenu.name }}</span>
                </template>
                <template
                  v-for="(item, k) in submenu.child"
                  :key="`${i}-${j}-${k}`"
                >
                  <el-menu-item :index="item.path">
                    <i :class="item.icon" v-if="item.icon" />
                    {{ item.name }}
                  </el-menu-item>
                </template>
              </el-menu-item-group>
            </template>
            <template v-else :key="`${i}-${j}-s`">
              <el-submenu :index="`${i}-${j}-s`">
                <template #title>
                  <i :class="submenu.icon" v-if="submenu.icon" />
                  {{ submenu.name }}
                </template>
                <template
                  v-for="(item, k) in submenu.child"
                  :key="`${i}-${j}-${k}`"
                >
                  <el-menu-item :index="item.path">
                    <i :class="item.icon" v-if="item.icon" />
                    {{ item.name }}
                  </el-menu-item>
                </template>
              </el-submenu>
            </template>
          </template>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item v-else :key="i" :index="menu_item.path">
        <i :class="menu_item.icon" v-if="menu_item.icon" />
        <template #title>
          {{ menu_item.name }}
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { Sidebar } from '@/store/modules/sidebar'

export default defineComponent({
  name: 'SidebarControl',
  setup() {
    const store = useStore(key)
    const { isCollapse, menu } = toRefs<Sidebar>(store.state.sidebar)
    return {
      menu,
      isCollapse,
    }
  },
})
</script>
<style lang="scss" scoped>
.logo {
  position: relative;
  height: var(--header-height);
  cursor: pointer;
  background-color: var(--theme-background-color);
  z-index: 9999;
  overflow: hidden;

  text-align: center;
  line-height: 60px;
  font-size: 25px;
}
.side-navigation {
  overflow-y: auto;
  min-height: 100vh;
  max-height: 100vh;
  border: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  .el-menu-item.is-active {
    background-color: var(--sidebar-active-background-color) !important;
  }
}

.side-navigation:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100vh;
}
</style>