<template>
  <div id='main'>
    <app-header></app-header>

    <el-tabs type="border-card" id='panel-area'>
      <div id='form-basic'>
        <el-form :label-position="labelPosition" label-width="160px" id='form-1'>
          <el-form-item label="系统根路径">
            <el-input
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 5}"
              placeholder="请输入目标系统根路径"
              v-model="form.systemRootPath">
            </el-input>
          </el-form-item>
          <el-form-item label="过载服务路径">
            <el-input
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 5}"
              placeholder="请输入过载服务路径"
              v-model="form.overloadSrvPath">
            </el-input>
          </el-form-item>
          <el-form-item label="聚类簇数">
            <el-input v-model="form.k"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="submitTask()" > 执行聚类 </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-tabs>
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue'

export default {
  components: { AppHeader },
  name: 'FunctionalAtom',
  data () {
    return {
      labelPosition: 'left',
      form: {
        systemRootPath: "",
        overloadSrvPath: "",
        k: null
      }
    }
  },
  methods: {
    errorMessage (msg) {
      this.$message.error({
        message: msg,
        showClose: true,
        duration: 1000
      })
    },
    successMessage (msg) {
      this.$message.success({
        message: msg,
        showClose: true,
        duration: 2000
      })
    },
    submitTask () {
      let that = this

      // 测试数据
      // D:\Development\idea_projects\mall-swarm-merge1
      // D:\Development\idea_projects\mall-swarm-merge1\merge1
      // k=18
      that.$axios.post('/faCluster', that.form)
        .then((response) => {
          let data = response.data
          if (data.code === 200) {
            that.successMessage(data.msg)
          } else {
            that.errorMessage(data.msg)
          }
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>

<style scoped>
  #main {
    width: 100%;
    height: 900px;
    margin: 0 auto;
  }
  #panel-area {
    width: 1200px;
    height: 700px;
    /* background: #F8F8F8 ; */
    margin: 50px auto 0 auto
  }
  #form-basic {
    width: 1000px;
    height: 500px;
    margin: 25px auto 0 auto;
    /* background: gray; */
  }
  #form-1 {
    width: 600px;
    height: 450px;
    /* border: 2px solid gray; */
    /* border-radius: 8px; */
    margin: 0 auto;
  }
</style>
