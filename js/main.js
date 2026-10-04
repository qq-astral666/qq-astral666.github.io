// Шапка: фон после скролла
const header = document.querySelector('header');
const onScroll = () => header.classList.toggle('scrolled', scrollY > 10);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Появление блоков при скролле (с задержкой внутри группы)
const groups = [
  'section:not(.hero) h2', 'section:not(.hero) .lead', '.apps-title', '.svc-note',
  '.svc-row', '.bot-demo', '.work', '.apps li', '.steps li', 'details', '.contact .btn', '.contact .mail'
];
groups.forEach(sel => {
  const els = document.querySelectorAll(sel);
  els.forEach((el, i) => {
    el.classList.add('reveal');
    if (els.length > 1 && !sel.includes('h2') && !sel.includes('.lead')) el.style.setProperty('--i', i % 6);
  });
});
if (reduce || !('IntersectionObserver' in window)) {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
} else {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

// Демо-чат крутится на чистом CSS — JS ему не нужен

// FAQ: плавное раскрытие и закрытие во всех браузерах (включая Safari)
document.querySelectorAll('details').forEach(d => {
  const summary = d.querySelector('summary');
  const body = d.querySelector('p');
  let anim = null, isOpen = d.open;
  summary.addEventListener('click', e => {
    if (reduce) return;
    e.preventDefault();
    if (anim) anim.cancel();
    const start = d.offsetHeight;
    const opening = !isOpen;
    isOpen = opening;
    if (opening) d.open = true;
    const end = opening ? summary.offsetHeight + body.offsetHeight : summary.offsetHeight;
    anim = d.animate({ height: [start + 'px', end + 'px'] }, { duration: 380, easing: 'cubic-bezier(.22,1,.36,1)' });
    anim.onfinish = () => { anim = null; if (!opening) d.open = false; };
    anim.oncancel = () => { anim = null; };
  });
});
