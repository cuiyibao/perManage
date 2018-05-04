<template>
    <div>
        <el-form>
          <el-form-item label="个人简介">
              <el-input type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="个人喜好">
              <el-input type="textarea"></el-input>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  name: 'Message',
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
