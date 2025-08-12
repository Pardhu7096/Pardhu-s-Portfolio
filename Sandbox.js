 document.querySelectorAll('.navbar .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const nav = document.getElementById('navbarNav');
      if (nav.classList.contains('show')) new bootstrap.Collapse(nav).hide();
    });
  });

  // Highlight active link on scroll
  const header = document.querySelector('.navbar');
  const offset = header ? header.offsetHeight + 8 : 80;
  document.querySelectorAll('section[id]').forEach(s => s.style.scrollMarginTop = offset + 'px');

  const links = [...document.querySelectorAll('.navbar .nav-link')];
  const map = {};
  links.forEach(a => { const id = a.getAttribute('href').slice(1); map[id] = a; });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        if (map[id]) map[id].classList.add('active');
      }
    });
  }, { root: null, rootMargin: `-${offset}px 0px -70% 0px`, threshold: 0.1 });

  document.querySelectorAll('section[id]').forEach(s => io.observe(s));


   window.addEventListener('load', () => {
    const ss = bootstrap.ScrollSpy.getOrCreateInstance(document.body, {
      target: '#navbarNav', offset: 90
    });
    ss.refresh();
  });