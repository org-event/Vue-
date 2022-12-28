import {createRouter, createWebHistory} from "vue-router";
import PostPage from "@/pages/PostPage.vue";
import Main from "@/pages/Main.vue";
import About from "@/pages/About.vue";
import DetailPost from "@/components/DetailPost.vue";
import PostPageVuex from "@/pages/PostPageVuex.vue";
import E404 from "@/pages/E404.vue";

const routes = [
	{ path: '/', component: Main },
	{ path: '/post', component: PostPage },
	{ path: '/post/:id', component: DetailPost },
	{ path: '/about', component: About },
	{ path: '/post-vuex', component: PostPageVuex },
	{ path: '/:catchAll(.*)', component: E404 }
]

const router = createRouter({
	routes,
	history: createWebHistory()
})

export default router