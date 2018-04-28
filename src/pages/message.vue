<template>
  <div>
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="用户">
        <el-input v-model="searchForm.user" placeholder="请填写用户名"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="searchForm.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button @click="dialogFormVisible = true" type="primary">新增</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
      <table-box :config="tableConfig"></table-box>
    </div>

    <section>
      <el-dialog title="新增" :visible.sync="dialogFormVisible">
        <el-form :model="addForm">
          <el-form-item label="用户">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="addForm.region" placeholder="请选择类型">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import tableBox from './common/table.vue'
export default {
  name: 'Message',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      data: '',
      searchForm:{
        user: '',
        region: ''
      },
      tableConfig: {
          column: [
             {
                 prop: 'user',
                 label: '审批人',
             }, {
                 prop: 'region',
                 label: '活动区域',
             }, {
                 prop: 'time',
                 label: '时间',
             }, {
                 prop: 'created-by',
                 label: '创建人',
             }  
          ],
          opera: {
            edit: this.operaEdit,
            del: this.operaDel
          }
      },
      dialogFormVisible: false,
      addForm: {
        user: '',
        region: ''
      }
    }
  },
  methods: {
    operaEdit() {
      this.dialogFormVisible = true
    },
    operaDel() {
      this.$alert("删除该项")
    },
  },
  created () {
  },
  components: {
    tableBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
