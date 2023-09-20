const SELECTORS = {
    fullscreenMenu: ".fullscreen-menu",
    nav: "#nav",
    cart: "#cart",
    buttonPedidos: "#buttonPedidos",
    btnSair: "#btnsair"
};

function menushow() {
    const fullscreenMenu = document.querySelector(SELECTORS.fullscreenMenu);
    const nav = document.querySelector(SELECTORS.nav);

    fullscreenMenu.classList.add("active");
    nav.style.display = 'none';
    populateCart();
}

function closemenu() {
    const fullscreenMenu = document.querySelector(SELECTORS.fullscreenMenu);
    const nav = document.querySelector(SELECTORS.nav);

    fullscreenMenu.classList.remove("active");
    setTimeout(() => {
        nav.style.display = 'flex';
    }, 200);
}

function populateCart() {
    const produtos = JSON.parse(localStorage.getItem("Cart"));
    const cartElement = document.querySelector(SELECTORS.cart);

    cartElement.innerHTML = ""; // Limpa o conteúdo anterior do carrinho

    if (produtos && produtos.length > 0) {
        produtos.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.title} - R$ ${item.price}`;
            cartElement.appendChild(li);
        });
    } else {
        const li = document.createElement("li");
        li.textContent = "Carrinho vazio";
        cartElement.appendChild(li);
    }
}


function deslogar() {
    sessionStorage.clear()
    localStorage.clear()
    console.log("Usuário deslogado.");
    location.href = '/index.html';
}

function updateUIBasedOnToken() {
    const token = localStorage.getItem("token");


    const buttonPedidos = document.querySelector(SELECTORS.buttonPedidos);
    const btnSair = document.querySelector(SELECTORS.btnSair);

    if (token && token.trim() !== '') {

        btnSair.style.display = 'block';
    } else {

        btnSair.style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    updateUIBasedOnToken();
});