<template>
  <div class="lists">
    <el-checkbox v-show="false" v-model="checkAll" @change="checkAllChange"></el-checkbox>
    <ul :style="`height: ${height};`">
      <el-checkbox-group v-model="checkeds" @change="handleChange">
        <li @click="isMenu = item.id" :style="rowStyle(item)" :class="[(item.index+1)%2 === 0 ? 'even' : 'odd']" v-for="item in renderData" :key="item.id">
          <el-checkbox v-show="dialogVisible" :label="item">
            <!-- br占位符用来隐藏label -->
            <br>
          </el-checkbox>
          <div class="item-child index">{{item.index}}</div>
          <div class="item-child name">{{item.name}}</div>
          <div class="item-child menu">
            <div v-show="isMenu === item.id && !dialogVisible" class="menu-content">
              <i @click="playMusic(item)" class="icon  el-icon-video-play" />
              <el-popover :ref="`popover-${item.index}`" trigger="click" placement="bottom-start" width="200">
                <div @click="menuShow(item.index)" class="box-shadow"></div>
                <ul class="card">
                  <li @click="nextPlay(item)">下一首播放</li>
                  <li @click="favorites(item)">收藏</li>
                  <li>下载</li>
                  <li class="singer">
                    <span>歌手：{{ item.singerName }}</span>
                  </li>
                  <li>
                    <span>专辑：{{ item.albumName }}</span>
                  </li>
                  <li v-if="uid === userId" @click="todelete(item)" class="delete">
                    从歌单中删除
                  </li>
                </ul>
                <i class="icon more el-icon-circle-plus-outline" slot="reference" />
              </el-popover>
            </div>
          </div>
          <div class="item-child singername">{{item.singerName}}</div>
          <div class="item-child album">{{item.albumName}}</div>
          <div class="item-child time">{{item.duration/1000 | formatTime}}</div>
        </li>
      </el-checkbox-group>
    </ul>
    <dialog-component :visible.sync="message" :icon="icon" />
    <favorites :visible.sync="favoriteShow" :favorites-msg="favoritesMsg" />
    <choose-component :data="checkeds" :check-all="checkAll" :visible="dialogVisible" />
    <el-dialog class="del-dialog" :visible.sync="isconfirmdel" width="400px">
      <div class="content">
        <div class="title">确认将歌曲从歌单中删除</div>
        <div class="dialog-footer">
          <el-button class="confrim" @click="todelete(checkeds)">删除</el-button>
          <el-button @click="isconfirmdel = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// api
import { addOrdel } from '@/api/music'

import views from './view_data'
import setMusciInfo from '@/utils/setMusciInfo'
import dialogComponent from './dialog.vue'
import favorites from './favorites.vue'
import chooseComponent from '../choose.vue'
export default {
  mixins: [views],
  components: {
    dialogComponent,
    favorites,
    chooseComponent
  },
  props: {
    songs: {
      type: Array,
      default: null
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    viewPortHeight: {
      type: Number,
      default: 633
    }
  },
  data () {
    return {
      // checked: false,
      // 选择到的数据
      checkeds: [],
      // 全选状态
      checkAll: false,
      // 是否显示menu icon
      isMenu: '',
      // 消息提示
      message: '',
      // 消息提示对应的icon
      icon: '',
      // 筛选出具有版权的shuju,传给播放列表
      legitimateData: [],
      // 收藏信息
      favoritesMsg: null,
      // 收藏是否显示
      favoriteShow: false,
      // 是否显示确认删除框
      isconfirmdel: false
    }
  },
  computed: {
    // 播放歌单id
    songListId () {
      return this.$store.state.music.songListId
    },
    // 当前歌单id
    id () {
      return this.$route.params.id
    },
    // 当前登录用户id
    uid () {
      return this.$store.state.user.id
    },
    // 歌单拥有者id
    userId () {
      return this.$store.state.music.userId
    }
  },
  watch: {
    // 底部选择消失清除数据
    dialogVisible (val) {
      if (!val) {
        this.checkeds = []
        this.checkAll = false
      }
    }
  },
  mounted () {
    // 全选和反全选
    this.$bus.$on('AllSelection', (val) => {
      this.checkAllChange(val)
    })
    // 删除
    this.$bus.$on('deletes', (val) => {
      this.isconfirmdel = true
    })
    // 收藏
    this.$bus.$on('tofavorites', (val) => {
      this.favoriteShow = true
      this.favoritesMsg = val
    })
  },
  methods: {
    // 选择发生变化时，会触发此函数
    handleChange (val) {
      this.checkAll = val.length === this.songs.length
    },
    // 全选的状态
    checkAllChange (val) {
      if (val) {
        this.checkeds = this.songs
        this.checkAll = true
      } else {
        this.checkeds = []
        this.checkAll = false
      }
    },
    // 隐藏menu
    menuShow (index) {
      this.$refs[`popover-${index}`][0].doClose()
    },
    // 播放音乐
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
    // 下一首
    nextPlay (data) {
      this.menuShow(data.index)
      if (!this.isCopyright(data.copyright)) {
        return
      }
      this.$store.dispatch('SET_PLAYLIST', { list: [data], one: true })
    },
    // 收藏
    favorites (data) {
      this.menuShow(data.index)
      this.favoritesMsg = [data]
      this.favoriteShow = true
    },
    // 删除歌曲
    todelete (data) {
      this.isconfirmdel = false
      const ids = []
      let index
      if (data instanceof Array) {
        data.forEach((x) => {
          ids.push(x.id)
        })
      } else {
        ids.push(data.id)
        index = data.index
      }
      addOrdel({
        op: 'del',
        pid: this.id,
        tracks: ids.join(',')
      }).then(() => {
        if (index) {
          this.menuShow(index)
        }
        const filter = this.songs.filter((x) => {
          if (ids.indexOf(x.id) === -1) {
            return true
          }
        })
        filter.map((x, index) => {
          x.index = index
          return true
        })
        // 删除后的数据
        this.$bus.$emit('deleted', filter)
        this.$store.dispatch('SET_PLAYLIST', { list: filter, one: false })
        this.$bus.$emit('close', false)
      })
    },
    // 无版权或者其他信息
    isCopyright (copyright) {
      if (copyright < 0) {
        this.message = '因合作方要求该资源暂时下架'
        this.icon = 'el-icon-circle-close'
        return false
      } else {
        this.message = ''
        this.icon = ''
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 640px) {
  li {
    .time,
    .album {
      display: none;
    }
  }
}
.odd {
  background-color: #f6f6f6;
}
.lists > ul {
  position: relative;
  li:hover {
    background-color: rgb(222, 222, 224);
  }
  li {
    will-change: transform;
    display: flex;
    padding: 0 10px;
    width: 100%;
    height: 48px;
    line-height: 48px;
    position: absolute;
    top: 0;
    left: 0;
    color: #000000;
    .item-child {
      font-size: 13px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-right: 15px;
    }
    .el-checkbox {
      margin-right: 5px;
    }
    .menu {
      width: 45px;
    }
    .name {
      font-size: 14px;
    }
    .album,
    .menu,
    .time,
    .singername {
      color: #939292;
    }

    .name,
    .album {
      flex: 1;
    }
    .singername {
      flex: 0.5;
    }
  }
}
.card {
  position: relative;
  z-index: 9999;
  li {
    margin-right: -12px;
    margin-left: -12px;
    padding: 10px;
    font-size: 13px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  li:hover {
    background-color: rgb(222, 222, 224);
  }
}
.icon {
  font-size: 18px;
  margin-right: 6px;
}
.box-shadow {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
}
.del-dialog {
  .content {
    padding: 30px 20px 20px;
  }
  .title {
    font-size: 16px;
  }
  .dialog-footer {
    padding: 45px 0 0 0;
    display: flex;
    justify-content: flex-end;
    .el-button {
      border: 1px solid rgb(189, 47, 45);
      color: rgb(189, 47, 45);
    }
    .confrim {
      background-color: rgb(189, 47, 45);
      color: #fff;
    }
  }
}
</style>
