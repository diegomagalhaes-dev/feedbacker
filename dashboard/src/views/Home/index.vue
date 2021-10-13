<template>
  <!-- O '@' serve para declararmos eventos. Nesse caso, como estamos utilizando o component 'custom-header', os eventos vão ser disparados nele  -->
  <custom-header @create-accound="handleAccountCreate" @login="handleLogin" />
  <contact />
  <div class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-center text-gray-800">feedbacker e 2021</p>
  </div>
</template>
<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CustomHeader from './CustomHeader.vue';
import Contact from './Contact.vue';
export default {
  components: { CustomHeader, Contact },
  // O método Setup é o "core" da aplicação construída com a Composition API. Nela, declaramos métodos e definimos valores que podem ficar expostos para o nosso template.
  setup() {
    const router = useRouter();
    // onMounted: 'quando o component for montado, vamo tomar uma determinada ação'
    onMounted(() => {
      // traduzindo: quando o component estiver sendo montado, vou tentar recuperar o Token no Local Storage, para saber se o usuário terá permissão de acessar a tela
      const token = window.localStorage.getItem('token');
      // Caso tenha o Token, mando o usuário para a tela de Feedbacks
      if (token) {
        router.push({ name: 'Feedbacks' });
      }
    });

    function handleLogin() {}

    function handleAccountCreate() {}

    return {
      handleLogin,
      handleAccountCreate
    };
  }
};
</script>
