<template>
  <div ref="box" class="allsonglist">
    <div class="table">
      <div v-if="all" class="all">
        <el-popover
          ref="popover"
          popper-class="popover-category"
          placement="bottom-start"
          width="200"
          trigger="click"
        >
          <div class="btn" slot="reference">{{ cat }}</div>
          <div class="content">
            <el-button
              :class="cat === all.name ? 'cat' : ''"
              @click="cat = all.name"
              >{{ all.name }}</el-button
            >
            <div class="main">
              <div
                v-for="(list, index) in categories"
                :key="index"
                class="category"
              >
                <div class="category-name">{{ list.category }}</div>
                <div class="child">
                  <ul>
                    <li
                      :class="[cat === item.name ? 'cat' : '']"
                      @click="cat = item.name"
                      v-for="(item, n) in list.child"
                      :key="n"
                    >
                      {{item.name}}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </el-popover>
      </div>
      <ul>
        <li
          :class="cat === item.name ? 'cat' : ''"
          @click="cat = item.name"
          v-for="(item, index) in hot"
          :key="index"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="playList">
        <ul v-if="lists.length > 0">
          <li
            @click="toplayListDetail(list.id)"
            :style="{ width: imgWidth }"
            v-for="(list, index) in lists"
            :key="index"
          >
            <img
              :ref="index === 0 ? 'imgFirst' : ''"
              v-lazy="list.coverImgUrl"
              alt=""
            />
            <div class="name">{{ list.name }}</div>
            <div class="creator">by {{ list.creator.nickname }}</div>
            <div class="after"></div>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import { songLists, catergroyList } from '@/api/music'
import mixins from './mixins'
export default {
  mixins: [mixins],
  data () {
    return {
      hot: [],
      all: null,
      categories: [],
      lists: [],
      cat: '全部歌单',
      imgWidth: '16.6%',
      bol: true,
      offset: 0
    }
  },
  watch: {
    cat (val) {
      if (val) {
        this.lists = []
        this.getData()
      }
    }
  },
  created () {
    this.getData('全部')
    songLists().then((data) => {
      const categories = data.categories
      const keys = Object.keys(categories)
      this.all = data.all
      this.hot = data.sub
        .filter((x) => {
          const index = keys.indexOf(x.category.toString())
          if (index > -1) {
            if (!this.categories[index]) {
              this.categories[index] = {
                category: categories[index],
                child: []
              }
            }
            this.categories[index].child.push({
              name: x.name
            })
          }
          if (x.hot) {
            return true
          }
        })
        .slice(0, 8)
    })
  },
  methods: {
    // 获取对应类型的歌单
    getData () {
      console.log(this.offset)
      catergroyList({
        order: 'hot',
        cat: this.cat,
        offset: this.offset
      }).then((data) => {
        if (data.playlists.length === 0) {
          return
        }
        this.lists.push(...data.playlists)
        this.bol = true
      })
      if (this.$refs.popover) {
        this.$refs.popover.doClose()
      }
    },
    toplayListDetail (id) {
      this.$router.push(`/songListDetail/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.cat {
  color: #c20c0c;
}
.allsonglist > div {
  position: relative;
  z-index: 100;
}
.allsonglist {
  overflow: hidden;
  position: relative;
  width: 100%;
  .table {
    font-size: 13px;
    display: flex;
    align-items: center;
    .all {
      align-self: flex-start;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      li {
        padding: 0 10px;
        border-right: 1px solid rgb(204, 204, 204);
        cursor: pointer;
        white-space: nowrap;
        margin-bottom: 10px;
      }
    }
  }
}
.btn {
  padding: 2px 10px;
  border: 1px solid rgb(219, 219, 219);
  border-radius: 2px;
  cursor: pointer;
}
.content {
  font-size: 13px;
  .el-button {
    border: 1px solid #c20c0c;
    padding: 6px 90px;
    border-radius: 1px;
    font-size: 13px;
    margin-bottom: 20px;
    color: #000;
  }
  .el-button:hover {
    background-color: #fff;
    color: #000;
  }
  .main {
    border-top: 1px solid rgb(219, 219, 219);
    padding-top: 15px;
  }
  .category {
    display: flex;
    width: 100%;
    margin-bottom: 20px;
    .category-name {
      display: flex;
      align-items: center;
      margin-right: 20px;
      color: #c20c0c;
    }
    .child {
      flex: 1;
      ul {
        flex-wrap: wrap;
        display: flex;
        li {
          width: 80px;
          padding: 5px 0;
          text-align: center;
          border: 1px solid rgb(219, 219, 219);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: 5px;
          margin-bottom: 5px;
          cursor: pointer;
        }
      }
    }
  }
}
.playList {
  margin-top: 20px;
  ul {
    display: flex;
    flex-wrap: wrap;
    font-size: 13px;
    li {
      position: relative;
      width: 16.6%;
      padding-right: 20px;
      margin-bottom: 20px;
      img {
        width: 100%;
      }
      .name {
        padding: 8px 0;
      }
      .name,
      .creator {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .creator {
        font-size: 12px;
        color: darkgrey;
      }
    }
    li:hover .after {
      display: block;
    }
    li .after {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #fff;
      opacity: 0.3;
    }
  }
}
.expand,
.shrink {
  position: absolute !important;
  width: 100%;
  height: 10px;
  opacity: 0;
  top: 0;
  left: 0;
  z-index: 0 !important;
  overflow: auto;
}
.shrink {
  top: 200px;
}
.shrink-child {
  width: 250%;
  height: 250%;
}
</style>
