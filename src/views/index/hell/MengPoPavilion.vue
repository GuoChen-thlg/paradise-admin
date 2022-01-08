<template>
  <el-main class="meng-po-pavilion">
    <div class="container">
      <product-card :product="{ name: 'product' }"></product-card>
      <product-card :product="{ name: 'product' }"></product-card>
      <product-card :product="{ name: 'product' }"></product-card>
      <product-card :product="{ name: 'product' }"></product-card>
    </div>
  </el-main>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ProductCard from '@/components/product/ProductCard.vue'
export default defineComponent({
  name: 'MengPoPavilion',
  components: { ProductCard },
  setup() {
    //孟婆亭
  },
})
</script>
<style lang="scss" scoped>
.meng-po-pavilion {
  .container {
    display: flex;
    flex-wrap: wrap;
    :deep(.product-card) {
      width: 50%;
    }
  }
}
</style>