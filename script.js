function go(id){
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  document.getElementById('mobileMenu').classList.remove('open');
}

function toggleMenu(){
  document.getElementById('mobileMenu').classList.toggle('open');
}

// Preenche as barras de nível com a largura definida no HTML
function fillGauges(scope){
  (scope || document).querySelectorAll('.gauge-fill').forEach(bar => {
    bar.style.width = bar.dataset.width || '0';
  });
}

// Animação de entrada dos cards/seções ao rolar a página
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        fillGauges(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
  fillGauges();
}

// Destaca o item ativo no menu conforme a seção visível
const navButtons = document.querySelectorAll('.nav-links button, .mobile-menu button');
const sectionIds = ['home', 'habilidades', 'sobre', 'experiencia', 'formacao', 'cursos', 'contato'];
const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

function setActiveNav(){
  let current = sections[0];
  const scrollPosition = window.scrollY + 120;

  sections.forEach(section => {
    if (section.offsetTop <= scrollPosition) current = section;
  });

  navButtons.forEach(btn => {
    const targetId = btn.getAttribute('onclick')?.match(/go\('(.+)'\)/)?.[1];
    btn.classList.toggle('active', targetId === current.id);
  });
}

document.addEventListener('scroll', setActiveNav, { passive: true });
setActiveNav();
