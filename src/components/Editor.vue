<template>
  <div v-if="editor">
    <div
      class="tools-container"
      :style="{ 'flex-direction': `${sourceShow ? 'row-reverse' : 'row'}` }"
    >
      <div class="item" v-show="!sourceShow">
        <template v-for="(arr, i) in toolsList" :key="i">
          <el-button-group>
            <template v-for="item in arr" :key="item.tip">
              <el-tooltip :content="item.tip" placement="top">
                <el-button
                  size="mini"
                  @click="item.handleClick()"
                  :class="{ 'is-active': item.handleIsActive() }"
                  v-html="item.svg"
                >
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5H4zm16 7l-3.536 3.536-1.414-1.415L17.172 12 15.05 9.879l1.414-1.415L20 12zM6.828 12l2.122 2.121-1.414 1.415L4 12l3.536-3.536L8.95 9.88 6.828 12zm4.416 5H9.116l3.64-10h2.128l-3.64 10z"
            />
          </svg>
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
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 6v15h-2v-5a6 6 0 1 1 0-12h10v2h-3v15h-2V6h-3zm-2 0a4 4 0 1 0 0 8V6z"/></svg>`,
          handleClick: () => editor.value?.chain().focus().setParagraph().run(),
          handleIsActive: () => editor.value?.isActive('paragraph'),
        },
        {
          tip: 'h1',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" > <path fill="none" d="M0 0H24V24H0z" /> <path d="M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16zm8-12v12h-2v-9.796l-2 .536V8.67L19.5 8H21z" /> </svg>`,
          handleClick: () =>
            editor.value?.chain().focus().toggleHeading({ level: 1 }).run(),
          handleIsActive: () => editor.value?.isActive('heading', { level: 1 }),
        },
        {
          tip: 'h2',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M4 4v7h7V4h2v16h-2v-7H4v7H2V4h2zm14.5 4c2.071 0 3.75 1.679 3.75 3.75 0 .857-.288 1.648-.772 2.28l-.148.18L18.034 18H22v2h-7v-1.556l4.82-5.546c.268-.307.43-.709.43-1.148 0-.966-.784-1.75-1.75-1.75-.918 0-1.671.707-1.744 1.606l-.006.144h-2C14.75 9.679 16.429 8 18.5 8z"/></svg>`,
          handleClick: () =>
            editor.value?.chain().focus().toggleHeading({ level: 2 }).run(),
          handleIsActive: () => editor.value?.isActive('heading', { level: 2 }),
        },
        {
          tip: 'h3',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M22 8l-.002 2-2.505 2.883c1.59.435 2.757 1.89 2.757 3.617 0 2.071-1.679 3.75-3.75 3.75-1.826 0-3.347-1.305-3.682-3.033l1.964-.382c.156.806.866 1.415 1.718 1.415.966 0 1.75-.784 1.75-1.75s-.784-1.75-1.75-1.75c-.286 0-.556.069-.794.19l-1.307-1.547L19.35 10H15V8h7zM4 4v7h7V4h2v16h-2v-7H4v7H2V4h2z"/></svg>`,
          handleClick: () =>
            editor.value?.chain().focus().toggleHeading({ level: 3 }).run(),
          handleIsActive: () => editor.value?.isActive('heading', { level: 3 }),
        },
        {
          tip: 'h4',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16zm9-12v8h1.5v2H22v2h-2v-2h-5.5v-1.34l5-8.66H22zm-2 3.133L17.19 16H20v-4.867z"/></svg>`,
          handleClick: () =>
            editor.value?.chain().focus().toggleHeading({ level: 4 }).run(),
          handleIsActive: () => editor.value?.isActive('heading', { level: 4 }),
        },
        {
          tip: 'h5',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M22 8v2h-4.323l-.464 2.636c.33-.089.678-.136 1.037-.136 2.21 0 4 1.79 4 4s-1.79 4-4 4c-1.827 0-3.367-1.224-3.846-2.897l1.923-.551c.24.836 1.01 1.448 1.923 1.448 1.105 0 2-.895 2-2s-.895-2-2-2c-.63 0-1.193.292-1.56.748l-1.81-.904L16 8h6zM4 4v7h7V4h2v16h-2v-7H4v7H2V4h2z"/></svg>`,
          handleClick: () =>
            editor.value?.chain().focus().toggleHeading({ level: 5 }).run(),
          handleIsActive: () => editor.value?.isActive('heading', { level: 5 }),
        },
        {
          tip: 'h6',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M21.097 8l-2.598 4.5c2.21 0 4.001 1.79 4.001 4s-1.79 4-4 4-4-1.79-4-4c0-.736.199-1.426.546-2.019L18.788 8h2.309zM4 4v7h7V4h2v16h-2v-7H4v7H2V4h2zm14.5 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z"/></svg>`,
          handleClick: () =>
            editor.value?.chain().focus().toggleHeading({ level: 6 }).run(),
          handleIsActive: () => editor.value?.isActive('heading', { level: 6 }),
        },

        {
          tip: '斜体',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z"/></svg>`,
          handleClick: () => editor.value?.chain().focus().toggleItalic().run(),
          handleIsActive: () => editor.value?.isActive('italic'),
        },
        {
          tip: '粗体',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z"/></svg>`,
          handleClick: () => editor.value?.chain().focus().toggleBold().run(),
          handleIsActive: () => editor.value?.isActive('bold'),
        },
        {
          tip: '下划线',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2zM4 20h16v2H4v-2z"/></svg>`,
          handleClick: () =>
            editor.value?.chain().focus().toggleUnderline().run(),
          handleIsActive: () => editor.value?.isActive('underline'),
        },
        {
          tip: '中划线',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M17.154 14c.23.516.346 1.09.346 1.72 0 1.342-.524 2.392-1.571 3.147C14.88 19.622 13.433 20 11.586 20c-1.64 0-3.263-.381-4.87-1.144V16.6c1.52.877 3.075 1.316 4.666 1.316 2.551 0 3.83-.732 3.839-2.197a2.21 2.21 0 0 0-.648-1.603l-.12-.117H3v-2h18v2h-3.846zm-4.078-3H7.629a4.086 4.086 0 0 1-.481-.522C6.716 9.92 6.5 9.246 6.5 8.452c0-1.236.466-2.287 1.397-3.153C8.83 4.433 10.271 4 12.222 4c1.471 0 2.879.328 4.222.984v2.152c-1.2-.687-2.515-1.03-3.946-1.03-2.48 0-3.719.782-3.719 2.346 0 .42.218.786.654 1.099.436.313.974.562 1.613.75.62.18 1.297.414 2.03.699z"/></svg>`,
          handleClick: () => editor.value?.chain().focus().toggleStrike().run(),
          handleIsActive: () => editor.value?.isActive('strike'),
        },
      ],
      [
        {
          tip: '无序列表',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"/></svg>`,
          handleClick: () =>
            editor.value?.chain().focus().toggleBulletList().run(),
          handleIsActive: () => editor.value?.isActive('bulletList'),
        },
        {
          tip: '有序列表',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"/></svg>`,
          handleClick: () =>
            editor.value?.chain().focus().toggleOrderedList().run(),
          handleIsActive: () => editor.value?.isActive('orderedList'),
        },
      ],
      [
        {
          tip: '居左',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm0 15h14v2H3v-2zm0-5h18v2H3v-2zm0-5h14v2H3V9z"/></svg>`,
          handleClick: () =>
            editor.value?.chain().focus().setTextAlign('left').run(),
          handleIsActive: () => editor.value?.isActive({ textAlign: 'left' }),
        },
        {
          tip: '居中',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm2 15h14v2H5v-2zm-2-5h18v2H3v-2zm2-5h14v2H5V9z"/></svg>`,
          handleClick: () =>
            editor.value?.chain().focus().setTextAlign('center').run(),
          handleIsActive: () => editor.value?.isActive({ textAlign: 'center' }),
        },
        {
          tip: '居右',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm4 15h14v2H7v-2zm-4-5h18v2H3v-2zm4-5h14v2H7V9z"/></svg>`,
          handleClick: () =>
            editor.value?.chain().focus().setTextAlign('right').run(),
          handleIsActive: () => editor.value?.isActive({ textAlign: 'right' }),
        },
        {
          tip: '两端对齐',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm0 15h18v2H3v-2zm0-5h18v2H3v-2zm0-5h18v2H3V9z"/></svg>`,
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
  :deep(h1) {
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
  }
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