document.getElementById("form-login").addEventListener("submit", function(event) {
    event.preventDefault();

    const data = {
        username: document.querySelector("#username").value,
        password: document.querySelector("#password").value,
    };
    sendData(data);
});
document.getElementById("form-cadastro").addEventListener("submit", function(event) {
    event.preventDefault();

    const dados = {
        nome: document.querySelector("#nomecad").value,
        username: document.querySelector("#usernamecad").value,
        password: document.querySelector("#passwordcad").value,
        email: document.querySelector("#emailcad").value,
        cpf: document.querySelector("#cpf").value
    };
    if (document.querySelector("#passwordcad").value != document.querySelector("#repasswordcad").value) {
        Swal.fire({

            icon: 'info',
            title: 'As senhas não se coincidem!',
            showConfirmButton: false,
            timer: 1500
        })
    } else {
        sendDataCadastro(dados);
    }
});
async function sendData(data) {
    try {
        const response = await fetch("https://api.geniusleap.cloud/api/marloscardoso/loginusuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (result.message == 'Logado.') {
            // Salvar o token no sessionStorage ou localStorage
            localStorage.setItem("token", result.token);
            localStorage.setItem("username", data.username)
            localStorage.setItem("usercpf", result.cpf)
            let timerInterval
            Swal.fire({
                title: 'Verificando Credenciais...',
                html: '',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,

                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    location.href = '/cart.html'
                }
            })
        } else {
            Swal.fire({

                icon: 'error',
                title: 'Credenciais Inválidas',
                showConfirmButton: false,
                timer: 1500
            })
        }



        // Ou localStorage.setItem("token", result.token);
        console.log(result);
    } catch (error) {
        console.error("Erro ao enviar dados para o servidor", error);
    }
}




async function sendDataCadastro(dados) {
    try {
        const response = await fetch("https://api.geniusleap.cloud/api/marloscardoso/cadastrocliente", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });
        const result = await response.json();
        if (result.message == 'Cadastrado') {

            let timerInterval
            Swal.fire({
                icon: 'success',
                title: 'Conta Criada Com Sucesso',
                html: 'Boas Compras',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,

                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    location.reload()
                }
            })
        } else {
            Swal.fire({

                icon: 'error',
                title: 'Usuario/Email Indisponivel!',
                showConfirmButton: false,
                timer: 1500
            })
        }



        // Ou localStorage.setItem("token", result.token);
        console.log(result);
    } catch (error) {
        console.error("Erro ao enviar dados para o servidor", error);
    }
}