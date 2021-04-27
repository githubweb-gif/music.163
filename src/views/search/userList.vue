<template>
  <div class="singerList">
    <ul>
      <li v-for="(item, index) in userData" :key="index">
        <router-link :to="`/singerDetail/${item.id}`">
          <div class="avatar">
            <img :src="`${item.avatarUrl}?param=50y50`" alt="" />
          </div>
          <div class="name">{{ item.nickname }}</div>
          <div class="gender">
              <span :class="setClass(item.gender)"></span>
          </div>
          <div v-if="item.signature" class="signature">
              <span>{{item.signature}}</span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { searchMusic } from '@/api/search'
export default {
  props: {
    keyWord: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      userData: []
    }
  },
  watch: {
    keyWord () {
      this.userData = []
    }
  },
  created () {},
  mounted () {
    this.$bus.$on('search-tab', (value) => {
      if (value === '1002' && this.userData.length === 0) {
        this.getData()
      }
    })
  },
  methods: {
    getData (type = '1002') {
      searchMusic({ keywords: this.keyWord, type, limit: 100 }).then((data) => {
        console.log(data)
        if (data.code === 200) {
          this.userData = data.result.userprofiles
        }
      })
    },
    setClass (gender) {
      // 中性
      if (gender === 0) {
        return ''
      } else if (gender === 1) {
        // 男性
        return 'el-icon-male'
      } else {
        return 'el-icon-female'
      }
    }
  }
}
</script>
<style lang='scss' scoped>
li:nth-child(odd) {
  background-color: rgb(243, 243, 243);
}
li a {
  display: flex;
  align-items: center;
  padding: 10px 10px;
  cursor: pointer;
  .avatar {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  .signature {
      flex: 1;
      text-align: right;
      span {
          font-size: 13px;
          color: rgb(153, 153, 153);
          display: inline-block;
          padding: 10px;
          background-color: #fff;
          border-radius: 5px;
          border: 1px solid rgb(179, 179, 179);
          position: relative;
      }
      span::before {
          content: '';
          display: block;
          position: absolute;
          top: 50%;
          left: 0;
          z-index: 100;
          transform: translate(-99%, -50%);
          border: 7px solid rgb(255, 255, 255);
          border-color: transparent rgb(255, 255, 255) transparent transparent;
      }
            span::after {
          content: '';
          display: block;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translate(-108%, -50%);
          border: 7px solid rgb(255, 255, 255);
          border-color: transparent rgb(179, 179, 179) transparent transparent;
      }
  }
}
</style>
