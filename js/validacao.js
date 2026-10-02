// ===== Instituto Patas Unidas - validação dos campos =====
// Este arquivo cuida SÓ de conferir se um campo está certo.
// Ele não sabe nada de envio do formulário. O cadastro.js usa a função daqui.

// ----- REGRAS DE VALIDAÇÃO (RegEx) -----
// cada campo tem uma regra de formato e uma mensagem de erro
const regras = {
    // CORREÇÃO: aceita também hífen e apóstrofo (ex.: Maria-Clara, D'Ávila)
    nome: /^[A-Za-zÀ-ÿ '-]{3,}$/,
    telefone: /^\(\d{2}\) \d{4,5}-\d{4}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    cep: /^\d{5}-\d{3}$/
};

const mensagensDeErro = {
    nome: 'Digite seu nome completo, só com letras (mínimo 3).',
    telefone: 'Use o formato (00) 00000-0000.',
    email: 'Digite um e-mail válido, como nome@email.com.',
    cpf: 'Use o formato 000.000.000-00.',
    cep: 'Use o formato 00000-000.'
};

// ----- VALIDA UM CAMPO -----
function validarCampo(campo) {
    // procura a mensagem pequena do campo; se não existir, cria
    let aviso = document.getElementById('erro-' + campo.id);
    if (!aviso) {
        aviso = document.createElement('small');
        aviso.id = 'erro-' + campo.id;
        aviso.classList.add('mensagem-erro');
        campo.after(aviso);
    }

    // 1ª verificação: campo vazio
    if (campo.value.trim() === '') {
        campo.classList.add('campo-erro');
        campo.classList.remove('campo-sucesso');
        aviso.textContent = 'Este campo é obrigatório.';
        return false;
    }

    // 2ª verificação: formato errado (RegEx)
    if (!regras[campo.id].test(campo.value)) {
        campo.classList.add('campo-erro');
        campo.classList.remove('campo-sucesso');
        aviso.textContent = mensagensDeErro[campo.id];
        return false;
    }

    // tudo certo
    campo.classList.remove('campo-erro');
    campo.classList.add('campo-sucesso');
    aviso.textContent = '';
    return true;
}
