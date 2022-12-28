import axios from "axios";
export const postModuleVuex = {
	state: () => ({
		posts:[],
		isPostsLoading: false,
		searchQuery: '',
		selectedSort: '',
		page: 1,
		limit: 10,
		totalPages: 0,
		sortOption: [
			{value: 'title', name: 'По названию' },
			{value: 'body', name: 'По содержимому' },
			// {value: 'id', name: 'По id' },
		]
	}),

	getters: {
		// selectedSort(state, newValue){
		// 	state.posts.sort((post1, post2) => {
		// 		return newValue !== 'id'
		// 			? post1[newValue]?.localeCompare(post2[newValue])
		// 			: post1.id - post2.id
		// 	})
		// },
		// searchPosts(state){
		// 	return 2
		// 	//return state.posts.filter(posts => posts.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
		// },

		selectedSort(state) {
			// return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
			return state.posts
		},
		searchPosts(state, getters) {
			// return getters.selectedSort.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
			return state.posts

		}

	},

	mutations: {
		setPosts(state, posts) {
			state.posts = posts;
		},
		setLoading(state, bool) {
			state.isPostsLoading = bool
		},
		setPage(state, page) {
			state.page = page
		},
		setTotalPages(state, totalPages) {
			state.totalPages = totalPages
		},
		setSearchQuery(state, searchQuery) {
			state.searchQuery = searchQuery
		},
		setSelectedSort(state, selectedSort) {
			state.selectedSort = selectedSort
		},
	},

	actions: {
		async fetchPost({state, commit}){
			try{
				commit('setLoading', true)
				//this.isPostsLoading = true
				const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
					params: {
						_page: state.page,
						_limit: state.limit
					}
				})
				commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
				//this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
				commit('setPosts', response.data)
				//this.posts = response.data
			}
			catch(e){
				console.log('Ошибка получения данных с сервера :' + e )
			}
			finally{
				commit('setLoading', false)
				//this.isPostsLoading = false
			}
		},
		async loadMorePost({state, commit}){
			try{
				commit('setPosts', state.page + 1)
				//this.page += 1
				const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
					params: {
						_page: state.page,
						_limit: state.limit
					}
				})
				commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
				//this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
				commit('setPosts', [...state.posts, ...response.data])
				//this.posts = [...this.posts, ...response.data]
			}
			catch(e){
				console.log('Ошибка получения данных с сервера :' + e )
			}
		},
	},
	namespaced: true
}