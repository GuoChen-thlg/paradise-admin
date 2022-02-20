<template>
  <div class="base-item">
    
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Base',
  inheritAttrs: false,
  props: {
    props: {
      type: Object()
    }
  },
  emits: [],
  setup(props) {
    //
    useStore
    onMounted(() => {
      console.log('base', props)
    })
  }
})
</script>
