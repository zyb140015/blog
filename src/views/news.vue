<template>
  <div class="title">网易新闻</div>
  <div class="newContent">
    <div>
      <div v-for="item of state.hits" :key="item.image" class="list" @click="goto(item.path)">
        <div>{{item.title}}</div>
        <img :src="item.image" alt="state.hits"/>
      </div>
    </div>
  </div>
  <div class="next" v-if="state.hits.length" @click="next(state.page)">下一页</div>
  <Goback/>
</template>


<script scoped lang="ts">
import { defineComponent,reactive,onMounted } from 'vue'
import Goback from '../components/Goback.vue';
import { post,get } from '../api/request';

interface Result{
  id:string,
  title:string,
  image:string,
  path:string,
}
interface Type{
  code:number,
  result:Result[]
}
interface State {
  hits:Result[],
  page:number,
  count:number,
}
export default defineComponent({
  name:'News',
  components:{
    Goback
  },
  setup() {
    const state:State = reactive({
      hits: [],
      page:1,
      count:10,
    })
    const getDatat = (num:number)=>{
      get('https://api.apiopen.top/getWangYiNews',{page:num,count:state.count}).then((res:Type|any)=>{
        state.hits = res.result
      })
    }
    onMounted(() => {
      getDatat(1);
    })
    // 跳转
    function goto(url:string){
      window.open(url);
    }
    function next(num:number){
      state.page = num +1;
      getDatat(num+1)
      window.scrollTo(0,0);
    }
    return {
      state,
      goto,
      next,
    }
  }
})
</script>

<style scoped lang="stylus">
  .title{
    text-align:center;
    font-size:30px;
    font-weight:500;
    margin-top:20px
  }
  .newContent{
    margin:40px 0 ;
    display:flex;
    justify-content:center;
    .list{
      display:flex;
      justify-content:center;
      align-items:center;
      margin-bottom :20px;
      border:1px solid #ccc;
      border-radius:10px;
      padding:20px;
      img{
        margin-left:20px;
      }
    }
  }
  .next{
    text-align:center;
  }

</style>