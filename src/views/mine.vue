<template>
  <NavList/>
  <div class="mine-content">
    <div class="content_Box">
      <div><img src="../assets/man.jpeg"/></div>
      <div class="user">
        <p>西南以北</p>
        <p>WeChat:568272239</p>
        <p>Tel:15708422834</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavList from '../components/NavList.vue';
export default defineComponent({
  name:'Mine',
  components: {
    NavList,
  }
})
</script>

<style scoped lang="stylus">
  .mine-content{
    margin-top 200px;
    .content_Box{
      display flex;
      justify-content:center;
      img{
        height 200px;
        min-width:200px;
        width auto;
        margin-right 10px
      }
      .user{
        p{
          margin-top:30px;
          margin-left:20px;
        }
      }
    }
  }
</style>  