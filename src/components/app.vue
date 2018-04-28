<template>
    <div id="app">
        <el-container class="app-container">
            <!-- <el-col :span="24" class="app-header">Header</el-col> -->
            <el-container class="main-container">
                <el-aside class="main-aside" style="width:230px">
                    <siderbar></siderbar>
                </el-aside>
                <el-main class="main-content">
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import siderbar from './siderbar.vue'
import { getDataList } from '../network/module/messagePgae'
export default {
  name: 'App',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      data: ''
    }
  },
  methods: {
  },
  created () {
  },
  components: {
      siderbar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    #app{
        height: 100%;
        width: 100%;
        .app-container{
            height: 100%;
            .app-header{
                height: 0;
            }
            .main-container{
                .main-aside{
                    height: 100%;
                }
                .main-content{
                    
                }
            }
        }
    }
</style>
