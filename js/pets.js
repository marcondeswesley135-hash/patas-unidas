// ===== Instituto Patas Unidas - lista de pets =====
// Este arquivo cuida SÓ da lista de pets na tela.
// Para salvar os favoritos, ele usa as funções do armazenamento.js.

// 1. Os dados: uma lista com os pets
//    "chegada" é a data em que o pet chegou no abrigo (ano-mês-dia)
const pets = [
    { nome: 'Thor', especie: 'Cão', status: 'Disponível', cor: 'badge-sucesso', chegada: '2026-08-10' },
    { nome: 'Mel', especie: 'Gata', status: 'Em tratamento', cor: 'badge-aviso', chegada: '2026-09-01' },
    { nome: 'Bob', especie: 'Cão', status: 'Adotado', cor: 'badge-erro', chegada: '2026-06-15' },
    { nome: 'Luna', especie: 'Gata', status: 'Disponível', cor: 'badge-sucesso', chegada: '2026-09-20' }
];

// 2. Favoritos: vêm do armazenamento.js
let favoritos = carregarFavoritos();

// 3. A função que coloca os pets na tela (o spa.js chama ela)
function renderizarPets() {
    const lista = document.getElementById('lista-pets');

    // limpa a lista
    lista.innerHTML = '';

    // para cada pet, escreve um <li> dentro da lista
    pets.forEach(function (pet) {
        // se o pet está nos favoritos salvos, ele já aparece marcado
        let classe = 'pet';
        if (favoritos.includes(pet.nome)) {
            classe = 'pet favorito';
        }

        // Day.js: dayjs() é a data de hoje; diff calcula quantos dias
        // se passaram desde a chegada; format mostra a data no jeito brasileiro
        // CORREÇÃO: se a internet cair, a Day.js não carrega e o dayjs não existe.
        // Antes a lista ficava vazia; agora os pets aparecem, só sem a data.
        let textoData = '';
        if (typeof dayjs !== 'undefined') {
            const dias = dayjs().diff(pet.chegada, 'day');
            const dataChegada = dayjs(pet.chegada).format('DD/MM/YYYY');
            textoData = `Chegou em ${dataChegada} (há ${dias} dias no abrigo)`;
        }

        lista.innerHTML += `
            <li class="${classe}" data-nome="${pet.nome}">
                <strong>${pet.nome}</strong>
                <span class="badge ${pet.cor}">${pet.status}</span>
                <span class="badge badge-info">${pet.especie}</span>
                <small>${textoData}</small>
            </li>
        `;
    });
}

// 4. Evento CLICK com event delegation:
//    os pets são criados pelo JavaScript, então o clique é escutado
//    no #app (que sempre existe) e depois vemos se foi em um pet
const app = document.getElementById('app');

app.addEventListener('click', function (evento) {
    const petClicado = evento.target.closest('.pet');

    if (petClicado) {
        // marca ou desmarca o pet como favorito
        petClicado.classList.toggle('favorito');

        // atualiza a lista de favoritos
        const nome = petClicado.dataset.nome;
        if (petClicado.classList.contains('favorito')) {
            favoritos.push(nome);
        } else {
            // tira o nome da lista
            favoritos = favoritos.filter(function (item) {
                return item !== nome;
            });
        }

        // salva usando a função do armazenamento.js
        salvarFavoritos(favoritos);
    }
});
