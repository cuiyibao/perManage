<template>
    <div class="app-header-container">
        <div class="app-header-fl">
            <span>XXXXX</span>
        </div>
        <div class="app-header-rl"></div>
    </div>
</template>

<script>
export default {
    name: "appHeader",
    data() {
        return {
            
        };
    },
    methods: {},
    created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.app-header-container {
    height: 100%;
    width: 100%;
    display: flex;
    z-index: 2;
    background: #f9f9f9;
    // background: linear-gradient(
    //     right,
    //     #8b8dd6,
    //     #d1d1da
    // );
    border-bottom: 1px solid rgba(230, 230, 230, 0.99);
    .app-header-fl {
        height: 46px;
        width: 120px;
        text-align: center;
        line-height: 46px;
        // color: white;
    }
    .app-header-rl {
        flex: 1;
    }
}
</style>
