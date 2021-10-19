// Aqui, fazemos a implementação de uma API para manipular os eventos de modais

import bus from '../utils/bus';

const EVENT_NAME = 'modal:toggle';

export default function useModal() {
  // função para abrir o modal (seta o status para true)
  function open(payload = {}) {
    bus.emit(EVENT_NAME, { status: true, ...payload });
  }
  // função para fechar o modal (seta o status para false)
  function close(payload = {}) {
    bus.emit(EVENT_NAME, { status: false, ...payload });
  }
  // função lsiten que fica escutando a aplicação, aguardando por um evento para realizar 'fn' quando acontecer
  function listen(fn) {
    bus.on(EVENT_NAME, fn);
  }
  // função que faz com que o 'listen' do Hook para de funcionar, ou seja, a função para de escutar a aplicação
  function off(fn) {
    bus.off(EVENT_NAME, fn);
  }
  return { open, close, listen, off };
}
