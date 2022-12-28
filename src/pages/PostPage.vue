<template>
  <div>
    <h1 class="app__h1">Список постов</h1>
    <div class="app__row">
      <my-input
          v-model="searchQuery"
          placeholder="Поиск постов по названию..."
      />
    </div>
    <div class="app__row">
      <my-btn @click="myModal">Создать новый пост</my-btn>

      <my-select
          v-model="selectedSort"
          :options="sortOption"
      />
    </div>

    <my-modal v-model:show="myModalVisible">
      <post-form @create="createPost"/>
    </my-modal>

    <post-list
        :posts="searchPosts"
        @remove="removePost"
        v-if="!isPostsLoading"
    />

    <div v-else>Идет загрузка...</div>

    <div v-intersection="loadMorePost" class="observer">Сейчас добавятся новые посты</div>

    <div class="old">
      <!--TODO: Пагинация -->
      <!--<div class="page__row">-->
      <!--  <div-->
      <!--      v-for="paginationNum in totalPages"-->
      <!--      :key="paginationNum"-->
      <!--      :class="{-->
      <!--        'page__current': page === paginationNum-->
      <!--      }"-->
      <!--      @click="changePage(paginationNum)"-->
      <!--      class="page__pagination"-->
      <!--    {{ paginationNum }}-->
      <!--  </div>-->
      <!--</div>-->
    </div>

  </div>
</template>

<script>

import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import axios from "axios";

export default {
  name: "App",
  components: { PostList, PostForm},
  data(){
    return{
      posts:[],
      myModalVisible: false,
      isPostsLoading: false,
      searchQuery: '',
      selectedSort: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOption: [
        {value: 'title', name: 'По названию' },
        {value: 'body', name: 'По содержимому' },
        {value: 'id', name: 'По id' },
      ]
    }
  },

  methods:{
    createPost(post){
      this.posts.push(post)
      this.myModalVisible = false
    },
    removePost(post){
      this.posts = this.posts.filter(p => p.id !== post.id)
    },

    myModal(){
      this.myModalVisible = true
    },
    // TODO: Изменение номера текущей страницы пагинации
    // changePage(paginationNum){
    //   this.page = paginationNum
    // },
    async fetchPost(){
      try{
        this.isPostsLoading = true
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data
      }
      catch(e){
        alert('Ошибка получения данных с сервера')
      }
      finally{
        this.isPostsLoading = false
      }
    },
    async loadMorePost(){
      try{
        this.page += 1
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data]
      }
      catch(e){
        alert('Ошибка получения данных с сервера')
      }
    },
  },
  mounted(){
    this.fetchPost()
    //TODO: Подгрузка постов
    // const options = {
    //   rootMargin: '0px',
    //   threshold: 1.0
    // }
    // const callback = (entries, observer) =>{
    //   if(entries[0].isIntersecting && this.page < this.totalPages)
    //     this.loadMorePost()
    // }
    // const observer = new IntersectionObserver(callback, options)
    // observer.observe(this.$refs.observer)
  },
  computed: {
    searchPosts(){
      return this.posts.filter(posts => posts.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {
    selectedSort(newValue){
      this.posts.sort((post1, post2) => {
        return newValue !== 'id'
            ? post1[newValue]?.localeCompare(post2[newValue])
            : post1.id - post2.id
      })
    },
    // TODO: Предыдущая версия страницы, следила за изменением параметра page
    // page(){
    //   this.fetchPost()
    // }
  }
}
</script>

<style lang="scss">
.page{

  &__row{
    display: flex;
    justify-content: center;
  }

  &__pagination{
    border: 2px solid seagreen;
    border-radius: 4px;
    padding: 10px;
    margin: 5px;
    cursor: pointer;

    &:hover{
      border: 2px solid rebeccapurple;
    }
  }

  &__current{
    border: 2px dashed rebeccapurple;

    &:hover{
      border: 2px dashed rebeccapurple;
    }
  }
}
.observer{
  height: 30px;
  width: 100%;
  background-color: rebeccapurple;
  text-align: center;
}

</style>