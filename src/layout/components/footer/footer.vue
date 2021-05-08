<template>
  <div class="footer">
    <!-- {{currentSong}} -->
    <div class="cover">
      <img
        :src="currentSong.album ? currentSong.album.picUrl : ''"
        alt=""
      />
    </div>
    <div class="key">
      <span
        class="iconfont icon-shangyishou-yuanshijituantubiao"
        @click="preOrNext(-1)"
      />
      <span
        v-if="icon === 'icon-bofang'"
        :class="['iconfont', 'play', icon]"
        @click="paused"
      />
      <span
        v-if="icon === 'icon-bofang1'"
        :class="['iconfont', 'play', icon]"
        @click="play"
      />
      <span
        class="iconfont icon-xiayishou-yuanshijituantubiao"
        @click="preOrNext(1)"
      />
    </div>
    <div class="bar">
      <div class="name-time">
        <div class="name">
          {{ `${currentSong.name}-${currentSong.singerName}` }}
        </div>
        <div class="time">
          <span>{{ currentTime | formatTime }}</span>
          <span>/</span>
          <span>{{ currentSong.duration | formatTime }}</span>
        </div>
      </div>
      <progress-bar :percent="percentage" @percentageChange="onPercentage" />
      <audio
        ref="audio"
        :src="currentSong.url || ''"
        @playing="audioReady($event)"
        @error="audioError"
        @timeupdate="updateTime($event)"
        @ended="audioEnd($event)"
        @pause="audioPaused($event)"
      />
    </div>
    <div class="function">
      <div class="iconfont icon-lujing">
      </div>
      <div class="iconfont icon-xunhuan1" />
      <el-popover
        placement="bottom"
        width="240"
        trigger="click"
        offset="50"
      >
        <volume-bar @volume="volume"></volume-bar>
        <div slot="reference" class="iconfont icon-yinliang"></div>
      </el-popover>
      <div
        class="iconfont menu icon-24gf-playlistMusic5"
        @click.stop="isMusicList"
      >
        <span v-if="list">{{ list.length }}</span>
      </div>
    </div>
    <!-- 播放界面 -->
    <play-interface v-if="currentSong.name"></play-interface>
  </div>
</template>

<script>
import progressBar from './components/progressBar'
import { GET_HISTORY } from '@/utils/cache'
import setMusciInfo from '@/utils/setMusciInfo'
import volumeBar from './components/volume.vue'
// 播放界面
import playInterface from '@/components/playInterface/index.vue'
export default {
  components: {
    progressBar,
    playInterface,
    volumeBar
  },
  data () {
    return {
      icon: 'icon-bofang1',
      state: true,
      time: 0,
      // 用于判断是点击进度条还是拖动进度条，默认是拖动
      isclick: false,
      // 当前时间
      currentTime: 0
    }
  },
  computed: {
    musicList () {
      return this.$store.getters.musicList
    },
    percentage () {
      return (this.currentTime / this.currentSong.duration) * 100
    },
    currentSong () {
      if (this.$store.getters.musicInfo.name) {
        return this.$store.getters.musicInfo
      } else {
        const data = GET_HISTORY() || this.$store.getters.musicInfo
        this.$store.commit('SET_MUSICINFO', data)
        return data
      }
    },
    playing () {
      return this.$store.state.music.playing
    },
    list () {
      return this.$store.state.music.list
    },
    // 当前播放的歌曲在播放列表中的位置
    position () {
      let i
      this.musicList.forEach((x, index) => {
        if (x.id === this.currentSong.id) {
          i = index
        }
      })
      return i
    }
  },
  watch: {
    playing (isPlaying) {
      this.$nextTick(() => {
        const audio = this.$refs.audio
        if (audio) {
          isPlaying ? audio.play() : audio.pause()
        }
      })
    },
    currentSong (val) {
      console.log(val)
    }
  },
  methods: {
    onPercentage (value) {
      if (value > 1) {
        value = 1
      }
      this.currentTime = this.currentSong.duration * value
      this.$refs.audio.currentTime = this.currentSong.duration * value
    },
    // 播放
    play () {
      this.$nextTick(() => {
        const audio = this.$refs.audio
        audio.play()
        this.$store.commit('SET_PLAYING', true)
      })
    },
    // 暂停
    paused () {
      this.$nextTick(() => {
        const audio = this.$refs.audio
        audio.pause()
        this.$store.commit('SET_PLAYING', false)
      })
    },
    audioReady (e) {
      this.icon = 'icon-bofang'
    },
    // 处理播放错误
    audioError (e) {
      if (!this.currentSong.id) {
        return
      }
      setMusciInfo(this.currentSong, true).then((res) => {
        // 更新播放记录
        this.$store.dispatch('SET_HISTORY', res)
        // 再播放
        this.$store.commit('SET_PLAYING', true)
      })
    },
    updateTime (e) {
      this.currentTime = e.target.currentTime
      this.$store.commit('SET_CURRENTTIME', e.target.currentTime)
    },
    audioEnd (e) {
      // 播放完毕自动播放下一首
      if (this.position === this.musicList.length - 1) {
        return
      }
      this.preOrNext(1)
    },
    audioPaused (e) {
      this.icon = 'icon-bofang1'
    },
    isMusicList (e) {
      this.$store.commit('SET_ISMUSICLIST', true)
    },
    // 上一首或者下一首
    preOrNext (i, after) {
      let position = after || this.position
      this.$store.commit('SET_PLAYING', false)
      if (this.position === 0 || this.position) {
        if (i > 0) {
          if (position === this.musicList.length - 1) {
            position = 0
          } else {
            position++
          }
        } else if (i < 0) {
          if (position === 0) {
            position = this.musicList.length - 1
          } else {
            position--
          }
        }
        setMusciInfo(this.musicList[position]).then((data) => {
          if (!data.url) {
            if (i < 0) {
              this.preOrNext(-1, position)
            } else {
              this.preOrNext(1, position)
            }
            return
          }
          this.$store.dispatch('SET_HISTORY', data)
          this.$store.commit('SET_PLAYING', true)
        })
      }
    },
    // 音量
    volume (val) {
      this.$refs.audio.volume = val
    }
  }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 550px) {
  .bar {
    display: none !important;
  }
  .key {
    flex: 1;
  }
}
.footer {
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  .key {
    display: flex;
    margin: 0 20px;
    span {
      font-size: 30px;
      color: #c20c0c;
    }
    .play {
      margin: 0 20px;
    }
  }
  .cover {
    border: 1px solid rgb(228, 228, 228);
    margin: 1px;
    img {
      width: 58px;
      height: 58px;
    }
  }
  .bar {
    flex: 1;
    align-self: center;
    margin-right: 20px;
    .name-time {
      display: flex;
      margin-bottom: 5px;
      font-size: 13px;
      justify-content: space-between;
      .name {
        white-space: nowrap;
        margin-right: 10px;
      }
      .time {
        font-size: 10px;
        align-self: flex-end;
      }
    }
  }
  .function {
    display: flex;
    position: relative;
    margin-right: 20px;
    .iconfont {
      position: relative;
    }
    div {
      margin: 0 10px;
      font-size: 18px;
      color: #8c9095;
    }
    .icon-lujing {
      color: #fd7072;
    }
    .menu {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      cursor: pointer;
      span {
        font-size: 12px;
      }
    }
  }
}
</style>
