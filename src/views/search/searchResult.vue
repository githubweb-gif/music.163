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
        { type: '10', value: '专辑' },
        { type: '1004', value: 'MV' },
        { type: '1000', value: '歌单' },
        { type: '1002', value: '用户' }
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
    console.log(this.$refs.tabs.$el.querySelector('.el-tabs__content').classList.add('scroll-list'))
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
