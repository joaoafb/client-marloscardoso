document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("token") && localStorage.getItem("token").trim() !== '') {
        document.querySelector("#btnlogin").style.display = 'none'
        document.querySelector("#btnsair").style.display = 'block'
    } else {

        document.querySelector("#btnlogin").style.display = 'block'
        document.querySelector("#btnsair").style.display = 'none'
    }


})


// Função para realizar o logout (limpar o token do sessionStorage e localStorage)
function deslogar() {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    console.log("Usuário deslogado.");
    location.href = '/index.html'
}
document.addEventListener("DOMContentLoaded", products())




function products() {



    fetch('https://api.geniusleap.cloud/api/marloscardoso/listprodutos')
        .then(response => response.json())
        .then(data => {

            data.forEach(item => {


                const produto = item
                document.querySelector("#list-products").innerHTML = ''


                $(document).ready(function() {
                    // Dados a serem inseridos no HTML
                    var productName = produto.titulo
                    var productPrice = 'R$' + produto.valor
                    var productImageSrc = produto.img

                    // Criando o elemento HTML com os dados dinâmicos usando o método append do jQuery
                    $('#list-products').append(
                        $('<div>').addClass('col-xl-3 col-lg-4 col-sm-6').append(
                            $('<div>').addClass('product text-center').append(
                                $('<div>').addClass('position-relative mb-3').append(
                                    $('<div>').addClass('badge text-white bg-'),
                                    $('<a>').addClass('d-block').attr('href', 'detail.html#' + produto.titulo).append(
                                        $('<img>').addClass('img-fluid ').attr('src', productImageSrc).attr('alt', '...')
                                    ),

                                ),
                                $('<h6>').append(
                                    $('<a>').addClass('reset-anchor').attr('href', 'detail.html#' + produto.titulo).text(productName)
                                ),
                                $('<p>').addClass('small text-muted').text(productPrice)
                            )
                        )
                    );
                });

                // Função chamada quando o item é clicado


            });
        });

    categorias()
    setTimeout(() => {
        search()
    }, 2000);


}

function search() {
    const searchInput = document.getElementById('search');
    const items = document.querySelectorAll('.product'); // Alteração: nome da constante

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.trim().toLowerCase();

        items.forEach(item => { // Alteração: nome da constante
            const productName = item.querySelector('h6 a').textContent.toLowerCase(); // Alteração: nome da constante

            if (productName.includes(searchTerm)) {
                item.style.display = 'block'; // Alteração: nome da constante
            } else {
                item.style.display = 'none'; // Alteração: nome da constante
            }
        });
    });
}

function categorias() {
    fetch('https://api.geniusleap.cloud/api/marloscardoso/listcategorias')
        .then(response => response.json())
        .then(data => {

            data.forEach(item => {
                const div = document.querySelector("#categorias")
                const button = document.createElement("button")
                button.textContent = item.titulo
                button.onclick = function() {
                    productCat(item.titulo)
                }

                div.append(button)




            })
        })
}




function productCat(categoriaa) {
    Swal.fire({
        showConfirmButton: false,
        title: 'Carregando...',
        onBeforeOpen: () => {
            Swal.showLoading();
        }
    });

    fetch('https://api.geniusleap.cloud/api/marloscardoso/listprodutos')
        .then(response => response.json())
        .then(data => {
            Swal.close(); // Fecha o modal de carregamento

            const listProducts = document.querySelector("#list-products");
            listProducts.innerHTML = '';

            let hasProducts = false;

            data.forEach(item => {
                if (item.categoria === categoriaa) {
                    hasProducts = true;
                    const produto = item;

                    const productItem = document.createElement('div');

                    productItem.classList.add('col-xl-3', 'col-lg-4', 'col-sm-6');
                    productItem.innerHTML = `
                        <div class="product text-center">
                            <div class="position-relative mb-3">
                                <a class="d-block" href="detail.html#${produto.titulo}">
                                    <img class="img-fluid" src="${produto.img}" alt="${produto.titulo}">
                                </a>
                               
                            </div>
                            <h6><a class="reset-anchor" href="detail.html#${produto.titulo}">${produto.titulo}</a></h6>
                            <p class="small text-muted">R$${produto.valor}</p>
                        </div>
                    `;
                    listProducts.appendChild(productItem);
                }
            });

            if (!hasProducts) {
                listProducts.innerHTML = '<p>Não foram encontrados produtos nesta categoria.</p>';
            }
        });
}