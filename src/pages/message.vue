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
        <el-button @click="dialogAddForm = true" type="primary">新增</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
      <table-box :table-data="tableData" :config="tableConfig"></table-box>
    </div>

    <section>
      <el-dialog title="新增" :visible.sync="dialogAddForm" class="form-dialog" @close="dialogClose">
        <el-form ref="addForm" :model="addForm">
          <el-form-item label="用户" resetField>
            <el-input v-model="addForm.name" prop="name"></el-input>
          </el-form-item>
          <el-form-item label="性别" resetField>
            <el-select v-model="addForm.sex" placeholder="请选择类型">
              <el-option label="男" value="male"></el-option>
              <el-option label="女" value="female"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" resetField>
            <el-date-picker v-model="addForm.birthday" type="date" placeholder="请选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="所在城市" resetField>
            <el-cascader size="large" :options="areaOptions" v-model="addForm.area">
            </el-cascader>
          </el-form-item>
          <el-form-item label="手机号" resetField>
            <el-input v-model="addForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" resetField>
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddForm = false">取 消</el-button>
          <el-button type="primary" @click="operaSave">确 定</el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import tableBox from "./common/table.vue";
import { provinceAndCityData, CodeToText } from "element-china-area-data";
import moment from "moment";
import {
    getDataList,
    addDataList,
    delDataList
} from "../network/module/messagePgae";

export default {
    name: "Message",
    data() {
        return {
            searchForm: {
                name: "",
                sex: "",
                birthday: "",
                area: [],
                phone: "",
                email: "",
                detail: {}
            },
            tableConfig: {
                column: [
                    {
                        prop: "name",
                        label: "用户"
                    },
                    {
                        prop: "sex",
                        label: "性别"
                    },
                    {
                        prop: "birthday",
                        label: "出生日期"
                    },
                    {
                        prop: "area",
                        label: "所在地区"
                    },
                    {
                        prop: "phone",
                        label: "手机号"
                    },
                    {
                        prop: "email",
                        label: "电子邮箱"
                    }
                ],
                show: [
                    {
                        prop: "detail",
                        label: "详情",
                        text: "查看详情",
                        click: this.showDetail
                    }
                ],
                opera: {
                    edit: this.operaEdit,
                    del: this.operaDel
                }
            },
            tableData: [],
            dialogAddForm: false,
            addForm: {
                name: "",
                sex: "",
                birthday: "",
                area: [],
                phone: "",
                email: "",
                detail: {}
            },
            areaOptions: provinceAndCityData
        };
    },
    methods: {
        /** 查找 */
        findData() {
            //获取表格数据
            getDataList().then(response => {
                this.tableData = response.data.data;
            });
        },
        /** 修改 */
        operaEdit() {
            this.dialogAddForm = true;
        },
        /** 删除 */
        operaDel(id) {
            console.log(id);
            this.$confirm("此操作将永久删除该用户信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    delDataList(id).then(response => {
                        this.$message({
                            type: "info",
                            message: response.data.message
                        });
                        this.findData();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        /** 保存 */
        operaSave() {
            //性别、地区和时间处理
            let _sex = "",
                _area = [],
                _birthday = "",
                _form = this.addForm;
            _sex == "female" ? (_sex = "女") : (_sex = "男");
            _form.area.forEach((ele, ind) => {
                _area[ind] = CodeToText[ele];
            });
            _area = _area.join("/");
            _birthday = moment(_form.birthday).format("YYYY-MM-DD");
            //发送请求
            addDataList({
                name: _form.name,
                sex: _form.sex,
                birthday: _birthday,
                area: _area,
                phone: _form.phone,
                email: _form.email,
                detail: _form.detail
            }).then(response => {
                this.dialogAddForm = false;
            });
        },
        /** 弹框关闭回调 */
        dialogClose() {
            console.log("close");
            this.$refs.addForm.resetFields();
        },
        /** 查看详情 */
        showDetail(detail) {
            this.$alert(detail);
        }
    },
    created() {
        //初始化获取表格数据
        this.findData();
    },
    components: {
        tableBox
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
