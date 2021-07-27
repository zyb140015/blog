<template>
  <div class="nav-content">
    <div 
      v-for="(nav, index) in navList"
      :key="index"
      :class="{ active: nav.isActive }"
      @click="navClick(nav)"
    > {{ nav.name }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { NavItem } from '../common/types';

export default defineComponent({
  name: 'NavList',
  setup() {
    const router = useRouter();
    const reactiveData = reactive({
      navList: [
        {
          name: '首页',
          isActive: false,
          path: '/'
        },
        {
          name: '内容',
          isActive: false,
          path: '/content'
        },
        {
          name: '联系',
          isActive: false,
          path: '/mine'
        },
      ],

      navClick(e: NavItem) {
        router.push(e.path)
      }
    })
    return {
      ...toRefs(reactiveData)
    }
  }
})
</script>

<style lang="stylus" scoped>
  .nav-content{
    position:absolute;
    right:20px;
    top:10px;
    display:flex;
    div{
      height:60px
      line-height:60px;
      width:150px;
      text-align:center;
      background:rgb(24,28,34);
      color:rgb(223,223,225);
    }
  }
</style>
