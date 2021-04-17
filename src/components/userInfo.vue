<template>
  <div class="userInfo rigth-side">
    <header>用户信息</header>
    <div class="info">
      <div class="avatar"><img :src="avatar" alt=""></div>
      <div class="name">{{ name }}</div>
    </div>
    <div class="logout"><span @click="logout">退出登录</span></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      avatar: (state) => state.user.avatar,
      name: (state) => state.user.name
    })
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="scss" scoped>
.rigth-side {
      background-color:#fff;
  header {
    background-color: #edefee;
    padding: 10px 15px;
  }
  .info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 20px 15px;
    .avatar {
      width: 100px;
      height: 100px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .name {
      align-self: flex-start;
      margin-left: 10px;
    }
  }
  .logout {
    text-align: right;
    span {
        margin-right: 15px;
        padding: 4px;
        border: 1px solid #b1b7b4;
        cursor: pointer;
    }
  }
}
</style>
