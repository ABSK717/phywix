document.addEventListener('DOMContentLoaded', () => {
  const cards = Array.from(document.querySelectorAll('#knowledgeGrid .article-card'));
  const searchInput = document.getElementById('knowledgeSearch');
  const filterButtons = document.querySelectorAll('.filter-chip');
  const pagination = document.getElementById('pagination');
  const pageSize = 4;
  let currentPage = 1;
  let activeFilter = 'all';
  let searchValue = '';

  const getFilteredCards = () => cards.filter((card) => {
    const category = card.dataset.category || '';
    const title = (card.dataset.title || '').toLowerCase();
    const tags = (card.dataset.tags || '').toLowerCase();
    const matchesFilter = activeFilter === 'all' || category === activeFilter;
    const matchesSearch = title.includes(searchValue) || tags.includes(searchValue);
    return matchesFilter && matchesSearch;
  });

  const render = () => {
    const filteredCards = getFilteredCards();
    const totalPages = Math.max(1, Math.ceil(filteredCards.length / pageSize));
    currentPage = Math.min(currentPage, totalPages);

    cards.forEach((card) => {
      card.style.display = 'none';
    });

    filteredCards.slice((currentPage - 1) * pageSize, currentPage * pageSize).forEach((card) => {
      card.style.display = '';
    });

    pagination.innerHTML = '';
    for (let i = 1; i <= totalPages; i += 1) {
      const button = document.createElement('button');
      button.textContent = i;
      button.type = 'button';
      if (i === currentPage) button.classList.add('active');
      button.addEventListener('click', () => {
        currentPage = i;
        render();
      });
      pagination.appendChild(button);
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((chip) => chip.classList.remove('active'));
      button.classList.add('active');
      activeFilter = button.dataset.filter || 'all';
      currentPage = 1;
      render();
    });
  });

  searchInput?.addEventListener('input', (event) => {
    searchValue = event.target.value.trim().toLowerCase();
    currentPage = 1;
    render();
  });

  render();
});
