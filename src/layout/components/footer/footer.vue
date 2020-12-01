<template>
  <div class="footer">
    <div class="key">
      <span class="iconfont icon-shangyishou-yuanshijituantubiao"></span>
      <span
        @click="paused"
        v-if="icon === 'icon-bofang'"
        :class="['iconfont', 'play', icon]"
      ></span>
      <span
        @click="play"
        v-if="icon === 'icon-bofang1'"
        :class="['iconfont', 'play', icon]"
      ></span>
      <span class="iconfont icon-xiayishou-yuanshijituantubiao"></span>
    </div>
    <div class="cover">
      <img
        v-if="currentSong.album"
        :src="currentSong.album.album.blurPicUrl"
        alt=""
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
        :src="currentSong.url"
        @playing="audioReady($event)"
        @error="audioError"
        @timeupdate="updateTime($event)"
        @ended="audioEnd($event)"
        @pause="audioPaused($event)"
      />
    </div>
    <div class="function">
      <div class="iconfont icon-lujing"></div>
      <div class="iconfont icon-xunhuan1"></div>
      <div class="iconfont icon-yinliang"></div>
      <div @click.stop="isMusicList" class="iconfont menu icon-24gf-playlistMusic5">
        <span v-if="list">{{list.length}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import progressBar from './components/progressBar'
export default {
  components: {
    progressBar
  },
  data () {
    return {
      icon: 'icon-bofang1',
      state: true,
      time: 0,
      // 用于判断是点击进度条还是拖动进度条，默认是拖动
      isclick: false,
      currentTime: 0
    }
  },
  filters: {
    formatTime (time) {
      if (!time) {
        return '00:00'
      }
      if (time < 10) {
        return `00:0${parseInt(time)}`
      } else if (time <= 60) {
        return `00:${parseInt(time)}`
      } else if (time > 60) {
        if (parseInt(time % 60) < 10) {
          return `${parseInt(time / 60)}:0${parseInt(time % 60)}`
        }
        return `${parseInt(time / 60)}:${parseInt(time % 60)}`
      }
      return '00:00'
    }
  },
  computed: {
    percentage () {
      return (this.currentTime / this.currentSong.duration) * 100
    },
    currentSong () {
      return this.$store.getters.musicInfo
    },
    playing () {
      return this.$store.state.music.playing
    },
    list () {
      return this.$store.state.music.list
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
      })
    },
    // 暂停
    paused () {
      this.$nextTick(() => {
        const audio = this.$refs.audio
        audio.pause()
      })
    },
    audioReady (e) {
      this.icon = 'icon-bofang'
    },
    // 处理播放错误
    audioError (e) {},
    updateTime (e) {
      this.currentTime = e.target.currentTime
    },
    audioEnd (e) {
      this.icon = 'icon-bofang1'
    },
    audioPaused (e) {
      this.icon = 'icon-bofang1'
    },
    isMusicList (e) {
      this.$store.commit('SET_ISMUSICLIST', true)
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
