<template>
  <el-main>{{ $route.params.continent }}</el-main>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Territory',
  props: {},
  setup() {
    const route = useRoute()
    const router = useRouter()
    switch (route.params.continent) {
      case 'east':
        break
      case 'west':
        break
      case 'south':
        break
      case 'north':
        break
      default:
        router.push('/404')
        break
    }
    return {}
  },
})
</script>