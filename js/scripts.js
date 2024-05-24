document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const errorMessage = document.getElementById('error-message');
    const logoutButton = document.getElementById('logoutButton');

    const users = JSON.parse(localStorage.getItem('banco-dados')) || [];

    // Função para exibir mensagens
    function showMessage(message, isError = false) {
        errorMessage.textContent = message;
        errorMessage.style.color = isError ? 'red' : 'green';
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }

    // Função para registrar um novo usuário
    const registraUsuario = (inputNome, inputCpf, inputGen, inputEmail, inputSenha, inputSenhaVerifica) => {
        if (inputSenha.value == inputSenhaVerifica.value) {
            // Deixando o label em verde porque as senhas conferem.
            document.querySelector("label[for=idConfirmaSenha]").setAttribute("class", "sucesso");

            // Voltando o campo ao normal quando recebe o foco;
            inputSenhaVerifica.addEventListener("focus", () => {
                document.querySelector("label[for=idConfirmaSenha]").setAttribute("class", "");
            });

            const usuario = {
                nome: inputNome.value,
                cpf: inputCpf.value,
                genero: inputGen.value,
                email: inputEmail.value,
                senha: inputSenha.value,
            };

            // Recupera o banco do localStorage e adiciona o objeto na lista de usuários:
            let listaUsuarios = JSON.parse(localStorage.getItem("banco-dados")) || [];

            // Adicionando de fato o objeto na lista com o método push;
            listaUsuarios.push(usuario);

            // Adicionando a listaUsuarios novamente no LocalStorage:
            localStorage.setItem("banco-dados", JSON.stringify(listaUsuarios));
            showMessage('Usuário registrado com sucesso!', false);
            return false;
        } else {
            // Deixando o label em vermelho porque as senhas não conferem.
            document.querySelector("label[for=idConfirmaSenha]").setAttribute("class", "erro");
            // Voltando o campo ao normal quando recebe o foco;
            inputSenhaVerifica.addEventListener("focus", () => {
                document.querySelector("label[for=idConfirmaSenha]").setAttribute("class", "");
            });
            showMessage('As senhas não conferem!', true);
            return false;
        }
    };

    // Função para realizar login
    function login(email, password) {
        const user = users.find(user => user.email === email && user.senha === password);
        if (user) {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'index.html';
        } else {
            showMessage('Email ou senha inválidos', true);
        }
    }

    // Função para realizar logout
    function logout() {
        sessionStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }

    // Event listener para o formulário de login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginForm.email.value;
            const password = loginForm.password.value;
            login(email, password);
        });
    }

    // Event listener para o formulário de cadastro
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = signupForm.idNome;
            const cpf = signupForm.idCpf;
            const gen = signupForm.idGen;
            const email = signupForm.idEmail;
            const senha = signupForm.idSenha;
            const senhaVerifica = signupForm.idConfirmaSenha;
            registraUsuario(nome, cpf, gen, email, senha, senhaVerifica);
        });
    }

    // Event listener para o botão de logout
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }

    // Verificação do usuário logado na página index
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser && window.location.pathname.includes('index.html')) {
        document.getElementById('user-name').textContent = currentUser.nome;
        document.getElementById('user-email').textContent = currentUser.email;
    } else if (!currentUser && window.location.pathname.includes('index.html')) {
        window.location.href = 'login.html';
    }
});
