import {createStore} from "vuex";
import {postModuleVuex} from "@/store/PostModuleVuex";

export default createStore({
	state: {
		isAuth: false,
	},
	modules:{
		post: postModuleVuex
	}
})