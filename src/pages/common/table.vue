<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      v-for="(item, index) in config.column"
      :key="index" 
      :prop="item.prop"
      :label="item.label"
      :width="item.width || ''">
    </el-table-column>
    <el-table-column
      v-for="(item, index) in config.show"
      :key="100 + index" 
      :prop="item.prop"
      :label="item.label"
      :width="item.width || '80'">
      <template slot-scope="scope">
        <el-button @click="item.click(scope.row.detail)" type="text" size="small">{{item.text}}</el-button>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="config.opera.edit(scope.row._id)" type="text" size="small">修改</el-button>
        <el-button @click="config.opera.del(scope.row._id)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'table-box',
  data () {
    return {
        title: 'table' 
    }
  },
  props: {
      config: Object,
      tableData: Array
  },
  methods: {
  },
  created () {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
