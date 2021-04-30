<template>
  <div class='comment'>
    <div ref="replyTile" class="title">
      评论
    </div>
    <div class="text">
      <el-input ref="textarea" @keydown.enter="sendComment" type="textarea" :rows="3" placeholder="发表评论" maxlength="140" show-word-limit v-model="value">
      </el-input>
      <div class="emoji">
        <el-popover width="306" :visible-arrow="false" placement="right" trigger="click">
          <el-carousel indicator-position="outside" height="140px" :autoplay="false">
            <el-carousel-item v-for="(item,index) in emojis" :key="index">
              <span class="item" v-for="(i, n) in item.emoji" :key="n">{{i}}</span>
            </el-carousel-item>
          </el-carousel>
          <span slot="reference" class="el-icon-picture-outline-round"></span>
        </el-popover>
      </div>
      <div @click="replyComment" v-if="value.indexOf(validValue) === 0 && commentId" class="send">评论</div>
      <div @click="sendComment" v-else class="send">评论</div>
    </div>
    <div class="comment-content">
      <div v-if="hotComments && hotComments.length > 0" class="hot-comment">
        <div class="title">精彩评论</div>
        <ul>
          <li v-for="(item, index) in hotComments" :key="index">
            <div class="avatar"><img :src="item.user.avatarUrl" alt=""></div>
            <div class="right">
              <span class="name">{{item.user.nickname}}：</span>
              <span class="content">
                <span class="one">
                  <span v-if="item.beReplied && item.beReplied.length > 0">回复@{{item.beReplied[0].user.nickname}}</span>
                  <span> {{item.content}}</span>
                </span>
                <div v-if="item.beReplied && item.beReplied.length > 0" class="two">
                  {{`@${item.beReplied[0].user.nickname}：${item.beReplied[0].content}`}}
                </div>
              </span>
              <div class="footer">
                <span class="time">{{item.time | commentTime}}</span>
                <span class="footer-right">
                  <span @click="addLike(item.commentId, item.liked, index, 'hot')">
                    <i :class="['el-icon-lightning', { liked: item.liked}]"></i>
                    <span v-if="item.likedCount">({{item.likedCount}})</span>
                  </span>
                  <span @click="reply({commentId: item.commentId, uname: item.user.nickname})">回复</span>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="new-comment">
        <div ref="newTitle" class="title">最新评论</div>
        <ul>
          <li v-for="(item, index) in comments" :key="index">
            <div class="avatar"><img :src="item.user.avatarUrl" alt=""></div>
            <div class="right">
              <span class="name">{{item.user.nickname}}：</span>
              <span class="content">
                <span>
                  <span  v-if="item.beReplied && item.beReplied.length > 0">回复@{{item.beReplied[0].user.nickname}}</span>
                  <span> {{item.content}}</span>
                </span>
                <div  v-if="item.beReplied && item.beReplied.length > 0" class="two">
                  {{`@${item.beReplied[0].user.nickname}：${item.beReplied[0].content}`}}
                </div>
              </span>
              <div class="footer">
                <span class="time">{{item.time | commentTime}}</span>
                <span class="footer-right">
                  <span>
                    <i @click="addLike(item.commentId, item.liked, index, 'new')" :class="['el-icon-lightning', { liked: item.liked}]"></i>
                    <span v-if="item.likedCount">({{item.likedCount}})</span>
                  </span>
                  <span @click="reply({commentId: item.commentId, uname: item.user.nickname})">回复</span>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <el-pagination :current-page.sync ="page" background :page-size="pageSize" layout="prev, pager, next" :total="total" @current-change="toPagination" :pager-count="9">
    </el-pagination>
  </div>
</template>

<script>
import { getComment, sendOrdelComment, addOrDelLike } from '@/api/music'
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      value: '',
      validValue: 1,
      emoji: [
        '😀',
        '😃',
        '😄',
        '😁',
        '😆',
        '😅',
        '🤣',
        '😂',
        '🙂',
        '🙃',
        '😉',
        '😊',
        '😇',
        '🥰',
        '😍',
        '🤩',
        '😘',
        '😗',
        '😚',
        '😙',
        '😋',
        '😛',
        '😜',
        '🤪',
        '😝',
        '🤑',
        '🤗',
        '🤭',
        '🤫',
        '🤔',
        '🤐',
        '🤨',
        '😐',
        '😑',
        '😶',
        '😏',
        '😒',
        '🙄',
        '😬',
        '🤥',
        '😌',
        '😔',
        '😪',
        '🤤',
        '😴',
        '😷',
        '🤒',
        '🤕',
        '🤢',
        '🤮',
        '🤧',
        '🥵',
        '🥶',
        '🥴',
        '😵',
        '🤯',
        '❤️',
        '🧡',
        '💔',
        '🤍',
        '💯',
        '💢',
        '💥',
        '💫',
        '💦',
        '💨',
        '🕳️',
        '💣',
        '💬',
        '👁️‍🗨️',
        '🗨️',
        '🗯️',
        '💭',
        '💤'
      ],
      // 最新评论
      comments: [],
      // 精彩评论
      hotComments: [],
      pageSize: 10,
      total: 0,
      title: null,
      replyTile: null,
      // 回复的id
      commentId: '',
      // t 0 取消点赞 1点赞
      t: 1,
      page: 1
    }
  },
  computed: {
    emojis () {
      let index = 0
      const arr = []
      let page = 0
      let e = this.emoji.slice(index, index + 32)
      while (e.length > 0) {
        arr[page] = {
          page,
          emoji: e
        }
        index += 32
        page += 1
        e = this.emoji.slice(index, index + 32)
      }
      return arr
    }
  },
  watch: {
    id () {
      this.getData()
      this.validValue = 1
      this.value = ''
      this.t = 1
      this.commentId = ''
      this.page = 1
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    this.title = this.$refs.newTitle
    this.replyTile = this.$refs.replyTile
  },
  methods: {
    getData () {
      getComment({ id: this.id, limit: 10, timestamp: Date.now() }).then(
        (data) => {
          this.comments = data.comments
          this.hotComments = data.hotComments || []
          this.total = data.total
        }
      )
    },
    toPagination (value) {
      getComment({
        id: this.id,
        timestamp: Date.now(),
        limit: 10,
        offset: 10 * (value - 1)
      }).then((data) => {
        this.hotComments = []
        this.comments = data.comments
        this.$nextTick(() => {
          this.title.scrollIntoView(true, {
            behavior: 'smooth',
            block: 'start'
          })
        })
      })
    },
    // 发送评论
    sendComment () {
      if (!this.value.trim()) {
        return
      }
      sendOrdelComment({
        t: 1,
        type: 1,
        id: this.id,
        content: this.value
      })
        .then((res) => {
          if (res.code === 200) {
            this.comments.unshift(res.comment)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    reply (data) {
      if (!data) {
        return
      }
      this.commentId = data.commentId
      this.value = `回复${data.uname}：`
      this.validValue = this.value
      this.replyTile.scrollIntoView(true, {
        behavior: 'smooth',
        block: 'start'
      })
      this.$refs.textarea.focus()
    },
    // 回复评论
    replyComment () {
      sendOrdelComment({
        t: 2,
        type: 1,
        id: this.id,
        content: this.value,
        commentId: this.commentId
      }).then((res) => {
        this.value = ''
        this.commentId = ''
        this.validValue = 1
        if (res.code === 200) {
          this.getData()
        }
      }).catch(err => {
        console.log(err)
        this.value = ''
        this.commentId = ''
        this.validValue = 1
      })
    },
    // 点赞或者取消点赞
    addLike (id, liked, index, type) {
      let t
      if (liked) {
        t = 0
      } else {
        t = 1
      }
      addOrDelLike({
        id: this.id,
        cid: id,
        t,
        type: 1
      }).then(res => {
        if (res.code === 200) {
          if (type === 'hot') {
            this.hotComments[index].liked = !this.hotComments[index].liked
          } else if (type === 'new') {
            this.hotComments[index].liked = !this.comments[index].liked
          }
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.comment {
  margin-top: 20px;
}
.text {
  width: 100%;
  padding: 10px;
  background-color: rgb(236, 236, 236);
  position: relative;
  .send {
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 13px;
    padding: 5px 10px;
    background-color: #fff;
    cursor: pointer;
    border-radius: 4px;
  }
}
.emoji {
  font-size: 22px;
  margin-top: 10px;
}
.item {
  display: inline-block;
  width: 35px;
  height: 35px;
  font-size: 23px;
  text-align: center;
  cursor: pointer;
}
.comment-content {
  .title {
    padding: 20px 0 10px;
    border-bottom: 1px solid #cecece;
    margin-bottom: 10px;
  }
  li {
    display: flex;
    width: 100%;
    margin-bottom: 20px;
    border-bottom: 1px solid #ececec;
    padding-bottom: 10px;
    .right {
      flex: 1;
    }
    .avatar {
      margin-right: 10px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .name {
      color: #477aac;
      font-size: 14px;
    }
    .content {
      white-space: pre-line;
      font-size: 14px;
      line-height: 30px;
      .two {
        padding: 5px;
        background-color: #efeff2;
      }
    }
    .footer {
      margin-top: 4px;
      display: flex;
      justify-content: space-between;
    }
    .time {
      font-size: 13px;
      color: #929292;
    }
    .footer-right {
      .liked {
        color: red;
      }
      span {
        padding: 0 10px;
        font-size: 13px;
        color: #929292;
        border-right: 1px solid #d8d8d8;
        cursor: pointer;
      }
      span:last-child {
        border: none;
      }
    }
  }
}
.el-pagination {
  display: flex;
  justify-content: center;
  padding: 0 0 20px;
}
</style>
