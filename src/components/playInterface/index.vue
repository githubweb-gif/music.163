<template>
  <div ref="interface" v-if="id" class="play-interface">
    <div class="content">
      <div class="music-info">
        <div class="film">
          <div class="origin"></div>
          <img
            src="../../assets/img/disc_neddle.png"
            alt=""
            :class="playing ? 'playing' : ''"
            class="magnetic-head"
            ref="magnetic"
          />
          <div :class="playing ? 'infinite' : ''" class="pan">
            <img class="pan-img" src="../../assets/img/disc_pan.png" />
            <div class="background">
              <img :src="musicInfo.album.album.picUrl" alt="" />
            </div>
          </div>
          <div class="options">
            <ul>
              <li>
                <span class="icon el-icon-sunrise"></span>
                <span>喜欢</span>
              </li>
              <li>
                <span class="icon el-icon-ship"></span>
                <span>收藏</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="lyrics">
          <h4 class="name">{{ musicInfo.name }}</h4>
          <div class="detail">
            <span class="ablum"
              >专辑：<span class="content">
                {{ musicInfo.album.album.name }}
              </span>
            </span>
            <span class="singername"
              >歌手：<span class="content">{{
                musicInfo.singerName
              }}</span></span
            >
          </div>
          <div ref="lyric" class="lyrics-text">
            <ul>
              <li
                :class="activeIndex === index ? 'light' : ''"
                v-for="(item, index) in lyric"
                :key="index"
              >
                {{ item.content }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div @click="showOrhide" class="show-hide">
      <span class="el-icon-bottom-right"></span>
    </div>
  </div>
</template>

<script>
import { lyric } from '@/api/music'
export default {
  data () {
    return {
      img: require('../../assets/img/coverall.png'),
      // 原文歌词
      lyric: null,
      // 中文歌词
      chineseLyric: '',
      currentRow: 0,
      lyricMove: 0,
      lyricDom: null,
      activeIndex: 0
    }
  },
  computed: {
    musicInfo () {
      console.log(this.$store.getters.musicInfo)
      return this.$store.getters.musicInfo
    },
    id () {
      return this.$store.getters.musicInfo.id || ''
    },
    currentTime () {
      return this.$store.state.music.currentTime || 0
    },
    playing () {
      return this.$store.state.music.playing
    }
  },
  watch: {
    currentTime () {
      if (!this.lyric) {
        return
      }
      const timeStamp = this.currentTime * 1000
      this.activeIndex = this.lyric.findIndex((item, index) => {
        return item.time < timeStamp && this.lyric[index + 1]
          ? this.lyric[index + 1].time > timeStamp
          : true
      })
      this.lyricMove = this.activeIndex * 40
      this.currentRow = this.activeIndex
    },
    currentRow () {
      if (!this.lyricDom) {
        this.lyricDom = this.$refs.lyric
        return
      }
      this.lyricDom.scrollTo({
        top: this.lyricMove - 160,
        behavior: 'smooth'
      })
    },
    id () {
      this.getLyric()
    }
  },
  created () {
    this.getLyric()
  },
  mounted () {
    this.lyricDom = this.$refs.lyric
  },
  methods: {
    getLyric () {
      if (!this.id) {
        return
      }
      lyric({ id: this.id }).then((data) => {
        const text = data.lrc ? data.lrc.lyric : ''
        this.lyric = this.filterLyric(text)
        // this.chineseLyric = data.tlyric.lyric
      })
    },
    filterLyric (data) {
      if (!data) {
        return
      }
      const arr = []
      // 先按行分割
      const lyric = data.split('\n')
      lyric.forEach((item, n) => {
        let obj = null
        const itemArr = item.split(']')
        const content = itemArr.pop()
        if (!content.trim()) {
          return
        }
        itemArr.forEach((x) => {
          const time = x.slice(1).split(':')
          const s = parseInt((time[0] * 60 + +time[1]) * 1000)
          obj = {
            time: s,
            content
          }
          arr.push(obj)
        })
      })
      arr.sort((a, b) => {
        return a.time - b.time > 0 ? 1 : -1
      })
      return arr
    },
    showOrhide () {
      if (this.$refs.interface.offsetWidth !== 0) {
        this.$refs.interface.style.cssText = 'width: 0; height:0;'
        return
      }
      this.$refs.interface.style.cssText =
        'width: 100vw; height: calc(100vh - 60px);'
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 700px) {
  .music-info {
    flex-direction: column;
    align-items: center;
  }
  .film {
    margin-right: 0 !important;
  }
}
.light {
  color: rgb(255, 94, 0);
}
.show-hide {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 58px;
  height: 58px;
  background-color: red;
  opacity: 0;
  margin: 1px;
  z-index: 9000;
  span {
    display: block;
    font-size: 40px;
  }
}
.show-hide:hover {
  opacity: .5;
}
@keyframes example {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(1turn);
  }
}
.play-interface {
  // display: none;
  position: fixed;
  padding-top: 30px;
  bottom: 60px;
  left: 0;
  z-index: 3000;
  background-color: #fff;
  width: 0;
  height: 0;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}
.content {
  max-width: 1000px;
  margin: 0 auto;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  .music-info {
    display: flex;
    .film {
      overflow: hidden;
      position: relative;
      padding-top: 50px;
      margin-right: 50px;
      .infinite {
        animation-play-state: running !important;
      }
      .pan {
        position: relative;
        animation-name: example;
        animation-duration: 10s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-play-state: paused;
        width: 300px;
        height: 300px;
        .pan-img {
          width: 300px;
          height: 300px;
        }
        .background {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          img {
            width: 200px;
            height: 200px;
            border-radius: 50%;
          }
        }
      }
      .options {
        margin-top: 15px;
        ul {
          display: flex;
          justify-content: center;
          li {
            padding: 3px 6px;
            border: 1px solid rgb(175, 175, 175);
            background-color: rgb(214, 217, 219);
            font-size: 13px;
            margin-right: 10px;
            .icon {
              margin-right: 5px;
            }
          }
        }
      }
      .magnetic-head {
        width: 80px;
        position: absolute;
        top: 0;
        left: 50%;
        transform-origin: top left;
        transform: rotate(-30deg) translateX(-15%);
        transition: all 0.3s;
      }
      .origin {
        position: absolute;
        width: 20px;
        height: 20px;
        background-color: #fff;
        border-radius: 50%;
        z-index: 100;
        top: 0px;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .playing {
        transform: rotate(0deg) translateX(-15%);
        z-index: 99;
      }
    }
    .lyrics {
      width: 400px;
      overflow: hidden;
      margin-top: 25px;
      .name {
        font-size: 18px;
        margin-bottom: 10px;
      }
      .detail {
        font-size: 13px;
        display: flex;
        flex-wrap: wrap;
        span {
          margin-right: 20px;
          margin-bottom: 5px;
          .content {
            color: rgb(14, 61, 107);
          }
        }
      }
      .lyrics-text {
        margin-top: 10px;
        height: 300px;
        overflow-y: auto;
        overflow-x: hidden;
        li {
          padding: 10px 0;
          font-size: 13px;
          line-height: 20px;
        }
      }
    }
  }
}
</style>
