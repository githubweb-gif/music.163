<template>
  <div class="songlist-detail-list">
    <div class="title">
      <span>
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
          :class="[n === 0 || n % 2 === 0 ? 'odd' : 'even']"
          @click="playState(n)"
        >
          <span class="index">{{ n | index }}</span>
          <span class="name-play">
            <i class="icon" />
            <span class="name">{{ item.name }}</span>
            <span :class="['play-info', index === n ? 'play-state' : '']">
              <i class="el-icon-video-play" @click="playMusic(item)" />
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
                  <ul>
                    <li @click="nextPlay(item)">下一首播放</li>
                    <li>收藏</li>
                    <li>下载</li>
                    <li class="singer">
                      <span>歌手：{{ item.singerName }}</span>
                    </li>
                    <li>
                      <span>专辑：{{ item.albumName }}</span>
                    </li>
                    <li class="delete">从歌单中删除</li>
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
  </div>
</template>

<script>
import { allSongDetail } from '@/api/music'
import setMusciInfo from '@/untils/setMusciInfo'
export default {
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
      top: 0
    }
  },
  watch: {
    songList() {
      allSongDetail(this.songList.join(',')).then((data) => {
        this.filterMusics(data.songs)
      })
    }
  },
  created() {
  },
  methods: {
    playState(index) {
      // 播放图标显示
      this.index = index
    },
    playMusic(data) {
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
          duration: x.dt
        })
      })
    },
    // 下一首播放
    nextPlay(item) {
      this.$store.dispatch('SET_PLAYLIST', { list: item, one: true })
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
</style>
