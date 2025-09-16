/* 즉시 실행 초기화 */
(function(){
  function init(){
    /* 헤더 높이 → CSS 변수 */
    const header = document.getElementById('siteHeader');
    function setHeaderH(){ if(header){ document.documentElement.style.setProperty('--headerH', header.offsetHeight + 'px'); } }
    setHeaderH(); addEventListener('resize', setHeaderH);

    /* 모바일 GNB */
    const gnb = document.getElementById('gnb');
    const hamburger = document.querySelector('.hamburger');
    const lockScroll = (lock) => {
      document.documentElement.style.overflow = lock ? 'hidden' : '';
      document.body.style.overflow = lock ? 'hidden' : '';
      document.body.style.touchAction = lock ? 'none' : '';
    };
    function toggleGNB(force){
      const open = typeof force==='boolean' ? force : !gnb.classList.contains('open');
      gnb.classList.toggle('open', open);
      hamburger?.setAttribute('aria-expanded', open ? 'true' : 'false');
      lockScroll(open);
      if(!open){
        // 아코디언 초기화
        gnb.querySelectorAll(':scope > ul > li.open').forEach(li=>li.classList.remove('open'));
        gnb.querySelectorAll(':scope > ul > li > a[aria-expanded="true"]').forEach(a=>a.setAttribute('aria-expanded','false'));
      }
    }
    hamburger?.addEventListener('click', ()=>toggleGNB());

    // 모바일 1DEPTH 탭 → 하나만 열기
gnb.addEventListener('click', (e)=>{
  if (!window.matchMedia('(max-width:1024px)').matches) return;
  const a = e.target.closest('li > a');  // ← 간단하고 호환 잘됨
  if(!a) return;
  const li = a.parentElement;
  if(li.querySelector('.mega')){
    e.preventDefault();
    const isOpen = li.classList.contains('open');
    // 형제들 닫기
    gnb.querySelectorAll('nav.gnb > ul > li').forEach(x=>{
      if(x!==li){ x.classList.remove('open'); const xa=x.querySelector(':scope > a') || x.querySelector('a'); xa && xa.setAttribute('aria-expanded','false'); }
    });
    // 현재 토글
    li.classList.toggle('open', !isOpen);
    a.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
  }
});

    /* Swiper (Hero) */
    new Swiper('#heroSwiper', {
      loop: true,
      speed: 600,
      autoplay: { delay: 4000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      grabCursor: true,
      a11y: { enabled: true }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, {once:true});
  } else {
    init();
  }
})();


(() => {
  const slider = document.getElementById('bestSlider');
  if (!slider) return;
  const prev = document.querySelector('.best-prev');
  const next = document.querySelector('.best-next');

  // 현재 카드 하나의 실제 폭(간격 포함)을 계산해서 한 장씩 이동
  function cardStep(){
    const card = slider.querySelector('.bcard');
    if(!card) return 400;
    const styles = getComputedStyle(slider);
    const gap = parseFloat(styles.columnGap || styles.gap || 0);
    return card.getBoundingClientRect().width + gap;
  }

  prev?.addEventListener('click', ()=> slider.scrollBy({left: -cardStep(), behavior:'smooth'}));
  next?.addEventListener('click', ()=> slider.scrollBy({left:  cardStep(), behavior:'smooth'}));

  // 데스크탑에서도 드래그로 스크롤
  let isDown=false, startX=0, startL=0, pid=null;
  slider.addEventListener('pointerdown', e=>{
    isDown=true; startX=e.clientX; startL=slider.scrollLeft;
    slider.setPointerCapture(e.pointerId); slider.style.scrollSnapType='none';
  });
  slider.addEventListener('pointermove', e=>{
    if(!isDown) return; slider.scrollLeft = startL - (e.clientX - startX);
  });
  const release = ()=>{
    if(!isDown) return; isDown=false;
    slider.style.scrollSnapType='x mandatory';
  };
  addEventListener('pointerup', release);
})();


new Swiper('#equipSwiper', {
  speed: 550,
  loop: false,
  slidesPerView: 4,
  spaceBetween: 28,
  navigation: {
    nextEl: '.equip-next',
    prevEl: '.equip-prev'
  },
  // 뷰포트별 카드 개수
  breakpoints: {
    0:    { slidesPerView: 1, spaceBetween: 16 },
    480:  { slidesPerView: 1,  spaceBetween: 18 },
    640:  { slidesPerView: 2,  spaceBetween: 20 },
    900:  { slidesPerView: 3,    spaceBetween: 24 },
    1200: { slidesPerView: 4,    spaceBetween: 28 }
  },
  centeredSlides: false,
  watchOverflow: true
});




