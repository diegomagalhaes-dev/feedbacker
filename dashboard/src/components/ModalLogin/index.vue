<template>
  <div class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800">Entre na sua conta</h1>
    <button @click="close" class="text-4xl text-gray-600 focus:outline-none">
      &times;
    </button>
  </div>
  <div class="mt-16">
    <!-- este '.prevent' é um modificador do Vue que faz a estratégia de impedir o comportamento dafault dos forms (de recarregar a página ao submeter) -->
    <form @submit.prevent="handleSubmit">
      <label class="block" for="">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <input
          v-model="state.email.value"
          type="email"
          :class="{
            'border-brand-danger': !!state.email.errorMessage
          }"
          class="
            block
            w-full
            px-4
            py-3
            mt-1
            text-lg
            bg-gray-100
            border-2 border-transparent
            rounded
          "
          placeholder="example: john@gmail.com"
        />
        <span
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.email.errorMessage }}
        </span>
      </label>
      <label class="block mt-9" for="">
        <span class="text-lg font-medium text-gray-800">Senha</span>
        <input
          v-model="state.password.value"
          type="password"
          :class="{
            'border-brand-danger': !!state.password.errorMessage
          }"
          class="
            block
            w-full
            px-4
            py-3
            mt-1
            text-lg
            bg-gray-100
            border-2 border-transparent
            rounded
          "
        />
        <span
          v-if="!!state.password.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.password.errorMessage }}
        </span>
      </label>
      <button
        :disable="state.isLoading"
        type="submit"
        :class="{
          'opacity-50': state.isLoading
        }"
        class="
          px-8
          py-3
          mt-10
          text-2xl
          font-bold
          text-white
          rounded-full
          bg-brand-main
          focus:outline-none
          transition:
          all
          duration-150
        "
      ></button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue';
import {useRouter}  from 'vue-router
// Biblioteca para trabalhar com formulários
import {useField} from 'vee-validate'
import {useToast} from 'vue-toastification'
import useModal from '../../hooks/useModal';
import {validateEmptyAndLength3, validadeEmptyAndEmail} from '../../utils/validators';
import services from '../../services'
export default {
  setup() {
    const router = useRouter();
    const modal = useModal();
    const toast = useToast();
    const {
      value: emailValue, 
      errorMessage: emailErrorMessage
    } = useField('email', validadeEmptyAndEmail)

     const {
      value: passwordValue, 
      errorMessage: passwordErrorMessage
    } = useField('password', validateEmptyAndLength3 )

    const state = reactive({
      // o modal de login é um modal de requisição, por isso precisamos de uma propridade que verificar se há erros
      hasError: false,
      isLoading: false,
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    });

   async function handleSubmit() {
      try{
        toast.clear()
        state.isLoading = true;
        const {data, errors } = await services.auth.login({
          email: state.email.value,
          password: state.password.value
        })

        if(!errors) {
          window.localStorage.setItem('token', data.token)
          // Para direcionar o usuário para a tela de Feedbacks caso ele esteja autenticado: 
          router.push({name: 'Feedbacks'})

          state.isLoading = false

          // Após direcionarmos o usuário, fechamos o modal
          modal.close()
          return
        }

        if(errors.status === 404){
            toast.error('E-mail não encontrado')
        }
         if(errors.status === 401){
           toast.error('E-mail/senha inválidos')
        }
         if(errors.status === 400){
           toast.error('Ocorreu um erro ao fazer o login')
        }

        state.isLoading = false
      }catch(error){
        state.isLoading = false;
        state.hasError = !!error;
        toast.error('Ocorreu um erro ao fazer o login')
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit
    };
  }
};
</script>

<style>
</style>
