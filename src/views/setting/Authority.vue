<template>
  <el-main>
    <el-tree
      :data="data"
      node-key="id"
      show-checkbox
      default-expand-all
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
import { defineComponent, reactive } from 'vue'
import Node from 'element-plus/packages/tree/src/model/node'

interface authorityNode {
  id: number
  label: string
  children?: authorityNode[]
  disabled?: boolean
  url: string
  icon: string
  parent_id: number
  permissions: string
}

export default defineComponent({
  name: 'authorityNode',
  setup() {
    const defaultProps = reactive({
      children: 'children',
      label: 'label',
    })
    const data = reactive<authorityNode[]>([])

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
      console.log('tree drag over: ', dropNode.label)
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


