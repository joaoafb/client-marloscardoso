document.addEventListener("DOMContentLoaded", products())









function products() {



    fetch('https://api.marloscardoso.com/api/marloscardoso/listprodutos')
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
                                        $('<img>').addClass('img-fluid w-100').attr('src', productImageSrc).attr('alt', '...')
                                    ),
                                    $('<div>').addClass('product-overlay').append(
                                        $('<ul>').addClass('mb-0 list-inline').append(


                                            $('<li>').addClass('list-inline-item me-0').on('click', productview).append(
                                                $('<a>').addClass('btn btn-sm btn-outline-dark').attr('href', '#productView').attr('data-bs-toggle', 'modal').append(
                                                    $('<i>').addClass('fas fa-expand')
                                                )
                                            )
                                        )
                                    )
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
                function productview() {
                    document.querySelector("#product-title").innerHTML = produto.titulo
                    document.querySelector("#product-description").innerHTML = produto.descricao
                    document.querySelector("#product-price").innerHTML = 'R$' + produto.valor
                    $('#product-image').css('background-image', 'url(' + produto.img + ')');

                }

            });
        });



}