// ===== Instituto Patas Unidas - armazenamento (localStorage) =====
// Este arquivo cuida SÓ de salvar e carregar os favoritos.
// Ele não mexe na tela.

// carrega a lista de favoritos salva (ou uma lista vazia)
function carregarFavoritos() {
    return JSON.parse(localStorage.getItem('favoritos')) || [];
}

// salva a lista de favoritos (JSON.stringify transforma a lista em texto)
function salvarFavoritos(favoritos) {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}
