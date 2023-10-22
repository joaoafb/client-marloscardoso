document.addEventListener("DOMContentLoaded", function() {
    fetch(`https://api.geniusleap.cloud/api/marloscardoso/listapedidosuser?cpf=${localStorage.getItem("usercpf")}`)
        .then(response => response.json())
        .then(data => {
            data.reverse();

            data.forEach(item => {




                var containerDiv = $('<div>').addClass('container mt-1');
                var cardDiv = $('<div>').addClass('card');

                // Create card body div
                var cardBodyDiv = $('<div>').addClass('card-body');

                // Create card elements and set their content
                item.pedido.forEach(pedido => {

                    var cardTitle = $('<h5>').addClass('card-title').text(pedido.title)
                    cardBodyDiv.append(cardTitle)

                })
                var cardText1 = $('<p>').addClass('card-text').text('Código do Pedido: ' + item.token);
                var cardText2 = $('<p>').addClass('card-text').text('Status: ' + item.status);
                if (item.status == 'Pedido Postado') {

                    var cardText3 = $('<p>').addClass('card-text').text('Código de Rastreio: ' + item.codRastreio);
                } else {
                    var cardText3 = $('<p>').addClass('card-text').text('Código de Rastreio Não Disponível');
                }
                var cardText4 = $('<p>').addClass('card-text').text('Valor Total: R$' + item.pricetotal);
                var cardText5 = $('<p>').addClass('card-text').text('Data:' + item.data);
                cardBodyDiv.append(cardText1, cardText2, cardText3, cardText4, cardText5);
                cardDiv.append(cardBodyDiv);
                containerDiv.append(cardDiv);

                if (item.status == 'Aguardando Pagamento') {

                    const button = document.createElement("button")
                    button.textContent = 'Pagar Agora'
                    button.className = 'btn btn-dark'
                    button.onclick = function() {
                        sessionStorage.setItem("tokenpedidopagamento", item.token)
                        Swal.fire({
                            icon: 'info',
                            title: 'Opções de Pagamento.',
                            showDenyButton: true,
                            showCancelButton: true,
                            confirmButtonText: 'Pagamento Online',
                            denyButtonText: `Pagamento à combinar`,
                            confirmButtonColor: '#000',
                            denyButtonColor: '#000',
                            cancelButtonText: 'Voltar'
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                const link = item.linkPagamento; // Substitua pela URL do link que deseja abrir
                                window.open(link, '_blank');

                            } else if (result.isDenied) {


                                pedidoCombinar()
                                async function pedidoCombinar() {
                                    const pedidoId = sessionStorage.getItem("tokenpedidopagamento")



                                    try {
                                        const response = await fetch(`https://api.geniusleap.cloud/api/pagamento-combinar/${pedidoId}`, {
                                            method: 'PUT',
                                        });

                                        if (!response.ok) {
                                            throw new Error('Erro na requisição.');
                                        }

                                        const data = await response.json();


                                    } catch (error) {
                                        const link = 'https://wa.me/5574988274544?text= Pagamento Pedido: ' + pedidoId; // Substitua pela URL do link que deseja abrir
                                        window.open(link, '_blank');
                                    }
                                }

                            }
                        })




                    }
                    cardBodyDiv.append(button);

                }
                if (item.status == 'Pedido Postado') {

                    const button = document.createElement("button")
                    button.textContent = 'Rastrear'
                    button.className = 'btn btn-dark'
                    button.onclick = function() {
                        window.open("https://linketrack.com/track?codigo=" + item.codRastreio + "&utm_source=footer", '_blank')



                    }
                    cardBodyDiv.append(button);

                }
                if (item.status == 'Compra Aprovada') {

                    const button = document.createElement("button")
                    button.textContent = 'Consultar Pedido'
                    button.className = 'btn btn-dark'
                    button.onclick = function() {
                        Swal.fire({

                            icon: 'info',
                            title: 'Serviço Indiponível no momento!',
                            showConfirmButton: false,
                            timer: 1500
                        })



                    }

                    cardBodyDiv.append(button);
                }


                $('#table').append(containerDiv);
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
})