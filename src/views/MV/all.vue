<template>
  <div class="allMv">
    <div class="head">
      <div class="area">
        <h4>地区 :</h4>
        <span
          @click="change(['area', item])"
          :class="{ selected: item === position.area }"
          v-for="(item, index) in area"
          :key="index"
          >{{ item }}</span
        >
      </div>
      <div class="type">
        <h4>类型 :</h4>
        <span
          @click="change(['type', item])"
          :class="{ selected: item === position.type }"
          v-for="(item, index) in type"
          :key="index"
          >{{ item }}</span
        >
      </div>
      <div class="order">
        <h4>排序 :</h4>
        <span
          @click="change(['order', item])"
          :class="{ selected: item === position.order }"
          v-for="(item, index) in order"
          :key="index"
          >{{ item }}</span
        >
      </div>
    </div>
    <div class="content">
      <ul>
        <li @click="toMV(item.id)" :style="{ width: imgWidth }" v-for="item in mvs" :key="item.id">
          <div class="cover">
            <img :src="item.cover" alt="" />
            <p>{{ item.name }}</p>
            <h4>{{ item | artistName }}</h4>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { allMv } from '@/api/music'
export default {
  props: {
    scroll: {
      type: Object,
      default: null
    },
    selected: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      area: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
      type: ['全部', '官方版', '原生', '现场版', '网易出品'],
      order: ['上升最快', '最热', '最新'],
      position: {
        area: '全部',
        type: '全部',
        order: '上升最快'
      },
      mvs: [],
      bol: false,
      page: 1,
      offset: 0,
      imgWidth: '24%'
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
            console.log(
              target.scrollTop + target.clientHeight >= target.scrollHeight
            )
            if (
              Math.ceil(target.scrollTop + target.clientHeight) >=
              target.scrollHeight
            ) {
              this.bol = true
              this.offset += 30
              this.getData()
            }
          }
        })
      },
      immediate: true
    },
    selected: {
      handler (data) {
        for (const i in data) {
          this.position[i] = data[i]
        }
      },
      immediate: true
    },
    main: {
      handler (value) {
        if (!value) {
          return
        }
        const boxWidth = this.main.offsetWidth
        this.resize(boxWidth)
      },
      immediate: true
    }
  },
  computed: {
    main () {
      return this.$store.state.user.resize
    }
  },
  mounted () {
    this.$bus.$on('zoom', (boxWidth) => {
      this.resize(boxWidth)
    })
  },
  methods: {
    getData () {
      this.position.offset = this.offset
      allMv(this.position).then((res) => {
        if (res.data.length === 0) {
          return
        }
        this.mvs.push(...res.data)
        this.bol = false
      })
    },
    change (data) {
      if (data && data.length === 2) {
        this.position[data[0]] = data[1]
        this.mvs = []
        this.getData()
      }
    },
    resize (boxWidth) {
      switch (true) {
        case boxWidth > 990 || boxWidth === 0:
          this.imgWidth = '24%'
          break
        case boxWidth <= 990 && boxWidth > 790:
          this.imgWidth = '32.3%'
          break
        case boxWidth <= 840:
          this.imgWidth = '49%'
      }
    },
    toMV (id) {
      this.$router.push(`/MvDetail/${id}`)
    }
  }
}
</script>
<style lang='scss' scoped>
.head > div {
  display: flex;
  font-size: 13px;
  margin-bottom: 15px;
  span {
    padding: 0 10px;
    border-right: 1px solid rgb(168, 168, 168);
    cursor: pointer;
  }
  .selected {
    color: rgb(194, 12, 12);
  }
}
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li {
    width: 24%;
    margin-bottom: 25px;
    cursor: pointer;
    .cover {
      width: 100%;
      img {
        width: 100%;
      }
    }
    p {
      padding: 5px 0;
    }
    p,
    h4 {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    h4 {
      font-size: 13px;
    }
  }
}
</style>
