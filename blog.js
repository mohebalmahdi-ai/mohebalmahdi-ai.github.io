(() => {
  const grid = document.getElementById('article-grid');
  const search = document.getElementById('article-search');
  const buttons = [...document.querySelectorAll('[data-category]')];
  if (!grid || !search || !Array.isArray(window.MOHEBALMAHDI_POSTS)) return;
  let category = 'همه';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  function render() {
    const term = search.value.trim().toLocaleLowerCase('fa');
    const posts = window.MOHEBALMAHDI_POSTS.filter(post => {
      const matchesCategory = category === 'همه' || post.category === category;
      const haystack = `${post.title} ${post.excerpt} ${post.category}`.toLocaleLowerCase('fa');
      return matchesCategory && haystack.includes(term);
    });
    grid.innerHTML = posts.length ? posts.map(post => `
      <article class="article-card">
        <div class="article-top"><span class="article-category">${esc(post.category)}</span><span>${esc(post.date)}</span></div>
        <h2>${esc(post.title)}</h2><p>${esc(post.excerpt)}</p>
        <div class="article-top"><span>زمان مطالعه: ${esc(post.readTime)}</span></div>
        <a class="text-link" href="${esc(post.url || '#')}">${post.url && post.url !== '#' ? 'خواندن مقاله' : 'به‌زودی تکمیل می‌شود'} <span>↗</span></a>
      </article>`).join('') : '<div class="article-empty">مقاله‌ای با این جست‌وجو پیدا نشد.</div>';
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    category = button.dataset.category;
    buttons.forEach(item => item.classList.toggle('active', item === button));
    render();
  }));
  search.addEventListener('input', render);
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  render();
})();
