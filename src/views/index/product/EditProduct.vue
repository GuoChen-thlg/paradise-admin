<template>
  <el-main class="edit-product">
    <!-- 添加产品 -->
    <el-row :gutter="20">
      <el-col :xl="16">
        <!-- 版块一 -->
        <el-card>
          <el-form>
            <el-form-item label="标题">
              <el-input />
            </el-form-item>
            <el-form-item label="描述">
              <editor class="editor" />
            </el-form-item>
          </el-form>
        </el-card>
        <el-card>
          媒体上传
          <div v-has>has</div>
          <el-button @click="showViewer = true"> open showViewer </el-button>
          <preview-media
            v-if="showViewer"
            @close="handleClosePreview"
            :initial-index="1"
            :mediaList="[
              {
                type: 'image',
                src: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
              },
              {
                type: 'video',
                src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
              },
            ]"
          />
          <!-- 图片预览 上传 -->
          <!-- <el-image/> -->
        </el-card>
        <el-card>
          <el-table>
            <el-table-column> </el-table-column>
          </el-table>

          产品多属性 变体配置
        </el-card>
      </el-col>
      <el-col :xl="8">
        <el-card> 产品状态 下拉列表 </el-card>
        <el-card> 洞察 产品近期进行过销售 会显示洞察 </el-card>
        <el-card> 组织 产品 系列 标签 厂商 </el-card>
      </el-col>
    </el-row>

    <el-row>
      <!-- 保存按钮 -->
      删除 保存
    </el-row>
  </el-main>
</template>
<script lang="ts">
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import { defineComponent, reactive, ref } from 'vue'
import Editor from '@/components/Editor.vue'
import PreviewMedia from '@/components/PreviewMedia.vue'
export default defineComponent({
  name: 'EditProduct',
  components: {
    Editor,
    PreviewMedia,
  },

  setup() {
    const router = useRouter()
    const route = useRoute()
    // 产品媒体
    const showViewer = ref(false)
    const media = reactive([])
    const handleClosePreview = () => {
      showViewer.value = false
    }
    console.log(route.params.product_id, route.params.vendor_id)

    const handleOpenPreview = () => {
      showViewer.value = true
    }
    onBeforeRouteLeave(async (to, from) => {
      // TODO 离开页面 判断保存
      const boo = window.confirm('确认离开吗？')
    })
    return {
      media,
      showViewer,
      handleClosePreview,
    }
  },
})
</script>

<style lang="scss" scoped>
.editor {
  display: inline-block;
  width: 100%;
  border: 1px solid #000;
  border-radius: 5px;
}
.el-card {
  margin-bottom: 0.2rem;
}
</style>