import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'
import Home from '@/views/home.vue'
import Content from "@/views/content.vue";
import Mine from '@/Views/mine.vue'
import News from "@/Views/news.vue";
import Story from "@/Views/story.vue";
import WellKnown from "@/Views/well-known.vue";



const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/content",
    name: "Content",
    component: Content,
  },
  {
    path: "/news",
    name: "News",
    component: News,
  },
  {
    path: "/well-known",
    name: "WellKnown",
    component: WellKnown,
  },
  {
    path: "/mine",
    name: "mine",
    component: Mine,
  },
  {
    path: "/story",
    name: "Story",
    component: Story,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

