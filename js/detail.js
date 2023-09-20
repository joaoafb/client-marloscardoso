function loadpage() {
    Swal.fire({
        showConfirmButton: false,
        title: 'Carregando...',
        onBeforeOpen: () => {
            Swal.showLoading();
        }
    });
    localStorage.setItem("valorfrete", 0)

    const hash = window.location.hash.substring(1);
    const decodedHash = decodeURIComponent(hash);
    fetch('https://api.geniusleap.cloud/api/marloscardoso/listprodutos')
        .then(response => response.json())
        .then(data => {
            Swal.close(); // Fecha o modal de carregamento
            data.forEach(item => {
                if (item.titulo == decodedHash) {
                    // Ajustar o acesso correto às propriedades do item
                    const produto = item;

                    document.querySelector("#product-title").innerHTML = produto.titulo;
                    document.querySelector("#product-price").innerHTML = 'R$' + produto.valor;
                    document.querySelector("#product-description").innerHTML = produto.descricao;
                    document.querySelector("#product-id").innerHTML = produto._id;
                    document.querySelector("#product-category").innerHTML = produto.categoria;
                    document.querySelector("#product-modelo").innerHTML = produto.modelo;
                    sessionStorage.setItem("peso", produto.peso)
                    sessionStorage.setItem("altura", produto.altura)
                    sessionStorage.setItem("comprimento", produto.comprimento)
                    sessionStorage.setItem("largura", produto.largura)

                    const btn = document.createElement("button");
                    btn.style.width = "80%";

                    btn.className = "btn btn-dark btn-sm btn-block d-flex align-items-center justify-content-center  px-0";
                    btn.style.height = '50px'
                    btn.id = 'btnComprar'

                    sessionStorage.setItem("valorproduto", produto.valor)

                    btn.innerText = "Adicionar ao carrinho R$" + Number(sessionStorage.getItem("valorproduto"))
                    btn.onclick = function() {
                        btn.innerHTML = 'Aguarde...'
                        setTimeout(() => {
                            // Suponha que você tenha uma array chamada "carrinho"
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
                                    frete: localStorage.getItem("valorfrete"),
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
                                    location.href = './cart.html'
                                }
                            })
                        }, 1000);
                    };

                    const btnback = document.createElement("button")
                    btnback.className = 'btn btn-outline-dark btn-sm'

                    btnback.textContent = 'Voltar ao catálogo'
                    btnback.onclick = function() {
                        history.back()
                    }

                    const btnshare = document.createElement("button")
                    btnshare.className = 'btn btn-outline-dark btn-sm'
                    btnshare.textContent = 'Compartilhar'

                    btnshare.style.marginLeft = '10px'
                    btnshare.onclick = function() {

                        const url = 'Conheça a Loja Marlos Cardoso! Estilo masculino elevado à máxima elegância. Link: ' + encodeURIComponent(window.location.href);
                        window.open(`https://wa.me/?text=${url}`, '_blank');

                    }
                    document.querySelector("#product-addcart").innerHTML = "";
                    document.querySelector("#product-addcart").appendChild(btn);
                    document.querySelector("#product-addcart").appendChild(btnback);
                    document.querySelector("#product-addcart").appendChild(btnshare);
                    document.querySelector("#product-img2").src = produto.img



                }
            });
        })
        .catch(error => {
            // Lida com erros da solicitação fetch, se houver
            console.error('Ocorreu um erro:', error);
        });

    document.getElementById('formFrete').addEventListener('submit', async(event) => {
        event.preventDefault();
        if (document.querySelector(".inputcep").value.length >= 8) {
            document.querySelector("#optionFrete").innerHTML = ''

            fetch('https://api.geniusleap.cloud/calcularFrete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        // Mesmos argumentos que você tinha antes
                        sCepOrigem: '48916623',
                        sCepDestino: document.querySelector(".inputcep").value,
                        nVlPeso: sessionStorage.getItem("peso"),
                        nCdFormato: '1',
                        nVlComprimento: sessionStorage.getItem("comprimento"),
                        nVlAltura: sessionStorage.getItem("altura"),
                        nVlLargura: sessionStorage.getItem("largura"),
                        nCdServico: ['04014', '04510'],
                        nVlDiametro: '0',
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.error = 'Erro ao calcular frete') {
                        Swal.fire(
                            'Triste',
                            'O sistema de rastreio esta com problemas',
                            'error'
                        )
                    }
                    data.forEach(item => {
                        const divResultadoFrete = $('<div class="resultfrete"></div>').on("click", function() {
                            localStorage.setItem("valorfrete", item.Valor)
                            console.log(item.Valor)
                            document.querySelector("#datafrete").innerHTML = 'Frete: R$' + item.Valor + ' | Prazo: ' + item.PrazoEntrega + ' dias'
                            const valorFrete = parseFloat(localStorage.getItem("valorfrete"));
                            const valorFreteRounded = Math.round(valorFrete);
                            localStorage.setItem("valorfrete", valorFreteRounded)




                            document.querySelector("#btnComprar").innerHTML = "Adicionar ao carrinho R$" + parseFloat(sessionStorage.getItem("valorproduto")) + ' + R$' + parseInt(`${valorFreteRounded}`) + ' (frete)'
                        });
                        const iElement = $('<i class="lni lni-delivery"></i>');
                        const divFlexColumn = $('<div class="flex column" style="flex-direction: column;display: flex;"></div>');
                        const labelPrazo = $(`<label for="">Prazo: ${item.PrazoEntrega} dias</label>`);
                        const labelValor = $(`<label for="">R$${item.Valor}</label>`);


                        // Anexar elementos
                        divFlexColumn.append(labelPrazo);
                        divFlexColumn.append(labelValor);
                        divResultadoFrete.append(iElement);
                        divResultadoFrete.append(divFlexColumn);

                        // Adicionar a opção de frete ao elemento com o ID #optionFrete usando appendChild do jQuery
                        $('#optionFrete').append(divResultadoFrete);

                    });
                })
                .catch(error => {
                    console.error("Erro ao calcular frete:", error);
                });

        } else {
            Swal.fire({

                icon: 'info',
                title: 'Digite corretamente seu cep.',
                showConfirmButton: false,
                timer: 1500
            })
        }

    });
}


// Use o evento 'DOMContentLoaded' e passe uma referência da função, em vez de executá-la
document.addEventListener("DOMContentLoaded", loadpage);