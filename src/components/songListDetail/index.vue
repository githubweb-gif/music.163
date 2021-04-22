<template>
  <div id="to-top" v-loading="fullscreenLoading" element-loading-background="rgb(255, 255, 255)" element-loading-spinner="el-icon-loading" class="songlistDetail">
    <header-component :description="description" :name="name" :cover-img-url="coverImgUrl" :create-time="createTime" :creator="creator">
      <template v-slot:creator>
        <div v-if="albumId" class="creator">
          <span class="nickname">歌手名：{{ creator.nickname }}</span>
          <span class="create-time">发行时间：{{ createTime | filterTime }}</span>
        </div>
        <div v-else class="creator">
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
import headerComponent from './header.vue'
import songList from './songList.vue'
export default {
  filters: {
    filterTime (value) {
      const date = new Date(Number(value))
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let dd = date.getDate()
      dd = dd < 10 ? '0' + dd : dd
      return `${year}-${month}-${dd}`
    }
  },
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
      ids: [],
      // 存放有版权信息
      privileges: null,
      // 描述
      description: ''
    }
  },
  computed: {
    playlistDetails () {
      return this.$store.state.music.playlistDetails || []
    },
    albumDetails () {
      return this.$store.state.music.albumDetails || []
    },
    // 歌单id
    songlistId () {
      const path = this.$route.path
      if (path.includes('songListDetail')) {
        return this.$route.params.id || ''
      }
      return ''
    },
    // 专辑
    albumId () {
      const path = this.$route.path
      if (path.includes('albumDetail')) {
        return this.$route.params.id || ''
      }
      return ''
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
    albumId (value) {
      if (value) {
        this.$store.dispatch('GET_ALBUM_DETAIL', value)
      }
    },
    playlistDetails (data) {
      console.log(data)
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
    albumDetails (data) {
      console.log(data)
      this.$store.commit('SET_USERID', '')
      this.name = data.album.name
      this.coverImgUrl = data.album.picUrl
      this.createTime = data.album.publishTime.toString()
      this.description = data.album.description
      this.creator.backgroundUrl = data.album.blurPicUrl
      this.creator.nickname = data.album.artist.name
      this.filterMusics(data.songs)
      this.fullscreenLoading = false
    },
    $route () {
      // 路由变化时，关闭选择
      this.$bus.$emit('close', false)
    }
  },
  created () {
    if (this.albumId) {
      this.$store.dispatch('GET_ALBUM_DETAIL', this.albumId)
    } else if (this.songlistId) {
      this.$store.dispatch('GET_SONGS_DETAIL', this.songlistId)
    }
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
