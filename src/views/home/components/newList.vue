<template>
  <div ref="box" class="newList">
    <div class="month">
      <div v-for="(item, index) in allData" :key="index">
        <div ref="title" class="title">
          <span> {{item.time | time}}</span>
          <span class="year" v-if="item.year"> / {{item.year}}</span>
        </div>
        <ul>
          <li :style="{width: imgWidth}" @click="toplayListDetail(x.id)" class="item" v-for="x in item.child" :key="x.id">
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
import mixins from './mixins'
export default {
  mixins: [mixins],
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
      imgWidth: '16.6%',
      noOffset: true
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      getNewList().then((res) => {
        res.weekData.map((x) => {
          x.weekTime = 'weekTime'
          return true
        })
        const sort = res.monthData.sort((a, b) => {
          return a.publishTime - b.publishTime > 0 ? -1 : 1
        })
        this.getFilterData(res.weekData, sort)
      })
    },
    getFilterData (weekData, monthData) {
      const data = {}
      monthData.forEach((x) => {
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
      this.allData.push({
        time: '本周新碟',
        child: weekData
      })
      for (const i in data) {
        this.allData.push(data[i])
      }
    },
    toplayListDetail (id) {
      this.$router.push(`/albumDetail/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.newList {
  width: 100%;
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
