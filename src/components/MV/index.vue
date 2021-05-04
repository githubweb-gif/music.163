<template>
  <div class='mv'>
    <div class="head">
      <div class="name">网易云音乐</div>
    </div>
    <main>
      <div class="main-container">
        <div class="left">
          <div class="title">《{{name}}》</div>
          <div class="video">
            <video controls :src="url"></video>
          </div>
          <side-component class="right" :isShow="false" width="100%" :detail="detail"></side-component>
          <comment :type="1" :id="id.toString()"></comment>
        </div>
        <side-component  class="mid" :isShow="true" width="350px" :detail="detail"></side-component>
      </div>
    </main>
  </div>
</template>

<script>
import { mvUrl, mvDetail } from '@/api/music'
import comment from '../comment.vue'
import side from './side.vue'
export default {
  components: {
    sideComponent: side,
    comment
  },
  data () {
    return {
      url: '',
      name: '',
      detail: {
        desc: '',
        publishTime: ''
      }
    }
  },
  computed: {
    id () {
      return this.$route.params.id || ''
    }
  },
  created () {
    this.getData()
  },
  watch: {
    id () {
      this.getData()
    }
  },
  methods: {
    getData () {
      // url地址
      mvUrl({ id: this.id }).then((res) => {
        this.url = res.data.url
      })
      // mv详情
      mvDetail({ mvid: this.id }).then((res) => {
        this.detail.desc = res.data.desc
        this.detail.publishTime = res.data.publishTime
        this.name = res.data.name
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@media only screen and (max-width: 1100px) {
  .right {
    display: block;
  }
  .mid {
    display: none;
  }
}
@media only screen and (min-width: 1100px) {
  .right {
    display: none;
  }
  .mid {
    display: block;
  }
}

.head {
  display: flex;
  align-items: stretch;
  color: #ffffff;
  background-color: #c20c0c;
  height: 30px;
  .name {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    margin-left: 10px;
  }
}

.mv {
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

main {
  flex: 1;
  overflow-y: auto;
}

.main-container {
  max-width: 90%;
  margin: 0 auto;
  display: flex;
}

.left {
  flex: 1;
  margin-right: 20px;
  .title {
    height: 40px;
    line-height: 40px;
  }
  .video {
    video {
      width: 100%;
    }
  }
}
</style>
