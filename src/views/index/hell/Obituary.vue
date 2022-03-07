<template>
	<el-main>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column fixed prop="name" label="姓名" width="150">
			</el-table-column>
			<el-table-column prop="born" label="出生日期" width="200">
			</el-table-column>
			<el-table-column prop="death" label="死亡日期" width="200">
			</el-table-column>
			<el-table-column
				prop="good"
				:show-overflow-tooltip="true"
				label="善"
				width="180"
			>
			</el-table-column>
			<el-table-column
				prop="evil"
				:show-overflow-tooltip="true"
				label="恶"
				width="180"
			>
			</el-table-column>
			<el-table-column
				prop="death_method"
				:show-overflow-tooltip="true"
				label="死亡方式"
				width="180"
			>
			</el-table-column>
			<el-table-column
				prop="introduction"
				:show-overflow-tooltip="true"
				label="简介"
				width="600"
			></el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template #default="{ row }">
					<el-button
						type="text"
						size="small"
						@click="handleCheck(row)"
					>
						查看
					</el-button>
					<el-button
						type="text"
						size="small"
						@click="handleEdit(row)"
					>
						编辑
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-main>
</template>
<script lang="ts">
	import { obituary } from '@/api'
	import { DangerSpotType } from '@type/dangerSpot'
	import { format } from '@/utils/util'
	import { defineComponent, ref } from 'vue'

	export default defineComponent({
		name: 'Obituary', // 鬼门关
		setup() {
			const tableData = ref<DangerSpotType[]>([])

			obituary().then(req => {
				if (req) {
					tableData.value = req.data
				}
			})
			const handleCheck = (data: DangerSpotType) => {
				// TODO 查看详细信息
				console.log(data)
			}
			const handleEdit = (data: DangerSpotType) => {
				// TODO 跳转页面 编辑
				console.log(data)
			}
			return { tableData, format, handleCheck, handleEdit }
		},
	})
</script>
