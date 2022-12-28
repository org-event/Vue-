<template>

  <div v-if="posts.length > 0" class="list">
    <transition-group name="post-list">
      <post-item
          v-for="post in posts"
          :post="post"
          :key="post.id"
          @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <div v-else class="list">
    <h1>Посты отсутствуют</h1>
  </div>
</template>

<script>
  import PostItem from "@/components/PostItem.vue";
  export default {
    name: "PostList",
    components: {PostItem},
    props:{
      posts:{
        type: Array,
        required: true
      }
    }
  }
</script>

<style scoped lang="scss">
.list{
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

//Vue анимация
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all .5s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
.post-list-move {
  transition: transform .2s ease;
}
</style>