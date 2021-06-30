<template>
  <el-main>
    <div class="search-container">
      <div>搜索</div>
    </div>
    <el-table
      v-loading="tableData.length == 0"
      :data="tableData"
      :style="table_style"
    >
      <!-- v-infinite-scroll="handleLoadData" -->
      <el-table-column type="expand">
        <template #default="props">
          <el-form label-position="left" inline class="product-table-expand">
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
      <el-table-column class-name="product-media" label="产品图片">
        <template #default="props">
          <img
            class="product-image"
            loading="lazy"
            :src="
              /*props.row.image.src ||*/ createImage(500, 500, props.row.title)
            "
            :alt="props.row.image.alt"
          />
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
                <el-button @click="handleOpenBuyDialog(props.row)" size="small">
                  查看
                </el-button>
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
                size="small"
              >
                编辑
              </el-button>

              <el-button size="small"> 删除 </el-button>
            </template>
            <template v-else>
              <el-button @click="$router.push({ name: 'Login' })">
                查看
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
              <el-carousel-item
                v-for="image in activeProduct.media.filter(
                  (m) => m.type === 'image'
                )"
                :key="image.id"
              >
                <!-- TODO 媒体预览视图 -->
                <div class="swiper-media-item">
                  <img
                    :src="
                      /*image.src */ createImage(500, 500, activeProduct.title)
                    "
                    loading="lazy"
                    :alt="image.alt"
                  />
                </div>
              </el-carousel-item>
            </el-carousel>
          </el-col>
          <el-col :md="14">
            <el-form>
              <el-form-item label="产品名:">
                <h3>{{ activeProduct.title }}</h3>
              </el-form-item>
              <el-form-item label="价格:">
                <span class="price">{{ activeProduct.price }}</span>
                <span
                  class="compare-price"
                  v-if="activeProduct.price_max > activeProduct.price"
                >
                  <del>{{ activeProduct.price_max }}</del>
                </span>
              </el-form-item>
              <el-form-item label="变体:">变体 </el-form-item>
              <el-form-item label="数量:">
                <el-row>
                  <el-col>
                    <el-input
                      type="number"
                      v-model.number="quantity"
                      min="1"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <div class="operating-area">
                  <el-button @click="handleAddToCart()">购买</el-button>
                  <el-button
                    :class="{
                      heart: user.wishlist.some(
                        (p) =>
                          p.id === activeProduct.id &&
                          p.vendor.id === activeProduct.vendor.id
                      ),
                    }"
                    @click="handleToggleToWishList(activeProduct)"
                    icon="iconfont icon-xinyuan"
                  >
                  </el-button>
                </div>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-dialog>
    </teleport>
  </el-main>
</template>
<script lang="ts">
import { useRouter } from 'vue-router'
import { defineComponent, onUnmounted, reactive, ref, watch } from 'vue'
import { product } from '@/types/product'
import { getProducts } from '@/api'
import { useStore } from 'vuex'
import { key } from '@/store'
import { createImage } from '@/utils/default/image'
import { user_mutations } from '@/store/modules/user'
import { order } from '@/types/order'
import { ElMessage, ElMessageBox } from 'element-plus'

export default defineComponent({
  name: 'Product' /* 兜率宫 */,
  components: {},
  props: {},
  setup() {
    const store = useStore(key)
    const { user } = store.state
    const productsList = reactive<product[]>([])
    const tableData = reactive<product[]>([])
    const buy_dialog = ref(false)
    const activeProduct = ref<product | null>(null)
    const quantity = ref(1)
    // 单条数据行高
    let lineheight = 110.6
    //展示数据总数
    let count = 10
    const query = reactive({
      limit: 50,
      pageIndex: 0,
      keyWord: '',
    })
    const table_style = reactive({
      width: '100%',
      paddingTop: '0',
      paddingBottom: '0',
      // transition: 'padding-top 3s',
    })
    let look = true
    const handleLoadData = async () => {
      // TODO 分页加载数据
      if (look) {
        look = false
        const result = await getProducts({})
        if (result && result.code === 2000) {
          productsList.splice(-1, 0, ...result.data.products)

          if (productsList.length < 100) {
            tableData.splice(0, 100, ...productsList.slice(0, count))
          }
        }
        look = true
      }
    }
    const handleEditActiveItem = (index: number | string) => {
      //
    }
    /**
     * @description 打开购买弹窗
     */
    const handleOpenBuyDialog = (buy_product: product) => {
      buy_dialog.value = !buy_dialog.value
      quantity.value = 1
      activeProduct.value = buy_product
    }
    /**
     * @description 添加/移除 心愿单
     */
    const handleToggleToWishList = (product: product) => {
      if (
        user.wishlist.some(
          (p) =>
            p.id === activeProduct.value?.id &&
            p.vendor.id === activeProduct.value?.vendor.id
        )
      ) {
        store.commit(user_mutations.REMOVEFROMWISHLIST, product)
      } else {
        store.commit(user_mutations.ADDTOWISHLIST, product)
      }
    }
    /**
     * @description 加入购物车
     */
    const handleAddToCart = () => {
      if (activeProduct.value) {
        const o: order = {
          product_id: activeProduct.value.id,
          vendor_id: activeProduct.value.vendor.id,
          quantity: quantity.value,
        }
        // TODO 向服务器请求添加到购物车

        store.commit(user_mutations.ADDTOCART, o)

        ElMessageBox.confirm(
          `已添加到购物车 产品ID：${o.product_id} 供应商ID：${o.vendor_id} 数量：${o.quantity} 未连接服务器`,
          '提示',
          {
            confirmButtonText: '确定',
          }
        )
      }
    }

    function handleScroll() {
      lineheight =
        (
          document.querySelector(
            '.el-table__body .el-table__row'
          ) as HTMLTableRowElement | null
        )?.offsetHeight || lineheight
      const { scrollHeight, clientHeight, scrollTop } = document.documentElement
      // 距离底部小于 一屏数据量的高度 时加载数据
      if (scrollHeight - clientHeight - scrollTop < lineheight * count) {
        handleLoadData()
      }

      // 当滚动条顶部大于?条数据高度时
      const buffer = 10
      if (scrollTop > lineheight * buffer) {
        // 计算出可视范围内可最大展示的数据量 加缓冲
        count = Math.ceil(clientHeight / lineheight) + buffer * 3
        const start = Math.ceil((scrollTop - buffer * lineheight) / lineheight)
        tableData.splice(0, 100, ...productsList.slice(start, start + count))

        table_style.paddingTop = `${lineheight * start}px`

        table_style.paddingBottom = `${
          productsList.length * lineheight -
          scrollTop -
          (count - buffer) * lineheight
        }px`
      } else {
        table_style.paddingTop = '0px'
        table_style.paddingBottom = `${
          productsList.length * lineheight - count * lineheight
        }px`
      }
    }

    /*********************************************/
    // 首次加载数据
    handleLoadData()
    window.addEventListener('scroll', handleScroll)
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })
    return {
      buy_dialog,
      user,
      activeProduct,
      tableData,
      quantity,
      table_style,
      createImage,
      handleOpenBuyDialog,
      handleEditActiveItem,
      handleToggleToWishList,
      handleAddToCart,
    }
  },
})
</script>
<style lang="scss" scoped>
.product-table-expand {
  font-size: 0;
}
.product-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.product-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
:deep(.product-media .cell) {
  width: 100px;
  .product-image {
    width: 100%;
  }
}
/*  */

.price {
  font-size: 30px;
  color: red;
  margin: 0 5px;
}
.compare-price {
  font-size: 14px;
  color: #949090;
}
.operating-area {
  text-align: right;
}
.heart {
  color: red;
}
</style>