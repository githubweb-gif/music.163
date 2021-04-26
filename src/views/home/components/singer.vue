<template>
  <div class="singer">
    <header>
      <ul>
        <li>
          <span class="title">语种：</span>
          <span class="items">
            <span @click="modifyOptions(['area', item.value])" :class="item.value === options.area ? 'slected' : ''" v-for="item in area" :key="item.value" class="item">{{item.type}}</span>
          </span>
        </li>
        <li>
          <span class="title">分类：</span>
          <span class="items">
            <span @click="modifyOptions(['type', item.value])" :class="item.value === options.type ? 'slected' : ''" v-for="item in type" :key="item.value" class="item">{{item.type}}</span>
          </span>
        </li>
        <li>
          <span class="title">筛选：</span>
          <span class="items">
            <span @click="modifyOptions(['initial', item])" :class="item === options.initial ? 'slected' : ''" v-for="(item, index) in initials" :key="index" class="item">{{item === -1 ? '热门' : item}}</span>
          </span>
        </li>
      </ul>
    </header>
    <main>
      <div @click="toSingerDetail(item.id)" v-for="item in artists" :key="item.id" class="item">
        <img v-lazy="`${item.picUrl}?param=130y130`" alt="">
        <div class="name"></div>
        {{item.name}}
      </div>
    </main>
  </div>
</template>

<script>
import { getSinger } from '@/api/music'
export default {
  data () {
    return {
      options: {
        limit: 30,
        offset: 0,
        type: -1,
        area: -1,
        initial: -1
      },
      area: [
        { type: '全部', value: -1 },
        { type: '华语', value: 7 },
        { type: '欧美', value: 96 },
        { type: '日本', value: 8 },
        { type: '韩国', value: 16 },
        { type: '其他', value: 0 }
      ],
      type: [
        { type: '全部', value: -1 },
        { type: '男歌手', value: 1 },
        { type: '女歌手', value: 2 },
        { type: '乐队', value: 3 }
      ],
      artists: [],
      bol: true
    }
  },
  computed: {
    initials () {
      const str = 'ABCDEFGHIJKLMNOPQRSTUVWSYZ'
      const arr = str.split('')
      arr.unshift(-1)
      arr.push('#')
      return arr
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
        this.options.offset += 30
        this.bol = false
        this.getData()
      }
    })
  },
  methods: {
    getData () {
      getSinger(this.options).then((data) => {
        console.log(data)
        // 获取完毕
        if (data.artists.length === 0) {
          return
        }
        this.artists.push(...data.artists)
        this.bol = true
      })
    },
    modifyOptions (data) {
      this.bol = true
      if (data && data.length === 2) {
        this.artists = []
        this.options[data[0]] = data[1]
        this.getData()
      }
    },
    toSingerDetail (id) {
      this.$router.push(`/singerDetail/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 1300px) {
  main .item {
    width: 14% !important;
  }
}

@media only screen and (max-width: 1000px) {
  main .item {
    width: 25% !important;
  }
}

@media only screen and (max-width: 700px) {
  main .item {
    width: 33% !important;
  }
}
header {
  font-size: 13px;
  color: rgb(146, 146, 146);
  li {
    margin-bottom: 7px;
    display: flex;
    line-height: 25px;
    .title {
      color: rgb(58, 58, 58);
    }
    .items {
      flex: 1;
      span {
        font-size: 12px;
        cursor: pointer;
      }
      span::after {
        content: "|";
        display: inline-block;
        width: 1px;
        padding: 0 15px;
      }
      span:last-child::after {
        display: none;
      }
      span.slected {
        color: rgb(194, 12, 12);
      }
    }
  }
}

main {
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 10%;
    padding-right: 10px;
    margin-bottom: 20px;
    font-size: 13px;
    img {
      width: 100%;
      margin-bottom: 5px;
    }
  }
}
</style>
