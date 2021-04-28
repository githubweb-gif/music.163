<template>
  <div class="search">
    <div class="search-bar">
      <el-input
        @input="suggest"
        @keydown.enter.native="search"
        v-model="keyWord"
        suffix-icon="el-icon-search"
      ></el-input>
      <div v-show="showSuggest" id="suggest">
        <div
          @click="confrim(item.keyword)"
          class="item"
          v-for="(item, index) in suggestList"
          :key="index"
        >
          {{ item.keyword }}
        </div>
      </div>
    </div>
    <div @click="showSuggest = false" v-if="!valid" class="hot-history">
      <div class="hot">
        <div class="title">热门搜索</div>
        <div class="content">
          <span
            @click="confrim(item.first)"
            v-for="(item, index) in hotKeyWords"
            :key="index"
            >{{ item.first }}</span
          >
        </div>
      </div>
      <div class="history">
        <div class="title">
          <span>搜索历史</span>
          <span class="el-icon-delete"></span>
        </div>
        <div class="history-content">
          <ul>
            <li v-for="(item, index) in keyWords" :key="index">
              <span>{{ item }}</span>
              <span class="el-icon-close"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <search-result
      @click.native="showSuggest = false"
      :keyWord="valid"
      :songs="songs"
      v-else
      class="result"
    ></search-result>
  </div>
</template>

<script>
import { hotKeyWords, searchMusic, searchSuggest } from '@/api/search'
import { setSearchHistory, getSearchHistory } from '@/untils/search'
import searchResult from './searchResult.vue'
import _ from 'lodash'
export default {
  components: {
    searchResult
  },
  data () {
    return {
      hotKeyWords: [],
      keyWord: '',
      valid: '',
      keyWords: [],
      suggestList: [],
      showSuggest: false,
      // 单曲
      songs: []
    }
  },
  created () {
    this.gethotKeyWords()
    const keys = getSearchHistory() || []
    this.keyWords = keys
  },
  watch: {
    keyWord (val) {
      if (!val) {
        this.showSuggest = false
        this.valid = ''
      }
    }
  },
  methods: {
    // 获取 热门搜索
    gethotKeyWords () {
      hotKeyWords().then((data) => {
        this.hotKeyWords = data.result.hots
      })
    },
    // 关键词搜索
    search () {
      const type = '1'
      this.showSuggest = false
      if (this.valid === this.keyWord) {
        return
      }
      this.songs = []
      this.valid = this.keyWord
      searchMusic({ keywords: this.keyWord, type, limit: 100 }).then((data) => {
        setSearchHistory(this.keyWord)
        console.log(type)
        console.log(data)
        if (data.code === 200) {
          if (type === '1') {
            this.filterMusic(data.result.songs)
          }
        }
      })
    },
    // 搜索建议
    suggest: _.debounce(function () {
      searchSuggest({ type: 'mobile', keywords: this.keyWord }).then((data) => {
        console.log(data)
        if (data.code !== 200) {
          return
        }
        this.suggestList = data.result.allMatch
        this.showSuggest = true
      })
    }, 500),
    // 搜索建议点击
    confrim (value) {
      this.keyWord = value
      this.search()
    },
    // 过滤单曲
    filterMusic (data) {
      data.forEach((x, index) => {
        const singername = []
        const { artists } = x
        artists.forEach((i) => {
          singername.push(i.name)
        })
        this.songs.push({
          id: x.id,
          album: { id: x.album.id },
          albumName: x.album.name,
          name: x.name,
          singerName: singername.join('/'),
          duration: x.duration,
          // 版权 st<0无版权
          copyright: 0,
          index: index
        })
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.search {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.search-bar {
  margin-bottom: 15px;
  position: relative;
  #suggest {
    position: absolute;
    width: 100%;
    z-index: 100;
    top: 40px;
    background-color: #fff;
    border-right: 1px solid #c0c4cc;
    border-left: 1px solid #c0c4cc;
    .item {
      padding: 12px 0 12px 15px;
      border-bottom: 1px solid #c0c4cc;
      cursor: pointer;
    }
  }
}
.result {
  flex: 1;
  overflow: hidden;
}
.hot-history {
  display: flex;
  flex: 1;
  justify-content: space-between;
  overflow: hidden;
  .hot {
    margin-right: 30px;
  }
  .hot,
  .history {
    width: 50%;
    .content {
      margin-top: 15px;
      display: flex;
      flex-wrap: wrap;
      span {
        font-size: 13px;
        margin-right: 10px;
        border: 1px solid rgb(151, 151, 151);
        padding: 0 10px;
        height: 24px;
        line-height: 24px;
        border-radius: 12px;
        margin-bottom: 12px;
        cursor: pointer;
      }
    }
  }
  .history {
    display: flex;
    flex-direction: column;
  }
  .history-content {
    flex: 1;
    overflow: hidden;
    ul {
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }
    li {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      cursor: pointer;
    }
  }
  .title {
    padding: 8px;
    border-bottom: 1px solid rgb(230, 230, 230);
    display: flex;
    justify-content: space-between;
  }
}
</style>
