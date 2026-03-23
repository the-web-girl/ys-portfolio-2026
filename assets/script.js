// ===========================
// PAGE NAVIGATION
// ===========================
    function showPage(pageId) {
    // Hide all pages
      document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-hidden', 'true');
      });
      // Show target
      const target = document.getElementById('page-' + pageId);
      if (target) {
        target.classList.add('active');
        target.removeAttribute('aria-hidden');
      }
      // Update nav links
      document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
        a.classList.remove('active');
        a.removeAttribute('aria-current');
        if (a.dataset.page === pageId) {
          a.classList.add('active');
          a.setAttribute('aria-current', 'page');
        }
      });
      // Close mobile nav
      document.getElementById('nav-links').classList.remove('open');
      document.getElementById('nav-toggle').setAttribute('aria-expanded', 'false');
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Trigger reveal animations
      setTimeout(() => observeReveal(), 100);
      return false;
    }

    // Init: hide aria on non-active pages
    document.querySelectorAll('.page').forEach(p => {
      if (!p.classList.contains('active')) p.setAttribute('aria-hidden', 'true');
    });

// ===========================
// HAMBURGER MENU
// ===========================
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen.toString());
    });

// ===========================
// SCROLL REVEAL
// ===========================
    function observeReveal() {
      const els = document.querySelectorAll('.page.active .reveal:not(.visible)');
      if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
        }, { threshold: 0.12 });
        els.forEach(el => obs.observe(el));
      } else {
        els.forEach(el => el.classList.add('visible'));
      }
    }
    window.addEventListener('load', observeReveal);

// ===========================
// BACK TO TOP
// ===========================
    const btt = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
      btt.classList.toggle('show', window.scrollY > 400);
    });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===========================
// PROJECT FILTER
// ===========================
    function filterProjets(btn, cat) {
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      document.querySelectorAll('.projet-card').forEach(card => {
        if (cat === 'all' || card.dataset.cat === cat) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    }

// ===========================
// CONTACT FORM VALIDATION
// ===========================
    document.getElementById('contact-form').addEventListener('submit', function(e) {
      e.preventDefault();
      let valid = true;

      function validate(id, errorId, condition) {
        const el = document.getElementById(id);
        const err = document.getElementById(errorId);
        if (!condition(el)) {
          el.classList.add('invalid');
          err.style.display = 'block';
          valid = false;
        } else {
          el.classList.remove('invalid');
          err.style.display = 'none';
        }
      }

      validate('prenom', 'prenom-error', el => el.value.trim().length > 0);
      validate('nom', 'nom-error', el => el.value.trim().length > 0);
      validate('email', 'email-error', el => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value));
      validate('objet', 'objet-error', el => el.value !== '');
      validate('message', 'message-error', el => el.value.trim().length > 5);

      const rgpd = document.getElementById('rgpd');
      const rgpdErr = document.getElementById('rgpd-error');
      if (!rgpd.checked) {
        rgpdErr.style.display = 'block';
        valid = false;
      } else {
        rgpdErr.style.display = 'none';
      }

      if (valid) {
        document.getElementById('form-success').style.display = 'block';
        this.reset();
        setTimeout(() => { document.getElementById('form-success').style.display = 'none'; }, 6000);
      }
    });

    // Live validation removal
    ['prenom','nom','email','objet','message'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', () => {
        el.classList.remove('invalid');
        const err = document.getElementById(id + '-error');
        if (err) err.style.display = 'none';
      });
    });