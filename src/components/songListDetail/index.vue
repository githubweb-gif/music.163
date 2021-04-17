<template>
  <div class="songlistDetail">
    <header-component :name="name" :cover-img-url="coverImgUrl" :create-time="createTime" :creator="creator" />
    <song-list :song-list-id="id" :song-list="songList" :copyright="copyright" />
  </div>
</template>

<script>
import headerComponent from './header.vue'
import songList from './songList.vue'
// api
import { songListDetail } from '@/api/music'
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
      songList: null,
      copyright: [] // 记录歌曲是否具有版权 st>=0 具有版权 <0 没有版权
    }
  },
  computed: {
    // 歌单id
    id () {
      return this.$route.params.id || ''
    }
  },
  watch: {
    id () {
      this.songListDetail()
    }
  },
  created () {
    this.songListDetail()
  },
  methods: {
    songListDetail () {
      songListDetail({ id: this.id, timestamp: Date.now() }).then((data) => {
        this.name = data.playlist.name
        this.coverImgUrl = data.playlist.coverImgUrl
        this.createTime = data.playlist.createTime.toString()
        const { nickname, avatarUrl, backgroundUrl } = data.playlist.creator
        const trackIds = []
        const privileges = data.privileges || []
        privileges.forEach((element, index) => {
          trackIds.push(element.id)
        })
        this.copyright = data.privileges
        this.songList = trackIds
        this.creator = {
          nickname,
          avatarUrl,
          backgroundUrl
        }
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
