import * as yup from 'yup';

export default yup.object({
  nome: yup.string().required('Nome é obrigatório!'),
  sobrenome: yup.string().required('Sobrenome é obrigatório!'),
  email: yup
    .string()
    .email('E-mail não valido')
    .required('E-mail é obrigatório!'),
  telefone: yup
    .string()
    .max(15, 'O numero de telefone deve conter no máximo 11 numeros')
    .min(14, 'O numero de telefone deve conter no mínimo 10 numeros')
    .required('O telefone é obrigatório!'),
  senha: yup
    .string()
    .required('A senha é obrigatório!')
    .min(8, 'A senha deve conter no mínimo 8 caracteres '),
  dataNascimento: yup.date(),
  senha_confirmation: yup
    .string()
    .required('Confime a senha')
    .oneOf([yup.ref('senha'), null], 'senhas são diferentes'),
  cpf: yup
    .string()
    .required('O cpf é obrigatório')
    .test('valid_cpf', 'CPF inválido', async (value) => {
      if (!value) {
        return false;
      }
      const cpf = value.replace(/[^\d]+/g, '');
      if (
        cpf.length !== 11 ||
        cpf === '00000000000' ||
        cpf === '11111111111' ||
        cpf === '22222222222' ||
        cpf === '33333333333' ||
        cpf === '44444444444' ||
        cpf === '55555555555' ||
        cpf === '66666666666' ||
        cpf === '77777777777' ||
        cpf === '88888888888' ||
        cpf === '99999999999'
      ) {
        return false;
      }
      let soma = 0;
      let resto;
      for (let i = 1; i <= 9; i++)
        soma += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
      resto = (soma * 10) % 11;
      if (resto === 10 || resto === 11) resto = 0;
      if (resto !== parseInt(cpf.substring(9, 10), 10)) {
        return false;
      }
      soma = 0;
      for (let i = 1; i <= 10; i++)
        soma += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
      resto = (soma * 10) % 11;
      if (resto === 10 || resto === 11) resto = 0;
      if (resto !== parseInt(cpf.substring(10, 11), 10)) {
        return false;
      }
      return true;
    }),
});
