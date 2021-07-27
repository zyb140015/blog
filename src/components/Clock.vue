<template>
  <div class="clock">
    <div class="hour" id='hour' ></div>
    <div class="minute" id='minute'></div>
    <div class="second" id='second'></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Clock',
  mounted(){
  var hour:any = document.getElementById("hour");
  var minute:any = document.getElementById("minute");
  var second:any = document.getElementById("second");
   // 开始定时器
  let s = 0,m = 0, h = 0, ms = 0;
  setInterval(function() {
    // 内容就可以了
    let date = new Date();  // 得到最新的时间
    ms = date.getMilliseconds(); // 现在的毫秒数
    s = date.getSeconds() + ms / 1000;  //  得到秒 1.3 s
    m = date.getMinutes() + s / 60;  //  得到的是分数  45.6分钟
    h = date.getHours() % 12 + m / 60 ;
    //console.log(h);
    //旋转角度
    // 一圈  360 °     一共有 60 秒       每秒  6 °   现在是 s秒
    second.style.WebkitTransform = "rotate("+ s*6 +"deg)";
    //  变化            旋转    deg  度
    minute.style.WebkitTransform = "rotate("+ m*6 +"deg)";
    hour.style.WebkitTransform = "rotate("+ h*30 +"deg)";
    second.style.MozTransform = "rotate("+ s*6 +"deg)";
    //  变化            旋转    deg  度
    minute.style.MozTransform = "rotate("+ m*6 +"deg)";
    hour.style.MozTransform = "rotate("+ h*30 +"deg)";
  },100);
  }
})
  
</script>

<style scoped lang="stylus">
  .clock{
    width: 300px;
    height: 300px;
    margin:50px auto;
    background: url(../assets/clock.jpeg) no-repeat;
    position: relative;
    background-size:cover;
  }
  .clock div {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .hour {
    height: 15px;
    width: 300px;
    background: url(../assets/hour.png) no-repeat center center;
    background-size:contain
  }
  .minute {
    height: 15px;
    width: 300px;
    background: url(../assets/minute.png) no-repeat center center;
    background-size:contain
  }
  .second {
    height: 15px;
    width: 300px;
    background: url(../assets/second.png) no-repeat center center;
    background-size:contain
  }
</style>