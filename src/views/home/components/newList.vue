<template>
  <div class="newList">
    <div class="month">
      <div v-for="(item, index) in renderData" :key="index">
        <div ref="title" class="title">
          <span> {{item.time | time}}</span>
          <span class="year" v-if="item.year"> / {{item.year}}</span>
        </div>
        <ul>
          <li @click="toplayListDetail(x.id)" class="item" v-for="x in item.child" :key="x.id">
            <img v-lazy="`${x.picUrl}?param=130y130`" :key="item.picUrl" alt="">
            <div class="name">{{x.name}}</div>
            <p>{{x.artist.name}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// api
import { getNewList } from '@/api/music'
export default {
  filters: {
    time (val) {
      if (typeof val === 'number') {
        val++
        val = `${val}月`
      }
      return val
    }
  },
  data () {
    return {
      // 全部数据
      allData: [],
      // 渲染需要的数据
      renderData: [],
      // 分页
      page: 0,
      // 每页数据
      pageSize: 40,
      // 节流
      bol: true,
      // 保存每页数据
      history: [],
      // 总页数
      total: 0
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    const homeMain = document.querySelector('.home-main')
    homeMain.addEventListener('scroll', (e) => {
      if (!this.bol) {
        return
      }
      const target = e.target
      if (Math.ceil(target.scrollTop + target.clientHeight) >= target.scrollHeight) {
        this.page++
        this.bol = false
        this.getFilterData()
      }
    })
  },
  methods: {
    getData () {
      getNewList().then((res) => {
        res.weekData.map((x) => {
          x.weekTime = 'weekTime'
          return true
        })
        this.allData.push(...res.weekData)
        const sort = res.monthData.sort((a, b) => {
          return a.publishTime - b.publishTime > 0 ? -1 : 1
        })
        this.allData.push(...sort)
        this.total = Math.ceil(this.allData.length / this.pageSize)
        this.getFilterData()
      })
    },
    // page++
    getFilterData (state) {
      const data = {}
      const next = this.page + 1
      if (this.page > (this.total - 1)) {
        return
      }
      const sliceData = this.allData.slice(
        this.page * this.pageSize,
        next * this.pageSize
      )
      this.history.push(...sliceData)
      const weekData = this.history.filter((x) => {
        if (x.weekTime) {
          return true
        }
      })
      this.history.forEach((x) => {
        const date = new Date(x.publishTime)
        const year = date.getFullYear()
        const month = date.getMonth()
        const ym = year + '-' + month
        if (!x.weekTime) {
          if (!data[ym]) {
            data[ym] = {
              year: year,
              time: month,
              child: []
            }
          }
          data[ym].child.push(x)
        }
      })
      this.renderData = []
      this.renderData.push({
        time: '本周新碟',
        child: weekData
      })
      for (const i in data) {
        this.renderData.push(data[i])
      }
      this.bol = true
    },
    toplayListDetail (id) {
      this.$router.push(`/albumDetail/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 1300px) {
  .item {
    width: 20% !important;
  }
}

@media only screen and (max-width: 900px) {
  .item {
    width: 25% !important;
  }
}

@media only screen and (max-width: 700px) {
  .item {
    width: 33% !important;
  }
}

ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.title {
  padding: 10px 0;
  .year {
    font-size: 12px;
    color: rgb(187, 187, 187);
  }
}
.item {
  width: 10%;
  margin-bottom: 15px;
  padding-right: 10px;
  img {
    width: 100%;
  }
  .name,
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .name {
    font-size: 13px;
    padding: 5px 0;
  }
  p {
    color: darkgrey;
    font-size: 12px;
  }
}
</style>
