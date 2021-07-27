<template>
  <div class="goback" @click="goback">返回</div>
</template>
<script scoped lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name:'GoBack',
  setup() {
    const goback = ()=>{
      window.history.back();
    }
    return {
    goback
    }
  }
})

</script>
<style scoped lang="stylus">
.goback{
  position:fixed;
  right:20px;
  top:100px;
  height:50px;
  line-height:50px;
  width:50px;
  background:rgba(111,111,111,1);
  border-radius:50%;
  color:#fff;
  text-align:center;
}
</style>