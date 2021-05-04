<template>
  <div class="video">
    <div class="title">
      {{ title }}
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in tabs"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      ></el-tab-pane>
    </el-tabs>
    <div ref="component" class="component">
      <components :selected="position" @all="changeAll" :scroll="scroll" class="tab" :is="component"></components>
    </div>
  </div>
</template>

<script>
import featured from './featured.vue'
import leaderboard from './leaderboard.vue'
import allMv from './all.vue'
export default {
  components: {
    featured,
    leaderboard,
    allMv
  },
  data () {
    return {
      activeName: 'featured',
      component: 'featured',
      tabs: [
        { label: '精选', name: 'featured' },
        { label: '排行榜', name: 'leaderboard' },
        { label: '全部', name: 'allMv' }
      ],
      scroll: null,
      position: null
    }
  },
  computed: {
    title () {
      return this.$route.meta.title
    }
  },
  methods: {
    handleClick (val) {
      this.position = null
      this.component = val.name
    },
    changeAll (data) {
      this.activeName = 'allMv'
      this.component = 'allMv'
      this.position = data
    }
  },
  mounted () {
    this.scroll = { el: this.$refs.component }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 13px;
  color: #666666;
  padding-bottom: 5px;
}
.video {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.component {
  flex: 1;
  overflow-y: auto;
}
.tab {
  margin: 15px auto 0;
  max-width: 1100px;
}
</style>
