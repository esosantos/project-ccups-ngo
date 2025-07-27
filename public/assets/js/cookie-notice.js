document.addEventListener("DOMContentLoaded", function() {
    const cookieNotice = document.getElementById("cookieNotice");
    const acceptButton = document.getElementById("aceitarCookies");
    
    // Verifica se já foi aceito
    if (localStorage.getItem("cookiesAceitos") === "true") {
        cookieNotice.style.display = "none";
        return;
    }

    // Adiciona o evento de clique corretamente
    acceptButton.addEventListener("click", function() {
        // Salva no localStorage
        localStorage.setItem("cookiesAceitos", "true");
        
        // Animação de fade out antes de remover
        cookieNotice.style.transition = "opacity 0.5s ease";
        cookieNotice.style.opacity = "0";
        
        // Remove após a animação
        setTimeout(() => {
            cookieNotice.style.display = "none";
        }, 500);
    });

    // Mostra o aviso após 1 segundo
    setTimeout(() => {
        cookieNotice.style.opacity = "1";
    }, 1000);
});