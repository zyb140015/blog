<template>
  <div class="data">
    <NavList/>
    <div class="content">
        <div class="left">
          <Clock/>
          <div class="name">西南以北</div>
          <div>不慌不忙，心之所向</div>
        </div>
        <div class="right">
          <img src="../assets/bg.jpeg"/>
        </div>
    </div>
  </div>
</template>

<script scoped lang="ts">
import { ref, defineComponent } from 'vue'
import Clock from '../components/Clock.vue';
import NavList from '../components/NavList.vue';
export default defineComponent({
  name:'Home',
  components: {
    Clock,
    NavList,
  }
})
</script>

<style scoped lang="stylus">
.content{
  margin-top:200px;
  color:#666;
  display:flex;
  justify-content:space-around;
  align-items:center;
  .left{
    text-align:center;
    .name{
      font-size:30px;
      font-weight:bold;
      margin-bottom :20px
    }
  }
  .right{
    img{
      height :500px
    }
  }
}
  
</style>