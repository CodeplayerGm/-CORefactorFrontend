<template>
  <div id='main'>
    <app-header></app-header>
    <router-view/>
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue'

export default {
  components: { AppHeader },
  name: 'Layout',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #main {
    width: 100%;
    height: 900px;
    margin: 0 auto;
    /* background: #00AEAE; */
  }
</style>
