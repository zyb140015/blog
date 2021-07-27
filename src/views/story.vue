<template>
  <div class="story">
    <div class="storyContent">
      <div class="img"><img :src="state.data.header"/></div>
      <div>{{state.data.text}}</div>
      <div v-if="state.data.text" class="next" @click="next(state.page)">下一篇</div>
    </div>
  </div>
  <video :src="state.data.video"/>
  <Goback/>
</template>

<script lang="ts">
import { defineComponent,reactive,onMounted } from 'vue'
import Goback from '../components/Goback.vue';
import { get } from '../api/request';
import { videoPlayer } from 'vue-video-player'
export default defineComponent({
  name:'Story',
  components:{
    Goback,
  },
  setup() {
    const state = reactive({
      page:1,
      size:1,
      data:{
        passtime:'',
        text:'',
        type:'',
        video:'',
        header:'',
        images:'',
      },
    })
    onMounted(()=>{
      getData(state.page);
    })
    // 请求
    const getData = (page:number)=>{
      get('https://api.apiopen.top/getJoke',{page,count:state.size,type:'text'}).then((res:any)=>{
        state.data = res.result[0];
      })
    } 
    // 下一页
    const next = (num:number)=>{
      state.page = num+1;
      getData(state.page);
    }
    return {
      state,
      next,
    }
  },
})
</script>


<style lang="stylus" scoped>
  .story{
    display:flex;
    justify-content:center;
    margin-top:200px;
    .storyContent{
      .img{
        text-align:center;
      }
      width:500px
      .next{
        text-align:center;
        margin:20px 0px;
      }
    }
  }
</style>