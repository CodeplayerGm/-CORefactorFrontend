<template>
  <div id='main'>
    <app-header></app-header>

    <el-tabs type="border-card" id='panel-area'>
      <div id='form-basic'>
        <el-form :label-position="labelPosition" label-width="160px" id='form-1'>
          <el-form-item label="服务路径">
            <el-input
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 5}"
              placeholder="请输入服务路径，多个服务路径以换行符隔开"
              v-model="form.srvPaths">
            </el-input>
          </el-form-item>
          <el-form-item label="主题内聚性阈值1">
            <el-input v-model="form.tc1"></el-input>
          </el-form-item>
          <el-form-item label="主题内聚性阈值2">
            <el-input v-model="form.tc2"></el-input>
          </el-form-item>
          <el-form-item label="主题-服务关联概率阈值">
            <el-input v-model="form.service"></el-input>
          </el-form-item>
          <el-form-item label="主题-文件管理概率阈值">
            <el-input v-model="form.file"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="submitTask()" > 关注点抽取 </el-button>
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
  name: 'FunctionalTopic',
  data () {
    return {
      labelPosition: 'left',
      form: {
        tc1: null,
        tc2: null,
        service: null,
        file: null,
        srvPaths: null
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
      // D:\Development\idea_projects\mall-swarm-merge1\mall-admin
      // D:\Development\idea_projects\mall-swarm-merge1\merge1
      // tc1=0.4
      // tc2=0.5
      // service=0.025
      // file=0.016
      that.$axios.post('/concern/concernSelect', that.form)
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
      that.successMessage('已提交功能性主题筛选任务。')
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
