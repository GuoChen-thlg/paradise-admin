<template>
  <div v-if="editor">
    <div
      class="tools-container"
      :style="{ 'flex-direction': `${sourceShow ? 'row-reverse' : 'row'}` }"
    >
      <div class="item" v-show="!sourceShow">
        <template v-for="(arr, i) in toolsList" :key="i">
          <el-button-group>
            <template v-for="item in arr" :key="item.icon">
              <el-tooltip :content="item.tip" placement="top">
                <el-button
                  size="mini"
                  @click="item.handleClick()"
                  :class="{ 'is-active': item.handleIsActive() }"
                >
                  <i :class="['iconfont', item.icon]"></i>
                </el-button>
              </el-tooltip>
            </template>
          </el-button-group>
        </template>
      </div>
      <div class="item">
        <!-- circle -->
        <el-button
          size="mini"
          @click="handleSwitchHTML"
          :class="{ 'is-active': sourceShow }"
        >
          <i class="iconfont icon-code-view"></i>
        </el-button>
      </div>
    </div>
    <div class="editor-container">
      <editor-content
        v-show="!sourceShow"
        class="editor-content"
        :editor="editor"
      />
      <textarea
        ref="textareaEl"
        class="editor-textarea"
        v-show="sourceShow"
      ></textarea>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeUnmount, unref, ref, reactive } from 'vue'
import { Content, EditorContent, useEditor } from '@tiptap/vue-3'
import { defaultExtensions } from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'

export default defineComponent({
  name: 'EditProduct',
  components: {
    EditorContent,
  },

  setup() {
    const sourceShow = ref(false)
    const textareaEl = ref<HTMLTextAreaElement | null>(null)
    const editor = useEditor({
      content: '',
      extensions: [
        ...defaultExtensions(),
        Document,
        Paragraph,
        Text,
        Underline,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
      ],
    })
    const toolsList = reactive([
      [
        {
          tip: '段落',
          icon: 'icon-paragraph',
          handleClick: () => editor.value?.chain().focus().setParagraph().run(),
          handleIsActive: () => editor.value?.isActive('paragraph'),
        },
        {
          tip: 'h1',
          icon: 'icon-h-1',
          handleClick: () =>
            editor.value?.chain().focus().toggleHeading({ level: 1 }).run(),
          handleIsActive: () => editor.value?.isActive('heading', { level: 1 }),
        },
        {
          tip: 'h2',
          icon: 'icon-h-2',
          handleClick: () =>
            editor.value?.chain().focus().toggleHeading({ level: 2 }).run(),
          handleIsActive: () => editor.value?.isActive('heading', { level: 2 }),
        },
        {
          tip: 'h3',
          icon: 'icon-h-3',
          handleClick: () =>
            editor.value?.chain().focus().toggleHeading({ level: 3 }).run(),
          handleIsActive: () => editor.value?.isActive('heading', { level: 3 }),
        },
        {
          tip: 'h4',
          icon: 'icon-h-4',
          handleClick: () =>
            editor.value?.chain().focus().toggleHeading({ level: 4 }).run(),
          handleIsActive: () => editor.value?.isActive('heading', { level: 4 }),
        },
        {
          tip: 'h5',
          icon: 'icon-h-5',
          handleClick: () =>
            editor.value?.chain().focus().toggleHeading({ level: 5 }).run(),
          handleIsActive: () => editor.value?.isActive('heading', { level: 5 }),
        },
        {
          tip: 'h6',
          icon: 'icon-h-6',
          handleClick: () =>
            editor.value?.chain().focus().toggleHeading({ level: 6 }).run(),
          handleIsActive: () => editor.value?.isActive('heading', { level: 6 }),
        },

        {
          tip: '斜体',
          icon: 'icon-italic',
          handleClick: () => editor.value?.chain().focus().toggleItalic().run(),
          handleIsActive: () => editor.value?.isActive('italic'),
        },
        {
          tip: '粗体',
          icon: 'icon-bold',
          handleClick: () => editor.value?.chain().focus().toggleBold().run(),
          handleIsActive: () => editor.value?.isActive('bold'),
        },
        {
          tip: '下划线',
          icon: 'icon-underline',
          handleClick: () =>
            editor.value?.chain().focus().toggleUnderline().run(),
          handleIsActive: () => editor.value?.isActive('underline'),
        },
        {
          tip: '中划线',
          icon: 'icon-strikethrough',
          handleClick: () => editor.value?.chain().focus().toggleStrike().run(),
          handleIsActive: () => editor.value?.isActive('strike'),
        },
      ],
      [
        {
          tip: '无序列表',
          icon: 'icon-list-unordered',
          handleClick: () =>
            editor.value?.chain().focus().toggleBulletList().run(),
          handleIsActive: () => editor.value?.isActive('bulletList'),
        },
        {
          tip: '有序列表',
          icon: 'icon-list-ordered',
          handleClick: () =>
            editor.value?.chain().focus().toggleOrderedList().run(),
          handleIsActive: () => editor.value?.isActive('orderedList'),
        },
      ],
      [
        {
          tip: '居左',
          icon: 'icon-align-left',
          handleClick: () =>
            editor.value?.chain().focus().setTextAlign('left').run(),
          handleIsActive: () => editor.value?.isActive({ textAlign: 'left' }),
        },
        {
          tip: '居中',
          icon: 'icon-align-center',
          handleClick: () =>
            editor.value?.chain().focus().setTextAlign('center').run(),
          handleIsActive: () => editor.value?.isActive({ textAlign: 'center' }),
        },
        {
          tip: '居右',
          icon: 'icon-align-right',
          handleClick: () =>
            editor.value?.chain().focus().setTextAlign('right').run(),
          handleIsActive: () => editor.value?.isActive({ textAlign: 'right' }),
        },
        {
          tip: '两端对齐',
          icon: 'icon-align-justify',
          handleClick: () =>
            editor.value?.chain().focus().setTextAlign('justify').run(),
          handleIsActive: () =>
            editor.value?.isActive({ textAlign: 'justify' }),
        },
      ],
      [],
    ])
    //  <!--  缩进 -->

    // <!--  颜色 -->

    //         <!-- 连接 表格 多媒体 清除格式 -->
    /* 切换HTML */
    const handleSwitchHTML = () => {
      if (sourceShow.value) {
        if (unref(textareaEl)) {
          unref(editor)?.commands.setContent(
            unref(textareaEl)?.value as Content
          )
        }
      } else {
        if (textareaEl && textareaEl.value && editor && editor.value) {
          textareaEl.value.value = editor.value.getHTML()
        }
      }
      sourceShow.value = !sourceShow.value
    }

    onBeforeUnmount(() => {
      editor.value?.destroy()
    })
    return {
      sourceShow,
      textareaEl,
      toolsList,
      editor,
      handleSwitchHTML,
    }
  },
})
</script>
<style lang="scss" scoped>
.iconfont {
  width: 0.24rem;
  height: 0.24rem;
  line-height: 0.24rem;
  margin: 0;
}
.editor-container {
  width: 100%;
  min-height: 3rem;
  height: 3rem;
  max-height: 4rem;
  overflow-y: auto;
}
.tools-container {
  display: flex;
  width: 100%;
  padding: 1em;
  border-bottom: 1px solid #000;
  .el-button {
    border: none;
    padding: 0.02rem 0.07rem;
  }
  :not(.is-disabled).is-active {
    background-color: #e7f3f9;
  }
  .item:nth-child(1) {
    flex-grow: 1;
  }
  .item:nth-child(2) {
    line-height: 1;
  }
}
.editor-content {
  width: 100%;
  height: 100%;
}
:deep(.ProseMirror) {
  width: 100%;
  height: 100%;
  border: 0 none;
  outline: none;
  padding: 1em;
}
.editor-textarea {
  width: 100%;
  height: 90%;
  resize: none;
  border: 0 none;
  outline: none;
  padding: 1em;
}
</style>