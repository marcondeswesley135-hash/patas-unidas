// ===== Instituto Patas Unidas - formulário de cadastro =====
// Este arquivo cuida SÓ dos eventos do formulário (digitar, sair do campo, enviar).
// As regras de validação ficam no validacao.js.

const formulario = document.querySelector('form');
const botao = formulario.querySelector('button');
const mensagem = document.getElementById('mensagem');

// ----- VALIDAÇÃO EM TEMPO REAL -----
// quando a pessoa sai de um campo (blur), ele é conferido
const campos = document.querySelectorAll('#nome, #telefone, #email, #cpf, #cep');

campos.forEach(function (campo) {
    campo.addEventListener('blur', function () {
        validarCampo(campo);
    });
});

// ----- BOTÃO -----
// o botão começa desativado
botao.disabled = true;

// Evento INPUT: toda vez que a pessoa digita,
// o botão só fica ativo se os campos obrigatórios estiverem certos
formulario.addEventListener('input', function () {
    botao.disabled = !formulario.checkValidity();

    // CORREÇÃO: a mensagem de sucesso antiga some quando a pessoa começa outro cadastro
    mensagem.hidden = true;
});

// ----- ENVIO -----
formulario.addEventListener('submit', function (evento) {
    // impede o navegador de recarregar a página
    evento.preventDefault();

    // confere todos os campos de uma vez
    let tudoCerto = true;
    campos.forEach(function (campo) {
        if (!validarCampo(campo)) {
            tudoCerto = false;
        }
    });

    // se algum campo estiver errado, não envia
    if (!tudoCerto) {
        mensagem.hidden = true;
        return;
    }

    // mostra a mensagem de sucesso
    mensagem.textContent = 'Cadastro enviado com sucesso! Obrigado por ser voluntário.';
    mensagem.hidden = false;

    // limpa o formulário, tira as cores e desativa o botão de novo
    formulario.reset();
    campos.forEach(function (campo) {
        campo.classList.remove('campo-sucesso');
    });
    botao.disabled = true;
});
