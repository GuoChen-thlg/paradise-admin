<template>
  <nav class="nav-container">
    <span class="indicate-btn" @click="handleSollPage('left')">
      <i class="el-icon-d-arrow-left"></i>
    </span>
    <el-tag
      key="首页"
      :effect="'/home' === $route.path ? 'dark' : 'plain'"
      @click="$router.push({ path: '/home' })"
    >
      <i class="el-icon-s-home" />
      首页
    </el-tag>
    <div class="sliding-window">
      <div
        class="sliding-container"
        :style="{ transform: `translateX(${offsetX}px)` }"
      >
        <el-tag
          v-for="(tag, i) in tabsList"
          :key="`${tag.name}-${tag.path}`"
          closable
          :effect="tag.path === $route.path ? 'dark' : 'plain'"
          @close="handleClose(tag, i)"
          @click="
            $router.push({
              path: tag.path,
            })
          "
        >
          <i :data-index="i" :class="tag.icon" /> {{ tag.meta.title }}
        </el-tag>
      </div>
    </div>
    <span class="indicate-btn" @click="handleSollPage('right')">
      <i class="el-icon-d-arrow-right"></i>
    </span>
  </nav>
</template>
<script lang="ts">
import { useStore } from 'vuex'
import { defineComponent, ref, toRefs, unref } from 'vue'
import {
  RouteLocationNormalized,
  RouteLocationRaw,
  useRoute,
  useRouter,
} from 'vue-router'
import { key } from '@/store'
import { crumbs_mutations } from '@/store/modules/crumbs'

export default defineComponent({
  name: 'Crumbs',
  setup() {
    const store = useStore(key)
    const { tabsList } = toRefs(store.state.crumbs)
    const router = useRouter()
    const route = useRoute()
    const firstSubscript = ref(0)
    const offsetX = ref(0)

    const handleRemoveTab = (route: RouteLocationNormalized) =>
      store.commit(crumbs_mutations.REMOVETAB, route)

    const handleClose = (_route: RouteLocationNormalized, index: number) => {
      if (route.path === _route.path) {
        if (index === 0 && tabsList && unref(tabsList).length === 1) {
          router.push('/home')
        } else {
          if (index !== unref(tabsList).length - 1) {
            router.push(unref(tabsList)[index + 1].path as RouteLocationRaw)
          } else {
            router.push(unref(tabsList)[index - 1].path as RouteLocationRaw)
          }
        }
      }
      handleRemoveTab(_route)
    }

    const handleSollPage = (direction: string) => {
      const tagsNode: Element[] = Array.from(
        document.querySelectorAll('.sliding-container>span.el-tag')
      )
      const windowNode = document.querySelector('.sliding-container')
      const marginBorder = 6

      const getTagsNodeWidht = (start: number, end: number): number => {
        let l = 0
        for (
          let i = start;
          i <= end && start < tagsNode.length && end < tagsNode.length;
          i++
        ) {
          const el = tagsNode[i]
          l = l + el.clientWidth + marginBorder
        }
        return l
      }
      const totaLength = getTagsNodeWidht(0, tagsNode.length - 1)
      if ('left' === direction) {
        for (let i = firstSubscript.value; i < tagsNode.length; i++) {
          if (
            windowNode &&
            getTagsNodeWidht(firstSubscript.value, i) > windowNode.clientWidth
          ) {
            const _offsetX =
              offsetX.value - getTagsNodeWidht(firstSubscript.value, i - 1)

            if (Math.abs(totaLength) > Math.abs(_offsetX)) {
              firstSubscript.value = i
              offsetX.value = -1 * getTagsNodeWidht(0, i - 1)
            }
            return false
          }
        }
      }
      if ('right' === direction) {
        for (let i = -1 + firstSubscript.value; i >= 0; i--) {
          if (
            windowNode &&
            getTagsNodeWidht(i, firstSubscript.value - 1) >
              windowNode.clientWidth
          ) {
            const _offsetX =
              offsetX.value + getTagsNodeWidht(i, firstSubscript.value - 1)
            if (Math.abs(totaLength) > Math.abs(_offsetX) && _offsetX <= 0) {
              firstSubscript.value = i
              offsetX.value = -1 * getTagsNodeWidht(0, i)
            }
            return false
          } else if (
            windowNode &&
            getTagsNodeWidht(0, firstSubscript.value - 1) <=
              windowNode.clientWidth
          ) {
            firstSubscript.value = 0
            offsetX.value = 0
            return false
          }
        }
      }
    }

    return {
      tabsList,
      offsetX,
      handleClose,
      handleSollPage,
    }
  },
})
</script>
<style lang="scss" scoped>
.nav-container {
  display: flex;
  padding: 0.03rem 0.05rem;
  background-color: var(--theme-background-color);
  border-bottom: 3px solid var(--theme-border-color);
  .indicate-btn {
    display: inline-block;
    width: 0.5rem;
    min-width: 0.3rem;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    border-radius: 2px;
    border: 1px solid var(--theme-button-border-color);
    &:hover {
      filter: opacity(0.7);
    }
  }
  .sliding-window {
    position: relative;
    flex-grow: 1;
    overflow: hidden;
    .sliding-container {
      position: relative;
      display: flex;
      transition: transform 0.3s;
    }
  }
}
:deep(.el-tag) {
  cursor: pointer;
  margin: 0 2px;
}
</style>