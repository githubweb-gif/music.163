<template>
  <div class="singerDetail detail scroll-list" id="to-top" v-loading="fullscreenLoading" element-loading-background="rgb(255, 255, 255)" element-loading-spinner="el-icon-loading">
    <header-component :detail="detail">
    </header-component>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="热门50" name="hot">
        <song-list :songs="songs" />
      </el-tab-pane>
      <el-tab-pane label="专辑" name="album">
        <album :id="id" />
      </el-tab-pane>
      <el-tab-pane label="MV" name="MV">
        <singer-mv :id="id" />
      </el-tab-pane>
      <el-tab-pane label="歌手详情" name="desc">
        <detail :desc="desc" :name="detail.name" />
      </el-tab-pane>
      <el-tab-pane label="相似歌手" name="similar">
        <similar :id="id" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// api
import { singerDesc, singerHotMusic, singerDetail } from '@/api/music'

import headerComponent from './header.vue'
import songList from '../playList/list.vue'
import detail from './components/detail.vue'
import album from './components/album.vue'
import similar from './components/similar.vue'
import singerMv from './components/MV.vue'
export default {
  components: {
    headerComponent,
    songList,
    detail,
    album,
    similar,
    singerMv
  },
  data () {
    return {
      activeName: 'hot',
      fullscreenLoading: false,
      // 热门歌曲50
      songs: [],
      // detail歌手详情
      detail: {
        name: '',
        briefDesc: '',
        cover: '',
        id: '',
        musicSize: 0,
        mvSize: 0,
        albumSize: 0
      },
      // 歌手详情
      desc: {
        briefDesc: '',
        introduction: []
      }
    }
  },
  computed: {
    // 歌手id
    id () {
      return this.$route.params.id
    }
  },
  watch: {
    activeName (val) {
      switch (true) {
        case val === 'hot':
          singerHotMusic({ id: this.id })
          break
        case val === 'desc':
          singerDesc({ id: this.id }).then(data => {
            this.desc.briefDesc = data.briefDesc
            this.desc.introduction = data.introduction
          })
      }
    },
    $route () {
      this.initData()
      this.activeName = 'hot'
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      singerHotMusic({ id: this.id }).then(data => {
        this.filterMusics(data.songs)
      })
      singerDetail({ id: this.id }).then(res => {
        const { data } = res
        for (const i in this.detail) {
          this.detail[i] = data.artist[i]
        }
      })
    },
    handleClick (value) {
    },
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
.singerDetail {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
