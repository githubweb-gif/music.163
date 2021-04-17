<template>
  <div class="songlistDetail-header">
    <div class="title">歌单</div>
    <div class="content">
      <div class="left">
        <img :src="coverImgUrl" alt="">
      </div>
      <div class="right">
        <div class="name">{{ name }}</div>
        <div class="creator">
          <span class="avatarUrl"><img :src="creator.avatarUrl" alt=""></span>
          <span class="nickname">{{ creator.nickname }}</span>
          <span class="create-time">{{ createTime | filterTime }}</span>
          <span>创建</span>
        </div>
        <div class="mg">
          <span class="download-all">
            <i class="el-icon-plus" />
            <span>下载全部</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    filterTime (value) {
      const date = new Date(Number(value))
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let dd = date.getDate()
      dd = dd < 10 ? '0' + dd : dd
      return `${year}-${month}-${dd}`
    }
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    coverImgUrl: {
      type: String,
      default: ''
    },
    createTime: {
      type: String,
      default: ''
    },
    creator: {
      type: Object,
      default: null
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.songlistDetail-header {
  margin: -15px -20px;
  padding: 15px 20px;
  background-size: cover;
  position: relative;
  .title {
    font-size: 12px;
    color: #666666;
    margin-bottom: 20px;
  }
  .content {
    display: flex;
    .left {
      img {
        width: 150px;
        height: 150px;
      }
    }
    .right {
      margin-left: 20px;
      font-size: 13px;
      color: #666666;
      .name {
        font-size: 16px;
        color: #000;
        margin-bottom: 10px;
      }
      .creator {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        .avatarUrl {
          margin-right: 15px;
          img {
            width: 35px;
            height: 35px;
            border-radius: 50%;
          }
        }
        .nickname {
          margin-right: 15px;
        }
        .create-time {
          margin-right: 5px;
        }
      }
      .mg > span {
        padding: 4px;
        border: 1px solid #666666;
        font-size: 1px;
        cursor: pointer;
      }
    }
  }
}
</style>
