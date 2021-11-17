<template>
  <modal-factory />
  <router-view />
</template>

<script>
import { watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import ModalFactory from './components/ModalFactory';
import services from './services';
import { setCurrentUser } from './store/user';

export default {
  components: {
    ModalFactory
  },
  setup() {
    // Cuida do roteamento (ações)
    const router = useRouter();
    // Nos fornece informações da rota
    const route = useRoute();

    // O tratamento de rotas está aqui na App.vue, pois ele é o component principal da aplicação (renderizado a todo momento). Dessa forma, utilizando Hooks de vue-router, podemos ter a informação de qual rota está sendo acessada neste momento da aplicação, e fazer o tratamento (token ou redirecionamento) da forma correta

    // O Watch é uma feature do Vue que nos fornece uma alternativa para  "escutar" eventos na aplicação. Ele recebe dois parâmetros: Uma função que retorna o que queremos escutar e uma outra que será chamada quando houver mudança.
    watch(
      () => route.path,
      async () => {
        if (route.meta.hasAuth) {
          const token = window.localStorage.getItem('token');
          if (!token) {
            router.push({ name: 'Home' });
            return;
          }

          const { data } = await services.user.getMe();
          setCurrentUser(data);
          console.log('data: ', data);
        }
      }
    );
  }
};
</script>
