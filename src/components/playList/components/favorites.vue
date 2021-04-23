<template>
  <!-- 收藏歌曲弹框 -->
  <div>
    <el-dialog ref="favorites" width="400px" title="添加歌单" :visible.sync="visible" :before-close="beforeClose">
      <ul>
        <li @click="createPlayList">
          <span class="create el-icon-plus" />
          <span class="name">新建歌单</span>
        </li>
        <li v-for="item in songLists" :key="item.id" @click="toadd(item.id)">
          <span class="cover">
            <img :src="item.coverImgUrl">
          </span>
          <span>
            <div class="name">{{ item.name }}</div>
            <div class="count">{{ item.trackCount }}首音乐</div>
          </span>
        </li>
      </ul>
    </el-dialog>
    <create-playlist :musics="favoritesMsg" :visible.sync="showone"  />
    <dialog-component :visible.sync="message" :icon="icon"></dialog-component>
  </div>
</template>

<script>
import createPlaylist from '@/components/createPlaylist.vue'
import dialogComponent from './dialog.vue'
// api
import { addOrdel } from '@/api/music'
export default {
  components: {
    createPlaylist,
    dialogComponent
  },
  props: {
    // 当前要收藏的歌曲信息
    favoritesMsg: {
      type: Array,
      default: null
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showone: false,
      message: '',
      icon: ''
    }
  },
  computed: {
    // 用户id
    uid () {
      return this.$store.state.user.id
    },
    // 所有歌单
    songLists () {
      const data = this.$store.getters.songLists || []
      // 筛选出时我自己创建的歌单
      return data.filter((x) => {
        if (x.creator.userId === this.uid) {
          return true
        }
      })
    }
  },
  watch: {
  },
  methods: {
    beforeClose () {
      this.$emit('update:visible', false)
    },
    // 新建歌单
    createPlayList () {
      this.beforeClose()
      this.showone = true
    },
    // 收藏歌曲到歌单
    toadd (id) {
      const ids = []
      this.favoritesMsg.forEach(e => {
        ids.push(e.id)
      })
      addOrdel({
        op: 'add',
        pid: id,
        tracks: ids.join(',')
      }).then((res) => {
        if (res.body && res.body.code === 502) {
          // 歌曲已存在
          this.message = '歌曲已存在'
          this.icon = 'el-icon-circle-close'
        }
        if (res.body.code === 200) {
          // 收藏成功
          this.message = '收藏成功'
          this.icon = 'el-icon-success'
          this.$store.dispatch('songList', Date.now())
        }
        this.$bus.$emit('close', false)
        this.beforeClose()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  width: 250px;
  height: 170px;
  transition: all 0.3s ease;
  border-radius: 8px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #343434;
  color: #a5a5a5;
  div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  span {
    font-size: 50px;
    margin-bottom: 4%;
  }
  p {
    text-align: center;
    line-height: 20px;
  }
}
.el-dialog__wrapper {
  overflow: hidden;
  ul {
    height: 380px;
    overflow-y: auto;
  }
  li:hover {
    background-color: rgb(199, 199, 199);
  }
  li {
    padding: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid rgb(226, 226, 226);
    .create,
    .cover {
      width: 55px;
      height: 55px;
      font-size: 20px;
      line-height: 55px;
      text-align: center;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .create {
      border: 1px dashed rgb(172, 172, 172);
    }
    .name {
      font-size: 16px;
      color: #000;
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .count {
      font-size: 12px;
    }
  }
}
</style>
