import { loginEmail, loginGoogle } from "../../lib/authUser.js";

export default () => {
  const loginContainer = document.createElement('div');
  const templateLogin = `<div id="loginBackground"></div><div><header>
  <picture><img class="logo" src="./img/logo_contraplano.png"></picture>
</header>
<div>
  <h2>Bem vinde a sua rede social de filmes</h2>
</div>
<div>
<fieldset>
  <div>
    <label for="email" id="emailLabel">
      <p>E-mail</p>
      <span></span>
      <input type="text" name="email" class="email" id="email">
    </label>
  </div>
  <div>
    <label for="senha" id="senhaLabel">
    <p>Senha</p>
    <span></span>
      <input type="password" name="senha" class="senha" id="senha">
    </label>
  </div>
  <button class="btn" id="btn-login-entrar">Entrar</button>
  <div id="errorMessage"></div>
  <br>
  <button class="btn btn-transparente" id="btn-login-esq-senha">Esqueceu a senha?</button>
  <br>
  <button class="btn btn-transparente" id="btn-login-google">Login com Google</button>
  <br>
  <button class="btn btn-escuro" id="btn-login-criar-conta">Não tem login? Crie sua conta agora</button>
</fieldset>
</div>
<footer>
<h5>Bootcamp Laboratoria - Projeto Rede Social</h5>
<h6>Desenvolvido por Larissa, Maila e Vitória</h6>
<p>2023</p>
</footer></div>`;

loginContainer.id = "login";
loginContainer.innerHTML = templateLogin;

  // Informações preenchidas pelo usuário
  const emailEntrada = loginContainer.querySelector("#email");
  const senhaEntrada = loginContainer.querySelector("#senha");

  // Botões
  const entrarLoginBotao = loginContainer.querySelector("#btn-login-entrar");
  const criarLoginBotao = loginContainer.querySelector("#btn-login-criar-conta");
  const criarLoginGoogleBotao = loginContainer.querySelector("#btn-login-google");

  // Função de login
  const firstLogin = (event) => {
    event.preventDefault();
    const email = emailEntrada.value;
    const senha = senhaEntrada.value;

    // Chamada para a função de login
    loginEmail(email, senha)
      .then(() => {
        window.location.hash = '#feed';
      })
      .catch(() => {
        console.log("entrei")
        const errorMessage = loginContainer.querySelector('#errorMessage');
        errorMessage.textContent = 'Informações de e-mail ou senha incorretas';
        errorMessage.style.display = 'block';
      });
    
    // teste login
    console.log(`Usuário: ${email} Senha: ${senha}`);
    return false;
  };

  entrarLoginBotao.addEventListener('click', firstLogin);  

  // Login Google
  criarLoginGoogleBotao.addEventListener('click', () => {
    console.log("entrei");
    loginGoogle().then(() => {
      console.log("entrei no then")
      window.location.hash = '#feed';
    }).catch((error) => {
      console.log(error);
    });
  });


  criarLoginBotao.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.hash = '#cadastro';
  });

  return loginContainer;
};
