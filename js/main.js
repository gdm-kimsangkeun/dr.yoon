// app-ui.js
(function () {
  // DOM ready helper
  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  ready(function init() {
    /* 헤더 높이 → CSS 변수 */
    const header = document.getElementById('siteHeader');
    function setHeaderH() {
      if (header) {
        document.documentElement.style.setProperty('--headerH', header.offsetHeight + 'px');
      }
    }
    setHeaderH();
    window.addEventListener('resize', setHeaderH);

    /* 모바일 GNB */
    const gnb = document.getElementById('gnb');
    const hamburger = document.querySelector('.hamburger');

    const lockScroll = (lock) => {
      document.documentElement.style.overflow = lock ? 'hidden' : '';
      document.body.style.overflow = lock ? 'hidden' : '';
      document.body.style.touchAction = lock ? 'none' : '';
    };

    function toggleGNB(force) {
      if (!gnb) return; // ← 안전 가드
      const open = typeof force === 'boolean' ? force : !gnb.classList.contains('open');
      gnb.classList.toggle('open', open);
      hamburger?.setAttribute('aria-expanded', open ? 'true' : 'false');
      lockScroll(open);
      if (!open) {
        // 아코디언 초기화
        gnb.querySelectorAll(':scope > ul > li.open').forEach((li) => li.classList.remove('open'));
        gnb
          .querySelectorAll(':scope > ul > li > a[aria-expanded="true"]')
          .forEach((a) => a.setAttribute('aria-expanded', 'false'));
      }
    }

    hamburger?.addEventListener('click', () => toggleGNB());

    // 모바일 1DEPTH 탭 → 하나만 열기
    if (gnb) {
      gnb.addEventListener('click', (e) => {
        if (!window.matchMedia('(max-width:1024px)').matches) return;
        const a = e.target.closest('li > a');
        if (!a) return;
        const li = a.parentElement;
        if (li.querySelector('.mega')) {
          e.preventDefault();
          const isOpen = li.classList.contains('open');

          // 형제들 닫기
          gnb.querySelectorAll(':scope > ul > li').forEach((x) => {
            if (x !== li) {
              x.classList.remove('open');
              const xa = x.querySelector(':scope > a') || x.querySelector('a');
              xa && xa.setAttribute('aria-expanded', 'false');
            }
          });

          // 현재 토글
          li.classList.toggle('open', !isOpen);
          a.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
        }
      });
    }

    /* TOP 버튼 */
    const btn = document.getElementById('btnTop');
    if (btn) {
      const toggleBtn = () => {
        const hasScroll = document.documentElement.scrollHeight > window.innerHeight + 1;
        const past = window.scrollY > 160;
        btn.classList.toggle('is-show', hasScroll && past);
      };

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
      });

      ['load', 'scroll', 'resize'].forEach((evt) =>
        window.addEventListener(evt, toggleBtn, { passive: true })
      );
      toggleBtn(); // 초기 상태 반영
    }
  });
})();
