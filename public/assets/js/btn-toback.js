document.addEventListener("DOMContentLoaded", () => {
  const scrollBtn = document.getElementById('scrollToTopBtn');
  const footer = document.getElementById('footer');

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const footerPosition = footer.offsetTop;

    if (scrollPosition >= footerPosition) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
