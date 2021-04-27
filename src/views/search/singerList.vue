<template>
  <div class="singerList">
    <ul>
      <li v-for="(item, index) in singerData" :key="index">
        <router-link :to="`/singerDetail/${item.id}`">
          <div class="avatar">
            <img :src="`${item.picUrl}?param=50y50`" alt="" />
          </div>
          <div class="name">{{ item.name }}</div>
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
      singerData: []
    }
  },
  watch: {
    keyWord () {
      this.singerData = []
    }
  },
  created () {},
  mounted () {
    this.$bus.$on('search-tab', (value) => {
      if (value === '100' && this.singerData.length === 0) {
        this.getData()
      }
    })
  },
  methods: {
    getData (type = '100') {
      searchMusic({ keywords: this.keyWord, type, limit: 100 }).then((data) => {
        if (data.code === 200) {
          this.singerData = data.result.artists
        }
      })
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
}
</style>
