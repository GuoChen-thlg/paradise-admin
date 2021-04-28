import { App } from 'vue'
import Echarts from 'vue-echarts'

import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { MapChart, BarChart, LineChart, PieChart } from 'echarts/charts'
import {
	TitleComponent,
	ToolboxComponent,
	TooltipComponent,
	VisualMapComponent,
	GeoComponent,
	GridComponent,
	LegendComponent,
	DataZoomComponent,
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
])

export default {
	install: (app: App): void => {
		app.component('v-chart', Echarts)
	},
}
