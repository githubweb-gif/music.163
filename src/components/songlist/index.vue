<template>
  <div id="to-top" v-loading="fullscreenLoading" element-loading-background="rgb(255, 255, 255)" element-loading-spinner="el-icon-loading" class="scroll-list songlistDetail">
    <header-component :description="description" :name="name" :cover-img-url="coverImgUrl" >
      <template v-slot:creator>
        <div class="creator">
          <span class="avatarUrl"><img :src="creator.avatarUrl" alt=""></span>
          <span class="nickname">{{ creator.nickname }}</span>
          <span class="create-time">{{ createTime | filterTime }}</span>
        </div>
      </template>
    </header-component>
    <song-list :songs="songs" />
  </div>
</template>

<script>
// api
import { allSongDetail } from '@/api/music'
import headerComponent from '../playList/header.vue'
import songList from '../playList/list.vue'
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
      // 描述
      description: '',
      fullscreenLoading: true,
      songs: [],
      ids: [],
      // 存放有版权信息
      privileges: null
    }
  },
  computed: {
    playlistDetails () {
      return this.$store.state.music.playlistDetails || []
    },
    // 歌单id
    songlistId () {
      return this.$route.params.id || ''
    }
  },
  mounted () {
    this.$bus.$on('deleted', (data) => {
      this.songs = data
    })
  },
  watch: {
    songlistId (value) {
      if (value) {
        this.$store.dispatch('GET_SONGS_DETAIL', value)
      }
    },
    playlistDetails (data) {
      const userId = data.playlist.creator.userId || ''
      this.$store.commit('SET_USERID', userId)
      this.ids = []
      this.name = data.playlist.name
      this.description = data.playlist.description
      this.coverImgUrl = data.playlist.coverImgUrl
      this.createTime = data.playlist.createTime.toString()
      const { nickname, avatarUrl, backgroundUrl } = data.playlist.creator
      this.creator = {
        nickname,
        avatarUrl,
        backgroundUrl
      }
      const trackIds = data.playlist.trackIds || []
      trackIds.forEach((item, index) => {
        this.ids.push(item.id)
      })
      allSongDetail(this.ids.join(',')).then((res) => {
        this.privileges = res.privileges
        this.filterMusics(res.songs)
      })
      this.fullscreenLoading = false
    },
    $route () {
      // 路由变化时，关闭选择
      this.$bus.$emit('close', false)
      this.fullscreenLoading = true
    }
  },
  created () {
    this.$store.dispatch('GET_SONGS_DETAIL', this.songlistId)
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
          copyright: this.privileges ? this.privileges[index].st : 0,
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
