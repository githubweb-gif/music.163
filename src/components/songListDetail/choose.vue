<template>
  <transition v-if="visible" name="fade">
    <div ref="chooseSelect" class="choose-select">
      <ul>
        <li>
          <el-checkbox v-model="status" @change="change">全选</el-checkbox>
        </li>
        <li @click="nextPlay">
          <div class="icon el-icon-video-play" />
          <p>下一首播放</p>
        </li>
        <li @click="tofavorites">
          <div class="icon el-icon-folder-add" />
          <p>收藏</p>
        </li>
        <li>
          <div class="icon el-icon-bottom" />
          <p>下载</p>
        </li>
        <li v-if="uid === userId" @click="deletes">
          <div class="icon el-icon-delete-solid" />
          <p>删除</p>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: null
    },
    checkAll: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      status: false
    }
  },
  computed: {
    // 当前登录用户id
    uid () {
      return this.$store.state.user.id
    },
    // 歌单拥有者id
    userId () {
      return this.$store.state.music.userId
    }
  },
  watch: {
    checkAll (val) {
      this.status = val
    }
  },
  methods: {
    change (val) {
      this.$bus.$emit('AllSelection', val)
    },
    nextPlay () {
      if (!this.data) {
        return
      }
      this.$store.dispatch('SET_PLAYLIST', { list: this.data, one: true })
      this.close()
    },
    close () {
      this.$bus.$emit('close', false)
    },
    tofavorites () {
      if (this.data && this.data.length > 0) {
        this.$bus.$emit('tofavorites', this.data)
      }
    },
    deletes () {
      if (this.data && this.data.length > 0) {
        this.$bus.$emit('deletes', this.data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.choose-select {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #373737;
  height: 60px;
  z-index: 999;
  color: #b0afaf;
  transition: all 0.5s ease;
  ul {
    display: flex;
    height: 60px;
    align-items: center;
    .el-checkbox {
      color: #fff;
    }
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 25px;
      margin-right: 5px;
      cursor: pointer;
      border-right: 1px solid #505050;
      .icon {
        margin-bottom: 5px;
        font-size: 20px;
      }
      p {
        font-size: 13px;
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  height: 0;
}
</style>
