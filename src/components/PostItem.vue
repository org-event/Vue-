<template>

  <div class="post-elem">
    <div class="post-elem__content">
      <h2>Название: {{post.title }}</h2>
      <p>Описание: {{ post.body }}</p>
      <div>Лаков: {{ $store.state.likes }}</div>
    </div>
    <div class="post-elem__btns">
      <my-btn class="post-elem__child"
          @click="$router.push(`/post/${ post.id }`)"
      >
        Открыть
      </my-btn>

      <my-btn
        @click="$emit('remove', post)"
      >
        Удалить
      </my-btn>

    </div>
  </div>
</template>

<script>

  export default {
    name: "PostItem",

    props:{
      post:{
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped lang="scss">

.post-elem{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  border: 2px solid seagreen;
  margin-bottom: 20px;
  border-radius: 8px;

  &__content{
    padding-right: 10px;
  }

  &__btns{
    display: flex;
    align-items: center;
  }

  &__child{
    margin-right: 5px;
  }
}
</style>