<template>
  <div class="featured">
    <div class="wangyi">
      <h4>
        <div class="left">
          <span class=""></span>
          <span>网易出品</span>
        </div>
        <div class="right">
          <span @click="toAll({ type: '网易出品', order: '最新' })">更多</span>
          <span class=""></span>
        </div>
      </h4>
      <div class="content">
        <ul>
          <li @click="toMV(item.id)" v-for="item in wangyi" :key="item.id">
            <div class="cover">
              <img :src="item.cover" alt="" />
            </div>
            <p>{{ item.name }}</p>
            <div class="artistName">{{ item | artistName }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="new">
      <h4>
        <div class="left">
          <span class=""></span>
          <span>最新MV</span>
        </div>
        <div class="middle">
          <ol>
            <li
              :class="area === item ? 'selected' : ''"
              :key="index"
              @click="upToDateMV(item)"
              v-for="(item, index) in areas"
            >
              {{ item }}
            </li>
          </ol>
        </div>
        <div class="right">
          <span @click="toAll({ area, order: '最新' })">更多</span>
          <span class=""></span>
        </div>
      </h4>
      <div class="content">
        <ul>
          <li @click="toMV(item.id)" v-for="item in upToDate" :key="item.id">
            <div class="cover">
              <img :src="`${item.cover}?param=350y200`" alt="" />
            </div>
            <p>{{ item.name }}</p>
            <div class="artistName">{{ item | artistName }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { upToDateMV, wangyiMv } from '@/api/music'
export default {
  filters: {
    artistName (value) {
      if (value && value.artists && value.artists.length > 0) {
        let str = ''
        value.artists.forEach((e) => {
          str += e.name + '/'
        })
        return str.slice(0, str.length - 1)
      }
      return ''
    }
  },
  data () {
    return {
      wangyi: [],
      upToDate: [],
      areas: ['内地', '港台', '欧美', '日本', '韩国'],
      area: '内地'
    }
  },
  created () {
    this.getdata()
  },
  mounted () {},
  methods: {
    getdata () {
      this.upToDateMV()
      wangyiMv({ limit: 3 }).then((res) => {
        this.wangyi = res.data
        console.log(res)
      })
    },
    toMV (id) {
      this.$router.push(`/MvDetail/${id}`)
    },
    upToDateMV (name = '内地') {
      this.area = name
      upToDateMV({ limit: 12, area: this.area }).then((res) => {
        this.upToDate = res.data
      })
    },
    toAll (data) {
      this.$emit('all', data)
    }
  }
}
</script>
<style lang='scss' scoped>
.wangyi {
  margin-bottom: 30px;
}
h4 {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  .right {
    span {
      font-size: 13px;
      cursor: pointer;
    }
  }
}
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li {
    width: 32%;
    cursor: pointer;
    .cover {
      width: 100%;
      img {
        width: 100%;
      }
    }
    p {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin: 5px 0;
    }
    .artistName {
      font-size: 13px;
      color: rgb(175, 175, 175);
    }
  }
}
.middle {
  flex: 1;
  margin-left: 50px;
  ol {
    display: flex;
    font-size: 13px;
    li {
      padding: 0 10px;
      border-right: 1px solid red;
      cursor: pointer;
    }
  }
}
.selected {
  color: red;
}
</style>
