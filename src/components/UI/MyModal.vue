<template>
  <div class="my-modal" v-if="show" @click="hideMyModal">
    <div class="my-modal__content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>

import toggleMixin from "@/mixins/toggleMixin";

export default {
  name: "MyModal",
  mixins: [toggleMixin]

  // TODO: Перенесено в mixin
  // props: {
  //   show: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  // methods:{
  //   hideMyModal(){
  //     this.$emit('update:show', false)
  //   }
  // }
}
</script>

<style scoped lang="scss">
  .my-modal{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .6);
    display: flex;
    align-items: center;
    justify-content: center;

    &__content{
      max-width: 800px;
      width: 100%;
      padding: 20px;
      background-color: white;
      border: 1px solid seagreen;
      border-radius: 20px;
    }
  }
</style>