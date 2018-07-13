<template>
  <div>
    
  </div>
</template>

<script>
import moment from "moment";
import extend from "extend";
import {
    getDataList
} from "../network/module/messagePgae";

export default {
    name: "showMsg",
    data() {
        return {
            
        };
    },
    methods: {
        
    },
    created() {
        //初始化获取表格数据
        getDataList().then(response => {
            this.tableData = response.data.data;
        });
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
