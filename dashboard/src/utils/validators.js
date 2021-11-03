export function validateEmptyAndLength3(value) {
  if (!value) {
    return '* Este campo é obrigatório';
  }

  if (value.length < 3) {
    return '* Este campo deve ter no mínimo 3 caracteres';
  }

  return true;
}

export function validateEmptyAndEmail(value) {
  if (!value) {
    return '* Este campo é obrigatório';
  }

  const isValid = /^[a-z0-9.]+@[a-az0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(value);

  if (!isValid) {
    return '* Formato de email inválido';
  }
  return true;
}
