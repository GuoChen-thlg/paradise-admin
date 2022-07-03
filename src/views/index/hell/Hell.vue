<template>
  <el-main>
    <h1>difu</h1>
    <div>
      <cube class="cube-ul" offset="100px" :spread="true" :rotate="true">
        <!-- <cube  the-len="100px" offset="30px" :spread="true" :rotate="false">
          <cube the-len="50px" offset="20px" :spread="true" :rotate="false"></cube>
        </cube> -->
      </cube>
    </div>
  </el-main>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import Cube from '@/components/Cube.vue'
export default defineComponent({
  name: 'Hell',
  components: {
    Cube,
  },
  setup() {
    // 黄泉路 Death Road
  },
})
</script>
<style lang="scss" scoped>
.cube-ul {
  margin: 150px auto;
}
</style>