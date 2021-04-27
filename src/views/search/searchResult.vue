<template>
  <div class="searchResult">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in tabs"
        :key="item.type"
        :label="item.value"
        :name="item.type"
      >
      </el-tab-pane>
    </el-tabs>
    <div class="content scroll-list">
      <component :songs="songs" :is="component"></component>
    </div>
  </div>
</template>

<script>
import playList from '@/components/playList/list.vue'
import singerList from './singerList.vue'
export default {
  components: {
    playList,
    singerList
  },
  props: {
    songs: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      activeName: '1',
      component: 'playList',
      tabs: [
        { type: '1', value: '单曲', component: 'playList' },
        { type: '100', value: '歌手', component: 'singerList' },
        { type: '10', value: '专辑' },
        { type: '1004', value: 'MV' },
        { type: '1000', value: '歌单' },
        { type: '1002', value: '用户' }
      ]
    }
  },
  created () {},
  methods: {
    handleClick (value) {
      this.component = this.tabs[+value.index].component || 'playList'
    }
  }
}
</script>
<style lang='scss' scoped>
.searchResult {
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
