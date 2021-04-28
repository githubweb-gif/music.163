<template>
  <div ref="home" class="home">
    <div class="title">发现音乐</div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个性推荐" name="firstComponent" />
      <el-tab-pane label="歌单" name="songList"></el-tab-pane>
      <el-tab-pane label="最新音乐" name="latestMusic"></el-tab-pane>
      <el-tab-pane label="歌手" name="singer"></el-tab-pane>
    </el-tabs>
    <component class="home-main scroll-list" :is="componentName" />
  </div>
</template>

<script>
import firstComponent from './components/first.vue'
import songList from './components/songList.vue'
import latestMusic from './components/latestMusic.vue'
import singer from './components/singer.vue'
export default {
  components: {
    firstComponent,
    songList,
    latestMusic,
    singer
  },
  data () {
    return {
      activeName: 'firstComponent'
    }
  },
  computed: {
    componentName () {
      return this.$route.query.tab || 'firstComponent'
    }
  },
  watch: {
    $route () {
      this.activeName = this.$route.query.tab || 'firstComponent'
    }
  },
  created () {
    this.activeName = this.$route.query.tab || 'firstComponent'
  },
  methods: {
    handleClick (val) {
      this.$router.push({
        path: '/home',
        query: { tab: val.name }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.title {
  font-size: 13px;
  color: #666666;
  padding-bottom: 5px;
}
.home-main {
  overflow-y: auto;
  max-width: 1100px;
  margin: 25px auto 0;
}
</style>
