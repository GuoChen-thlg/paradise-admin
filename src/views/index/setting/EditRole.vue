<template>
  <el-main class="edit-role">
    <div><el-button @click="handleSave">保存</el-button></div>
    <el-card>
      <el-row>
        <el-col>
          <el-row>
            <!-- 角色基本信息 -->
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="">
              <el-row>
                <el-col
                  :xs="{ span: 6 }"
                  :sm="{ span: 4 }"
                  :md="{ span: 8 }"
                  :lg="{ span: 6 }"
                  :xl="{ span: 2 }"
                  class="label"
                >
                  角色 key
                </el-col>
                <el-col
                  :xs="{ span: 18 }"
                  :sm="{ span: 20 }"
                  :md="{ span: 16 }"
                  :lg="{ span: 18 }"
                  :xl="{ span: 22 }"
                >
                  <el-input
                    placeholder="角色 key"
                    v-model.trim="key"
                  ></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="">
              <el-row>
                <el-col
                  :xs="{ span: 6 }"
                  :sm="{ span: 4 }"
                  :md="{ span: 8 }"
                  :lg="{ span: 6 }"
                  :xl="{ span: 2 }"
                  class="label"
                >
                  角色名
                </el-col>
                <el-col
                  :xs="{ span: 18 }"
                  :sm="{ span: 20 }"
                  :md="{ span: 16 }"
                  :lg="{ span: 18 }"
                  :xl="{ span: 22 }"
                >
                  <el-input placeholder="角色名" v-model.trim="name"></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-row>
                <el-col
                  :xs="{ span: 6 }"
                  :sm="{ span: 4 }"
                  :md="{ span: 4 }"
                  :lg="{ span: 3 }"
                  :xl="{ span: 1 }"
                  class="label"
                >
                  角色描述
                </el-col>
                <el-col
                  :xs="{ span: 18 }"
                  :sm="{ span: 20 }"
                  :md="{ span: 20 }"
                  :lg="{ span: 21 }"
                  :xl="{ span: 23 }"
                >
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="角色描述"
                    v-model.trim="describe"
                  ></el-input>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col>
          <!-- 路由菜单配置 -->
          <el-tree
            :data="defaultMenuTree"
            node-key="id"
            :props="defaultProps"
            show-checkbox
            :default-checked-keys="checkedKeys"
            ref="menuTreeRef"
          >
            <template #default="{node,data}">
              <span class="el-tree-node__label"> {{ node.label }}</span>
              <ul
                v-if="data.permissions && data.permissions.length !== 0"
                class="permissions-list"
              >
                <template
                  v-for="permission in data.permissions"
                  :key="permission.v"
                >
                  <li v-if="permission" class="permission-item">
                    <el-checkbox
                      :label="permission.v"
                      v-model="permission.state"
                      :ref="handleCheckboxRef"
                      :checked="permissions.includes(permission.v)"
                    >
                      {{ handlePermissionTitle(permission.v) }}
                    </el-checkbox>
                  </li>
                </template>
              </ul>
            </template>
          </el-tree>
        </el-col>
      </el-row>
    </el-card>
     <div><el-button @click="handleSave">保存</el-button></div>
  </el-main>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted, toRefs, toRef, ref } from 'vue'

import { useRoute } from 'vue-router'
import { getRoles } from '@/api'
import menuTree from '@/router/index/routeMenu'
import { treeToArray } from '@/utils/util'
import { key } from '@/store'
import { ElCheckbox } from 'element-plus'
import { useStore } from 'vuex'
import { ElTree } from 'element-plus'
export default defineComponent({
  name: 'EditRole',
  setup() {
    const route = useRoute()
    const store = useStore(key)
    const CheckboxRefs = reactive<typeof ElCheckbox[]>([])
    const data = reactive<{
      defaultProps: { [key: string]: unknown }
      defaultMenuTree: unknown[]
      describe: string
      key: string
      name: string
      checkedKeys: number[]
      permissions: string[]
      elCheckboxVal: { [k: string]: boolean }
    }>({
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      defaultMenuTree: menuTree,
      describe: '',
      key: '',
      name: '',
      checkedKeys: [],
      elCheckboxVal: {},
      permissions: []
    })
    const menuTreeRef = ref<typeof ElTree | null>(null)

    function handlePermissionTitle(key: string) {
      if (/^HELL_[A-Z]*_C$/.test(key)) return '创建权'
      if (/^HELL_[A-Z]*_U$/.test(key)) return '修改权'
      if (/^HELL_[A-Z]*_D$/.test(key)) return '删除权'
      return key
    }
    function handleCheckboxRef(el: typeof ElCheckbox) {
      if (el && !CheckboxRefs.map(c => c.label).includes(el.label)) {
        CheckboxRefs.push(el)
      }
    }
    function handleSave() {
      menuTreeRef.value?.getCheckedNodes()
      CheckboxRefs.filter(checkbox => checkbox.isChecked).map(
        checked => checked.label
      )
    }

    onMounted(async () => {
      if (route.params.key === 'undefined') {
        data.checkedKeys = [1]
        return
      }
      try {
        // 请求角色被分配的菜单 并在页面进行展示
        const roleRes = await getRoles({ key: route.params.key as string })
        const menus = roleRes?.role.menus || []
        data.key = roleRes?.role.key || ''
        data.name = roleRes?.role.name || ''
        data.describe = roleRes?.role.describe || ''
        data.permissions = roleRes?.role.permissions || []
        data.checkedKeys = treeToArray(menus, 'children').map(menu => menu.id)
      } catch (err) {
        console.log(err)
      }
    })

    return {
      menuTreeRef,
      ...toRefs(data),

      handleCheckboxRef,
      handlePermissionTitle,
      handleSave
      // tableData,
      // copy,
      // flag
    }
  }
})
</script>
<style lang="scss" scoped>
.label {
  line-height: 40px;
  text-align: center;
  margin-bottom: 16px;
  &::after {
    content: ':';
    display: inline-block;
  }
}
.permissions-list {
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
  .permission-item {
    width: 170px;
  }
}
</style>