<template>
  <div>
    <h1>Такай страницы нет на этом ресурсе</h1>
    <my-btn @click="this.$router.push('/')" class="navbar__item">На главную</my-btn>
  </div>
</template>
<script>
export default {
  name: "E404"
}
</script>
<style scoped>
</style>