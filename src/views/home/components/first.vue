<template>
  <div class="first">
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
        <div v-for="item in playlist" :key="item.id" class="child">
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
      playlist: null
    }
  },
  computed: {},
  created () {
    this.initData()
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
    }
  }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 1000px) {
  .lists {
    .child {
      flex: 1 1 25% !important;
    }
    .child:nth-of-type(9) {
      display: none;
    }
    .child:nth-of-type(10) {
      display: none;
    }
  }
}

@media only screen and (max-width: 800px) {
  .lists {
    .child {
      flex: 1 1 33% !important;
    }
    .child:nth-of-type(9) {
      display: block;
    }
  }
  .recommend {
    .list {
      flex-direction: column;
      align-items: center;
      .content {
        display: none;
      }
      .title {
        font-size: 12px !important;
      }
    }
    .list > div {
      margin-top: 10px;
    }
  }
}

@media only screen and (max-width: 500px) {
  .lists {
    .child {
      flex: 1 1 50% !important;
      display: block !important;
    }
  }
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
      box-sizing: border-box;
      flex: 1 1 20%;
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
