<template>
  <router-view/> 
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Home from '@/views/home.vue';

export default defineComponent({
  name: 'App',
  components: {
    Home
  }
})
</script>