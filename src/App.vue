<template>
  <nav-bar/>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";


export default {
  components: {NavBar}

}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body{
  min-width: 360px;
}

h1, h2, h3, h4{
  margin-top: 0;
}

#app{
  margin: auto;
  max-width: 1600px;
  width: 100%;
}

.app{
  padding: 20px 10px 10px;

  &__h1{
    margin-bottom: 20px;
  }

  &__row{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
}
</style>