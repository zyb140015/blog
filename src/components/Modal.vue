<template>
  <el-dialog
    title='提示'
    v-model='state.visible'
    width="400px"
  >
  抱歉，暂时还未发布文章，后续补上，暂时跳转到掘金，查看更多优质文章
  <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent,reactive } from 'vue'

export default defineComponent({
  name:"Modal",
  setup() {
    const state = reactive({
      visible:false
    })
    const submitForm = ()=>{
      window.location.href='https://juejin.cn/';
    }
    const open = ()=>{
      state.visible = true;
    }
    return {
      state,
      submitForm,
      open,
    }
  },
})
</script>
<style lang="stylus" scoped>

</style>
