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


// Slide - autoplay do slide do TEAM
const track = document.querySelector('.team-carousel');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

let index = 0;
let autoplay;

function moveCarousel() {
  const cards = document.querySelectorAll('.team-card');
  const cardWidth = cards[0].offsetWidth + 24; // largura + gap
  const visibleCards = getVisibleCards();
  const maxIndex = cards.length - visibleCards;

  if (index > maxIndex) index = 0;
  if (index < 0) index = maxIndex;

  track.style.transform = `translateX(-${index * cardWidth}px)`;
}

function getVisibleCards() {
  if (window.innerWidth < 576) return 1;
  if (window.innerWidth < 992) return 2;
  return 4;
}

nextBtn.addEventListener('click', () => {
  index++;
  moveCarousel();
});

prevBtn.addEventListener('click', () => {
  index--;
  moveCarousel();
});

function startAutoplay() {
  autoplay = setInterval(() => {
    index++;
    moveCarousel();
  }, 5000);
}

function stopAutoplay() {
  clearInterval(autoplay);
}

track.addEventListener('mouseenter', stopAutoplay);
track.addEventListener('mouseleave', startAutoplay);

startAutoplay();


//CÓDIGO PARA O CONTACT
function ccupsHandleSubmit(e) {
  const form = e.target;
  const feedback = document.getElementById('ccupsFormFeedback');
  feedback.className = 'alert alert-info mt-3';
  feedback.textContent = 'Enviando...';
  feedback.classList.remove('d-none');

  setTimeout(() => {
    feedback.className = 'alert alert-success mt-3';
    feedback.textContent = 'Obrigado! Sua mensagem foi enviada com sucesso.';
    form.reset();
  }, 1200);
  return true;
}

//modal foto da ONG

  function openImageModal(imgElement) {
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imgElement.src;
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));
    modal.show();
  }


  //INSERIR OS LABELS DAS TABELAS DE HORARIOS
document.addEventListener("DOMContentLoaded", function () {
  const headers = Array.from(document.querySelectorAll(".table-mobile thead th")).map(
    (th) => th.innerText
  );

  document.querySelectorAll(".table-mobile tbody tr").forEach((row) => {
    row.querySelectorAll("td").forEach((td, idx) => {
      if (!td.hasAttribute("data-label")) {
        td.setAttribute("data-label", headers[idx]);
      }
    });
  });
});



// Contador - quando chegar na parte do numeros
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => {
    observer.observe(counter);
  });

  function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const duration = 4000; // 4 segundos
    const startTime = performance.now();
    const hasPlus = counter.textContent.includes('+');

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);
      
      counter.textContent = hasPlus ? `${value}+` : value;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = hasPlus ? `${target}+` : target;
      }
    }

    requestAnimationFrame(update);
  }
}

// Inicia quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", function() {
  // Seu código existente...
  initCounters(); // ← Adicione esta linha no final do DOMContentLoaded
});


document.addEventListener("DOMContentLoaded", function () {
  const aviso = document.getElementById("cookieNotice");
  const botao = document.getElementById("aceitarCookies");

  if (localStorage.getItem("cookies_aceitos") === "true") {
    aviso.classList.add("d-none");
  }

  botao.addEventListener("click", () => {
    localStorage.setItem("cookies_aceitos", "true");
    aviso.classList.add("d-none");
  });
});
