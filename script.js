/* ==========================================================================
   script.js
   Funcionalidades: menu responsivo, alternância de tema claro/escuro,
   validação do formulário de contato e simulação de envio.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------------------------
     1. MENU RESPONSIVO (hambúrguer em telas pequenas)
     ------------------------------------------------------------------ */
  const menuToggle = document.getElementById('menuToggle');
  const menuPrincipal = document.getElementById('menuPrincipal');

  menuToggle.addEventListener('click', function () {
    const aberto = menuPrincipal.classList.toggle('aberto');
    menuToggle.classList.toggle('aberto', aberto);
    menuToggle.setAttribute('aria-expanded', aberto);
  });

  // Fecha o menu automaticamente ao clicar em um link (útil no mobile)
  document.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      menuPrincipal.classList.remove('aberto');
      menuToggle.classList.remove('aberto');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ------------------------------------------------------------------
     2. TEMA CLARO / ESCURO
     A preferência é guardada em memória (variável) durante a sessão,
     já que o ambiente de artifacts não permite localStorage.
     ------------------------------------------------------------------ */
  const themeToggle = document.getElementById('themeToggle');
  const iconeTema = themeToggle.querySelector('.theme-toggle__icon');
  const labelTema = themeToggle.querySelector('.theme-toggle__label');

  themeToggle.addEventListener('click', function () {
    const claro = document.body.classList.toggle('tema-claro');
    iconeTema.textContent = claro ? '☀' : '☾';
    labelTema.textContent = claro ? 'Modo claro' : 'Modo escuro';
  });

  /* ------------------------------------------------------------------
     3. ANO ATUAL NO RODAPÉ
     ------------------------------------------------------------------ */
  document.getElementById('anoAtual').textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------
     4. VALIDAÇÃO E SIMULAÇÃO DE ENVIO DO FORMULÁRIO DE CONTATO
     ------------------------------------------------------------------ */
  const form = document.getElementById('formContato');
  const campoNome = document.getElementById('nome');
  const campoEmail = document.getElementById('email');
  const campoMensagem = document.getElementById('mensagem');

  const erroNome = document.getElementById('erroNome');
  const erroEmail = document.getElementById('erroEmail');
  const erroMensagem = document.getElementById('erroMensagem');

  const modal = document.getElementById('modalConfirmacao');
  const fecharModal = document.getElementById('fecharModal');

  // Expressão regular simples para validar formato de e-mail (usuario@dominio.com)
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function marcarErro(campo, spanErro, mensagem) {
    campo.classList.add('invalido');
    spanErro.textContent = mensagem;
  }

  function limparErro(campo, spanErro) {
    campo.classList.remove('invalido');
    spanErro.textContent = '';
  }

  form.addEventListener('submit', function (evento) {
    evento.preventDefault(); // impede o envio real, pois é uma simulação

    let formularioValido = true;

    // Validação do nome: obrigatório
    if (campoNome.value.trim() === '') {
      marcarErro(campoNome, erroNome, 'Informe seu nome.');
      formularioValido = false;
    } else {
      limparErro(campoNome, erroNome);
    }

    // Validação do e-mail: obrigatório e com formato válido
    if (campoEmail.value.trim() === '') {
      marcarErro(campoEmail, erroEmail, 'Informe seu e-mail.');
      formularioValido = false;
    } else if (!regexEmail.test(campoEmail.value.trim())) {
      marcarErro(campoEmail, erroEmail, 'Formato de e-mail inválido. Ex: usuario@dominio.com');
      formularioValido = false;
    } else {
      limparErro(campoEmail, erroEmail);
    }

    // Validação da mensagem: obrigatória
    if (campoMensagem.value.trim() === '') {
      marcarErro(campoMensagem, erroMensagem, 'Escreva uma mensagem.');
      formularioValido = false;
    } else {
      limparErro(campoMensagem, erroMensagem);
    }

    if (!formularioValido) {
      return; // interrompe caso algum campo esteja inválido
    }

    // Simulação de envio: em um cenário real, aqui seria feita uma
    // chamada a um servidor (fetch/AJAX). Como é uma simulação,
    // apenas limpamos o formulário e exibimos a confirmação.
    form.reset();
    abrirModal();
  });

  function abrirModal() {
    modal.hidden = false;
  }

  function fecharModalFn() {
    modal.hidden = true;
  }

  fecharModal.addEventListener('click', fecharModalFn);

  // Fecha o modal ao clicar fora da caixa de conteúdo
  modal.addEventListener('click', function (evento) {
    if (evento.target === modal) {
      fecharModalFn();
    }
  });

});
