<template>
  <div ref="box" class="first">
    <swiper :images="banners" />
    <!-- 私人FM， 每日歌曲推荐，排行榜 -->
    <div class="recommend">
      <div class="list">
        <span class="el-icon-eleme" />
        <div>
          <div class="title">私人FM</div>
          <div class="content">享受你的专属音乐推荐</div>
        </div>
      </div>
      <div class="list">
        <router-link class="list" to="/dailySong">
          <span class="el-icon-eleme" />
          <div>
            <div class="title">每日歌曲推荐</div>
            <div class="content">根据你的口味生成</div>
          </div>
        </router-link>
      </div>
      <router-link class="list" to="/ranking">
        <span class="el-icon-eleme" />
        <div class="div">
          <div class="title">排行榜</div>
          <div class="content">最热音乐榜</div>
        </div>
      </router-link>
    </div>
    <!-- 推荐歌单 -->
    <div class="song-sheet">
      <div class="title">
        <div class="left">
          <span class="el-icon-data-analysis icon" />
          <span>推荐歌单</span>
        </div>
        <div class="right">
          <span>更多</span>
          <span class="el-icon-arrow-right" />
        </div>
      </div>
      <div class="lists">
        <div :style="setStyle(index)"  v-for="(item, index) in playlist" :key="item.id" class="child">
          <img :src="item.picUrl" alt="" />
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from '@/components/swiper/index.vue'
// api
import { banner, personalized } from '@/api/music'
export default {
  name: 'First',
  components: {
    swiper
  },
  data () {
    return {
      banners: null,
      // 推荐歌单
      playlist: null,
      imgWidth: '20%'
    }
  },
  computed: {
    main () {
      return this.$store.state.user.resize
    }
  },
  watch: {
    main: {
      handler (val) {
        if (!val) {
          return
        }
        const boxWidth = this.main.offsetWidth
        this.resize(boxWidth)
      },
      immediate: true
    }
  },
  created () {
    this.initData()
  },
  mounted () {
    this.$bus.$on('zoom', (boxWidth) => {
      this.resize(boxWidth)
    })
  },
  methods: {
    initData () {
      this.banner()
      this.personalized()
    },
    banner () {
      banner().then((res) => {
        this.banners = res.banners
      })
    },
    personalized () {
      personalized({ limit: 10 }).then((res) => {
        this.playlist = res.result
      })
    },
    setStyle (index) {
      if (this.imgWidth === '33.3%' && index === 9) {
        return {
          width: this.imgWidth,
          display: 'none'
        }
      } else if (this.imgWidth === '25%' && (index === 9 || index === 8)) {
        return {
          width: this.imgWidth,
          display: 'none'
        }
      }
      return {
        width: this.imgWidth
      }
    },
    resize (boxWidth) {
      switch (true) {
        case boxWidth > 930:
          this.imgWidth = '20%'
          break
        case boxWidth <= 930 && boxWidth > 720 :
          this.imgWidth = '25%'
          break
        case boxWidth <= 720 && boxWidth > 510:
          this.imgWidth = '33.3%'
          break
        case boxWidth <= 510:
          this.imgWidth = '50%'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.first {
  width: 100%;
  height: 100%;
}
.recommend {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  .list {
    border-right: 1px solid #a6a6ab;
    flex: 1;
    display: flex;
    justify-content: center;
    span {
      margin: auto 0;
      font-size: 40px;
      margin-right: 10px;
    }
    .title {
      font-size: 14px;
      margin-bottom: 8px;
    }
    .content {
      font-size: 12px;
      color: #a6a6ab;
    }
  }
  .list:last-child {
    border: 0;
  }
}
.song-sheet {
  margin-top: 30px;
  .title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #dedeeb;
    padding-bottom: 10px;
    .icon {
      margin-right: 5px;
      color: #e20000;
    }
    .right {
      font-size: 12px;
      color: #a6a6ab;
    }
  }
  .lists {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    .child {
      padding-right: 10px;
      overflow: hidden;
      margin-bottom: 30px;
      img {
        width: 100%;
      }
      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
