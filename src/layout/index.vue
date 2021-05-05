<template>
  <div class="layout">
    <header-bar class="header" />
    <div class="container">
      <side-bar class="side" />
      <div ref="main" id="main">
        <zoom @sizeChange="zoom"></zoom>
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
        <!-- 右边侧边栏用户信息 -->
        <transition name="fade-transform">
          <user-info v-if="isUserRight && loginStatus" class="right-side" />
        </transition>
        <!-- 右边侧边播放列表 -->
        <transition name="fade-transform">
          <music-list v-show="isMusicList" class="right-side" />
        </transition>
      </div>
    </div>
    <footer-bar class="footer" />
    <to-login class="login" />
    <!-- 右边侧边栏的阴影盒子 -->
    <div
      v-show="isMusicList || isUserRight"
      class="shadow"
      @click="rightSideShow"
    />
  </div>
</template>

<script>
import musicList from '@/components/musicList'
import userInfo from '@/components/userInfo'
import headerBar from './components/header.vue'
import sideBar from './components/sideBar.vue'
import footerBar from './components/footer/footer.vue'
import toLogin from '@/views/login/index.vue'
import { mapState, mapMutations } from 'vuex'
import zoom from '@/components/zoom/index.vue'
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
  mounted () {
    const main = this.$refs.main
    this.$store.commit('SET_RESIZE', main)
  },
  methods: {
    rightSideShow () {
      if (this.isMusicList) {
        this.setIsMusicList(false)
      }
      if (this.isUserRight) {
        this.setUserRight(false)
      }
    },
    zoom (value) {
      this.$bus.$emit('zoom', value)
    },
    ...mapMutations({
      setIsMusicList: 'SET_ISMUSICLIST',
      setUserRight: 'SET_IS_USER_Right'
    })
  }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 700px) {
  #main {
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
  #main {
    flex: 1;
    position: relative;
    overflow: hidden;
    padding: 15px 20px;
  }
  .right-side {
    z-index: 9999;
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
