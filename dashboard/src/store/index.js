import { readonly } from 'vue';
import UserModule from './user';
import GlobalModule from './global';

// A estratégia de ter uma index no meu folder de store, é que para manipular minhas stores, não preciso saber exatemento o caminho de acesso. No entanto, como importei a store para o index, para que o usuário continue sem poder modificar diretamente ela (o que quebraria nosso conceito) precisamos que o objeto exportado aqui seja readOnly
export default readonly({
  User: UserModule,
  Global: GlobalModule
});
