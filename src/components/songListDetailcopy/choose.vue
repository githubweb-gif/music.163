<template>
  <transition v-if="isChoose" name="fade">
    <div ref="chooseSelect" class="choose-select">
      <ul>
        <li>
          <el-checkbox v-model="checked" @change="change">全选</el-checkbox>
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
        <li @click="deletes">
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
    isChoose: {
      type: Boolean,
      default: false
    },
    checkeds: {
      type: Array,
      default: null
    },
    checkState: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      checked: false
    }
  },
  watch: {
    checkeds (value) {
      console.log(value)
    },
    checkState (value) {
      this.checked = value
    }
  },
  methods: {
    change (value) {
      if (value) {
        this.$emit('checkAll', true)
      } else {
        this.$emit('checkAll', false)
      }
    },
    nextPlay () {
      if (this.checkeds && this.checkeds.length > 0) {
        this.$store.dispatch('SET_PLAYLIST', { list: this.checkeds, one: true })
      }
      this.close()
    },
    close () {
      this.$emit('closeFooter', false)
    },
    tofavorites () {
      if (this.checkeds && this.checkeds.length > 0) {
        this.$emit('favorites', true)
      }
      this.close()
    },
    deletes () {
      if (this.checkeds && this.checkeds.length > 0) {
        this.$emit('deletes', true)
      }
      this.close()
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
  transition: all 0.3s ease;
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
.fade-enter-active, .fade-leave-active {
  transition: all .3s;
}
.fade-enter, .fade-leave-to {
  height: 0;
}
</style>
