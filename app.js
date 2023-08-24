// Verifica se há algum dado no localStorage
const dadosNoLocalStorage = localStorage.getItem('Cart'); // Substitua 'seuItemLocalStorage' pelo nome do seu item

if (dadosNoLocalStorage && dadosNoLocalStorage != '[]') {
    Swal.fire({
        title: 'Produtos no Carrinho',
        text: 'Você tem produtos no carrinho. Deseja ir para o carrinho?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#000',
        confirmButtonText: 'Ir para o Carrinho',
        cancelButtonText: 'Continuar Comprando'
    }).then((result) => {
        if (result.isConfirmed) {
            // Redirecionar para a página cart.html
            window.location.href = 'cart.html';
        }
    });
}

fetch('https://api.geniusleap.cloud/api/marloscardoso/listcategorias')
    .then(response => response.json())
    .then(data => {

        data.forEach(item => {
            const categoria = $(`
  <div class="card">
    <img src="${item.img}" alt="Imagem de Fundo">
    <div class="overlay"></div>
    <h2 class="title">${item.titulo}</h2>
  </div>
`);

            categoria.click(() => {
                window.location.href = `./shop.html?cat=${item.titulo}`;
            });




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