<template>
  <div id='main'>
    <app-header></app-header>

    <el-tabs type="border-card" id='panel-area'>
      <div id='form-basic'>
        <el-form :label-position="labelPosition" label-width="160px" id='form-1'>
          <el-form-item label="搜索算法">
            <el-radio-group v-model="form.searchType">
              <el-radio-button label="NSGA-II"></el-radio-button>
              <el-radio-button label="随机搜索"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="搜索粒度">
            <el-radio-group v-model="form.searchGranularity">
              <el-radio-button label="代码文件"></el-radio-button>
              <el-radio-button label="功能原子"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="最大遗传代数">
            <el-input v-model="form.generation"></el-input>
          </el-form-item>
          <el-form-item label="最大种群规模">
            <el-input v-model="form.population"></el-input>
          </el-form-item>
          <el-form-item label="最大基因型数量">
            <el-input v-model="form.maxRecord"></el-input>
          </el-form-item>
          <el-form-item label="过载个体最大占比">
            <el-input v-model="form.overloadRemainThreshold"></el-input>
          </el-form-item>
          <el-form-item label="交叉概率">
            <el-input v-model="form.crossoverProb"></el-input>
          </el-form-item>
          <el-form-item label="变异概率">
            <el-input v-model="form.mutationProb"></el-input>
          </el-form-item>
          <el-form-item label="break变异概率">
            <el-input v-model="form.breakProb"></el-input>
          </el-form-item>
          <el-form-item label="主题-服务概率阈值">
            <el-input v-model="form.modelService"></el-input>
          </el-form-item>
          <el-form-item label="主题-文件概率阈值">
            <el-input v-model="form.modelFile"></el-input>
          </el-form-item>
          <el-form-item label="关注点过载阈值">
            <el-input v-model="form.overloadThreshold"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="submitTask()" > 执行搜索 </el-button>
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
  name: 'GeneticSearch',
  data () {
    return {
      labelPosition: 'left',
      form: {
        searchType: "NSGA-II",
        searchGranularity: "代码文件",
        generation: null,
        population: null,
        maxRecord: null,
        overloadRemainThreshold: null,
        crossoverProb: null,
        mutationProb: null,
        breakProb: null,
        modelService: null,
        modelFile: null,
        overloadThreshold: null
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
      // generation=500
      // population=200
      // maxRecord=10000
      // overloadRemainThreshold=0.2
      // crossoverProb=0.8
      // mutationProb=0.4
      // breakProb=0.3
      // modelService=0.025
      // modelFile=0.016
      // overloadThreshold=7
      that.$axios.post('/geneticSearch', that.form)
        .then((response) => {
          let data = response.data
          if (data.code !== 200) {
            that.errorMessage(data.msg)
          }
        })
        .catch((e) => {
          console.log(e)
        })
      that.successMessage('已提交重构搜索任务。')
    }
  }
}
</script>

<style scoped>
  #main {
    width: 100%;
    height: 1000px;
    margin: 0 auto;
  }
  #panel-area {
    width: 1200px;
    height: 850px;
    /* background: #F8F8F8 ; */
    margin: 50px auto 0 auto
  }
  #form-basic {
    width: 1000px;
    height: 800px;
    margin: 25px auto 0 auto;
    /* background: gray; */
  }
  #form-1 {
    width: 600px;
    height: 800px;
    /* border: 2px solid gray; */
    /* border-radius: 8px; */
    margin: 0 auto;
  }
</style>
