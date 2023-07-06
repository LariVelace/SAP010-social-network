//import { createUserWithEmail } from '../../configFirebase/auth';
import { cadastroUsuarioSenha } from "../../lib/authUser.js";

export default () => {
  const cadastroContainer = document.createElement('div');
  const templateCadastro = `<div id="loginBackground"></div><div> 
  <header>
    <picture><img class="logo" src="./img/logo_contraplano.png"></picture>
  </header>
  <div>
    <h2>Bem vinde a sua rede social de filmes</h2>
  </div>
    <form action="">
      <fieldset>
        <legend>Cadastre-se</legend>
        <div>
          <label for="nome-completo">Nome completo</label>
          <input type="text" class="nome-completo" id="nome-completo">
        </div>
        <div>
          <label for="usuario">Nome do usuário</label>
          <input type="text" class="usuario" id="usuario">
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" class="email" id="email">
        </div>
        <div>
          <label for="senha">Senha</label>
          <input type="password" class="senha" id="senha">
        </div>
        <button class="btn" id="btn-cad-voltar">Voltar</button>
        <button class="btn" id="btn-cad-concluir">Concluir cadastro</button>
        <button class="btn" id="btn-cad-login-google">Login com Google</button>
        <div id="errorMessage" class="error">
      </fieldset>
    </form>
  <footer>
    <h5>Bootcamp Laboratoria - Projeto Rede Social</h5>
    <h6>Desenvolvido por Larissa, Maila e Vitória</h6>
    <p>2023</p>
  </footer></div>`;
  cadastroContainer.id ="login"
  cadastroContainer.innerHTML = templateCadastro;

  // Informações preenchidas pelo usuário
  const nomeEntrada = cadastroContainer.querySelector('#nome-completo');
  const nomeUsuarioEntrada = cadastroContainer.querySelector('#usuario');
  const emailEntrada = cadastroContainer.querySelector('#email');
  const senhaEntrada = cadastroContainer.querySelector('#senha');

  // Botões
  const botaoCadastrar = cadastroContainer.querySelector('#btn-cad-concluir');
  const botaoVoltar = cadastroContainer.querySelector('#btn-cad-voltar');

/*   botaoCadastrar.addEventListener("click", () => {
    window.location.hash = "#feed";
  });

  botaoVoltar.addEventListener("click", () => {
    window.location.hash = "#voltar";
  }); */


  const registerUser = () => {
    const nomeCompleto = nomeEntrada.value;
    const usuario = nomeUsuarioEntrada.value;
    const email = emailEntrada.value;
    const senha = senhaEntrada.value;

    // Chamada para a função createUserWithEmail
    cadastroUsuarioSenha(nomeCompleto, usuario, email, senha)
      .then(() => {
         // Cadastro concluído com sucesso
        //window.location.hash = '#feed';
      })
      .catch((error) => {
        // Lidar com erros durante o cadastro
        const errorMessage = cadastroContainer.querySelector('#errorMessage');
        errorMessage.style.display = 'block';
        switch(error.code){
          case 'auth/missing-email':
            errorMessage.textContent = 'Preencha o e-mail!';
            errorMessage.style.display = 'block';
            break;

          case 'auth/email-already-in-use':
            errorMessage.textContent = 'E-mail já está em uso!';
            errorMessage.style.display = 'block';
            break;

          case 'auth/missing-password':
            errorMessage.textContent = 'Preencha a senha!';
            errorMessage.style.display = 'block';
            break;
  
          case 'auth/invalid-password':
            errorMessage.textContent = 'A senha é inválida, precisa ter pelo menos 6 caracteres.';
            errorMessage.style.display = 'block';
            break;
        }
      });

    // Teste cadastro
    console.log(`Nome: ${nomeCompleto} Usuário: ${usuario} Email: ${email} Senha: ${senha}`);
  };

  botaoCadastrar.addEventListener('click', registerUser());

  botaoVoltar.addEventListener('click', () => {
    window.location.hash = '#login';
  });

  return cadastroContainer;
};
