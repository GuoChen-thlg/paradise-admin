<template>
  <el-main>
    <el-table :data="tableData" style="width: 100%">
      <!-- v-infinite-scroll="handleLoadData" -->
      <el-table-column type="expand">
        <template #default="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="供应商">
              <span>{{ props.row.vendor.name }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.product_type }}</span>
            </el-form-item>
            <el-form-item label="价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.effect }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="产品图片">
        <template #default="props">
          <img :src="props.row.image.src || createImage()" />
        </template>
      </el-table-column>
      <el-table-column label="商品 ID" prop="id"> </el-table-column>
      <el-table-column label="商品名称" prop="title"> </el-table-column>
      <el-table-column label="描述" prop="effect" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="操作" prop="effect">
        <template #default="props">
          <el-button-group>
            <template v-if="user.login_statu">
              <template v-if="user.id !== props.row.vendor.id">
                <el-button @click="handleOpenBuyDialog(props.row)"
                  >购买</el-button
                >
              </template>
              <!-- TODO 开发环境 设置为 v-if 生产 v-else-if -->
              <el-button
                @click="
                  $router.push({
                    name: 'EditProduct',
                    params: {
                      vendor_id: props.row.vendor.id,
                      product_id: props.row.id,
                    },
                  })
                "
              >
                编辑
              </el-button>

              <el-button> 删除 </el-button>
            </template>
            <template v-else>
              <el-button @click="$router.push({ name: 'Login' })">
                购买
              </el-button>
            </template>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <teleport to="body">
      <el-dialog
        v-model="buy_dialog"
        custom-class="buy-dialog"
        title="产品信息"
        width="90%"
        :center="true"
      >
        <el-row>
          <el-col :md="10">
            <el-carousel>
              <el-carousel-item v-for="item in 4" :key="item">
                <!-- TODO 媒体预览视图 -->
                <div class="swiper-media-item">
                  <img :src="createImage(2000, 2000, `image${item}`)" />
                </div>
              </el-carousel-item>
            </el-carousel>
          </el-col>
          <el-col :md="14">
            <el-form>
              <el-form-item label="产品名">产品名 </el-form-item>
              <el-form-item label="价格">价格 </el-form-item>
              <el-form-item label="变体">变体 </el-form-item>
              <el-form-item label="加购">加购 </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-dialog>
    </teleport>
  </el-main>
</template>
<script lang="ts">
import { useRouter } from 'vue-router'
import { defineComponent, onUnmounted, reactive, ref } from 'vue'
import { product } from '@/types/product'
import { getProducts } from '@/api'
import { useStore } from 'vuex'
import { key } from '@/store'
import { createImage } from '@/utils/default/image'

export default defineComponent({
  name: 'Product' /* 兜率宫 */,
  components: {},
  props: {},
  setup() {
    const router = useRouter()
    const store = useStore(key)
    const { user } = store.state
    const productsList = reactive<product[]>([])
    const buy_dialog = ref(false)
    const query = reactive({
      limit: 50,
      pageIndex: 0,
      keyWord: '',
    })
    const handleLoadData = () => {
      // TODO 分页加载数据
      getProducts({}).then((result) => {
        if (result && result.code === 2000) {
          result.data.products.forEach((p: product) => {
            productsList.push(p)
          })
          console.log(result)
        }
      })
    }
    const handleEditActiveItem = (index: number | string) => {
      //
    }
    /**
     * @description 打开购买弹窗
     */
    const handleOpenBuyDialog = (buy_product: product) => {
      buy_dialog.value = !buy_dialog.value
      console.log(buy_product)
    }
    window.addEventListener('scroll', () => {
      const { scrollHeight, clientHeight, scrollTop } = document.documentElement
      if (scrollHeight - clientHeight - scrollTop < 200) {
        handleLoadData()
      }
    })

    /*********************************************/
    handleLoadData()
    onUnmounted(() => {
      window.removeEventListener('scroll', handleLoadData)
    })
    return {
      buy_dialog,
      user,
      tableData: productsList,
      createImage,
      handleOpenBuyDialog,
      handleEditActiveItem,
      /*  [
        {
          id: '@id',
          title: /[ 无太混八天紫玄通][ 骨血还虚百][ 龙命尘髓心]丹/,
          desc: '@cparagraph',
          barcode: '',
          qr_code: '',
          tags: [],
          vendor: '',
          handle: '',
          product_type: [],
          created_at: '',
          updated_at: '',
          published_at: '',
          published_scope: '',
          active: '',
          price: 999,
          price_max: 9999,
          price_min: 555,
          product_category: '仙品',
          image: {
            src: '',
            alt: '',
            product_id: '',
            variant_ids: [],
            width: 90,
            height: 90,
            created_at: '',
            aspect_ratio: 1.0,
          },
          media: [
            {
              type: '',
              src: '',
              alt: '',
              product_id: '',
              variant_ids: [],
              width: 90,
              height: 90,
              index: 1,
              created_at: '',
              aspect_ratio: 1.0,
            },
          ],
          variants: [
            {
              id: '@id',
              title: '',
              price: 999,
              weight: 150,
              barcode: '',
              qr_code: '',
              image: {},
              media: [],
              created_at: '',
              updated_at: '',
              available: true,
            },
          ],
        },
      ], */
    }
  },
})
</script>
<style lang="scss" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>