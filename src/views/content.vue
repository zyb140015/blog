<template>
  <div class="listContent">
    <div><img class="img" src="../assets/brabus.png"/></div>
    <div class="list">
      <div @click="goto('/news')">新闻</div>
      <div @click="goto('/well-known')">诗词</div>
      <div @click="goto('/story')">实时段子</div>
      <div><el-button class="font" type="text" @click="open">我的掘金文章</el-button></div>
    </div>
  </div>
  <NavList/>
  <Modal ref='modal'/>
</template>


<script scoped lang="ts">
import { defineComponent,ref } from 'vue'
import NavList from '../components/NavList.vue';
import Modal from '../components/Modal.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name:'content',
  components: {
    NavList,
    Modal,
  },
  setup() {
    const modal:any = ref(null)
    const router = useRouter();
    function goto(url:string){
      router.push(url);
    }
    const open = ()=>{
      modal.value.open();
    }
    return{
      modal,
      goto,  //一定要要放在return里才能在模板上面使用
      open,
    }
  }
})
</script>

<style scoped lang="stylus">
.listContent{
  text-align:center;
  margin-top:100px;
  color:#000;
  font-size:18px;
  font-weight:500
  .img{
    height:300px;
    margin-bottom :20px
  }
  .list{
    div{
      margin-bottom : 20px;
      .font{
        font-size:18px;
        font-weight:500;
        color : #000;
      }
    }
  }
}

</style>