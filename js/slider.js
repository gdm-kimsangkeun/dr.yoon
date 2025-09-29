// 안전 가드: Swiper가 없거나 DOM에 요소가 없으면 건너뜀
function ready(fn){ 
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, { once:true });
  else fn();
}

ready(() => {
  // Hero Swiper
  if (window.Swiper && document.querySelector('#heroSwiper')) {
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

  // Best 카드 슬라이더(수평 스크롤)
  const slider = document.getElementById('bestSlider');
  if (slider) {
    const prev = document.querySelector('.best-prev');
    const next = document.querySelector('.best-next');

    const cardStep = () => {
      const card = slider.querySelector('.bcard');
      if (!card) return 400;
      const styles = getComputedStyle(slider);
      const gap = parseFloat(styles.columnGap || styles.gap || 0);
      return card.getBoundingClientRect().width + gap;
    };

    prev?.addEventListener('click', () => slider.scrollBy({ left: -cardStep(), behavior: 'smooth' }));
    next?.addEventListener('click', () => slider.scrollBy({ left:  cardStep(), behavior: 'smooth' }));

    let isDown = false, startX = 0, startL = 0;
    slider.addEventListener('pointerdown', e => {
      isDown = true; startX = e.clientX; startL = slider.scrollLeft;
      slider.setPointerCapture(e.pointerId);
      slider.style.scrollSnapType = 'none';
    });
    slider.addEventListener('pointermove', e => {
      if (!isDown) return;
      slider.scrollLeft = startL - (e.clientX - startX);
    });
    const release = () => {
      if (!isDown) return;
      isDown = false;
      slider.style.scrollSnapType = 'x mandatory';
    };
    addEventListener('pointerup', release);
  }

  // 장비 Swiper
  if (window.Swiper && document.querySelector('#equipSwiper')) {
    new Swiper('#equipSwiper', {
      speed: 550,
      loop: false,
      slidesPerView: 4,
      spaceBetween: 28,
      navigation: { nextEl: '.equip-next', prevEl: '.equip-prev' },
      breakpoints: {
        0:    { slidesPerView: 1, spaceBetween: 16 },
        480:  { slidesPerView: 1, spaceBetween: 18 },
        640:  { slidesPerView: 2, spaceBetween: 20 },
        900:  { slidesPerView: 3, spaceBetween: 24 },
        1200: { slidesPerView: 4, spaceBetween: 28 }
      },
      centeredSlides: false,
      watchOverflow: true
    });
  }
});
