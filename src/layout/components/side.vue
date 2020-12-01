<template>
  <div class="side" :style="isCollapse === false ? 'width:230px;' : width">
    <el-menu
      background-color="#f6f6f7"
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      :collapse-transition="false"
      active-text-color="#c20c0c"
    >
      <div class="menu el-icon-s-fold" @click="isCollapse = !isCollapse" />
      <div v-if="!isCollapse" class="title">在线音乐</div>
      <el-menu-item index="1">
        <i class="el-icon-user-solid" />
        <span>音乐馆</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-s-goods" />
        <span>视频</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-help" />
        <span>电台</span>
      </el-menu-item>
      <div v-if="!isCollapse" class="title">我的音乐</div>
      <el-menu-item index="4">
        <i class="el-icon-printer" />
        <span>我喜欢</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-paperclip" />
        <span>本地歌曲</span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-headset" />
        <span>播放历史</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-setting" />
        <span>创建的歌单</span>
      </el-menu-item>
    </el-menu>
    <div class="account-number">
      <div class="avatar"><img :src="cover" alt="" /></div>
      <div @click="toLogin" class="name"><span>点击登录</span></div>
      <div class="position"><span class="el-icon-setting" /></div>
    </div>
  </div>
</template>

<script>
import avatar from '@/assets/img/avatar.png'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      isCollapse: false,
      width: '45px',
      cover: avatar
    }
  },
  methods: {
    toLogin () {
      this.setLoginState(true)
    },
    ...mapMutations({
      setLoginState: 'SET_LOGIN_STATE'
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
    padding: 5px 0;
    padding-left: 10px;
  }
  .el-menu-item {
    padding: 12px 0;
    padding-left: 10px !important;
    line-height: 0;
    height: auto;
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
      width: 15px;
      height: 15px;
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
</style>
