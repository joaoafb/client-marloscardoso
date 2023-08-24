document.addEventListener("DOMContentLoaded", products())

function getProductHtml(product) {
    const productName = product.titulo;
    const productPrice = `R$${product.valor}`;
    const productImageSrc = product.img;

    return `
        <div class="col-xl-3 col-lg-4 col-sm-6">
            <div class="product text-center">
                <div class="position-relative mb-3">
                    <div class="badge text-white bg-"></div>
                    <a class="d-block" href="detail.html#${productName}">
                        <img class="img-fluid" src="${productImageSrc}" alt="...">
                    </a>
                </div>
                <h6>
                    <a class="reset-anchor" href="detail.html#${productName}">${productName}</a>
                </h6>
                <p class="small text-muted">${productPrice}</p>
            </div>
        </div>
    `;
}

function products() {
    fetch('https://api.geniusleap.cloud/api/marloscardoso/listprodutos')
        .then(response => response.json())
        .then(data => {
            const productListContainer = document.querySelector("#list-products");
            productListContainer.innerHTML = '';

            data.forEach(item => {
                const productHtml = getProductHtml(item);
                productListContainer.insertAdjacentHTML('beforeend', productHtml);
            });
        });

    categorias();
    setTimeout(search, 2000);
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

document.addEventListener("DOMContentLoaded", function() {

    // Função que será executada com o parâmetro da categoria


    // Função para obter parâmetros da URL
    function getParameterFromURL(parameterName) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(parameterName);
    }

    // Verificar se há um parâmetro "cat" na URL
    const categoryParam = getParameterFromURL('cat');
    if (categoryParam) {
        productCat(categoryParam)
    }

})


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