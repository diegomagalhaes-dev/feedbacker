import Store from '../store';

// Com este Hook, temos uma maneira mais legível de acessar os recursos da Store. No caso, podemo acessar tanto uma Store específica (passando o module) ou a nossa Store completa
export default function useStore(module) {
  if (module) return Store[module];

  return Store;
}
