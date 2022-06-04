<template>
  <div id='main'>
    <app-header></app-header>

    <el-tabs type="border-card" id='panel-area'>
      <div id='form-basic'>
        <div>
          <el-input
            type="textarea"
            :autosize="{ minRows: 1, maxRows: 15}"
            placeholder="请输入服务路径，多个服务路径以换行符隔开"
            v-model="servicePaths">
          </el-input>
          <el-button type="success" v-on:click="submitTask" style="width: 100px; margin-top: 50px">开始执行</el-button>
        </div>
      </div>
    </el-tabs>
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue'

export default {
  components: { AppHeader },
  name: 'NlpProcess',
  data () {
    return {
      servicePaths: ""
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
        duration: 1000
      })
    },
    submitTask () {
      let that = this
      let params = {
        servicePathsString: that.servicePaths
      }

      // 测试数据
      // D:\Development\idea_projects\mall-swarm-merge1\mall-admin
      // D:\Development\idea_projects\mall-swarm-merge1\merge1
      that.$axios.post('/concern/nlpPreprocess', params)
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
    height: 400px;
    margin: 25px auto 0 auto;
    /* background: gray; */
  }
</style>
