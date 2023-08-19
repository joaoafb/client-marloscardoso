Swal.fire({
    title: 'Bem-Vindo à Loja Marlos Cardoso!',
    text: '',
    icon: 'info',
   confirmButtonColor: '#000',
    confirmButtonText: 'Continuar'
  });
function menushow() {
    document.querySelector(".fullscreen-menu").classList.add("active")
    document.querySelector("#nav").style.display = 'none'
}

function closemenu() {
    document.querySelector(".fullscreen-menu").classList.remove("active")
    setTimeout(() => {
        document.querySelector("#nav").style.display = 'flex'
    }, 1000);
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
        document.querySelector("#btnlogin").style.display = 'none'
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
fetch('https://api.geniusleap.cloud/api/marloscardoso/listcategorias')
    .then(response => response.json())
    .then(data => {

        data.forEach(item => {

            const categoria = $(`
              <div onclick="location.href = '/shop.html?id=${item.titulo}'" style="display:flex;cursor:pointer;flex-direction:row !Important;padding:10px;border-radius:10px;" class="container my-4 w-auto bg-gray-100">
            <img src="${item.img}" style="border-radius:50%;object-fit: contain !important;" width="40px">
            <h3 style="padding-left:10px;">${item.titulo}</h3>
            </div>
            
            
              
              
              `);


            // Adicionando o novo item à coluna
            $('#lista-categ').append(categoria);
        })
    })



fetch('https://api.geniusleap.cloud/api/marloscardoso/listprodutos')
    .then(response => response.json())
    .then(data => {
        // Limitar a exibição a 10 itens
        const limitedData = data.slice(0, 10);

        limitedData.forEach(item => {

            const produto = item
            var productName = produto.titulo
            var productPrice = 'R$' + produto.valor
            var productImageSrc = produto.img
            $('#list-products').append(
                $('<div>').addClass('col-xl-3 col-lg-4 col-sm-6').append(
                    $('<div>').addClass('product text-center').append(
                        $('<div>').addClass('position-relative mb-3').append(
                            $('<div>').addClass('badge text-white bg-'),
                            $('<a>').addClass('d-block').attr('href', 'detail.html#' + productName).append(
                                $('<img>').addClass('img-fluid').attr('src', productImageSrc).attr('alt', '...')
                            ),
                            $('<div>').addClass('product-overlay').append(
                                $('<ul>').addClass('mb-0 list-inline').append(
                                    $('<li>').addClass('list-inline-item m-0 p-0').append(

                                    ),
                                    // Criar o elemento <li> e adicionar evento de clique a ele
                                    $('<li>').on('click', function() {
                                        // Executar a função desejada ao clicar no elemento
                                        var carrinho = produto;

                                        // Converte a array em uma string JSON
                                        var carrinhoString = JSON.stringify(carrinho);

                                        // Salva a string no LocalStorage com a chave "carrinho"
                                        localStorage.setItem('carrinho', carrinhoString);


                                        const indice = Number(localStorage.getItem("indice"))
                                        localStorage.setItem("indice", indice + 1)
                                            // Verificar se o localStorage está disponível no navegador
                                        if (typeof localStorage !== 'undefined') {
                                            // Obter os dados salvos no localStorage (se houver)
                                            const savedData = JSON.parse(localStorage.getItem('Cart')) || [];

                                            // Definir o objeto JSON a ser salvo
                                            const jsonData = {
                                                image: produto.img,
                                                title: produto.titulo,
                                                price: produto.valor,
                                                token: produto._id
                                            };

                                            // Adicionar o novo objeto JSON ao array
                                            savedData.push(jsonData);

                                            // Salvar o array atualizado no localStorage
                                            localStorage.setItem('Cart', JSON.stringify(savedData));

                                            // Exibir o array atualizado no console
                                            console.log(savedData);
                                        } else {
                                            console.log('O localStorage não é suportado neste navegador.');
                                        }


                                        let timerInterval
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Adicionado No Carrinho Com Sucesso!',
                                            html: 'Redirecionando ao carrinho...',
                                            timer: 2000,
                                            timerProgressBar: true,
                                            didOpen: () => {
                                                Swal.showLoading()
                                                const b = Swal.getHtmlContainer().querySelector('b')

                                            },
                                            willClose: () => {
                                                clearInterval(timerInterval)
                                            }
                                        }).then((result) => {
                                            /* Read more about handling dismissals below */
                                            if (result.dismiss === Swal.DismissReason.timer) {
                                                location.href = '/cart.html'
                                            }
                                        })

                                    })
                                    .addClass('list-inline-item m-0 p-0') // Adicionar as classes ao elemento <li>
                                    .append( // Adicionar o elemento <a> como filho do elemento <li>
                                        $('<span>').addClass('btn btn-sm btn-dark').attr('href', 'cart.html').text('').append($('<i>').addClass('fas fa-plus'))
                                    )
                                    .appendTo('body'),
                                    $('<li>').addClass('list-inline-item me-0').on('click', function() {




                                        document.querySelector("#product-title").innerHTML = item.titulo
                                        document.querySelector("#product-description").innerHTML = item.descricao
                                        document.querySelector("#product-price").innerHTML = 'R$' + item.valor
                                        $('#product-image').css('background-image', 'url(' + item.img + ')');
                                        document.querySelector("#btn-addcart button").onclick = function() {

                                            // Executar a função desejada ao clicar no elemento
                                            var carrinho = produto;

                                            // Converte a array em uma string JSON
                                            var carrinhoString = JSON.stringify(carrinho);

                                            // Salva a string no LocalStorage com a chave "carrinho"
                                            localStorage.setItem('carrinho', carrinhoString);


                                            const indice = Number(localStorage.getItem("indice"))
                                            localStorage.setItem("indice", indice + 1)
                                                // Verificar se o localStorage está disponível no navegador
                                            if (typeof localStorage !== 'undefined') {
                                                // Obter os dados salvos no localStorage (se houver)
                                                const savedData = JSON.parse(localStorage.getItem('Cart')) || [];

                                                // Definir o objeto JSON a ser salvo
                                                const jsonData = {
                                                    image: item.img,
                                                    title: item.titulo,
                                                    price: item.valor,
                                                    token: item._id,
                                                    description: item.descricao
                                                };

                                                // Adicionar o novo objeto JSON ao array
                                                savedData.push(jsonData);

                                                // Salvar o array atualizado no localStorage
                                                localStorage.setItem('Cart', JSON.stringify(savedData));

                                                // Exibir o array atualizado no console
                                                console.log(savedData);
                                            } else {
                                                console.log('O localStorage não é suportado neste navegador.');
                                            }


                                            let timerInterval
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Adicionado No Carrinho Com Sucesso!',
                                                html: 'Redirecionando ao carrinho...',
                                                timer: 2000,
                                                timerProgressBar: true,
                                                didOpen: () => {
                                                    Swal.showLoading()
                                                    const b = Swal.getHtmlContainer().querySelector('b')

                                                },
                                                willClose: () => {
                                                    clearInterval(timerInterval)
                                                }
                                            }).then((result) => {
                                                /* Read more about handling dismissals below */
                                                if (result.dismiss === Swal.DismissReason.timer) {
                                                    location.href = '/cart.html'
                                                }
                                            })


                                        }




                                    }).append(
                                        $('<a>').addClass('btn btn-sm btn-outline-dark').attr('href', '#productView').attr('data-bs-toggle', 'modal').append(
                                            $('<i>').addClass('fas fa-expand')
                                        )
                                    )
                                )
                            )
                        ),
                        $('<h6>').append(
                            $('<a>').addClass('reset-anchor').attr('href', 'detail.html').text(productName)
                        ),
                        $('<p>').addClass('small text-muted').text(productPrice)
                    )
                )
            );

        });
    });