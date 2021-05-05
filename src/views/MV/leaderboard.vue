<template>
  <div class="leaderboard">
    <h4>
      <ol>
        <li
          @click="area = item"
          :class="item === area ? 'selected' : ''"
          v-for="(item, index) in areas"
          :key="index"
        >
          {{ item }}
        </li>
      </ol>
    </h4>
    <div class="content">
      <ul>
        <li @click="toMV(item.id)" v-for="(item, index) in mvs" :key="item.id">
          <div class="index">
            <span>{{ (index + 1) | index }}</span>
            <span
              v-if="item.lastRank < index"
              class="icon1 el-icon-bottom"
            ></span>
            <span  v-if="item.lastRank > index" class="icon2 el-icon-top"></span>
          </div>
          <div class="cover">
            <img :src="`${item.cover}?param=350y200`" alt="" />
          </div>
          <div class="right">
            <p>{{ item.name }}</p>
            <div class="artistName">{{ item | artistName }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { leaderboardMv } from '@/api/music'
export default {
  props: {
    scroll: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      areas: ['内地', '港台', '欧美', '日本', '韩国'],
      area: '内地',
      mvs: [],
      page: 1,
      bol: false
    }
  },
  created () {
    this.getData()
  },
  watch: {
    scroll: {
      handler () {
        this.$nextTick(() => {
          this.scroll.el.onscroll = (e) => {
            if (this.bol) {
              return
            }
            const target = e.target
            console.log((target.scrollTop + target.clientHeight) >= target.scrollHeight)
            if (Math.ceil(target.scrollTop + target.clientHeight) >= target.scrollHeight) {
              this.bol = true
              this.page++
              this.getData()
            }
          }
        })
      },
      // 代表在wacth里声明了scroll这个方法之后立即先去执行handler方法
      immediate: true
    },
    area (val) {
      this.bol = false
      this.page = 1
      this.getData(val = '内地')
    }
  },
  methods: {
    getData () {
      leaderboardMv({
        area: this.area,
        limit: this.page * 25
      }).then((res) => {
        if (this.mvs.length === 50) {
          return
        }
        this.mvs = res.data
        console.log(res.data)
        this.bol = false
      })
    },
    toMV (id) {
      this.$router.push(`/MvDetail/${id}`)
    }
  }
}
</script>
<style lang='scss' scoped>
h4 {
  margin-bottom: 20px;
  ol {
    display: flex;
    font-size: 13px;
  }
  li {
    padding: 0 10px;
    border-right: 1px solid red;
    cursor: pointer;
  }
}
.content ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li {
    width: 50%;
    margin-bottom: 20px;
    cursor: pointer;
    display: flex;
    .index {
      padding: 0 10px;
      display: flex;
      font-style: italic;
      color: rgb(146, 146, 146);
      display: flex;
      flex-direction: column;
      justify-content: center;
      .icon1,
      .icon2 {
        font-size: 13px;
        margin-top: 5px;
      }
      .icon1 {
        color: rgb(0, 183, 255);
      }
      .icon2 {
        color: rgb(255, 0, 0);
      }
    }
    .right {
      width: 45%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        margin: 5px 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .artistName {
        font-size: 13px;
        color: rgb(175, 175, 175);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .cover {
      width: 50%;
      margin-right: 10px;
      img {
        width: 100%;
      }
    }
  }
}
.selected {
  color: red;
}
</style>
