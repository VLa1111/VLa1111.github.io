// Shared helpers for interactive case pages.
const $ = id => document.getElementById(id);

// Segmented control: buttons carrying data-<attr>; calls fn(value) on click.
function bindSeg(attr, fn) {
  const btns = document.querySelectorAll(`[data-${attr}]`);
  btns.forEach(b => b.addEventListener('click', () => {
    btns.forEach(x => x.setAttribute('aria-pressed', x === b));
    fn(b.dataset[attr]);
  }));
}
