function menushow() {
    document.querySelector(".fullscreen-menu").classList.add("active")
    document.querySelector("#nav").style.display = 'none'
    const produtos = JSON.parse(localStorage.getItem("Cart"));
    const cartElement = document.getElementById("cart");

    produtos.forEach(function(item) {
        const li = document.createElement("li");
        li.textContent = `${item.title} - R$ ${item.price}`;
        cartElement.appendChild(li);
    });

}

function closemenu() {
    document.querySelector(".fullscreen-menu").classList.remove("active")
    setTimeout(() => {
        document.querySelector("#nav").style.display = 'flex'
    }, 200);
}

// Função para realizar o logout (limpar o token do sessionStorage e localStorage)
function deslogar() {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    console.log("Usuário deslogado.");
    location.href = '/index.html'
}

document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("token") && localStorage.getItem("token").trim() !== '') {

        document.querySelector("#buttonLogin").style.display = 'none'
        document.querySelector("#btnsair").style.display = 'block'
        document.querySelector("#buttonPedidos").style.display = 'block'
    } else {
        document.querySelector("#buttonPedidos").style.display = 'none'
        document.querySelector("#buttonLogin").style.display = 'block'
        document.querySelector("#btnlogin").style.display = 'block'
        document.querySelector("#btnsair").style.display = 'none'
    }
})