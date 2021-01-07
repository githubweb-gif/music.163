<template>
  <div
    class="side"
    :style="isCollapse === false ? 'flex:0.9;' : `flex:${flex};`"
  >
    <el-menu
      background-color="#f6f6f7"
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      :collapse-transition="false"
      active-text-color="#c20c0c"
      :router="true"
    >
      <div class="menu el-icon-s-fold" @click="isCollapse = !isCollapse" />
      <el-menu-item
        v-for="(item, index) of route"
        :key="index"
        :index="item.name"
      >
        <i :class="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
      <div v-if="!isCollapse" class="title">我的音乐</div>
      <div v-if="!isCollapse" class="title">创建的歌单</div>
      <el-menu-item index="8">
        <i class="el-icon-printer" />
        <span>我喜欢</span>
      </el-menu-item>
    </el-menu>
    <div :class="['account-number', { account: isCollapse }]">
      <div @click.stop="toLogin" class="avatar">
        <img :src="avatar ? avatar : cover" alt="" />
      </div>
      <div v-if="!isCollapse" @click.stop="toLogin" class="name">
        <span>{{ name ? name : "点击登录" }}</span>
      </div>
      <div class="position"><span class="el-icon-setting" /></div>
    </div>
  </div>
</template>

<script>
import avatar from '@/assets/img/avatar.png'
import { mapMutations, mapState } from 'vuex'
import { routes } from '@/router'
export default {
  data () {
    return {
      isCollapse: false,
      flex: '0.16',
      cover: avatar
    }
  },
  computed: {
    ...mapState({
      name: state => state.user.name,
      avatar: state => state.user.avatar,
      loginStatus: state => state.user.loginStatus,
      isUserRight: state => state.user.isUserRight
    }),
    route () {
      const routelist = routes[0].children || []
      const list = routelist.map(x => {
        if (x.hidden) {
          return x
        }
      })
      return list
    }
  },
  methods: {
    toLogin () {
      console.log(this.loginStatus)
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
    })
  }
}
</script>

<style lang="scss" scoped>
.side {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.el-menu {
  width: 100%;
  .title {
    font-size: 12px;
    padding: 20px 0 10px;
    padding-left: 10px;
  }
  .el-menu-item {
    padding: 10px 0;
    padding-left: 10px !important;
    padding-right: 10px !important;
    line-height: 0;
    height: auto;
    font-size: 13px;
    i {
      display: inline-block;
    }
  }
  .menu {
    font-size: 22px;
    color: #76757c;
    padding: 10px;
  }
}
.account-number {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #dedfdf;
  padding: 6px;
  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #d8d9d8;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
  .name {
    flex: auto;
    margin-left: 10px;
    font-size: 14px;
    span {
      cursor: pointer;
    }
  }
  .position {
    cursor: pointer;
  }
}
.account {
  flex-direction: column;
  justify-content: space-between;
  .avatar {
    margin-bottom: 15px;
  }
}
</style>
