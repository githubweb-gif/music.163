<template>
  <div>
    <el-table :row-style="rowStyle" v-if="songs" @row-click="rowClick"  @select="select" @select-all="selectAll" :show-header="false" highlight-current-row ref="multipleTable" :data="songs" tooltip-effect="dark" style="width: 100%">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index">
        <template v-slot:default="scope">
          {{scope.row | index}}
        </template>
      </el-table-column>
      <el-table-column prop="name">
      </el-table-column>
      <el-table-column width="80">
        <template v-slot:default="scope">
          <div v-show="ismenu === scope.row.id" class="content">
            <i class="icon  el-icon-video-play" @click="playMusic(scope.row)" />
            <el-popover :ref="`popover-${scope.$index}`" trigger="click" placement="bottom-start" width="200">
              <div @click="menuShow(scope)" class="box-shadow"></div>
              <ul class="card">
                <li @click="nextPlay(scope)">下一首播放</li>
                <li @click="favorites(scope)">收藏</li>
                <li>下载</li>
                <li class="singer">
                  <span>歌手：{{ scope.row.singerName }}</span>
                </li>
                <li>
                  <span>专辑：{{ scope.row.albumName }}</span>
                </li>
                <li class="delete" @click="todelete(scope)">
                  从歌单中删除
                </li>
              </ul>
              <i class="icon more el-icon-circle-plus-outline" slot="reference" />
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="singerName" width="120">
      </el-table-column>
      <el-table-column v-if="hide" prop="albumName">
      </el-table-column>
      <el-table-column v-if="hide" width="50">
        <template v-slot:default="scope">
          {{scope.row.duration/1000 | formatTime}}
        </template>
      </el-table-column>
    </el-table>
    <dialog-component :visible.sync="message" :icon="icon"></dialog-component>
    <favorites :visible.sync="show" :favorites-msg="favoritesMsg"></favorites>
  </div>
</template>

<script>
// api
import { addOrdel } from '@/api/music'

import setMusciInfo from '@/untils/setMusciInfo'
import dialogComponent from './dialog.vue'
import favorites from './favorites.vue'
// import _ from 'lodash'
export default {
  components: {
    dialogComponent,
    favorites
  },
  props: {
    songs: {
      type: Array,
      default: null
    }
  },
  filters: {
    index (row) {
      return row.index + 1 < 10 ? '0' + (row.index + 1) : row.index + 1
    }
  },
  data () {
    return {
      hide: true,
      // 消息提示信息和图标
      message: '',
      icon: '',
      // 收藏信息
      favoritesMsg: null,
      visible: false,
      show: false,
      loading: true,
      ismenu: '',
      selects: [],
      // 筛选后的数据，只有有版权的
      legitimateData: null,
      height: 0,
      ll: null
    }
  },
  watch: {
    songs (val) {
      if (val && val.length > 0) {
        this.height = 48 * val.length
      }
      this.legitimateData = this.songs.filter((x) => {
        return x.copyright >= 0
      })
    }
  },
  mounted () {
    this.$bus.$on('AllSelection', (val) => {
      if (val) {
        // 全选
        this.$refs.multipleTable.toggleAllSelection()
        return
      }
      this.$refs.multipleTable.toggleAllSelection()
    })
    const main = document.querySelector('.main')
    window.onresize = () => {
      if (main.offsetWidth < 650) {
        this.hide = false
      } else {
        this.hide = true
      }
    }
  },
  computed: {
    // 歌单id
    id () {
      return this.$route.params.id || ''
    }
  },
  methods: {
    rowStyle ({ row, rowIndex }) {
    },
    rowKey (row) {
      if (row.id) {
        return row.id
      }
    },
    rowClick (row, column, event) {
      this.ismenu = row.id
    },
    playMusic (data) {
      if (!this.isCopyright(data.copyright)) {
        return
      }
      // 设置当前播放歌单id
      this.$store.commit('SET_SONGLISTID', this.songListId)
      // 先暂停
      this.$store.commit('SET_PLAYING', false)
      setMusciInfo(data).then((res) => {
        // 更新播放记录
        this.$store.dispatch('SET_HISTORY', res)
        // 同时更新播放队列
        this.$store.dispatch('SET_PLAYLIST', {
          list: this.legitimateData,
          one: false
        })
        // 再播放
        this.$store.commit('SET_PLAYING', true)
      })
    },
    // 无版权或者其他信息
    isCopyright (copyright) {
      if (copyright < 0) {
        this.message = '因合作方要求该资源暂时下架'
        this.icon = 'el-icon-circle-close'
        return false
      } else {
        return true
      }
    },
    menuShow (scope) {
      this.$refs[`popover-${scope.$index}`].doClose()
    },
    // 下一首播放
    nextPlay (scope) {
      this.menuShow(scope)
      if (!this.isCopyright(scope.row.copyright)) {
        return
      }
      this.$store.dispatch('SET_PLAYLIST', { list: [scope.row], one: true })
    },
    // 收藏
    favorites (scope) {
      this.menuShow(scope)
      this.favoritesMsg = scope.row
      this.show = true
    },
    // 从歌单中删除歌曲
    todelete (scope) {
      addOrdel({
        op: 'del',
        pid: this.id,
        tracks: scope.row.id
      }).then(() => {
        this.songs.splice(scope.$index, 1)
        this.$refs[`popover-${scope.$index}`].doClose()
        this.$store.dispatch('SET_PLAYLIST', { list: this.songs, one: false })
      })
    },
    select (selection) {
      this.selects = selection
      this.$bus.$emit('selection', selection)
    },
    selectAll (selection) {
      this.$bus.$emit('selection', selection)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-table__row .cell {
  overflow: hidden;
  // white-space: nowrap;
}
.icon {
  font-size: 20px;
  z-index: 200;
}
.icon:nth-of-type(1) {
  margin-right: 10px;
}
/deep/ .noCopyright {
  background-color: rgb(245, 247, 250);
}
.el-popover {
  ul.card {
    position: relative;
    z-index: 9999;
    li {
      margin: 0 -12px;
      padding: 10px 0 10px 10px;
      font-size: 13px;
      cursor: pointer;
      span {
        display: inline-block;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    li:hover {
      background-color: #d8d8d8;
    }
    .singer,
    .delete {
      border-top: 1px solid #dcdcdc;
    }
  }
}
.box-shadow {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 100;
}
</style>
