<template>
  <div class="singerList">
    <ul>
      <li v-for="(item, index) in ablumData" :key="index">
        <router-link :to="`/albumDetail/${item.id}`">
          <div class="avatar">
            <img :src="`${item.picUrl}?param=50y50`" alt="" />
          </div>
          <div class="name">{{ item.name }}</div>
          <div class="singername">{{item.artist.name}}</div>
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
      ablumData: []
    }
  },
  watch: {
    keyWord () {
      this.ablumData = []
    }
  },
  created () {},
  mounted () {
    this.$bus.$on('search-tab', (value) => {
      if (value === '10' && this.ablumData.length === 0) {
        this.getData()
      }
    })
  },
  methods: {
    getData (type = '10') {
      searchMusic({ keywords: this.keyWord, type, limit: 100 }).then((data) => {
        console.log(data)
        if (data.code === 200) {
          this.ablumData = data.result.albums
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
  justify-content: space-between;
  padding: 10px 10px;
  cursor: pointer;
  .avatar {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  .name {
      flex: 1;
  }
  .singername {
      flex: 0.4;
      font-size: 13px;
      color: rgb(141, 141, 141);
  }
}
</style>
