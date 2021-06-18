declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'swiper/vue'
declare module 'swiper'
declare module 'echarts-gl/components'
