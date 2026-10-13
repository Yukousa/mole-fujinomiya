document.documentElement.classList.add('is-js');

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initDrawer();
  initFloating();
});

// 追従の相談ボタン：ヒーローが画面から外れたら出す（ヒーローより上に戻ったら隠す）
function initFloating() {
  const floating = document.querySelector('.js-floating');
  const hero = document.querySelector('.js-hero');
  if (!floating || !hero) return;

  const observer = new IntersectionObserver(([entry]) => {
    const passed = !entry.isIntersecting && entry.boundingClientRect.top < 0;
    floating.classList.toggle('is-visible', passed);
  });
  observer.observe(hero);
}

// ヘッダー：スクロールしたら背景を付ける
function initHeaderScroll() {
  const header = document.querySelector('.js-header');
  if (!header) return;

  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 0);
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

// ドロワー：フォーカストラップ／Esc で閉じる／開いたら内部へ、閉じたら呼び出し元へフォーカス
function initDrawer() {
  const drawer = document.querySelector('.js-drawer');
  const openButton = document.querySelector('.js-drawer-open');
  const closeButton = document.querySelector('.js-drawer-close');
  if (!drawer || !openButton || !closeButton) return;

  const links = drawer.querySelectorAll('.js-drawer-link');
  const focusables = [closeButton, ...links];
  const firstFocusable = focusables[0];
  const lastFocusable = focusables[focusables.length - 1];
  const pcQuery = window.matchMedia('(min-width: 768px)');

  const isOpen = () => drawer.classList.contains('is-open');

  const open = () => {
    drawer.classList.add('is-open');
    document.documentElement.classList.add('is-drawer-open');
    openButton.setAttribute('aria-expanded', 'true');
    closeButton.focus();
  };

  const close = ({ restoreFocus = true } = {}) => {
    drawer.classList.remove('is-open');
    document.documentElement.classList.remove('is-drawer-open');
    openButton.setAttribute('aria-expanded', 'false');
    if (restoreFocus) openButton.focus();
  };

  openButton.addEventListener('click', open);
  closeButton.addEventListener('click', () => close());

  // ページ内リンクで移動するときは、移動先にフォーカスを任せる
  links.forEach((link) => {
    link.addEventListener('click', () => close({ restoreFocus: false }));
  });

  drawer.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      close();
      return;
    }
    if (event.key !== 'Tab') return;

    if (event.shiftKey && document.activeElement === firstFocusable) {
      event.preventDefault();
      lastFocusable.focus();
    } else if (!event.shiftKey && document.activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
    }
  });

  // 開いたまま PC 幅になったら閉じる（PC ではドロワーを表示しない）
  pcQuery.addEventListener('change', (event) => {
    if (event.matches && isOpen()) close({ restoreFocus: false });
  });
}
