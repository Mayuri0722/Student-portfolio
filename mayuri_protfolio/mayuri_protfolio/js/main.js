(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const typing = document.querySelector('.typing');
  const scrollTop = document.getElementById('scrollTop');
  const year = document.getElementById('year');

  // Year
  if (year) year.textContent = new Date().getFullYear();

  // Theme persistence
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    if (themeToggle) themeToggle.textContent = '🌙';
  } else {
    root.removeAttribute('data-theme');
    if (themeToggle) themeToggle.textContent = '🌤️';
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      if (isDark) {
        root.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌤️';
      } else {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '🌙';
      }
    });
  }

  // Typing effect
  function typeText(el) {
    if (!el) return;
    const text = el.getAttribute('data-text') || '';
    let i = 0;
    function step() {
      el.textContent = text.slice(0, i);
      i = (i + 1) % (text.length + 30);
      requestAnimationFrame(() => setTimeout(step, 50));
    }
    step();
  }
  typeText(typing);

  // Skills progress bars
  function initSandglasses() {
    document.querySelectorAll('.sandglass').forEach((node) => {
      const value = Number(node.getAttribute('data-value') || 0);
      const skillName = node.getAttribute('data-skill') || '';

      const labelEl = document.createElement('div');
      labelEl.className = 'label';
      
      const skillNameEl = document.createElement('span');
      skillNameEl.className = 'skill-name';
      skillNameEl.textContent = skillName;
      
      const pctEl = document.createElement('span');
      pctEl.className = 'pct';
      pctEl.textContent = value + '%';
      
      labelEl.appendChild(skillNameEl);
      labelEl.appendChild(pctEl);
      
      const progressWrapper = document.createElement('div');
      progressWrapper.className = 'progress-bar-wrapper';
      
      const progressFill = document.createElement('div');
      progressFill.className = 'progress-bar-fill';
      
      progressWrapper.appendChild(progressFill);
      
      node.appendChild(labelEl);
      node.appendChild(progressWrapper);

      // Animate progress bar fill
      requestAnimationFrame(() => {
        progressFill.style.width = value + '%';
      });
    });
  }
  initSandglasses();

  // Scroll top
  function onScroll() {
    if (!scrollTop) return;
    const show = window.scrollY > 360;
    scrollTop.classList.toggle('show', show);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (scrollTop) {
    scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Contact form (client-side demo)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = String(fd.get('name') || '').trim();
      const email = String(fd.get('email') || '').trim();
      const message = String(fd.get('message') || '').trim();
      if (!name || !email || !message) {
        if (status) status.textContent = 'Please fill in all the fields.';
        return;
      }
      if (status) status.textContent = 'Thanks! Your message has been noted (demo).';
      form.reset();
    });
  }

  // Certificate/Event Modal
  const certModal = document.getElementById('certModal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalClose = document.querySelector('.modal-close');
  const modalOverlay = document.querySelector('.modal-overlay');

  function openModal(imageSrc, title) {
    if (modalImage) modalImage.src = imageSrc;
    if (modalTitle) modalTitle.textContent = title;
    if (certModal) {
      certModal.classList.add('active');
      certModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (certModal) {
      certModal.classList.remove('active');
      certModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  // Certificate cards
  document.querySelectorAll('.cert-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const imageSrc = card.getAttribute('data-cert-image');
      const title = card.getAttribute('data-cert-title');
      if (imageSrc && title) {
        openModal(imageSrc, title);
      }
    });
  });

  // Event cards
  document.querySelectorAll('.event-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const imageSrc = card.getAttribute('data-event-image');
      const title = card.getAttribute('data-event-title');
      if (imageSrc && title) {
        openModal(imageSrc, title);
      }
    });
  });

  // Close modal
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
  }

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
      closeModal();
    }
  });
})();


