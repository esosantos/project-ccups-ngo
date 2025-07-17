document.addEventListener("DOMContentLoaded", function () {
  // 1) FECHAR OFFCANVAS AO CLICAR NO MENU
  const navLinks = document.querySelectorAll('#offcanvasNavbar .nav-link');
  const offcanvasElement = document.getElementById('offcanvasNavbar');
  const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      bsOffcanvas.hide();
    });
  });

  // 2) MARCAR LINK ATIVO NO MENU
  const allNavLinks = document.querySelectorAll(".nav-link");
  allNavLinks.forEach(link => {
    link.addEventListener("click", function () {
      allNavLinks.forEach(l => l.classList.remove("active"));
      this.classList.add("active");
    });
  });



  // Botão copiar chave Pix
  document.getElementById("copyPixBtn").addEventListener("click", function () {
    const pixInput = document.getElementById("pixKeyInput");
    pixInput.select();
    pixInput.setSelectionRange(0, 99999); // Para mobile
    document.execCommand("copy");

    const feedback = document.getElementById("pixCopyFeedback");
    feedback.classList.remove("d-none");
    setTimeout(() => feedback.classList.add("d-none"), 2000);
  });

  // Corrigir touch no carousel da equipe (opcional)
  var carousel = document.querySelector("#teamCarousel");
  if (carousel) {
    var bsCarousel = bootstrap.Carousel.getInstance(carousel) || new bootstrap.Carousel(carousel);
    bsCarousel._config.touch = false;
  }
});
