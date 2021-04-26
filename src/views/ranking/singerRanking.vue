<template>
  <div class="singer-ranking">
    <div class="title">
      {{ title }}
    </div>
    <div class="tab">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in tab"
          :key="index"
          :label="item.value"
          :name="item.type"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <div class="content">
      <ul>
        <li
        @click="toSinger(item.id)"
          :class="(index + 1) % 2 === 0 ? 'even' : 'odd'"
          v-for="(item, index) in lists"
          :key="index"
        >
          <div class="index">{{ index | index }}</div>
          <div class="icon" :class="setClass(item, index)"></div>
          <div class="avatar">
            <img :src="`${item.picUrl}?param=130y130`" alt="" />
          </div>
          <div class="name">{{ item.name }}</div>
          <div class="hot">热度: {{ item.score }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { singerRanking } from '@/api/music'
export default {
  filters: {
    index (value) {
      value++
      if (!value && value !== 0) {
        return
      }
      if (value < 10) {
        return `0${value}`
      } else {
        return value
      }
    }
  },
  data () {
    return {
      lists: [],
      tab: [
        { type: '1', value: '华语' },
        { type: '2', value: '欧美' },
        { type: '3', value: '韩国' },
        { type: '4', value: '日本' }
      ],
      activeName: '1'
    }
  },
  created () {
    this.getData()
  },
  computed: {
    title () {
      return this.$route.meta.title || ''
    }
  },
  methods: {
    getData (type = 1) {
      console.log(type)
      singerRanking({ type }).then((data) => {
        console.log(data.list.artists)
        this.lists = data.list.artists
      })
    },
    handleClick (value) {
      this.getData(value.name - 0)
    },
    setClass (item, index) {
      if (item.lastRank === index) {
        return 'el-icon-minus'
      } else if (item.lastRank > index) {
        return 'el-icon-top'
      } else {
        return 'el-icon-bottom'
      }
    },
    toSinger (id) {
      this.$router.push(`/singerDetail/${id}`)
    }
  }
}
</script>
<style lang='scss' scoped>
.el-icon-minus {
  color: rgb(156, 156, 156);
}
.el-icon-top {
  color: red;
}
.el-icon-bottom {
  color: blue;
}
.singer-ranking {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.title {
  font-size: 13px;
  color: #666666;
  padding-bottom: 10px;
}
.content {
    padding-top: 15px;
  ul {
    .odd {
      background-color: #f2f2f3;
    }
    li > div {
      padding: 0 5px;
    }
    li {
      display: flex;
      height: 65px;
      align-items: center;
      cursor: pointer;
      .index {
        font-size: 13px;
      }
      .avatar {
        img {
          width: 48px;
          height: 48px;
        }
      }
      .icon {
        font-size: 12px;
      }
      .hot {
        font-size: 13px;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .name {
        text-align: left;
        width: 65%;
      }
    }
  }
}
</style>
