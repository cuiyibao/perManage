<template>
  <div>
    <!--查询表单-->
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="用户">
        <el-input v-model="searchForm.name" placeholder="请填写用户名"></el-input>
      </el-form-item>
      <el-form-item label="所在城市">
        <el-cascader size="large" :options="areaOptions" v-model="searchForm.area">
        </el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button @click="findData" type="primary">查询</el-button>
        <el-button @click="findEmpty" type="primary">重置</el-button>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button @click="operaAdd" type="primary">新增</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <div class="table-box">
      <table-box :table-data="tableData" :config="tableConfig"></table-box>
    </div>

    <section>
      <!--新增和修改的弹框-->
      <el-dialog :title="addForm.title" :visible.sync="dialogAddForm" class="form-dialog" @open="dialogOpen" @close="dialogClose">
        <el-form ref="addForm" :model="addForm" :rules="rules">
          <el-form-item label="用户" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="addForm.sex" placeholder="请选择类型">
              <el-option label="男" value="male"></el-option>
              <el-option label="女" value="female"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker v-model="addForm.birthday" type="date" placeholder="请选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="所在城市" prop="area">
            <el-cascader size="large" :options="areaOptions" v-model="addForm.area">
            </el-cascader>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="addForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email">
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
import {
    provinceAndCityData,
    CodeToText,
    TextToCode
} from "element-china-area-data";
import moment from "moment";
import extend from "extend";
import {
    getDataList,
    addDataList,
    delDataList,
    updataDataList
} from "../network/module/messagePgae";

export default {
    name: "Message",
    data() {
        return {
            searchForm: {
                name: "",
                area: []
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
                title: "新增",
                name: "",
                sex: "",
                birthday: "",
                area: [],
                phone: "",
                email: "",
                detail: {}
            },
            rules: {
                name: {
                    required: true,
                    message: "请填写用户名"
                },
                sex: {
                    required: true,
                    message: "请选择性别"
                },
                birthday: {
                    required: true,
                    message: "请选择出生日期"
                },
                area: {
                    required: true,
                    message: "请选择所在地区"
                },
                phone: {
                    required: true,
                    message: "请输入手机号"
                },
                email: {
                    required: true,
                    message: "请输入邮箱"
                }
            },
            areaOptions: provinceAndCityData
        };
    },
    methods: {
        /** 查找 */
        findData() {
            let params = {
                name: this.searchForm.name,
                area: this.searchForm.area.concat()
            };
            if (params.area.length > 0) {
                let _area = [],
                    _areaArr = params.area;
                _areaArr.forEach((ele, ind) => {
                    _area[ind] = CodeToText[ele] || ele;
                });
                params.area = _area.join("/");
            } else {
                params.area = "";
            }
            getDataList(params).then(response => {
                this.tableData = response.data.data;
            });
        },
        /** 重置 */
        findEmpty() {
            this.searchForm = {
                name: "",
                area: []
            };
            this.findData();
        },
        /** 新增 */
        operaAdd() {
            this.addForm = {
                title: "新增",
                name: "",
                sex: "",
                birthday: "",
                area: [""],
                phone: "",
                email: "",
                detail: {}
            };
            this.dialogAddForm = true;
        },
        /** 修改 */
        operaEdit(form) {
            let _sex = form.sex,
                _area = [],
                _areaStr = form.area;
            _sex == "女" ? (_sex = "female") : (_sex = "male");
            //地区二级联动--所以数组只有两个元素
            _areaStr = _areaStr.split("/");
            _area.push(TextToCode[_areaStr[0]].code);
            _area.push(TextToCode[_areaStr[0]][_areaStr[1]].code);
            this.addForm = {
                title: "修改",
                id: form._id,
                name: form.name,
                sex: _sex,
                birthday: form.birthday,
                area: _area,
                phone: form.phone,
                email: form.email,
                detail: {}
            };
            this.dialogAddForm = true;
        },
        /** 删除 */
        operaDel(id) {
            this.$confirm("此操作将永久删除该用户信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    delDataList(id).then(response => {
                        this.showMessage(response.data.message, "success");
                        this.findData();
                    });
                })
                .catch(() => {
                    this.showMessage("已取消删除", "info");
                });
        },
        /** 保存 */
        operaSave() {
            this.$refs.addForm.validate(result => {
                if (result) {
                    //性别、地区和时间处理
                    let _sex = "",
                        _area = [],
                        _birthday = "",
                        _form = this.addForm;
                    _sex == "female" ? (_sex = "女") : (_sex = "男");
                    _form.area.forEach((ele, ind) => {
                        _area[ind] = CodeToText[ele] || ele;
                    });
                    _area = _area.join("/");
                    _birthday = moment(_form.birthday).format("YYYY-MM-DD");
                    let params = {
                        name: _form.name,
                        sex: _sex,
                        birthday: _birthday,
                        area: _area,
                        phone: _form.phone,
                        email: _form.email,
                        detail: {
                            introduce: "擅长各种球类",
                            hobby: "打篮球、踢足球、打羽毛球"
                        }
                    };
                    //发送请求
                    if (_form.title === "修改") {
                        updataDataList(_form.id, params).then(response => {
                            this.showMessage(response.data.message, "success");
                            this.findData();
                            this.dialogAddForm = false;
                        });
                    } else {
                        addDataList(params).then(response => {
                            this.showMessage(response.data.message, "success");
                            this.findData();
                            this.dialogAddForm = false;
                        });
                    }
                }
            });
        },
        /** 弹框打开、关闭回调 */
        dialogOpen() {
            setTimeout(() => {
                this.$refs.addForm.clearValidate();
            }, 1);
        },
        dialogClose() {
            setTimeout(() => {
                console.log(this);
                this.$refs.addForm.resetFields();
            }, 100);
        },
        /** 查看详情 */
        showDetail(detail) {
            this.$alert(detail);
        },
        /** 提示信息Message */
        showMessage(msg, type) {
            this.$message({
                type: type,
                message: msg,
                duration: 3000
            });
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
