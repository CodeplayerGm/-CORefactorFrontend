<template>
  <div id='main'>
    <app-header></app-header>

    <el-tabs type="border-card" id='panel-area'>
      <div id='form-basic'>
        <el-form :label-position="labelPosition" label-width="100px" id='form-1'>
          <el-form-item label="聚类簇数k">
            <el-input v-model="ldaForm.k"></el-input>
          </el-form-item>
          <el-form-item label="超参数α">
            <el-input v-model="ldaForm.alpha"></el-input>
          </el-form-item>
          <el-form-item label="超参数β">
            <el-input v-model="ldaForm.beta"></el-input>
          </el-form-item>
          <el-form-item label="迭代次数iter">
            <el-input v-model="ldaForm.iter"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="submitTask()" > LDA建模 </el-button>
            <el-button type="primary" @click="getPerplexity()" > 模型验证 </el-button>
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
  name: 'TopicModeling',
  data () {
    return {
      labelPosition: 'left',
      ldaForm: {
        k: null,
        alpha: null,
        beta: null,
        iter: null
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
      // k=30
      // alpha=0.03333
      // beta=0.01
      // iter=1200
      that.$axios.post('/concern/ldaProcess', that.ldaForm)
        .then((response) => {
          let data = response.data
          if (data.code !== 200) {
            that.errorMessage(data.msg)
          }
        })
        .catch((e) => {
          console.log(e)
        })
      that.successMessage('已提交LDA聚类任务')
    },
    getPerplexity() {
      let that = this
      that.$axios.get('/concern/getPerplexity')
        .then((response) => {
          let data = response.data
          if (data.code === 200) {
            that.successMessage(data.msg + " : " + data.obj)
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
  #form-1 {
    width: 400px;
    height: 300px;
    /* border: 2px solid gray; */
    /* border-radius: 8px; */
    margin: 0 auto;
  }
</style>
