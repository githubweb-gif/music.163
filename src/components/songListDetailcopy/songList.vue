<template>
  <div class="songlist-detail-list">
    <div class="title">
      <span class="play-all">
        <i class="el-icon-delete-solid" />
        <span v-if="songs">{{ `播放全部(${songs.length})` }}</span>
      </span>
      <span class="mid">|</span>
      <span class="choose">
        <i class="el-icon-delete-solid" />
        <span>选择</span>
      </span>
    </div>
    <music-item :songs="songs" />
  </div>
</template>

<script>
// components
import musicItem from './components/index.vue'
export default {
  components: {
    musicItem
  },
  props: {
    songs: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
    }
  },
  mounted () {

  },
  watch: {
  },
  methods: {
    // 对所有的歌曲信息进行修改以满足我们需要的格式,有利于维护和开发
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
