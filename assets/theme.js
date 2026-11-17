(function () {
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let saved;
  try { saved = localStorage.getItem('portfolio-theme'); } catch (_) {}
  function apply(theme) {
    root.dataset.theme = theme;
    document.querySelectorAll('.theme-toggle').forEach(button => {
      button.textContent = theme === 'dark' ? '日间模式' : '夜览模式';
      button.setAttribute('aria-pressed', String(theme === 'dark'));
    });
  }
  apply(saved || (system.matches ? 'dark' : 'light'));
  document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.primary-nav, .top nav');
    if (!nav) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'theme-toggle';
    nav.append(button);
    apply(root.dataset.theme);
    button.addEventListener('click', () => {
      saved = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('portfolio-theme', saved); } catch (_) {}
      apply(saved);
    });
  });
  system.addEventListener('change', event => { if (!saved) apply(event.matches ? 'dark' : 'light'); });
})();
