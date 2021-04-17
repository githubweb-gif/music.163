<template>
  <div class="datas">
    <div v-if="musicList" class="title">
      {{ `播放队列(共${musicList.length}首)` }}
    </div>
    <div v-if="musicList" class="data">
      <div class="list">
        <div
          v-for="(item, index) in musicList"
          :ref="`song${index}`"
          :key="index"
          :class="[
            'song',
            { odd: (index + 1) % 2 !== 0 },
            { selected: n === index || item.name === currentSong.name && !n },
          ]"
          @click="clickMusic($event, index)"
        >
          <div class="music">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.singerName }}</div>
          </div>
          <span
            v-if="item.id === id || item.name === currentSong.name"
            class="bar iconfont icon-bar-chart-fill"
          />
          <div v-show="n === index" class="option">
            <div class="option-content">
              <div
                class="iconfont play"
                :class="item.id === id ? 'icon-pause' : 'icon-Play'"
                @click="play(item)"
              />
              <div class="love iconfont icon-shoucang" @click="love($event)" />
              <div class="menu iconfont icon-menucircledots" />
            </div>
          </div>
          <div class="time">{{ (item.duration / 1000) | formatTime }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import setMusciInfo from '@/untils/setMusciInfo'
import { GET_HISTORY } from '@/untils/cache'
export default {
  data () {
    return {
      // 播放id
      id: null,
      // 记录播放的index
      n: ''
    }
  },
  computed: {
    musicList () {
      return this.$store.getters.musicList
    },
    currentSong () {
      if (this.$store.getters.musicInfo.name) {
        return this.$store.getters.musicInfo
      } else {
        return GET_HISTORY() || []
      }
    }
  },
  watch: {
    musicList (value) {}
  },
  created () {},
  methods: {
    clickMusic (e, index) {
      this.n = index
    },
    play (item) {
      this.$store.commit('SET_PLAYING', false)
      if (this.id === item.id) {
        this.id = null
        return
      }

      setMusciInfo(item).then((data) => {
        this.$store.dispatch('SET_HISTORY', data)
        this.$store.commit('SET_PLAYING', true)
      })

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
.right-side {
  background-color: #fff;
}
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
.selected {
  background-color: #edeeee !important;
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
    .name, .singer {
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
    flex: 5;
    margin-right: 5px;
    .option-content {
      display: flex;
      justify-content: flex-end;
      div {
        display: inline-block;
        font-size: 18px;
        color: #7c7c7c;
      }
      .love {
        margin: 0 10px;
      }
    }
  }
}
.odd {
  background-color: #f8f9f9;
}
</style>
