export function getMensagemErro(status: number, mensagemApi?: string): string {
  switch (status) {
    case 401:
      return 'Sua sessão expirou. Faça login novamente.';
    case 403:
      return 'Você não tem permissão para realizar esta ação.';
    case 404:
      return 'Não encontrado.';
    case 422:
      return mensagemApi || 'Dados inválidos. Confira os campos e tente novamente.';
    case 500:
      return 'Erro no servidor. Tente novamente mais tarde.';
    default:
      return mensagemApi || 'Ocorreu um erro. Tente novamente.';
  }
}

export function limparSessaoEExpirada(router: { push: (url: string) => void }) {
  localStorage.removeItem('token');
  localStorage.removeItem('nome');
  localStorage.removeItem('role');
  localStorage.removeItem('carrinho');
  router.push('/login');
}