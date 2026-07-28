document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  const scrollProgress = document.getElementById('scrollProgress');
  const themeToggle = document.getElementById('themeToggle');
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const siteNav = document.getElementById('siteNav');
  const backToTop = document.getElementById('backToTop');
  const year = document.getElementById('year');
  const toast = document.getElementById('toast');
  const form = document.getElementById('contactForm');

  if (year) year.textContent = new Date().getFullYear();

  setTimeout(() => {
    loadingScreen?.classList.add('hidden');
  }, 700);

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = `${progress}%`;
    backToTop.classList.toggle('show', scrollTop > 500);
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  const applyTheme = (theme) => {
    document.body.classList.toggle('light-theme', theme === 'light');
    document.body.classList.toggle('dark-theme', theme === 'dark');
    const icon = themeToggle?.querySelector('i');
    if (icon) {
      icon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
    document.documentElement.style.colorScheme = theme === 'light' ? 'light' : 'dark';
  };

  const savedTheme = localStorage.getItem('phywix-theme') || 'dark';
  applyTheme(savedTheme);

  themeToggle?.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
    applyTheme(nextTheme);
    localStorage.setItem('phywix-theme', nextTheme);
    showToast(nextTheme === 'light' ? 'Light theme enabled' : 'Dark theme enabled');
  });

  mobileNavToggle?.addEventListener('click', () => {
    const expanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
    mobileNavToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav?.classList.toggle('open');
  });

  document.querySelectorAll('.site-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.site-nav a').forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
      siteNav?.classList.remove('open');
      mobileNavToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));

  const counters = document.querySelectorAll('[data-counter]');
  counters.forEach((counter) => {
    const target = Number(counter.dataset.counter || 0);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = target.toString();
        clearInterval(timer);
      } else {
        counter.textContent = current.toString();
      }
    }, 30);
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
      showToast('Please fill in the required fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Please enter a valid email address.');
      return;
    }
    showToast('Message sent — thanks for reaching out.');
    form.reset();
  });

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast.timeout);
    showToast.timeout = setTimeout(() => toast.classList.remove('show'), 2400);
  }

  document.querySelectorAll('.button, .filter-chip, .text-link, .skill-card, .project-card').forEach((element) => {
    element.classList.add('magnetic');
    element.classList.add('ripple');
  });
});
