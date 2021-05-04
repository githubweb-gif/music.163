<template>
  <div class="searchResult">
    <el-tabs ref="tabs" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in tabs"
        :key="item.type"
        :label="item.value"
        :name="item.type"
      >
        <div class="content">
          <component
            :keyWord="keyWord"
            :songs="songs"
            :is="item.component"
          ></component>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import playList from '@/components/playList/list.vue'
import singerList from './singerList.vue'
import albumList from './albumList.vue'
import mvList from './mvList.vue'
import songList from './songList.vue'
export default {
  components: {
    playList,
    singerList,
    albumList,
    mvList,
    songList
  },
  props: {
    songs: {
      type: Array,
      default: () => {
        return []
      }
    },
    keyWord: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      activeName: '1',
      tabs: [
        { type: '1', value: '单曲', component: 'playList' },
        { type: '100', value: '歌手', component: 'singerList' },
        { type: '10', value: '专辑', component: 'albumList' },
        { type: '1004', value: 'MV', component: 'mvList' },
        { type: '1000', value: '歌单', component: 'songList' }
      ]
    }
  },
  created () {},
  watch: {
    keyWord () {
      this.activeName = '1'
    }
  },
  mounted () {
    this.$refs.tabs.$el.querySelector('.el-tabs__content').classList.add('scroll-list')
  },
  methods: {
    handleClick (value) {
      this.$bus.$emit('search-tab', value.name)
    }
  }
}
</script>
<style lang='scss' scoped>
.el-tabs {
  display: flex;
  height: 100%;
  flex-direction: column;
}
</style>
