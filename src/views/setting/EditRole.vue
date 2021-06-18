
<template>
  <el-main>
    <el-table :data="tableData">
      <el-table-column prop="name" label="模块">
        <template #default="{ row }">
          <!-- {{ column }} -->
          <!-- {{ $index }} -->
          {{ row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="authority" label="权限">
        <template #default="{ row }">
          <el-checkbox
            v-for="authority in row.authority"
            v-model="authority.flag"
            :key="authority.id"
            :disabled="authority.disabled"
          >
            {{ authority.title }}
          </el-checkbox>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>
<script lang="ts">
import { defineComponent, ref, toRaw, watch } from 'vue'

import { AUTHORITY, ROLE } from '@/enum'

import { useRoute } from 'vue-router'

interface authorityType {
  id: string
  title: string
  value: AUTHORITY
  flag: boolean
  disabled: boolean
}

export default defineComponent({
  setup() {
    const authority = [
      {
        name: '人员信息',
        authority: [
          {
            id: '0-0',
            title: '访问人员',
            value: AUTHORITY.PERSONNEL_R,
            flag: false,
            disabled: false,
          },
          { title: '添加人员', value: AUTHORITY.PERSONNEL_C },
          { title: '编辑人员', value: AUTHORITY.PERSONNEL_U },
          { title: '删除人员', value: AUTHORITY.PERSONNEL_D },
        ],
      },
      {
        name: '产品',
        authority: [
          { title: '访问', value: AUTHORITY.PEUDUCT_R },
          { title: '添加', value: AUTHORITY.PEUDUCT_C },
          { title: '编辑', value: AUTHORITY.PEUDUCT_U },
          { title: '删除', value: AUTHORITY.PEUDUCT_D },
        ],
      },
      {
        name: '第一层',
        authority: [
          { title: '访问第一层', value: AUTHORITY.HELL_ONE_R },
          { title: '添加人员', value: AUTHORITY.HELL_ONE_C },
          { title: '编辑人员', value: AUTHORITY.HELL_ONE_U },
          { title: '删除人员', value: AUTHORITY.HELL_ONE_D },
        ],
      },
      {
        name: '第二层',
        authority: [
          { title: '访问第二层', value: AUTHORITY.HELL_TWO_R },
          { title: '添加人员', value: AUTHORITY.HELL_TWO_C },
          { title: '编辑人员', value: AUTHORITY.HELL_TWO_U },
          { title: '删除人员', value: AUTHORITY.HELL_TWO_D },
        ],
      },
      {
        name: '第三层',
        authority: [
          { title: '访问第三层', value: AUTHORITY.HELL_THREE_R },
          { title: '添加人员', value: AUTHORITY.HELL_THREE_C },
          { title: '编辑人员', value: AUTHORITY.HELL_THREE_U },
          { title: '删除人员', value: AUTHORITY.HELL_THREE_D },
        ],
      },
      {
        name: '第四层',
        authority: [
          { title: '访问第四层', value: AUTHORITY.HELL_FOUR_R },
          { title: '添加人员', value: AUTHORITY.HELL_FOUR_C },
          { title: '编辑人员', value: AUTHORITY.HELL_FOUR_U },
          { title: '删除人员', value: AUTHORITY.HELL_FOUR_D },
        ],
      },
      {
        name: '第五层',
        authority: [
          { title: '访问第五层', value: AUTHORITY.HELL_FIVES_R },
          { title: '添加人员', value: AUTHORITY.HELL_FIVES_C },
          { title: '编辑人员', value: AUTHORITY.HELL_FIVES_U },
          { title: '删除人员', value: AUTHORITY.HELL_FIVES_D },
        ],
      },
      {
        name: '第六层',
        authority: [
          { title: '访问第六层', value: AUTHORITY.HELL_SIXTY_R },
          { title: '添加人员', value: AUTHORITY.HELL_SIXTY_C },
          { title: '编辑人员', value: AUTHORITY.HELL_SIXTY_U },
          { title: '删除人员', value: AUTHORITY.HELL_SIXTY_D },
        ],
      },
      {
        name: '第七层',
        authority: [
          { title: '访问第七层', value: AUTHORITY.HELL_SEVEN_R },
          { title: '添加人员', value: AUTHORITY.HELL_SEVEN_C },
          { title: '编辑人员', value: AUTHORITY.HELL_SEVEN_U },
          { title: '删除人员', value: AUTHORITY.HELL_SEVEN_D },
        ],
      },
      {
        name: '第八层',
        authority: [
          { title: '访问第八层', value: AUTHORITY.HELL_EIGHT_R },
          { title: '添加人员', value: AUTHORITY.HELL_EIGHT_C },
          { title: '编辑人员', value: AUTHORITY.HELL_EIGHT_U },
          { title: '删除人员', value: AUTHORITY.HELL_EIGHT_D },
        ],
      },
      {
        name: '第九层',
        authority: [
          { title: '访问第九层', value: AUTHORITY.HELL_NINE_R },
          { title: '添加人员', value: AUTHORITY.HELL_NINE_C },
          { title: '编辑人员', value: AUTHORITY.HELL_NINE_U },
          { title: '删除人员', value: AUTHORITY.HELL_NINE_D },
        ],
      },
      {
        name: '第十层',
        authority: [
          { title: '访问第十层', value: AUTHORITY.HELL_TEN_R },
          { title: '添加人员', value: AUTHORITY.HELL_TEN_C },
          { title: '编辑人员', value: AUTHORITY.HELL_TEN_U },
          { title: '删除人员', value: AUTHORITY.HELL_TEN_D },
        ],
      },
      {
        name: '第十一层',
        authority: [
          { title: '访问第十一层', value: AUTHORITY.HELL_ELEVEN_R },
          { title: '添加人员', value: AUTHORITY.HELL_ELEVEN_C },
          { title: '编辑人员', value: AUTHORITY.HELL_ELEVEN_U },
          { title: '删除人员', value: AUTHORITY.HELL_ELEVEN_D },
        ],
      },
      {
        name: '第十二层',
        authority: [
          { title: '访问第十二层', value: AUTHORITY.HELL_TWELVE_R },
          { title: '添加人员', value: AUTHORITY.HELL_TWELVE_C },
          { title: '编辑人员', value: AUTHORITY.HELL_TWELVE_U },
          { title: '删除人员', value: AUTHORITY.HELL_TWELVE_D },
        ],
      },
      {
        name: '第十三层',
        authority: [
          { title: '访问第十三层', value: AUTHORITY.HELL_THIRTEEN_R },
          { title: '添加人员', value: AUTHORITY.HELL_THIRTEEN_C },
          { title: '编辑人员', value: AUTHORITY.HELL_THIRTEEN_U },
          { title: '删除人员', value: AUTHORITY.HELL_THIRTEEN_D },
        ],
      },
      {
        name: '第十四层',
        authority: [
          { title: '访问第十四层', value: AUTHORITY.HELL_FOURTEEN_R },
          { title: '添加人员', value: AUTHORITY.HELL_FOURTEEN_C },
          { title: '编辑人员', value: AUTHORITY.HELL_FOURTEEN_U },
          { title: '删除人员', value: AUTHORITY.HELL_FOURTEEN_D },
        ],
      },
      {
        name: '第十五层',
        authority: [
          { title: '访问第十五层', value: AUTHORITY.HELL_FIFTEEN_R },
          { title: '添加人员', value: AUTHORITY.HELL_FIFTEEN_C },
          { title: '编辑人员', value: AUTHORITY.HELL_FIFTEEN_U },
          { title: '删除人员', value: AUTHORITY.HELL_FIFTEEN_D },
        ],
      },
      {
        name: '第十六层',
        authority: [
          { title: '访问第十六层', value: AUTHORITY.HELL_SIXTEEN_R },
          { title: '添加人员', value: AUTHORITY.HELL_SIXTEEN_C },
          { title: '编辑人员', value: AUTHORITY.HELL_SIXTEEN_U },
          { title: '删除人员', value: AUTHORITY.HELL_SIXTEEN_D },
        ],
      },
      {
        name: '第十七层',
        authority: [
          { title: '访问第十七层', value: AUTHORITY.HELL_SEVENTEEN_R },
          { title: '添加人员', value: AUTHORITY.HELL_SEVENTEEN_C },
          { title: '编辑人员', value: AUTHORITY.HELL_SEVENTEEN_U },
          { title: '删除人员', value: AUTHORITY.HELL_SEVENTEEN_D },
        ],
      },
      {
        name: '第十八层',
        authority: [
          { title: '访问第十八层', value: AUTHORITY.HELL_EIGHTEEN_R },
          { title: '添加人员', value: AUTHORITY.HELL_EIGHTEEN_C },
          { title: '编辑人员', value: AUTHORITY.HELL_EIGHTEEN_U },
          { title: '删除人员', value: AUTHORITY.HELL_EIGHTEEN_D },
        ],
      },
      {
        name: '',
        authority: [{ title: '', value: '' }],
      },
    ]
    authority.forEach((m, i) => {
      m.authority.forEach((a: unknown, j) => {
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;(a as authorityType).id = `${i}-${j}`
        ;(a as authorityType).flag = false
        ;(a as authorityType).disabled = false
      })
    })
    Object.freeze(authority)

    const route = useRoute()
    let copy: undefined | typeof authority = undefined
    const flag = ref(true)
    let tableData = ref<null | typeof authority>(null)
    if (route.params.role == '') {
      copy = JSON.parse(JSON.stringify(authority))
      Object.freeze(copy)
      tableData = ref<typeof authority>(JSON.parse(JSON.stringify(authority)))
      // TODO 新增
    } else {
      // TODO 编辑
      let roles: string[] = ['asd']
      copy = JSON.parse(JSON.stringify(authority)) as typeof authority

      copy.forEach((m) => {
        m.authority.forEach((a: unknown) => {
          // eslint-disable-next-line @typescript-eslint/no-extra-semi
          ;(a as authorityType).flag =
            roles.indexOf((a as authorityType).value) >= 0
          ;(a as authorityType).disabled =
            route.params.role.toString().toLocaleUpperCase() === ROLE.ROOTADMIN
              ? false
              : true
        })
      })
      Object.freeze(copy)
      tableData = ref<typeof authority>(JSON.parse(JSON.stringify(copy)))
    }

    watch(tableData, () => {
      flag.value = JSON.stringify(copy) === JSON.stringify(toRaw(tableData))
    })
    return {
      tableData,
      copy,
      flag,
    }
  },
})
</script>
