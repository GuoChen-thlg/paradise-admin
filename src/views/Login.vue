/* eslint-disable vue/attributes-order */
<template>
  <el-main class="login-main">
    <section class="form-container">
      <div
        v-show="is_show_form_sign_in"
        class="sign-in"
      >
        <el-form
          ref="form-sign-in"
          :model="form_sign_in"
          :hide-required-asterisk="true"
          :status-icon="true"
          :rules="sign_in_rules"
        >
          <el-form-item>
            <h1 class="form-title">
              管理系统
            </h1>
          </el-form-item>
          <el-form-item prop="user_name">
            <el-input
              v-model="form_sign_in.user_name"
              name="user_name"
              placeholder="账户"
              clearable
            />
          </el-form-item>
          <el-form-item prop="user_password">
            <el-input
              v-model="form_sign_in.user_password"
              name="user_password"
              placeholder="密码"
              show-password
              clearable
            />
          </el-form-item>
          <el-form-item>
            <!-- 第三方登录 -->
            <!-- size="medium" -->
            <!-- <el-avatar
              fit="fill"
              src="https://github.com/fluidicon.png"
            ></el-avatar> -->
          </el-form-item>
          <el-form-item>
            <el-button @click="handleFormSignIn">
              登录
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-row
              type="flex"
              justify="space-between"
            >
              <el-col :span="4">
                <el-link
                  type="primary"
                  :underline="false"
                  @click.prevent="is_show_form_sign_in = false"
                >
                  立即注册
                </el-link>
              </el-col>
              <el-col :span="4">
                <!-- TODO 未实现找回密码 -->
                <el-link
                  type="primary"
                  :underline="false"
                >
                  忘记密码
                </el-link>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
      <div
        v-show="!is_show_form_sign_in"
        class="registered"
      >
        <el-form
          ref="form-registered"
          :model="form_registered"
          :hide-required-asterisk="true"
          :status-icon="true"
          :rules="registered_rules"
        >
          <el-form-item>
            <h1 class="form-title">
              登记处
            </h1>
          </el-form-item>
          <el-form-item prop="regist_name">
            <el-input
              v-model="form_registered.regist_name"
              name="regist_name"
              placeholder="账户"
              clearable
            />
          </el-form-item>
          <el-form-item prop="regist_password_first">
            <el-input
              v-model="form_registered.regist_password_first"
              name="regist_password_first"
              placeholder="密码"
              show-password
              clearable
            />
          </el-form-item>
          <el-form-item prop="regist_password_again">
            <el-input
              v-model="form_registered.regist_password_again"
              name="regist_password_first"
              placeholder="确认密码"
              show-password
              clearable
            />
          </el-form-item>
          <el-form-item prop="regist_email">
            <el-row
              type="flex"
              justify="space-between"
            >
              <el-col :span="16">
                <el-input
                  v-model="form_registered.regist_email"
                  name="regist_email"
                  placeholder="邮箱"
                  clearable
                />
              </el-col>
              <el-col :span="7">
                <!-- TODO 邮箱发送验证码 -->
                <el-button
                  @click="handleSendCode"
                  v-text="code_text"
                />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="regist_code">
            <el-input
              v-model="form_registered.regist_code"
              name="regist_code"
              placeholder="验证码"
              clearable
            />
          </el-form-item>
          <el-form-item prop="agree_terms">
            <el-checkbox
              v-model="form_registered.agree_terms"
              name="agree_terms"
            >
              <router-link
                v-slot="{ navigate }"
                to="/"
                custom
              >
                <span @click="navigate"> 同意《用户服务条款》 </span>
              </router-link>
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button @click="handleFormRegist">
              注册
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-link
              type="primary"
              :underline="false"
              @click.prevent="is_show_form_sign_in = true"
            >
              立即登录
            </el-link>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </el-main>
</template>
<script lang="ts">
import { useStore } from 'vuex'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import ElForm from 'element-plus/lib/el-form'

import { login } from '@/api'
import { key } from '@/store'
import { Menu } from '@/custom'

export default defineComponent({
  name: 'Login',
  setup() {
    /* 数据 */
    const store = useStore(key)
    const form_sign_in = reactive({
      user_name: 'admin',
      user_password: '123456',
    })
    const is_show_form_sign_in = ref(true)
    const form_registered = reactive({
      regist_name: '',
      regist_password_first: '',
      regist_password_again: '',
      regist_email: '',
      regist_code: '',
      agree_terms: false,
    })
    const code_text = ref('发送验证码')

    /* 生命周期 */
    onMounted(() => {
      // console.log(form_sign_in)
    })
    /* 验证规则 */
    const sign_in_rules = {
      user_name: [
        {
          required: true,
          message: '请输入账户名',
          trigger: 'blur',
        },
        {
          pattern: /^\w{3,16}$/,
          message: '只能包含字母数字下划线（3-16）',
          trigger: 'blur',
        },
      ],
      user_password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        },
        {
          pattern: /^\w{6,18}$/,
          message: '密码最少6位',
          trigger: 'blur',
        },
      ],
    }
    
    const registered_rules = {
      regist_name: [
        {
          required: true,
          message: '请输入账户名',
          trigger: 'blur',
        },
        {
          pattern: /^\w{3,16}$/,
          message: '只能包含字母数字下划线（3-16）',
          trigger: 'blur',
        },
      ],
      regist_password_first: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        },
        {
          pattern: /^\w{6,18}$/,
          message: '密码最少6位',
          trigger: 'blur',
        },
      ],
      regist_password_again: [
        {
          required: true,
          message: '请再次输入密码',
          trigger: 'blur',
        },
        {
          pattern: /^\w{6,18}$/,
          message: '密码最少6位',
          trigger: 'blur',
        },
        {
          validator: function (_rule: unknown, value: string, cd: any) {
            console.log(form_registered.regist_password_again)
            if (value === form_registered.regist_password_first) {
              cd()
            } else {
              cd(new Error('两次输入密码不一致'))
            }
          },
          trigger: 'blur',
        },
      ],
      regist_email: [
        {
          required: true,
          message: '请输入邮箱地址',
          trigger: ['blur', 'change'],
        },
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: ['blur', 'change'],
        },
      ],
      regist_code: [
        {
          required: true,
          message: '请输入验证码',
          trigger: ['blur', 'change'],
        },
        {
          pattern: /^\d{6}$/,
          message: '验证码必须为6位',
          trigger: ['blur', 'change'],
        },
      ],
      agree_terms: [
        {
          validator: function (_rule: never, value: boolean, cd: any) {
            if (value === true) {
              cd()
            } else {
              cd(new Error('请同意服务条款'))
            }
          },
          trigger: ['blur', 'change'],
        },
      ],
    }
    return {
      form_sign_in,
      is_show_form_sign_in,
      sign_in_rules,
      form_registered,
      registered_rules,
      code_text,
      handleLogIn: () => store.commit('user/logIn'),
      login_status: store.state.user.login_status,
      setMenu: (menu: Menu) => store.commit('sidebar/setMenu', menu),
    }
  },
  methods: {
    handleFormSignIn() {
      const form_sign_in = this.$refs['form-sign-in'] as typeof ElForm
      form_sign_in.validate((valid: boolean) => {
        if (valid) {
          // TODO 向服务器发送数据 jwt 认证
          login({
            user: this.form_sign_in.user_name,
            password: this.form_sign_in.user_password,
          }).then((data) => {
            if (data && data.code === 2000) {
              this.setMenu(data.user.routeList)
              this.handleLogIn()
              this.$router.push('/home')
            }
          })
        } else {
          return false
        }
      })
    },
    handleFormRegist() {
      const form_sign_in = this.$refs['form-registered'] as typeof ElForm
      form_sign_in.validate((valid: boolean) => {
        if (valid) {
          alert('注册成功！')
        } else {
          return false
        }
      })
    },
    // TODO 通过邮箱发送验证码
    handleSendCode() {
      let ss = 60
      const times = setInterval(() => {
        ss--
        this.code_text = `已发送 ${ss} s`
        if (ss === 0) {
          this.code_text = '发送验证码'
          clearInterval(times)
        }
      }, 1e3)
    },
  },
})
</script>
<style lang="scss" scoped>
.login-main {
  min-height: 100vh;
  // background: #000 url('../assets/image/ntm0.jpg') no-repeat 50%;
  // background-size: 100% auto;
}
.form-container {
  width: 4rem;
  margin: 0.7rem auto 0.2rem;
  border: 0.01rem solid transparent;
  .form-title {
    text-align: center;
  }
  .sign-in,
  .registered {
    padding: 0.15rem;
    height: auto;
    border: 0.01rem solid #fff;
    background-color: #fff;
    border-radius: 0.15rem;
  }
  :deep(.el-input__inner),
  :deep(.el-button) {
    border-radius: 0.3rem;
  }

  .el-button {
    margin: 0 auto;
    width: 100%;
    /* &:hover {
      transform: translateY(10px);
      transition: all 0.6s ease-out;
    } */
  }
}
</style>