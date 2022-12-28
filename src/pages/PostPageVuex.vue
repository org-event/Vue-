<template>
  <div>
    <div class="app__row">
      <h2>Авторизация: {{ $store.state.isAuth ? 'Вы авторизованы' : 'Вы не авторизованы' }}</h2>

      <my-btn
          @click="$store.commit('auth')"
      >{{ $store.state.isAuth ? 'Выход' : 'Вход' }}</my-btn>
    </div>

    <div class="app__row">
      <h2>Лайков = {{ $store.state.likes }}</h2>
      <div>
        <my-btn
            @click="$store.commit('addLike')"
        >Add Like
        </my-btn>

        <my-btn
            @click="$store.commit('deleteLike')"
            class="btn__reb"
        >Delete Like
        </my-btn>
      </div>
    </div>

    <h1 class="app__h1">Страница постов с использованием Vuex</h1>
    <!--<div class="app__row">-->
    <!--  <my-input-->
    <!--      v-model="searchQuery"-->
    <!--      placeholder="Поиск постов по названию..."-->
    <!--  />-->
    <!--</div>-->
    <div class="app__row">
      <my-btn @click="myModal">Создать новый пост</my-btn>

      <!--<my-select-->
      <!--    v-model="selectedSort"-->
      <!--    :options="sortOption"-->
      <!--/>-->
    </div>

    <!--<my-modal v-model:show="myModalVisible">-->
    <!--  <post-form @create="createPost"/>-->
    <!--</my-modal>-->

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
import {mapState, mapGetters, mapActions, mapMutations} from "vuex";

export default {
  name: "App",
  components: { PostList, PostForm },
  data(){
    return{
      myModalVisible: false,
    }
  },

  methods:{
    ...mapMutations({
      setPage: 'posts/setPage'
    }),
    ...mapActions({
      fetchPost: 'posts/fetchPost',
      loadMorePost: 'posts/loadMorePost'
    }),
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
  },
  mounted(){
    //Рабочий вариант вывода
    //console.log(this.$store.state.posts)
  },

  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions
    }),

    ...mapGetters({
      searchPosts: 'posts/searchPosts',
      // selectedSort: 'posts/selectedSort'
    }),
  },

  watch: {

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