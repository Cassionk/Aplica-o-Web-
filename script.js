document.getElementById('cepForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const cep = document.getElementById('cep').value.trim();
    const resultado = document.getElementById('resultado');
    const loading = document.getElementById('loading');

    if (cep === "") {
        alert("Por favor, preencha o campo de CEP.");
        return;
    }

    if (!/^[0-9]{8}$/.test(cep)) {
        alert("Digite um CEP válido com 8 números.");
        return;
    }

    loading.style.display = "block";
    resultado.style.display = "none";
    resultado.innerHTML = "";

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            loading.style.display = "none";
            if (data.erro) {
                alert("CEP não encontrado!");
                return;
            }

            resultado.style.display = "block";
            resultado.innerHTML = `
                <table>
                    <tr><th>Logradouro</th><td>${data.logradouro}</td></tr>
                    <tr><th>Bairro</th><td>${data.bairro}</td></tr>
                    <tr><th>Cidade</th><td>${data.localidade}</td></tr>
                    <tr><th>Estado</th><td>${data.uf}</td></tr>
                    <tr><th>CEP</th><td>${data.cep}</td></tr>
                </table>
            `;
        })
        .catch(error => {
            loading.style.display = "none";
            alert("Erro ao consultar o CEP.");
            console.error(error);
        });
});
