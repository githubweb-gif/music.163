<template>
  <div class="ranking">
    <div class="title">排行榜</div>
    <div class="official">
      <div class="head">官方榜</div>
      <ul>
        <li
          class="item"
          @click="toPlayList(item[1].id)"
          :style="{ width: width }"
          v-for="(item, index) in official"
          :key="index"
        >
          <img :src="`${item[1].coverImgUrl}?param=130y130` || ''" alt="" />
          <div class="right">
            <ol>
              <li v-for="(i, n) in item[1].tracks" :key="n">
                <span>{{ n + 1 }}.</span>
                {{ i.first ? `${i.first} - ${i.second}` : `${i.name}` }}
                <span v-if="i.name" class="icon el-icon-s-flag">{{
                  i.score
                }}</span>
              </li>
            </ol>
          </div>
        </li>
      </ul>
    </div>
    <div class="earth">
      <div class="head">全球榜</div>
      <ul>
        <li @click="toPlayList(item[1].id)" class="item" v-for="(item, index) in earthRanking" :key="index">
          <img :src="`${item[1].coverImgUrl}?param=130y130` || ''" alt="" />
          <p>{{ item[0] }}</p>
        </li>
      </ul>
    </div>
    <scroll @scroll="scroll"></scroll>
  </div>
</template>

<script>
import { rankingDtail, singerRanking } from '@/api/music'
import scroll from '@/components/scroll/index.vue'
export default {
  components: {
    scroll
  },
  data () {
    return {
      rankings: [],
      officialNames: ['飙升榜', '新歌榜', '原创榜', '热歌榜', '歌手榜'],
      singerImg: require('../../assets/img/singer.png'),
      width: 0
    }
  },
  created () {
    this.initData()
  },
  computed: {
    official () {
      const map = new Map()
      this.rankings.filter((x) => {
        if (this.officialNames.includes(x.name)) {
          map.set(x.name, x)
        }
      })
      return [...map]
    },
    earthRanking () {
      const map = new Map()
      this.rankings.filter((x) => {
        if (!this.officialNames.includes(x.name)) {
          map.set(x.name, x)
        }
      })
      return [...map]
    }
  },
  methods: {
    initData () {
      rankingDtail().then((res) => {
        this.rankings = res.list
        singerRanking().then((res) => {
          console.log('-----------------')
          this.rankings.push({
            name: '歌手榜',
            tracks: res.list.artists.slice(0, 3),
            coverImgUrl: this.singerImg
          })
        })
      })
    },
    scroll (val) {
      if (val <= 650) {
        this.width = '100%'
      } else {
        this.width = '50%'
      }
    },
    toPlayList (id) {
      if (!id) {
        this.$router.push('/singerRanking')
        return
      }
      this.$router.push(`/songListDetail/${id}`)
    }
  }
}
</script>
<style lang='scss' scoped>
@media only screen and (max-width: 1300px) {
  .earth li {
    width: 14.28% !important;
  }
}

@media only screen and (max-width: 1200px) {
  .earth li {
    width: 16.66% !important;
  }
}

@media only screen and (max-width: 1000px) {
  .earth li {
    width: 25% !important;
  }
}

@media only screen and (max-width: 700px) {
  .earth li {
    width: 33% !important;
  }
}
.ranking {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.title {
  font-size: 13px;
  color: #666666;
  padding-bottom: 20px;
}
.head {
  padding-bottom: 12px;
  border-bottom: 1px solid #666666;
  margin: 0 10px 12px;
}

.official {
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
    li.item {
      display: flex;
      align-items: center;
      width: 50%;
      margin-bottom: 30px;
      cursor: pointer;
      img {
        display: block;
        width: 100px;
        height: 100px;
      }
      .right {
        flex: 1;
        overflow: hidden;
        ol {
          li {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #818181;
            padding: 5px;
            .icon {
              font-size: 13px;
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
}
.earth {
    overflow: hidden;
  ul {
      display: flex;
      flex-wrap: wrap;
    li {
      width: 12.5%;
      padding: 0 10px;
      margin-bottom: 20px;
      cursor: pointer;
      img {
        width: 100%;
        margin-bottom: 5px;
      }
      p {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}
</style>
