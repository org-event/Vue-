<template>

  <form class="form" @submit.prevent>
    <h2 class="form__title">Создать пост</h2>
    <MyInput
        v-focus
        v-model="post.title"
        class="form__input"
        type="text"
        placeholder="Название нового поста"
    />
    <MyInput
        v-model="post.body"
        class="form__input"
        type="text"
        placeholder="Описание нового поста"
    />

    <My-btn class="btn__reb" @click="createPost">Добавить</My-btn>
  </form>
</template>

<script>

  export default {
    name: "PostForm",
    data(){
      return {
        post:{
          title: '',
          body: ''
        }
      }
    },

    methods:{
      createPost(){
        this.post.id = Date.now()
        this.$emit('create', this.post)
        this.post = {
          title: '',
          body: ''
        }
      },
    }
  }
</script>

<style scoped lang="scss">

.form{
  margin: 20px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;

  &__title{
     margin-bottom: 20px;
  }
}
</style>