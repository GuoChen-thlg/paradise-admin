
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, never>, Record<string, never>, any>
  export default component
}
declare module 'csstype' {
  import type * as CSS from 'csstype';
  interface Properties {
    // Add a missing property
    // WebkitRocketLauncher?: string;

    // Add a CSS Custom Property
    // '--theme-color'?: 'black' | 'white';

    // ...or allow any other property
    [index: string]: any;
  }
}

declare module 'echarts-gl/components'
declare module '*.json' {
    const value: any;
    export default value;
}

interface Ienum {
  [key:string]:string
}