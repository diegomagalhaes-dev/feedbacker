<template>
  <!-- Utilizando o "component is" do vue, podemos determinar a forma de um component de forma "assíncrona". Pois, com ele, o que este component vai ser só é determinado quando instanciamos ele determinamos o valor de "is".  -->
  <component :is="name" v-bind="$props" />
</template>

<script>
import Loading from './Loading.vue';
import Copy from './Copy.vue';
import ChevronDown from './ChevronDown.vue';

export default {
  components: { Loading, Copy, ChevronDown },
  props: {
    name: { type: String, required: true }
  }
};
</script>

<style>
</style>
