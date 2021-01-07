<template>
  <div class="layout">
    <header-bar class="header" />
    <div class="container">
      <side-bar class="side" />
      <div class="main">
        <router-view />
        <transition name="fade-transform">
          <user-info class="right-side" v-if="isUserRight && loginStatus" />
        </transition>
        <transition name="fade-transform">
          <music-list
          class="right-side"
            v-show="isMusicList"
          />
        </transition>
      </div>
    </div>
    <footer-bar class="footer" />
    <to-login class="login" />
    <div class="shadow" v-show="isMusicList || isUserRight" @click="rightSideShow(false)" />
  </div>
</template>

<script>
import musicList from '@/components/musicList'
import userInfo from '@/components/userInfo'
import headerBar from './components/header.vue'
import sideBar from './components/side.vue'
import footerBar from './components/footer/footer.vue'
import { searckMusic } from '@/api/music'
import setMusciInfo from '@/untils/setMusciInfo'
import toLogin from '@/views/login/index.vue'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  components: {
    headerBar,
    sideBar,
    footerBar,
    musicList,
    toLogin,
    userInfo
  },
  data () {
    return {}
  },
  computed: {
    ...mapState({
      isMusicList: state => state.music.isMusicList,
      isUserRight: state => state.user.isUserRight,
      loginStatus: state => state.user.loginStatus
    })
  },
  created () {
    searckMusic({ keywords: '张学友' }).then(async (res) => {
      // 设置播放队列
      const playlist = res.result.songs
      setMusciInfo(res.result.songs[1]).then((data) => {
        const musicInfo = data
        this.setHistory(musicInfo)
      })
      this.setPlaylist(playlist)
    })
  },
  methods: {
    rightSideShow (value) {
      if (this.isMusicList) {
        this.setIsMusicList(false)
      }
      if (this.isUserRight) {
        this.setUserRight(false)
      }
    },
    ...mapActions({
      setHistory: 'SET_HISTORY',
      setPlaylist: 'SET_PLAYLIST'
    }),
    ...mapMutations({
      setIsMusicList: 'SET_ISMUSICLIST',
      setUserRight: 'SET_IS_USER_Right'
    })
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
  height: 30px;
}

.container {
  flex: auto;
  display: flex;
  align-items: stretch;
  .main {
    flex: 3;
    position: relative;
  }
  .side {
    flex: 0.9;
    background-color: #f6f6f7;
  }
  .right-side {
    z-index: 100;
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

.shadow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}
</style>
