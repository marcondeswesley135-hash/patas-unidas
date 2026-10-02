// ===== Instituto Patas Unidas - SPA (página única) =====
// Este arquivo cuida SÓ da troca de páginas.
// Ele usa a função renderizarPets(), que está no pets.js.

// 1. As rotas: cada endereço aponta para um <template> do HTML
const rotas = {
    '#/inicio': 'pagina-inicio',
    '#/adocao': 'pagina-adocao',
    '#/contato': 'pagina-contato'
};

// 2. A função que troca o conteúdo da página
function mostrarPagina() {
    const app = document.getElementById('app');

    // pega o endereço depois do # (se não tiver, vai para o início)
    const hash = window.location.hash || '#/inicio';

    // descobre qual template usar (se não existir, mostra a página de erro)
    const idDoTemplate = rotas[hash] || 'pagina-nao-encontrada';
    const template = document.getElementById(idDoTemplate);

    // troca o conteúdo do <main id="app"> pelo conteúdo do template
    app.innerHTML = template.innerHTML;

    // na página de adoção, monta a lista de pets (js/pets.js)
    if (hash === '#/adocao') {
        renderizarPets();
    }
}

// 3. Quando o endereço muda, troca a página (sem recarregar)
window.addEventListener('hashchange', mostrarPagina);

// 4. Mostra a primeira página quando o site abre
mostrarPagina();
