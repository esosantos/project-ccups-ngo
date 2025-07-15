document.addEventListener("DOMContentLoaded", function () {
  // Seleciona todos os links do menu que devem fechar o offcanvas
  const navLinks = document.querySelectorAll('#offcanvasNavbar .nav-link');
  
  // Pega o offcanvas pelo id
  const offcanvasElement = document.getElementById('offcanvasNavbar');

  // Instancia o objeto do Bootstrap para controlar o offcanvas
  const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Fecha o offcanvas via método oficial do Bootstrap
      bsOffcanvas.hide();
    });
  });
});


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



