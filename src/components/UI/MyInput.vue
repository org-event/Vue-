<template>

  <input :value="modelValue" @input="updateInput" class="form__input">
</template>

<script>
export default {
  name: "MyInput",
  props: {
    modelValue: [String, Number]
  },
  methods:{
    updateInput(event){
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>

  .form__input{
    margin-bottom: 20px;
    height: 50px;
    padding: 8px;
    border-radius: 8px;
    border: 1px solid seagreen;
    width: 100%;
  }
</style>