<template>
    <div id="app">
        <el-container class="app-container">
            <el-col :span="24" class="app-header">
                <app-header></app-header>
            </el-col>
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
import appHeader from "./header.vue";
import siderbar from "./siderbar.vue";
export default {
    name: "App",
    data() {
        return {
            msg: "Welcome to Your Vue.js App",
            data: ""
        };
    },
    methods: {},
    created() {},
    components: {
        siderbar,
        appHeader
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#app {
    height: 100%;
    width: 100%;
    .app-container {
        height: 100%;
        .app-header {
            position: fixed;
            top: 0;
            height: 46px;
        }
        .main-container {
            margin-top: 46px;
            .main-aside {
                height: 100%;
            }
            .main-content {
            }
        }
    }
}
</style>
