<template>
  <div class="album scroll-list" id="to-top" v-loading="fullscreenLoading" element-loading-background="rgb(255, 255, 255)" element-loading-spinner="el-icon-loading">
    <header-component :description="description" :name="name" :cover-img-url="coverImgUrl">
      <template v-slot:creator>
        <div class="creator">
          <span class="nickname">歌手名：{{nickname }}</span>
          <span class="create-time">发行时间：{{ createTime | filterTime }}</span>
        </div>
      </template>
    </header-component>
    <song-list :songs="songs" />
  </div>
</template>

<script>
// api
import headerComponent from '../playList/header.vue'
import songList from '../playList/list.vue'
export default {
  components: {
    headerComponent,
    songList
  },
  data () {
    return {
      // 专辑名
      name: '',
      // 专辑封面
      coverImgUrl: '',
      // 专辑发行时间
      createTime: '',
      // 专辑作者name
      nickname: '',
      // 专辑描述
      description: '',
      // 模糊背景
      backgroundUrl: '',
      fullscreenLoading: true,
      // 歌曲数据
      songs: []
    }
  },
  computed: {
    albumDetails () {
      return this.$store.state.music.albumDetails || []
    },
    // 专辑id
    albumId () {
      return this.$route.params.id || ''
    }
  },
  mounted () {
    this.$bus.$on('deleted', (data) => {
      this.songs = data
    })
  },
  watch: {
    albumId (value) {
      if (value) {
        this.$store.dispatch('GET_ALBUM_DETAIL', value)
      }
    },
    albumDetails (data) {
      // 用来区分歌单是否是自己拥有的
      this.$store.commit('SET_USERID', '')
      this.name = data.album.name
      this.coverImgUrl = data.album.picUrl
      this.createTime = data.album.publishTime.toString()
      this.description = data.album.description
      this.backgroundUrl = data.album.blurPicUrl
      this.nickname = data.album.artist.name
      this.filterMusics(data.songs)
      this.fullscreenLoading = false
    }
  },
  created () {
    this.$store.dispatch('GET_ALBUM_DETAIL', this.albumId)
  },
  methods: {
    filterMusics (data = []) {
      this.songs = []
      data.forEach((x, index) => {
        this.songs.push({
          id: x.id,
          album: { id: x.al.id },
          albumName: x.al.name,
          name: x.name,
          singerName: x.ar[0].name,
          duration: x.dt,
          // 版权 st<0无版权
          copyright: 0,
          index: index
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.album {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
