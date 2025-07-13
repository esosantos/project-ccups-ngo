
  /*Função com o objetivo de sinalizar qual link esta ativo*/
  document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
      link.addEventListener("click", function () {
        // Remove active de todos
        navLinks.forEach(l => l.classList.remove("active"));
        // Adiciona active no clicado
        this.classList.add("active");
      });
    });
  });

