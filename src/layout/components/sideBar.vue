<template>
  <div :style="`width: ${width};`" class="side-box">
    <div class="menu-icon el-icon-s-fold" @click="isCollapse = !isCollapse" />
    <div class="menu">
      <div
        v-for="(item, index) of route"
        :key="index"
        :class="[
          'menu-item',
          'item',
          { selected: routePath === `/${item.path}` },
        ]"
        :index="item.name"
      >
        <router-link :to="`/${item.path}`">
          <i :class="item.meta.icon" />
          <span v-show="!isCollapse">{{ item.meta.title }}</span>
        </router-link>
      </div>
      <!-- 歌单 -->
      <div v-show="!isCollapse" class="song-list">
        <div class="song-title">
          <div class="title">创建的歌单</div>
          <i class="el-icon-eleme" />
        </div>
        <ul class="lists">
          <li
            v-for="(item, index) in songLists"
            :key="index"
            :class="[
              'list',
              'item',
              { selected: routePath === `/songListDetail/${item.id}` },
            ]"
            @click="toSongListDetail(item.id)"
          >
            <i class="el-icon-eleme" />
            <span> {{ item.name }}</span>
            <i v-if="+songListId === item.id" class="el-icon-eleme" />
          </li>
        </ul>
      </div>
    </div>
    <!-- 账号 -->
    <div ref="account" :class="['account-number', { account: isCollapse }]">
      <div class="avatar" @click.stop="toLogin">
        <img :src="avatar ? avatar : cover" alt="">
      </div>
      <div v-if="!isCollapse" class="name" @click.stop="toLogin">
        <span>{{ name ? name : "点击登录" }}</span>
      </div>
      <div class="position"><span class="el-icon-setting" /></div>
    </div>
  </div>
</template>

<script>
import avatar from '@/assets/img/avatar.png'
import { mapMutations, mapState, mapGetters } from 'vuex'
import { routes } from '@/router'
export default {
  data () {
    return {
      width: '200px',
      isCollapse: false,
      cover: avatar
    }
  },
  computed: {
    ...mapState({
      name: (state) => state.user.name,
      avatar: (state) => state.user.avatar,
      loginStatus: (state) => state.user.loginStatus,
      isUserRight: (state) => state.user.isUserRight
    }),
    ...mapGetters(['songLists']),
    songLists () {
      const arr = this.$store.getters.songLists
      if (arr) {
        arr[0].name = '我喜欢的音乐'
      }
      return arr
    },
    route () {
      const routelist = routes[0].children || []
      const list = routelist.filter((x) => {
        if (!x.hidden) {
          return true
        }
      })
      return list
    },
    // 当路由和menu-item相同时，给他一个类名，用来高亮显示，表示被选中
    routePath () {
      return this.$route.path
    },
    // songListId
    songListId () {
      return this.$store.state.music.songListId
    }
  },
  watch: {
    isCollapse (val) {
      if (val) {
        this.width = '40px'
        this.$refs.account.style.flexDirection = 'column'
      } else {
        this.width = '200px'
        this.$refs.account.style.flexDirection = 'row'
      }
    }
  },
  created () {},
  mounted () {
    const body = document.body
    window.onresize = () => {
      if (body.clientWidth <= 700) {
        this.isCollapse = true
      }
    }
  },
  methods: {
    toLogin () {
      if (this.loginStatus) {
        if (this.isUserRight) {
          this.setUserRight(false)
        } else {
          this.setUserRight(true)
        }
        return
      }
      this.setLoginState(true)
    },
    ...mapMutations({
      setLoginState: 'SET_LOGIN_STATE',
      setUserRight: 'SET_IS_USER_Right'
    }),
    toSongListDetail (id) {
      this.$router.push({
        path: `/songListDetail/${id}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 700px) {
  .side-box {
    position: fixed !important;
    top: 30px;
    bottom: 60px;
    left: 0;
    z-index: 100;
    transition: 0.2s all ease;
  }
}

.side-box {
  overflow: hidden;
  background-color: rgb(246, 246, 247);
  position: relative;
  border-right: 1px solid #bebeca;
  z-index: 9999;
  .menu-icon {
    width: 100%;
    padding: 10px 0 10px 10px;
    font-size: 20px;
  }
  .menu {
    width: 200px;
    height: 100%;
    padding-bottom: 100px;
    overflow-y: auto;
    overflow-x: hidden;
    .item:hover {
      background-color: #dddde1;
    }
    .menu-item {
      a {
        width: 100%;
        display: block;
        padding: 10px;
      }
      font-size: 13px;
      display: flex;
      align-items: center;
      cursor: pointer;
      i {
        font-size: 14px;
      }
      span {
        margin-left: 10px;
      }
    }
    .selected {
      background-color: #dddde1;
    }
    .song-list {
      display: flex;
      flex-direction: column;
      cursor: auto;
      font-size: 13px;
      .song-title {
        padding: 10px 10px 0 10px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        color: #949494;
      }
      .lists {
        width: 100%;
        cursor: pointer;
        padding: 0;
        .list {
          width: 100%;
          padding: 10px;
          display: flex;
          justify-content: space-between;
          span {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin: 0 5px;
            flex: 1;
          }
        }
      }
    }
  }
  // 隐藏滚动条

  .account-number {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #bebeca;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 100;
    padding: 10px;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .name {
      flex: 1;
      margin-left: 10px;
    }
  }
}
</style>
