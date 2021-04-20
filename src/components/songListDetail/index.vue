<template>
  <div id="to-top" v-loading="fullscreenLoading"
  element-loading-background="rgb(255, 255, 255)"
  element-loading-spinner="el-icon-loading" class="songlistDetail">
    <header-component :name="name" :cover-img-url="coverImgUrl"
    :create-time="createTime" :creator="creator" />
    <song-list :songs="songs" />
  </div>
</template>

<script>
// api
import { allSongDetail } from '@/api/music'
import headerComponent from './header.vue'
import songList from './songList.vue'
export default {
  components: {
    headerComponent,
    songList
  },
  data () {
    return {
      // 歌单名
      name: '',
      // 歌单封面
      coverImgUrl: '',
      // 歌单创建时间
      createTime: '',
      // 歌单创造者信息
      creator: {
        // 创建者name
        nickname: '',
        // 创建者头像
        avatarUrl: '',
        // 顶部背景图像
        backgroundUrl: ''
      },
      fullscreenLoading: true,
      songs: [],
      trackIds: []
    }
  },
  computed: {
    playlistDetails () {
      return this.$store.state.music.playlistDetails || []
    },
    // 歌单id
    id () {
      return this.$route.params.id || ''
    }
  },
  mounted () {
    this.$bus.$on('deleted', data => {
      this.songs = data
    })
  },
  watch: {
    id (value) {
      if (value) {
        this.$store.dispatch('GET_SONGS_DETAIL', value)
      }
    },
    playlistDetails (data) {
      this.trackIds = []
      this.name = data.playlist.name
      this.coverImgUrl = data.playlist.coverImgUrl
      this.createTime = data.playlist.createTime.toString()
      const { nickname, avatarUrl, backgroundUrl } = data.playlist.creator
      this.creator = {
        nickname,
        avatarUrl,
        backgroundUrl
      }
      const privileges = data.privileges || []
      privileges.forEach((item, index) => {
        this.trackIds.push({
          // st版权信息 >=0 有版权 <0无版权
          st: item.st,
          id: item.id
        })
      })
      const ids = []
      this.trackIds.forEach((item) => {
        ids.push(item.id)
      })
      allSongDetail(ids.join(',')).then((res) => {
        this.filterMusics(res.songs)
      })
      this.fullscreenLoading = false
    },
    $route () {
      this.fullscreenLoading = true
      this.songs = []
      // 路由变化时，关闭选择
      this.$bus.$emit('close', false)
    }
  },
  created () {
    this.$store.dispatch('GET_SONGS_DETAIL', this.id)
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
          copyright: this.trackIds[index].st,
          index: index
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.songlistDetail {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
