<template>
  <div class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800">Entre na sua conta</h1>
    <button class="text-4xl text-gray-600 focus:outline-none">&times;</button>
  </div>
  <div class="mt-16"></div>
</template>

<script>
import { reactive } from 'vue';
import useModal from '../../hooks/useModal';

export default {
  setup() {
    const modal = useModal();
    const state = reactive({
      // o modal de login é um modal de requisição, por isso precisamos de uma propridade que verificar se há erros
      hasError: false,
      isLoading: false,
      email: {
        value: '',
        errorMessage: ''
      },
      password: {
        value: '',
        errorMessage: ''
      }
    });

    function handleSubmite{

    }
    return {
      state,
      close: modal.close
    };
  }
};
</script>

<style>
</style>
