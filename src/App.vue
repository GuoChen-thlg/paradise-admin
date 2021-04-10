<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <img src="./assets/logo.png" />
        <div>
          <p>
            If Element Plus is successfully added to this project, you'll see an
            <code v-text="'<el-button>'"></code>
            below
          </p>
          <el-button type="primary">el-button</el-button>
        </div>
        <HelloWorld msg="Welcome to Your Vue.js App" />
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
