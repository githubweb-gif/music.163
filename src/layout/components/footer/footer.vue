<template>
  <div class="footer">
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
    <div class="cover">
      <img
        v-if="currentSong.album"
        :src="currentSong.album.album.blurPicUrl"
        alt=""
      >
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
      <div class="iconfont icon-lujing" />
      <div class="iconfont icon-xunhuan1" />
      <div class="iconfont icon-yinliang" />
      <div
        class="iconfont menu icon-24gf-playlistMusic5"
        @click.stop="isMusicList"
      >
        <span v-if="list">{{ list.length }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import progressBar from './components/progressBar'
import { GET_HISTORY } from '@/untils/cache'
import setMusciInfo from '@/untils/setMusciInfo'
export default {
  components: {
    progressBar
  },
  data() {
    return {
      icon: 'icon-bofang1',
      state: true,
      time: 0,
      // 用于判断是点击进度条还是拖动进度条，默认是拖动
      isclick: false,
      currentTime: 0
    }
  },
  computed: {
    musicList() {
      return this.$store.getters.musicList
    },
    percentage() {
      return (this.currentTime / this.currentSong.duration) * 100
    },
    currentSong() {
      if (this.$store.getters.musicInfo.name) {
        return this.$store.getters.musicInfo
      } else {
        const data = GET_HISTORY() || []
        this.$store.commit('SET_MUSICINFO', data)
        return data
      }
    },
    playing() {
      return this.$store.state.music.playing
    },
    list() {
      return this.$store.state.music.list
    },
    // 当前播放的歌曲在播放列表中的位置
    position() {
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
    playing(isPlaying) {
      this.$nextTick(() => {
        const audio = this.$refs.audio
        if (audio) {
          isPlaying ? audio.play() : audio.pause()
        }
      })
    }
  },
  methods: {
    onPercentage(value) {
      if (value > 1) {
        value = 1
      }
      this.currentTime = this.currentSong.duration * value
      this.$refs.audio.currentTime = this.currentSong.duration * value
    },
    // 播放
    play() {
      this.$nextTick(() => {
        const audio = this.$refs.audio
        audio.play()
      })
    },
    // 暂停
    paused() {
      this.$nextTick(() => {
        const audio = this.$refs.audio
        audio.pause()
      })
    },
    audioReady(e) {
      this.icon = 'icon-bofang'
    },
    // 处理播放错误
    audioError(e) {},
    updateTime(e) {
      this.currentTime = e.target.currentTime
    },
    audioEnd(e) {
      // 播放完毕自动播放下一首
      if (this.position === this.musicList.length - 1) {
        return
      }
      this.preOrNext(1)
    },
    audioPaused(e) {
      this.icon = 'icon-bofang1'
    },
    isMusicList(e) {
      this.$store.commit('SET_ISMUSICLIST', true)
    },
    // 上一首或者下一首
    preOrNext(i, after) {
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

      // this.musicList.forEach((ele, index) => {
      //   if (ele.id === this.currentSong.id) {
      //     if (i < 0) {
      //       if (index + i === -1) {
      //         this.preOrNext(this.musicList.length - 1)
      //         return
      //       }
      //     } else {
      //       if (index + i === this.musicList.length) {
      //         this.preOrNext(-this.musicList.length + 1)
      //         return
      //       }
      //     }
      //     setMusciInfo(this.musicList[index + i]).then((data) => {
      //       if (!data.url) {
      //         if (i < 0) {
      //           this.preOrNext(i - 1)
      //         } else {
      //           this.preOrNext(i + 1)
      //         }
      //         return
      //       }
      //       this.$store.dispatch('SET_HISTORY', data)
      //       this.$store.commit('SET_PLAYING', true)
      //     })
      //     return
      //   }
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;
  // justify-content: space-between;
  position: relative;
  .key {
    display: flex;
    margin: 0 50px;
    span {
      font-size: 30px;
      color: #c20c0c;
    }
    .play {
      margin: 0 20px;
    }
  }
  .cover {
    img {
      width: 35px;
      height: 35px;
    }
  }
  .bar {
    flex: 1;
    align-self: center;
    margin-left: 10px;
    .name-time {
      display: flex;
      margin-bottom: 5px;
      font-size: 14px;
      justify-content: space-between;
      .time {
        font-size: 10px;
        align-self: flex-end;
      }
    }
  }
  .function {
    display: flex;
    margin-right: 30px;
    position: relative;
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
