document.getElementById("formContact").addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Mostra "Enviando..." (mantendo seu código original)
    const status = document.getElementById("msgStatus");
    status.innerText = "Enviando...";
    status.classList.remove("d-none");

    // Envia os dados (MESMO código que já funcionava)
    fetch("assets/php/send.php", {
        method: "POST",
        body: new FormData(this)
    })
    .then(response => {
        if (!response.ok) throw new Error("Falha na rede");
        return response.json();
    })
    .then(data => {
        // 1. MOSTRA ALERTA (adicionado)
        alert(data.message); 

        // 2. LIMPA FORMULÁRIO (adicionado)
        if (data.success) {
            this.reset();
        }
    })
    .catch(error => {
        alert("Erro: " + error.message); // Alerta de erro (adicionado)
    })
    .finally(() => {
        status.innerText = ""; // Limpa o status (original)
        status.classList.add("d-none");
    });
});