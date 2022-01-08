<template>
  <el-main>
    <h1>菜单</h1>
    <el-tree
      :data="data"
      node-key="id"
      :props="defaultProps"
      show-checkbox
      accordion
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
      draggable
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
    >
    </el-tree>
  </el-main>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import Node from 'element-plus/packages/tree/src/model/node'

interface authorityNode {
  id: number
  name: string
  children?: authorityNode[]
  path: string
  icon: string
  parent_id: number
}
import { getRoleMneus } from '@/api'
export default defineComponent({
  name: 'authorityNode',
  setup() {
    const defaultProps = reactive({
      children: 'children',
      label: 'name',
    })
    const data = ref<authorityNode[]>([])
    onMounted(async () => {
      try {
        const result = await getRoleMneus({ roleId: 1 })
        data.value = result?.menus as authorityNode[]
        console.log(result?.menus)
      } catch (err) {
        console.log(err)
      }
    })
    const handleDragStart = (node: authorityNode, ev: Event) => {
      //   console.log('drag start', node)
    }
    const handleDragEnter = (
      draggingNode: authorityNode,
      dropNode: authorityNode,
      ev: Event
    ) => {
      //   console.log('tree drag enter: ', dropNode.label)
    }
    const handleDragLeave = (
      draggingNode: authorityNode,
      dropNode: authorityNode,
      ev: Event
    ) => {
      //   console.log('tree drag leave: ', dropNode.label)
    }
    const handleDragOver = (
      draggingNode: authorityNode,
      dropNode: authorityNode,
      ev: Event
    ) => {
      console.log('tree drag over: ', dropNode.name)
    }
    const handleDragEnd = (
      draggingNode: authorityNode,
      dropNode: authorityNode,
      dropType: authorityNode,
      ev: Event
    ) => {
      //   console.log('tree drag end: ', dropNode && dropNode.label, dropType)
    }
    const handleDrop = (
      draggingNode: authorityNode,
      dropNode: authorityNode,
      dropType: authorityNode,
      ev: Event
    ) => {
      //   console.log('tree drop: ', dropNode.label, dropType)
    }
    const allowDrop = (draggingNode: Node, dropNode: Node, type: string) => {
      console.log(dropNode)
    }
    const allowDrag = (draggingNode: Node) => {
      return true
    }
    return {
      data,
      defaultProps,
      handleDragStart,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDragEnd,
      handleDrop,
      allowDrop,
      allowDrag,
    }
  },
})
</script>


