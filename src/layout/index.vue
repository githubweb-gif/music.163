<template>
  <div class="layout">
    <header-bar class="header" />
    <div @click="MusicListShow(false)" class="container">
      <side-bar class="side" />
      <div class="main">
        <router-view />
        <transition name="fade-transform">
          <music-list @click.native.stop="MusicListShow(true)" v-show="isMusicList" />
        </transition>
      </div>
    </div>
    <footer-bar @click.native="MusicListShow(false)" class="footer" />
    <to-login class="login" />
  </div>
</template>

<script>
import musicList from '@/components/musicList'
import headerBar from './components/header.vue'
import sideBar from './components/side.vue'
import footerBar from './components/footer/footer.vue'
import { searckMusic } from '@/api/music'
import setMusciInfo from '@/untils/setMusciInfo'
import toLogin from '@/views/login/index.vue'
export default {
  components: {
    headerBar,
    sideBar,
    footerBar,
    musicList,
    toLogin
  },
  data () {
    return {}
  },
  computed: {
    isMusicList () {
      return this.$store.state.music.isMusicList
    }
  },
  created () {
    searckMusic({ keywords: '张学友' }).then(async (res) => {
      // 设置播放队列
      const playlist = res.result.songs
      setMusciInfo(res.result.songs[1]).then((data) => {
        const musicInfo = data
        this.$store.dispatch('SET_HISTORY', musicInfo)
      })
      this.$store.dispatch('SET_PLAYLIST', playlist)
    })
  },
  mounted () {},
  methods: {
    MusicListShow (value) {
      if (value) {
        return
      }
      this.$store.commit('SET_ISMUSICLIST', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  position: relative;
  .header,
  .container,
  .footer {
    width: 100%;
  }
}

.header {
  background-color: #c20c0c;
  height: 35px;
}

.container {
  flex: auto;
  display: flex;
  align-items: stretch;
  .main {
    flex: 1;
    position: relative;
  }
  .side {
    width: 45px;
    background-color: #f6f6f7;
  }
}

.footer {
  height: 60px;
  border-top: 1px solid #c6c3c3;
}

.login {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
}
</style>
