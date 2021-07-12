<template>
  <div v-if="inShow" class="product-card">
    <div class="product-image">
      <img src="" alt="" sizes="" srcset="" />
    </div>
    <div class="wish"></div>
    <div class="conten">
      {{ product.name }}
    </div>
    <div class="product-button"></div>
  </div>
  <div v-else class="product-card-substitute"></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ProductCard',
  props: ['product'],
  setup() {
    return {
      inShow: true,
    }
  },
})
</script>

<style lang="scss">
.product-card,
.product-card-substitute {
  height: 180px;
}
</style>