<template>
    <el-menu class="app-main-sider" router :default-active="$route.path">
        <el-menu-item v-for="(item, index) in router" :index="item.path" :key="index" :route="item">
            {{item.title}}
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    name: "siderbar",
    data() {
        return {
            router: this.$store.state.route
        };
    },
    methods: {},
    created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app-main-sider {
    height: 100%;
}
</style>
