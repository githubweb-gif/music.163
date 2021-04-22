<template>
  <div class="songlistDetail-header">
    <div class="title">歌单</div>
    <div class="content">
      <div class="left">
        <img :src="coverImgUrl" alt="">
      </div>
      <div class="right">
        <div class="name">{{ name }}</div>
          <slot name="creator"></slot>
        <div class="mg">
          <span class="download-all">
            <i class="el-icon-plus" />
            <span>下载全部</span>
          </span>
        </div>
        <div class="description">
          <p>{{description}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    },
    description: {
      type: String,
      default: ''
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
        width: 120px;
        height: 120px;
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
      .description p {
        margin-top: 15px;
        line-height: 1.3;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
