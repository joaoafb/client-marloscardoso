function checkout() {
    if (document.querySelector("#total-price").textContent == "R$0") {
        let timerInterval
        Swal.fire({
            title: 'Adicione ao menos um produto!',
            html: 'Redirencionando a página de produtos🕤',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,

            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                location.href = './shop.html'
            }
        })
    } else {
        document.querySelector("#btnComprar").disabled = true
        document.querySelector("#btnComprar").innerHTML = 'Aguarde...'

        setTimeout(() => {
            login()
        }, 1500);
    }
}

function login() {
    if (localStorage.getItem("token") === null || localStorage.getItem("token") === undefined || localStorage.getItem("token") === '') {

        let timerInterval
        Swal.fire({
            showConfirmButton: false,
            title: 'Faça Login Primeiro.',
            html: 'Redirecionando à página responsavel.',
            timer: 2000,
            timerProgressBar: true,

            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                location.href = './login.html'
            }
        })
    } else {
        usuario()
    }
}

function usuario() {
    if (localStorage.getItem("userstore") === null || localStorage.getItem("userstore") === undefined) {
        Swal.fire({
            title: "Qual Seu Nome?",
            input: "text",
            showCancelButton: true,
            confirmButtonText: "Continuar",
            cancelButtonText: "Voltar",
            preConfirm: (text) => {
                // Armazena o texto no localStorage
                localStorage.setItem("userstore", text);
                return text;
            },
        }).then((result) => {
            location.href = './checkout.html'
        });
    } else {
        location.href = './checkout.html'
    }
}

document.addEventListener("DOMContentLoaded", function() {
    function obterProdutosDoLocalStorage() {
        // Verificar se existem produtos salvos no localStorage
        const produtosSalvos = localStorage.getItem('Cart');

        // Se não houver produtos salvos, retornar um array vazio
        if (!produtosSalvos) {
            return [];
        }

        // Converter a string JSON em um objeto
        const produtosObjeto = JSON.parse(produtosSalvos);

        // Retornar os produtos como um array
        return Object.values(produtosObjeto);
    }


    // Chamar a função para obter os produtos do localStorage
    const produtos = obterProdutosDoLocalStorage();

    // Função para somar os valores da propriedade "price" de todos os objetos no array
    function somarValoresPriceLocalStorage() {

        const savedData = JSON.parse(localStorage.getItem('Cart')) || [];

        const total = savedData.map(objeto => objeto.price)
            .reduce((acumulador, valorAtual) => acumulador + parseFloat(valorAtual), 0);

        const tfrete = savedData.map(objeto => objeto.frete)
            .reduce((acumulador, valorAtual) => acumulador + parseFloat(valorAtual), 0);
        console.log(parseInt(total) + parseInt(tfrete))



        document.querySelector("#total-price").innerHTML = 'R$' + total + ' + R$' + parseInt(tfrete) + ' (Frete)'

    }

    // Exemplo de uso da função
    somarValoresPriceLocalStorage();


    if (produtos.length == 0) {
        document.querySelector("#table-products").innerHTML = `
        <p>Adicione produtos ao seu carrinho</p>
        `
    }
    // Percorrer a lista de produtos
    produtos.forEach(function(produto, indice) {
        // Criar o elemento <tr> com os dados do produto
        const tr = $('<tr>').append(
            $('<th>').addClass('ps-0 py-3 border-light').attr('scope', 'row').append(
                $('<div>').addClass('d-flex align-items-center').append(
                    $('<a>').addClass('reset-anchor d-block animsition-link').attr('href', 'detail.html#' + produto.title).append(
                        $('<img>').attr('src', produto.image).attr('alt', '...').attr('width', '70')
                    ),
                    $('<div>').addClass('ms-3').append(
                        $('<strong>').addClass('h6').append(
                            $('<a>').addClass('reset-anchor animsition-link').attr('href', 'detail.html#' + produto.title).text(produto.title)
                        )
                    )
                )
            ),
            $('<td>').addClass('p-3 align-middle border-light').append(
                $('<p>').addClass('mb-0 small').text('R$' + produto.price + ' Frete: R$' + produto.frete)
            ),

            $('<td>').addClass('p-3 align-middle border-light').append(
                $('<a>').addClass('reset-anchor delete-link').attr('href', '#').data('indice', indice).append(
                    $('<i>').addClass('fas fa-trash-alt small text-muted')
                )

            )

        );
        tr.find('.delete-link').on('click', function() {


                try {
                    //codigo para apagar dados
                    excluirCart(produto.token)

                    // Exibir a modal de sucesso com SweetAlert
                    Swal.fire({
                        icon: 'success',
                        title: 'Item removido do carrinho',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        window.location.reload()
                    }, 1550);
                } catch (error) {
                    // Exibir a modal de erro com SweetAlert
                    console.log(error)
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro ao remover item do carrinho',
                        text: error.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }



            })
            // Adicionar o elemento <tr> à tabela desejada
        $('#table-products').append(tr);


        // Exibir o título e o índice no console

    });
});


function excluirCart(token) {
    if (typeof localStorage !== 'undefined') {
        const savedData = JSON.parse(localStorage.getItem('Cart')) || [];
        const indexToRemove = savedData.findIndex(objeto => objeto.token === token);
        if (indexToRemove !== -1) {
            savedData.splice(indexToRemove, 1);
            localStorage.setItem('Cart', JSON.stringify(savedData));
            console.log(savedData);
        } else {
            console.log('Não foi encontrado nenhum objeto com a idade especificada.');
        }
    } else {
        console.log('O localStorage não é suportado neste navegador.');
    }
}