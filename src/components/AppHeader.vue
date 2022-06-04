<template>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#409EFF"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/NlpProcess">1、语义预处理</el-menu-item>
      <el-menu-item index="/TopicModeling">2、主题建模</el-menu-item>
      <el-menu-item index="/FunctionalTopic">3、功能性主题筛选</el-menu-item>
      <el-menu-item index="/DependencyExtract">4、依赖抽取</el-menu-item>
      <el-menu-item index="/FunctionalAtom">5、功能原子聚类</el-menu-item>
      <el-menu-item index="/GeneticSearch">6、执行重构搜索</el-menu-item>
      <el-menu-item index="/ProgramChart">7、重构方案展示</el-menu-item>
    </el-menu>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      activeIndex: '0'
    }
  },
  methods: {
    handleSelect(key) {
      this.$router.push(key)
    }
  }
}
</script>

<style scoped>
  #main {
    width: 100%;
    height: 60px;
    border-radius: 8px;
    background: #00AEAE;
  }
</style>
