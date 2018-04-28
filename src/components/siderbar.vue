<template>
    <el-menu class="app-main-sider" router :default-active="$route.path">
        <el-menu-item v-for="(item, index) in router" :index="item.path" :key="index" :route="item">
            {{item.title}}
        </el-menu-item>
    </el-menu>
</template>

<script>
import { getDataList } from '../network/module/messagePgae'
export default {
  name: 'App',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      router: this.$store.state.route
    }
  },
  methods: {
      getDataList() {
          getDataList().then(() => {})
      }
  },
  created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .app-main-sider{
        height: 100%;
    }
</style>
