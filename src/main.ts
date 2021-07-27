import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
import router from "./router/index";


const app = createApp(App);
app.use(ElementPlus);
app.use(videoPlayer);
app.use(router).mount("#app");