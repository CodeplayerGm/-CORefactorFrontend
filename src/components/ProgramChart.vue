<template>
  <div id='main'>
    <app-header></app-header>

    <el-tabs type="border-card" id='panel-area'>
      <div id='form-basic'>
        <el-form :label-position="labelPosition" label-width="100px" id='form-1'>
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

          <el-form-item>
            <el-button type="success" @click="submitTask()" > 查询重构方案 </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-tabs>

    <el-card class="programBorder" v-for="(item, index) in refactorPrograms" :key="index">
      <div style="float: left; margin-left: 120px; width: 120px; height: 35px; line-height: 35px; text-align: left;"> 
        <el-tag style="font-size: 18px; font-weight: 600;">{{item.name}}</el-tag>
      </div>
      <div style="float: left; margin-left: 40px; width: 130px; height: 35px; line-height: 35px; text-align: left; ">
        <el-tag type="info" style="font-size: 16px; font-weight: 600;">StMQ: {{ item.stmq }}</el-tag>
      </div>
      <div style="float: left; margin-left: 40px; width: 130px; height: 35px; line-height: 35px; text-align: left; ">
        <el-tag type="info" style="font-size: 16px; font-weight: 600;">SeMQ: {{ item.semq }}</el-tag>
      </div>
      <div style="float: left; margin-left: 40px; width: 120px; height: 35px; line-height: 35px; text-align: left; ">
        <el-tag type="info" style="font-size: 16px; font-weight: 600;">RC: {{ item.rc }}</el-tag>
      </div>
      <div style="float: left; margin-left: 40px; width: 230px; height: 35px; line-height: 35px; text-align: left; ">
        <el-tag type="info" style="font-size: 16px; font-weight: 600;">Euclidian Distance: {{ item.euclidianDis }}</el-tag>
      </div>
      <div :id="'refactor' + index" class="chartBorder"></div>
    </el-card>
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue'

export default {
  components: { AppHeader },
  name: 'ProgramChart',
  data () {
    return {
      labelPosition: 'left',
      form: {
        searchType: "NSGA-II",
        searchGranularity: "代码文件"
      },
      refactorPrograms: []
    }
  },
  methods: {
    infoMessage (msg) {
      this.$message({
        message: msg,
        showClose: true,
        duration: 1000
      })
    },
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
      that.$axios.get('/getPrograms/' + that.form.searchType + "/" + that.form.searchGranularity)
        .then((response) => {
          let data = response.data
          if (data.code === 200) {
            // that.successMessage(data.msg)
            // console.log(data.list)
            that.refactorPrograms = data.list
            if (data.list === null || data.list.length === 0) {
              that.infoMessage('暂无相关重构方案数据')
            } else {
              if (data.msg == 'FA') {
                setTimeout(function() {
                  for (let i = 0; i < data.list.length; i++) {
                    console.log("refactor" + i)
                    that.drawTree("refactor" + i, data.list[i])
                  }
                }, 1000);
              }
            }
          } else {
            that.errorMessage(data.msg)
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    drawTree(targetDom, chartData) {
      let chart = this.$echarts.init(document.getElementById(targetDom))
      chart.setOption({
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',
            id: 0,
            name: 'tree1',
            roam: true,
            data: [chartData],
            symbolSize: 12,
            edgeShape: 'polyline',
            // edgeForkPosition: '63%',
            initialTreeDepth: 3,
            lineStyle: {
              width: 3
            },
            label: {
              fontSize: 14,
              backgroundColor: '#fff',
              position: 'left',
              verticalAlign: 'middle',
              align: 'right'
            },
            leaves: {
              label: {
                fontSize: 14,
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            },
            emphasis: {
              focus: 'descendant'
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      })
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
    height: 300px;
    /* background: #F8F8F8 ; */
    margin: 50px auto 0 auto
  }
  #form-basic {
    width: 1000px;
    height: 300px;
    margin: 25px auto 0 auto;
    /* background: gray; */
  }
  #form-1 {
    width: 380px;
    height: 200px;
    /* border: 2px solid gray; */
    /* border-radius: 8px; */
    margin: 0 auto;
  }
  .programBorder {
    width: 1200px; 
    height: 700px; 
    margin: 50px auto; 
  }
  .chartBorder {
    width: 1000px; 
    height: 550px; 
    margin: 50px auto; 
    border: 1px solid #B0B0B0 ;
    border-radius: 4px;
  }
</style>
