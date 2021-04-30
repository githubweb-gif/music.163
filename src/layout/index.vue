<template>
  <div class="layout">
    <header-bar class="header" />
    <div class="container">
      <side-bar class="side" />
      <div class="main">
        <zoom @scroll="zoom"></zoom>
        <keep-alive>
          <transition name="fade" mode="out-in">
            <router-view
              :class="$route.meta.margin ? 'autoMargin' : ''"
              v-if="$route.meta.keepAlive"
            ></router-view>
          </transition>
        </keep-alive>
        <transition name="fade" mode="out-in">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
        <transition name="fade-transform">
          <user-info v-if="isUserRight && loginStatus" class="right-side" />
        </transition>
        <transition name="fade-transform">
          <music-list v-show="isMusicList" class="right-side" />
        </transition>
      </div>
    </div>
    <footer-bar class="footer" />
    <to-login class="login" />
    <div
      v-show="isMusicList || isUserRight"
      class="shadow"
      @click="rightSideShow(false)"
    />
  </div>
</template>

<script>
import musicList from '@/components/musicList'
import userInfo from '@/components/userInfo'
import headerBar from './components/header.vue'
import sideBar from './components/sideBar.vue'
import footerBar from './components/footer/footer.vue'
// import { searchMusic } from '@/api/music'
// import setMusciInfo from '@/untils/setMusciInfo'
import toLogin from '@/views/login/index.vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import zoom from '@/components/scroll/index.vue'
export default {
  components: {
    headerBar,
    sideBar,
    footerBar,
    musicList,
    toLogin,
    userInfo,
    zoom
  },
  data () {
    return {}
  },
  computed: {
    ...mapState({
      isMusicList: (state) => state.music.isMusicList,
      isUserRight: (state) => state.user.isUserRight,
      loginStatus: (state) => state.user.loginStatus
    })
  },
  created () {},
  methods: {
    rightSideShow (value) {
      if (this.isMusicList) {
        this.setIsMusicList(false)
      }
      if (this.isUserRight) {
        this.setUserRight(false)
      }
    },
    zoom (value) {
      console.log(value)
      this.$bus.$emit('zoom', value)
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
@media only screen and (max-width: 700px) {
  .main {
    margin-left: 40px;
  }
}

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
  flex: 1;
  display: flex;
  align-items: stretch;
  overflow: hidden;
  .main {
    flex: 1;
    position: relative;
    overflow: hidden;
    padding: 15px 20px;
  }
  .right-side {
    z-index: 100;
  }
}

.footer {
  height: 60px;
  overflow: hidden;
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
