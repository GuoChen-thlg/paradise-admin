declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, never>, Record<string, never>, any>
  export default component
}

declare module 'echarts-gl/components'
declare module '*.json' {
    const value: any;
    export default value;
}

interface Ienum {
  [key:string]:string
}