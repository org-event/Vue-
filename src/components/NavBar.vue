<template>
  <div class="navbar">
    <my-btn @click="$router.push('/')" class="navbar__item navbar__logo">Vue 3</my-btn>
    <my-btn @click="this.$router.push('/post-vuex')" class="navbar__item">Посты c Vuex</my-btn>
    <my-btn @click="this.$router.push('/post')" class="navbar__item">Посты</my-btn>
    <my-btn @click="this.$router.push('/about')" class="navbar__item">О приложении</my-btn>
  </div>
</template>
<script>
export default {
  name: "NavBar",
}
</script>

<style lang="scss" scoped>
.navbar{
  height: 64px;
  width: 100%;
  box-shadow: 0 2px 3px #979b91;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 0 10px;
  border-radius: 8px;

  &__item{
    margin: 5px;
    align-self: center;
    display: flex;
  }

  &__logo{
    margin-right: auto;
  }
}
</style>