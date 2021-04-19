<template>
  <div v-if="visible" class="createPlaylist">
    <div class="content">
      <h4>新建歌单</h4>
      <div class="text">
        <el-input v-model="name" type="text" />
      </div>
      <el-checkbox v-model="checked">设置为隐私歌单</el-checkbox>
      <div class="footer">
        <el-button type="danger" @click="create">新建</el-button>
        <el-button type="info" @click="close">取消</el-button>
      </div>
    </div>
    <div class="box-shadow" />
  </div>
</template>

<script>
// api
import { createPlayList, addOrdel } from '@/api/music'
export default {
  props: {
    musics: {
      type: Array,
      default: null
    },
    // 视频还是歌曲''时歌曲
    type: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      checked: false,
      name: ''
    }
  },
  computed: {
    privacy () {
      if (this.checked) {
        return '10'
      }
      return ''
    }
  },
  methods: {
    create () {
      createPlayList({
        name: this.name,
        privacy: this.privacy,
        type: this.type
      }).then((res) => {
        const ids = []
        this.musics.forEach((x) => {
          ids.push(x.id)
        })
        addOrdel({
          op: 'add',
          pid: res.id,
          tracks: ids.join(','),
          timestamp: Date.now()
        })
          .then(() => {
            this.$store.dispatch('songList', Date.now())
          })
          .catch((err) => {
            console.log(err)
          })
      })
      this.close()
    },
    close () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.box-shadow,
.createPlaylist {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 100;
}
.box-shadow {
  opacity: 0.6;
  background-color: #fff;
}
.createPlaylist {
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    width: 350px;
    background-color: #fff;
    position: relative;
    z-index: 999;
    border: 1px solid rgb(228, 228, 228);
    box-shadow: 0 0 6px 0 rgb(206, 206, 206);
    h4 {
      border-bottom: 1px solid rgb(228, 228, 228);
      padding: 10px;
    }
    .text {
      padding: 20px;
    }
    .el-checkbox {
      padding: 0 20px;
      margin-bottom: 10px;
    }
    .footer {
      padding: 15px 20px 10px 20px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
