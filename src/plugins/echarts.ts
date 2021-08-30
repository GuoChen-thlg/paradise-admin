import { App } from 'vue'
import VEcharts from 'vue-echarts'
import { registerTheme, use } from 'echarts/core'
import { GlobeComponent } from 'echarts-gl/components'
import { CanvasRenderer } from 'echarts/renderers'
import {
	MapChart,
	BarChart,
	LineChart,
	PieChart,
	CandlestickChart,
} from 'echarts/charts'
import {
	TitleComponent,
	ToolboxComponent,
	TooltipComponent,
	VisualMapComponent,
	GeoComponent,
	GridComponent,
	LegendComponent,
	DataZoomComponent,
	MarkLineComponent,
	MarkPointComponent,
} from 'echarts/components'

use([
	CanvasRenderer,
	MapChart,
	BarChart,
	LineChart,
	PieChart,
	TitleComponent,
	ToolboxComponent,
	TooltipComponent,
	VisualMapComponent,
	GeoComponent,
	GridComponent,
	LegendComponent,
	DataZoomComponent,
	MarkLineComponent,
	MarkPointComponent,
	CandlestickChart,
	GlobeComponent,
])

import customize1 from '@/theme/echarts.theme-customize1.json'

registerTheme('customize1', customize1)
export const vChart = VEcharts
export default {
	install: (app: App): void => {
		app.component('v-chart', VEcharts)
	},
}
