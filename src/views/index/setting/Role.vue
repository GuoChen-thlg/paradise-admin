<template>
  <el-main class="role">
    <el-button @click="handleAddRole">
      添加角色
    </el-button>
    <el-table :data="roles" style="width: 100%">
      <el-table-column
        fixed
        prop="key"
        label="角色"
        width="150"
      ></el-table-column>
      <el-table-column prop="name" label="角色名" width="150"></el-table-column>
      <el-table-column prop="describe" label="描述"></el-table-column>
      <el-table-column label="操作">
        <template #default="{row}">
          <el-button @click="handleEditRole(row.key)"> 编辑权限 </el-button>
          <el-button>
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { getRoles } from '@/api'
import { useRoute, useRouter } from 'vue-router'
import { unique } from 'server/src/utils'

export default defineComponent({
  name: 'Role',
  setup() {
    const router = useRouter()
    const route = useRoute()
    let roles = ref([])

    function handleEditRole(key: string) {
      router.push(`${route.path}/${key}`)
    }
    function handleAddRole() {
      router.push(`${route.path}/undefined`)
    }
    getRoles()
      .then(res => {
        roles.value = res?.roles || []
        console.log(res)
      })
      .catch(err => {
        console.error(err)
      })

    return { 
      roles, handleEditRole, handleAddRole 
      }
  }
})
</script>
