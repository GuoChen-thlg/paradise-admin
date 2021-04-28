<template>
  <el-main class="personnel">
    <div>
      <!-- <el-input
        placeholder="请输入内容"
        v-model="input"
        class="input-with-select"
      >
        <template #prepend>
          <el-select v-model="select" placeholder="请选择">
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
        </template>
        <template #append>
          <el-button icon="el-icon-search"></el-button>
        </template>
      </el-input> -->
    </div>
    <el-table :data="table.data">
      <el-table-column type="selection"></el-table-column>

      <!-- :index="i" -->
      <el-table-column
        v-for="(item, i) in column"
        :key="item.label"
        :label="item.label"
        :prop="item.prop"
        :show-overflow-tooltip="i !== 0"
        :sortable="item.sortable"
        :min-width="item.width"
      >
      </el-table-column>

      <el-table-column align="right" min-width="150px">
        <template #header> 编辑 </template>
        <template #default="scope">
          <el-button :key="scope.id" size="mini">Edit</el-button>
          <el-button size="mini" type="danger">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="1000"
    >
    </el-pagination>
  </el-main>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

import { personnelList } from '@/api'
export default defineComponent({
  name: 'Personnel',
  setup() {
    //
    const column = ref([
      {
        label: 'ID',
        prop: 'id',
        width: '',
      },
      {
        label: '姓名',
        prop: 'name',
        width: '',
      },
      {
        label: '注册时间',
        prop: 'date',
        width: '100px',
        sortable: true,
      },
      {
        label: '部门',
        prop: 'department',
        width: '',
      },
      {
        label: '职务',
        prop: 'duties',
        width: '',
      },
    ])
    const table = reactive({
      data: [],
      search: '',
    })
    // const requsetData = () => {
    //     }
    personnelList().then((req) => {
      if (req) {
        table.data = req.data
      }
    })

    return { column, table }
  },
})
</script>
<style lang="scss" scoped>
:deep(.el-select .el-input) {
  width: 1.3rem;
}
.pagination {
  text-align: center;
}
</style>