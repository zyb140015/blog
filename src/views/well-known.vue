<template>
  <div class="wellKnown">
    <div class="center" v-if="state.obj.title">
      <h1>诗词推荐</h1>
      <div class="mb10 title">{{ state.obj.title}}</div>
      <div class="mb10">{{ state.obj.writer}}--{{ state.obj.dynasty }}</div>
      <div class="content">
        <p v-for='item of state.obj.data' :key='item'>
          {{item}}
        </p>
      </div>
      <div class="mb10 left">类型:<div class="mb10">{{state.obj.type}}</div></div>
      <div class="mb10 left">翻译:<div class="mb10">{{state.obj.translation}}</div></div>
      <div class="mb10 left">简单介绍:<div class="mb10">{{ state.obj.simpleIntro }}</div></div>
      <div class="mb10 left">详细介绍:
      <div v-for="item of state.obj.detailIntroData" :key="item">
        {{item}}
      </div>
    </div>
      <div class="mb10 left">鉴赏:<div class="mb10">{{ state.obj.appreciation }}</div></div>
      <div class="mb10 left">评论:
        <div class="mb10">{{ state.obj.remark }}</div>
      </div>
      <div class="next" @click="next(state.page)">下一页</div>
    </div>
  </div>
  <Goback/>
</template>


<script scoped lang="ts">
import { defineComponent,reactive,onMounted } from 'vue'
import Goback from '../components/Goback.vue';
import { get } from '../api/request';

interface Type{
  code:number,
  result:Result[]
}
interface Result{
  appreciation:string,
  content:string,
  detailIntro:string,
  dynasty:string,
  remark:string,
  simpleIntro:string,
  title:string,
  translation:string,
  type:string,
  writer:string,
  data:[],
  detailIntroData:[],
  appreciationData:[],
}
interface StateType{
  obj:Result,
  page:number,
  count:number,
}

export default defineComponent({
  name:'WellKnown',
  components:{
    Goback
  },
  setup() {
    const state:StateType = reactive({
      obj:{
        appreciation:'',
        content:'',
        detailIntro:'',
        dynasty:'',
        remark:'',
        simpleIntro:'',
        title:'',
        translation:'',
        type:'',
        writer:'',
        data:[],
        detailIntroData:[],
        appreciationData:[]
      },
      page:1,
      count:1
    })
    const getDatat = (num:number)=>{
      get('http://poetry.apiopen.top/poetryFull',{page:num,count:state.count}).then((res:Type|any)=>{
        state.obj = transformStringLineBreak(res.result[0]);
      })
    }
    onMounted(() => {
      getDatat(state.page);
    })
    // 下一页
    const next = (num:number)=>{
      state.page = num +1;
      getDatat(num+1);
      window.scrollTo(0,0);
    }
    // 处理后台\n换行
    const transformStringLineBreak =(str:Result|any)=> {
      if (!str) {
        return []
      }
      // 内容
      str.data = changeData(/\n/g,str.content)
      // 翻译
      str.detailIntroData = changeData(/\\n/g,str.content)
      // 鉴赏
      str.appreciationData = changeData(/\n\n/g,str.appreciation)
      return str
    }
    // 把方法提出来
    const changeData = (type:any,data:any)=>{
      let arr = data.split(type);
      if (!arr[arr.length - 1]) { // 如果以换行符结尾，arr的最后一项为''，此时需删除数组最后一项空字符串
        arr.pop()
      }
      return arr;
    }
    return {
      state,
      next
    }
  }
})
</script>

<style scoped lang="stylus">
  .wellKnown{
    text-align:center;
    display:flex;
    justify-content:center;
    .center{
      width:500px;
      .title{
        font-size:20px;
        font-weight:bold;
      }
      .mb10{
        margin-bottom:10px;
      }
      .content{
        text-align:left;
        font-weight:500;
      }
      .left{
        text-align:left;
      }
      .next{
        margin-top:50px;
        margin-bottom:50px;
      }
    }
  }

</style>