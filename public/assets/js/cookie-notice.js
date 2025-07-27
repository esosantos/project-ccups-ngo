document.addEventListener('DOMContentLoaded', function() {
  const cookieNotice = document.getElementById('cookieNotice');
  const acceptBtn = document.getElementById('aceitarCookies');
  
  // Verifica se já aceitou
  if (!localStorage.getItem('cookiesAceitos')) {
    // Mostra com delay para não atrapalhar carregamento
    setTimeout(() => {
      cookieNotice.classList.remove('d-none');
      setTimeout(() => cookieNotice.classList.add('show'), 10);
    }, 1000);
  }

  // Evento de aceitação
  acceptBtn.addEventListener('click', function() {
    localStorage.setItem('cookiesAceitos', 'true');
    cookieNotice.classList.remove('show');
    
    // Remove completamente após animação
    setTimeout(() => {
      cookieNotice.classList.add('d-none');
    }, 300);
  });
});