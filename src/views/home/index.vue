<template>
  <div ref="home" class="home">
    <div class="title">发现音乐</div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个性推荐" name="first" />
      <el-tab-pane label="歌单" name="second">歌单</el-tab-pane>
      <el-tab-pane label="主播电台" name="third">主播电台</el-tab-pane>
      <el-tab-pane label="最新音乐" name="fourth">最新音乐</el-tab-pane>
      <el-tab-pane label="歌手" name="five">歌手</el-tab-pane>
    </el-tabs>
    <div class="home-main">
      <component :is="componentName" />
    </div>
  </div>
</template>

<script>
import firstComponent from './components/first.vue'
export default {
  components: {
    firstComponent
  },
  data () {
    return {
      // tab栏
      activeName: 'first',
      componentName: 'firstComponent'
    }
  },
  methods: {
    handleClick () {}
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
}
.title {
  font-size: 13px;
  color: #666666;
  padding-bottom: 5px;
}
.home-main {
  padding: 0 1%;
}
</style>
