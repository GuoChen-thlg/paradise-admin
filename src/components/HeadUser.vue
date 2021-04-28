<template>
  <div class="head-user clearfix">
    <el-dropdown placement="bottom-end">
      <span class="el-dropdown-link">
        <el-avatar icon="el-icon-user-solid" /><i
          class="el-icon-arrow-down el-icon--right"
        />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <router-link v-slot="{ navigate }" to="/" custom>
              <span @click="navigate">个人中心</span>
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item divided @click="handleSignOut">
            登出
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="ts">
import { useStore } from 'vuex'
import { defineComponent } from 'vue'
import { key } from '@/store'
import { useRouter } from 'vue-router'


export default defineComponent({
  name: 'HeadUser',
  setup() {
    const store = useStore(key)
    const router = useRouter()
    const handleSignOut = () => {
      store.commit('user/signOut')
      store.commit('sidebar/setMenu', [])
      router.push('/login')
    }
    return {
      handleSignOut,
    }
  },
})
</script>
<style lang="scss" scoped>
.head-user {
  display: inline-block;
  width: 80px;
  padding-right: 20px;
  vertical-align: middle;

  .el-avatar,
  .el-icon-arrow-down {
    vertical-align: middle;
  }
}
</style>