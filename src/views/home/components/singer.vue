<template>
  <div ref="box" class="singer">
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
      <div :style="{width: imgWidth}" @click="toSingerDetail(item.id)" v-for="item in artists" :key="item.id" class="item">
        <img v-lazy="`${item.picUrl}?param=130y130`" alt="">
        <div class="name"></div>
        {{item.name}}
      </div>
    </main>
  </div>
</template>

<script>
import { getSinger } from '@/api/music'
import mixins from './mixins'
export default {
  mixins: [mixins],
  data () {
    return {
      options: {
        limit: 50,
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
      bol: true,
      imgWidth: '16.6%'
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
  methods: {
    getData () {
      getSinger(this.options).then((data) => {
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
