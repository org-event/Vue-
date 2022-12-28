<template>

  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>

  export default {
    name: "MyBtn"
  }
</script>

<style scoped lang="scss">
.btn{
  background-color: #509A6FFF;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  padding: 10px 20px;
  transition: background-color 0.5s ease;
  width: max-content;

  &:hover{
     background-color: #08361BFF;
  }

  &__reb{
    background-color: rebeccapurple;
  }
}
</style>