<template>
  <div class="songlist-detail-list">
    <div class="title">
      <span @click="playALL">
        <i class="el-icon-delete-solid" />
        <span v-if="songs">{{ `播放全部(${songs.length})` }}</span>
      </span>
      <span class="mid">|</span>
      <span>
        <i class="el-icon-delete-solid" />
        <span>选择</span>
      </span>
    </div>
    <div class="lists">
      <ul>
        <li
          v-for="(item, n) in songs"
          :key="item.id"
          :class="[
            n === 0 || n % 2 === 0 ? 'odd' : 'even',
            { iscopyright: newCopyright[n] && newCopyright[n].st < 0 },
          ]"
          @click="playState(n)"
        >
          <span v-if="id === songListId && musicID === item.id" class="index">
            <i class="el-icon-video-play" />
          </span>
          <!-- 已播放图标 -->
          <span v-else class="index">{{ n | index }}</span>
          <span class="name-play">
            <i class="icon" />
            <span class="name">{{ item.name }}</span>
            <span :class="['play-info', index === n ? 'play-state' : '']">
              <i
                class="el-icon-video-play"
                @click.stop="playMusic(item, copyright[n].st)"
              />
              <i
                class="more el-icon-circle-plus-outline"
                @click.stop="showCard(n, $event)"
              />
              <!-- 这个box-shadow用来取消card显示 -->
              <div v-show="i === n" class="box-shadow" @click="i = ''">
                <div
                  :style="{
                    height: i === n ? 'auto' : 0,
                    left: left,
                    top: top,
                  }"
                  class="card"
                >
                  <ul @click.stop="i = ''">
                    <li @click="nextPlay(item)">下一首播放</li>
                    <li @click="favorites(item.id)">收藏</li>
                    <li>下载</li>
                    <li class="singer">
                      <span>歌手：{{ item.singerName }}</span>
                    </li>
                    <li>
                      <span>专辑：{{ item.albumName }}</span>
                    </li>
                    <li class="delete" @click="todelete(item.id, n)">从歌单中删除</li>
                  </ul>
                </div>
              </div>
            </span>
          </span>
          <span class="author">
            {{ item.singerName }}
          </span>
          <span class="zhuanji">{{ item.albumName }}</span>
          <span class="time">{{ (item.duration / 1000) | formatTime }}</span>
        </li>
      </ul>
    </div>
    <!-- 版权或者错误信息提示 -->
    <dialog-card v-if="dialogVisible" :message="message" :icon="icon" />
    <!-- 收藏歌曲弹框 -->
    <el-dialog
      v-if="songLists"
      width="400px"
      title="添加歌单"
      :visible.sync="favoritesCard"
    >
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
            <div class="count">
              {{ item.trackCount }}首音乐
            </div>
          </span>
        </li>
      </ul>
    </el-dialog>
    <create-playlist :is-create="isCreate" type="NORMAL" :music-id="mID.toString()" @close="close" />
  </div>
</template>

<script>
// api
import { allSongDetail, addOrdel } from '@/api/music'
import setMusciInfo from '@/untils/setMusciInfo'
import dialogCard from './components/dialog.vue'
import createPlaylist from '@/components/createPlaylist.vue'
export default {
  components: {
    dialogCard,
    createPlaylist
  },
  filters: {
    index(value) {
      value++
      if (value < 10) {
        return '0' + value
      }
      return value
    }
  },
  props: {
    songList: {
      type: Array,
      default: null
    },
    songListId: {
      type: String,
      default: ''
    },
    copyright: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      songs: [],
      // 记录被点击list的index
      index: '',
      // 记录more被点击时card显示
      i: '',
      // left right 用来记录card的位置
      left: 0,
      top: 0,
      // 消息提示
      dialogVisible: false,
      // 收藏card显示
      favoritesCard: false,
      // 歌曲id
      mID: '',
      message: '',
      icon: '',
      // 是否显示新建菜单
      isCreate: false,
      newCopyright: null
    }
  },
  computed: {
    // 底部播放中的歌曲所在的歌单id
    id() {
      return this.$store.state.music.songListId
    },
    uid() {
      return this.$store.state.user.id
    },
    musicID() {
      return this.$store.state.music.musicInfo.id
    },
    // 所有歌单
    songLists() {
      const data = this.$store.getters.songLists || []
      console.log(data)
      return data.filter(x => {
        if (x.creator.userId === this.uid) {
          return true
        }
      })
    },
    // 当前歌单
    gedanID() {
      return this.$route.params.id
    }
  },
  watch: {
    songList(value) {
      if (value && value.length > 0) {
        allSongDetail(this.songList.join(',')).then((data) => {
          console.log(data.songs)
          this.filterMusics(data.songs)
        })
      }
      this.songs = []
    },
    copyright(value) {
      this.newCopyright = value
    }
  },
  created() {},
  methods: {
    playState(index) {
      // 播放图标显示
      this.index = index
    },
    playMusic(data, st) {
      if (!this.noCopyright(st)) {
        return
      }
      this.$store.commit('SET_SONGLISTID', this.songListId)
      // 先暂停
      this.$store.commit('SET_PLAYING', false)
      setMusciInfo(data).then((res) => {
        this.$store.dispatch('SET_HISTORY', res)
        // 同时更新播放队列
        this.$store.dispatch('SET_PLAYLIST', { list: this.songs, one: false })
        // 再播放
        this.$store.commit('SET_PLAYING', true)
      })
    },
    // 菜单卡片
    showCard(i, event) {
      this.left = event.target.getBoundingClientRect().left + 10 + 'px'
      this.top = event.target.getBoundingClientRect().top + 20 + 'px'
      if (this.i === i) {
        this.i = ''
        return
      }
      this.i = i
    },
    // 对所有的歌曲信息进行修改以满足我们需要的格式,有利于维护和开发
    filterMusics(data) {
      this.songs = []
      data.forEach((x) => {
        this.songs.push({
          id: x.id,
          album: { id: x.al.id },
          albumName: x.al.name,
          name: x.name,
          singerName: x.ar[0].name,
          duration: x.dt,
          // 版权
          copyright: x.copyright
        })
      })
    },
    // 下一首播放
    nextPlay(item) {
      this.$store.dispatch('SET_PLAYLIST', { list: item, one: true })
    },
    // 无版权歌曲提示
    noCopyright(st) {
      if (st < 0) {
        this.dialogVisible = true
        this.message = '因合作方要求该资源暂时下架'
        this.icon = 'el-icon-circle-close'
        setTimeout(() => {
          this.dialogVisible = false
        }, 2000)
        return false
      } else {
        this.dialogVisible = false
        return true
      }
    },
    // 显示收藏歌曲card
    favorites(id) {
      this.favoritesCard = true
      this.mID = id
    },
    // 收藏歌曲到歌单
    toadd(id) {
      addOrdel({
        op: 'add',
        pid: id,
        tracks: this.mID
      }).then(res => {
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
        this.favoritesCard = false
        this.dialogVisible = true
        setTimeout(() => {
          this.dialogVisible = false
        }, 2000)
      })
    },
    // 新建歌单
    createPlayList() {
      this.isCreate = true
      this.favoritesCard = false
    },
    // 关闭
    close(value) {
      this.isCreate = false
    },
    // 从歌单中删除歌曲
    todelete(id, index) {
      addOrdel({
        op: 'del',
        pid: this.gedanID,
        tracks: id
      }).then(() => {
        this.songs.splice(index, 1)
        this.newCopyright.splice(index, 1)
        this.$store.dispatch('SET_PLAYLIST', { list: this.songs, one: false })
      })
    },
    // 播放全部
    playALL() {
      this.playMusic()
    }
  }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 650px) {
  .lists {
    li {
      .zhuanji,
      .icon,
      .time {
        display: none !important;
      }
      .name-play {
        width: 60% !important;
      }
    }
  }
}

.songlist-detail-list {
  .title {
    margin: 20px 0 15px 0;
    .mid {
      padding: 0 10px;
    }
    i {
      margin-right: 5px;
    }
  }
  .lists {
    .iscopyright {
      color: #cccccc;
      .name {
        color: #cccccc;
      }
    }
    li.odd {
      background-color: #f2f2f3;
    }
    li > span {
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-right: 20px;
    }
    li {
      white-space: nowrap;
      color: #999999;
      padding: 12px 0;
      display: flex;
      align-items: center;
      font-size: 13px;
      .index {
        margin: 0 10px;
        color: #000;
      }
      .icon {
        margin-right: 10px;
      }
      .name-play {
        font-size: 15px;
        color: #000;
        width: 35%;
        display: flex;
        overflow: inherit;
        .name {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          flex: 4;
        }
      }
      .author {
        width: 15%;
        margin-right: 20px;
      }
      .zhuanji {
        width: 25%;
      }
      .play-info {
        display: none;
        flex: 1;
        position: relative;
        i {
          font-size: 20px;
          margin-right: 5px;
        }
      }
      .play-state {
        display: inline-block;
      }
    }
  }
}
.box-shadow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  z-index: 999;
  .card {
    width: 150px;
    height: 0;
    position: absolute;
    z-index: 1000;
    border: 0;
    transition: all 0.3s ease;
    background-color: #fff;
    box-shadow: 0 0 4px 0 #ada4a4;
    overflow: hidden;
    li {
      color: #000;
      padding: 10px 0 10px 10px;
      font-size: 13px;
      cursor: pointer;
      span {
        display: inline-block;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    li:hover {
      background-color: #d8d8d8;
    }
    .singer,
    .delete {
      border-top: 1px solid #dcdcdc;
    }
  }
}
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
.el-dialog__wrapper  {
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
    .create, .cover {
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
y
