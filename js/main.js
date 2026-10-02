// ===== Instituto Patas Unidas - interações da página =====

// 1. Toast: some sozinho depois de 5 segundos
const toast = document.querySelector('.toast');

if (toast) {
    setTimeout(function () {
        toast.classList.add('toast-saindo');
    }, 5000);
}

// 2. Menu hambúrguer: fecha quando a pessoa clica em um link (no celular)
const menuToggle = document.getElementById('menu-toggle');
const linksDoMenu = document.querySelectorAll('.menu-lista a');

linksDoMenu.forEach(function (link) {
    link.addEventListener('click', function () {
        if (menuToggle) {
            menuToggle.checked = false;
        }
    });
});
