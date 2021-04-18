<template>
  <div class="songlist-detail-list">
    <div class="title">
      <span class="play-all" @click="playALL">
        <i class="el-icon-delete-solid" />
        <span v-if="songs">{{ `播放全部(${songs.length})` }}</span>
      </span>
      <span class="mid">|</span>
      <span @click="dialogVisible = !dialogVisible" class="choose">
        <i class="el-icon-delete-solid" />
        <span>选择</span>
      </span>
    </div>
    <music-item :songs="songs" />
    <choose-component :visible.sync="dialogVisible"></choose-component>
  </div>
</template>

<script>
// components
import musicItem from './components/index.vue'
import setMusciInfo from '@/untils/setMusciInfo'
import chooseComponent from './choose.vue'
export default {
  components: {
    musicItem,
    chooseComponent
  },
  props: {
    songs: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  mounted () {

  },
  computed: {
    // 歌单id
    id () {
      return this.$route.params.id || ''
    }
  },
  watch: {
  },
  methods: {
    // 播放全部
    playALL () {
      const arr = this.songs.filter((x) => {
        return x.copyright >= 0
      })
      // 设置当前播放歌单id
      this.$store.commit('SET_SONGLISTID', this.id)
      // 先暂停
      this.$store.commit('SET_PLAYING', false)
      setMusciInfo(arr[0]).then((res) => {
        // 更新播放记录
        this.$store.dispatch('SET_HISTORY', res)
        // 同时更新播放队列
        this.$store.dispatch('SET_PLAYLIST', { list: arr, one: false })
        // 再播放
        this.$store.commit('SET_PLAYING', true)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin: 20px 0 15px 0;
  .play-all {
    cursor: pointer;
  }
  .mid {
    padding: 0 10px;
  }
  i {
    margin-right: 5px;
  }
  .choose {
    cursor: pointer;
  }
}
</style>
