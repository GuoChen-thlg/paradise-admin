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
          <el-dropdown-item divided>
            <a
              href="https://github.com/GuoChen-thlg/paradise-admin"
              target="_blank"
              style="text-decoration: none"
            >
              GitHub
            </a>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link v-slot="{ navigate }" to="/user" custom>
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
import Cookies from 'js-cookie'
import { key } from '@/store'
import { useRouter } from 'vue-router'
import { user_mutations } from '@/store/modules/user'
import { sidebar_mutations } from '@/store/modules/sidebar'

export default defineComponent({
  name: 'HeadUser',
  setup() {
    const store = useStore(key)
    const router = useRouter()
    const handleSignOut = () => {
      Cookies.set('authorization', '', {
        path:'/',
        expires: new Date(),
      })
      Cookies.set('authorization.sig', '', {
        path:'/',
        expires: new Date(),
      })
      store.commit(user_mutations.SIGNOUT)
      store.commit(sidebar_mutations.SETMENU, [])
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
  padding-right: 20px;
  vertical-align: middle;
  :deep(.el-dropdown) {
    width: 60px;
  }
  .el-avatar,
  .el-icon-arrow-down {
    vertical-align: middle;
  }
}
</style>