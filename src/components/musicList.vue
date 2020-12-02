<template>
  <div class="datas rigth-side">
    <div v-if="musicList" class="title">
      {{ `播放队列(共${musicList.length}首)` }}
    </div>
    <div v-if="musicList" class="data">
      <div class="list">
        <div
          @click="clickMusic($event, index)"
          v-for="(item, index) in musicList"
          :ref="`song${index}`"
          :key="index"
          :class="['song', { odd: (index + 1) % 2 !== 0 }]"
        >
          <div class="music">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artists[0].name }}</div>
          </div>
          <span v-if="item.id === id" class="bar iconfont icon-bar-chart-fill"></span>
          <div class="option">
            <div class="option-content">
              <div
                @click="play(item)"
                class="iconfont play"
                :class="item.id === id ? 'icon-pause' : 'icon-Play'"
              />
              <div @click="love($event)" class="love iconfont icon-shoucang" />
              <div class="menu iconfont icon-menucircledots" />
            </div>
          </div>
          <div class="time">03:10</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import setMusciInfo from '@/untils/setMusciInfo'
export default {
  data () {
    return {
      // 记录之前点击的歌曲
      i: null,
      // 播放id
      id: null
    }
  },
  computed: {
    musicList () {
      return this.$store.getters.musicList
    }
  },
  watch: {
    musicList (value) {}
  },
  created () {},
  methods: {
    clickMusic (e, index) {
      if (this.i >= 0 && this.i) {
        const previous = this.$refs[`song${this.i - 1}`][0]
        console.log(previous.className.indexOf('odd'))
        if (previous.className.indexOf('odd') !== -1) {
          previous.style.backgroundColor = '#f8f9f9'
        } else {
          previous.style.backgroundColor = '#ffffff'
        }
        previous.querySelector('.option').style.display = 'none'
        previous.querySelector('.time').style.display = 'block'
      }
      const song = this.$refs[`song${index}`][0]
      this.i = index + 1
      song.style.backgroundColor = '#edeeee'
      song.querySelector('.option').style.display = 'block'
      song.querySelector('.time').style.display = 'none'
    },
    play (item) {
      this.$store.commit('SET_PLAYING', false)
      if (this.id === item.id) {
        this.id = null
        return
      }

      setMusciInfo(item).then((data) => {
        const musicInfo = data
        this.$store.dispatch('SET_HISTORY', musicInfo)
        this.$store.commit('SET_PLAYING', true)
      })
      // this.$store.dispatch('SET_HISTORY', { url:  })

      this.id = item.id
    },
    love () {
      //   this.iconLove = this.iconLove === 'icon-shoucang' ? 'icon-lujing' : 'icon-shoucang'
    },
    openMenu () {}
  }
}
</script>

<style lang="scss" scoped>
.data {
  height: 100%;
  overflow: hidden;
}
.list {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  box-sizing: border-box;
  overflow: overlay;
}

.list::-webkit-scrollbar {
  width: 8px;
  display: none;
  transition: all 0.5s;
}
.data:hover .list::-webkit-scrollbar {
  display: block;
}

.list::-webkit-scrollbar-track {
  display: none;
}

.list::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(190, 190, 190, 0.5);
}
.title {
  padding: 8px 30px 8px 15px;
}
.song {
  cursor: pointer;
  padding: 8px 30px 8px 15px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .music {
    overflow: hidden;
    flex: 4;
    .name {
      width: 100%;
      margin-bottom: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .bar {
    flex: 2;
    align-self: flex-start;
    color: #1ebf76;
    font-size: 16px;
  }
  .option {
    display: none;
    flex: 5;
    .option-content {
      display: flex;
      justify-content: flex-end;
      div {
        display: inline-block;
        font-size: 18px;
        color: #7c7c7c;
      }
      .love {
        margin: 0 25px;
      }
    }
  }
}
.odd {
  background-color: #f8f9f9;
}
</style>
