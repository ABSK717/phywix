document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('#projectsGrid .project-card');
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalOverview = document.getElementById('modalOverview');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalArchitecture = document.getElementById('modalArchitecture');
  const modalScreenshots = document.getElementById('modalScreenshots');
  const modalChallenges = document.getElementById('modalChallenges');
  const modalLessons = document.getElementById('modalLessons');
  const modalFuture = document.getElementById('modalFuture');

  const filterProjects = (value) => {
    cards.forEach((card) => {
      const categories = card.dataset.category || '';
      const shouldShow = value === 'all' || categories.includes(value);
      card.style.display = shouldShow ? '' : 'none';
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((chip) => chip.classList.remove('active'));
      button.classList.add('active');
      filterProjects(button.dataset.filter || 'all');
    });
  });

  document.querySelectorAll('.project-detail-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.project-card');
      modalTitle.textContent = card.dataset.title || 'Project';
      modalOverview.textContent = card.dataset.overview || '';
      modalFeatures.textContent = card.dataset.features || '';
      modalArchitecture.textContent = card.dataset.architecture || '';
      modalScreenshots.textContent = card.dataset.screenshots || '';
      modalChallenges.textContent = card.dataset.challenges || '';
      modalLessons.textContent = card.dataset.lessons || '';
      modalFuture.textContent = card.dataset.future || '';
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  };

  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });
});
