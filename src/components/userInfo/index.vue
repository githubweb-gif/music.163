<template>
  <div class="userInfo">
    <h4 class="title">{{ title }}</h4>
    <div class="info">
      <div class="avatr">
        <img :src="`${userInfo.avatarUrl}?param=180y180`" alt="" />
      </div>
      <div class="info-right">
        <h4 class="name">
          <span>{{ userInfo.nickname }}</span>
          <span
            :class="[
              'gender',
              userInfo.gender === 2
                ? 'el-icon-female'
                : userInfo.gender === 1
                ? 'el-icon-male'
                : '',
            ]"
          ></span>
          <span class="level">lv{{ userInfo.level }}</span>
          <div class="auth">
            <span class="icon el-icon-s-opportunity"></span>
            <span>{{ userInfo.mainAuthType.desc }}</span>
          </div>
        </h4>
        <div class="list">
          <span>个人介绍：</span>
          <span class="signature">{{ userInfo.signature || "暂无介绍" }}</span>
        </div>
        <!-- <div class="list">
          <span>社交网络：</span>
          <span>12313</span>
        </div>
        <div class="list">
          <span>所在地区：</span>
          <span>123123</span>
        </div> -->
      </div>
    </div>
    <div class="songlist">
      <h4>歌单(2)，共被收藏2次</h4>
      <div class="items">
        <div v-for="item in 10" :key="item" class="item">
          <img :src="`${userInfo.avatarUrl}?param=180y180`" alt="" />
        </div>
      </div>
    </div>
    <div class="favorites">
      <h4>收藏的歌单(1)</h4>
      <div class="items">
        <div v-for="item in 10" :key="item" class="item">
          <img :src="`${userInfo.avatarUrl}?param=180y180`" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { uerDetail } from '@/api/user'
export default {
  data () {
    return {
      userInfo: {
        nickname: '',
        level: 0,
        signature: '',
        avatarUrl: '',
        gender: 0,
        mainAuthType: null
      },
      // 记录请求次数
      n: 0
    }
  },
  computed: {
    title () {
      return this.$route.meta.title || '个人主页'
    },
    id () {
      return this.$route.params.id || ''
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.getuerInfo()
    },
    // 用户详情
    getuerInfo () {
      uerDetail({ uid: this.id }).then((data) => {
        this.n++
        this.userInfo.level = data.level
        for (const i in this.userInfo) {
          if (data.profile[i]) {
            this.userInfo[i] = data.profile[i]
          }
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@media only screen and (max-width: 1350px) {
  .item {
    width: 14% !important;
  }
}
@media only screen and (max-width: 1200px) {
  .item {
    width: 16% !important;
  }
}
@media only screen and (max-width: 1100px) {
  .item {
    width: 20% !important;
  }
}
@media only screen and (max-width: 800px) {
  .item {
    width: 25% !important;
  }
}
@media only screen and (max-width: 700px) {
  .item {
    width: 33% !important;
  }
}
.userInfo {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
h4.title {
  font-size: 13px;
  color: #666666;
  padding-bottom: 20px;
}
.info {
  display: flex;
  margin-bottom: 20px;
  .avatr {
    margin-right: 20px;
    width: 15%;
    min-width: 150px;
    img {
      width: 100%;
    }
  }
  .info-right {
    width: 70%;
    .name {
      font-size: 20px;
      padding-bottom: 20px;
      border-bottom: 0.5px solid rgb(207, 207, 207);
      margin-bottom: 20px;
      .gender {
        margin-left: 10px;
        margin-right: 4px;
      }
      .level,
      .gender {
        font-size: 13px;
      }
      .auth {
        margin-top: 10px;
        font-size: 13px;
        .icon {
          color: rgb(194, 12, 12);
        }
      }
    }
    .list {
      font-size: 13px;
      margin-bottom: 15px;
      span.signature {
        color: rgb(182, 182, 182);
        line-height: 20px;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }
  }
}
.songlist,
.favorites {
  h4 {
    font-size: 13px;
    color: #666666;
    padding-bottom: 8px;
    border-bottom: 1px solid #666;
    margin-bottom: 20px;
  }
  .items {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 180px;
      padding-right: 10px;
      img {
        width: 100%;
      }
    }
  }
}
</style>
