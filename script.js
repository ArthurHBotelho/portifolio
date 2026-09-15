// Realça o item ativo no menu superior conforme a rolagem da página
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.sheet-bar nav a');
  const sections = Array.from(links)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  function setActiveLink() {
    let current = sections[0];
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      if (section.offsetTop <= scrollPosition) {
        current = section;
      }
    });

    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current.id);
    });
  }

  document.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();
});
