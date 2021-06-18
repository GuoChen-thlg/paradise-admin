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
}

export default defineComponent({
  name: 'authorityNode',
  setup() {
    const defaultProps = reactive({
      children: 'children',
      label: 'label',
    })
    const data = reactive<authorityNode[]>([
      {
        id: 1,
        label: 'ROOTADMIN',
        children: [
          {
            id: 4,
            label: '二级 1-1',
            children: [
              {
                id: 9,
                label: '三级 1-1-1',
                disabled: true,
              },
              {
                id: 10,
                label: '三级 1-1-2',
              },
            ],
          },
        ],
      },
      {
        id: 2,
        label: '一级 2',
        children: [
          {
            id: 5,
            label: '二级 2-1',
          },
          {
            id: 6,
            label: '二级 2-2',
          },
        ],
      },
      {
        id: 3,
        label: '一级 3',
        children: [
          {
            id: 7,
            label: '二级 3-1',
          },
          {
            id: 8,
            label: '二级 3-2',
            children: [
              {
                id: 11,
                label: '三级 3-2-1',
              },
              {
                id: 13,
                label: '三级 3-2-3',
              },
              {
                id: 12,
                label: '三级 3-2-2',
              },
            ],
          },
        ],
      },
    ])

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

      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner'
      } else {
        return true
      }
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

  }
})
</script>


