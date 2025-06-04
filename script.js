document.addEventListener('DOMContentLoaded', function () {
  // 1) 텍스트용 셀렉터 (이미 작성하신 대로 유지)
  const textSelectors = [
    'h1:not(.name h1)',
    'h2:not(.name h2):not(.content-section h2):not(.image-wrap h2):not(.hero h2)',
    'h6:not(.name h6):not(.content-section h6):not(.hero h6)',
    'p:not(.name p)'
  ].join(', ');
  const textElems = document.querySelectorAll(textSelectors);

  // 2) 이미지용 셀렉터
  const leftImgs = document.querySelectorAll('.reveal-left');
  const rightImgs = document.querySelectorAll('.reveal-right');
  const overlay3Imgs = document.querySelectorAll('.text-overlay3');

  // 3) 새로 추가: 2번, 13번 이미지를 위한 generic observer 대상
  const genericImgs = document.querySelectorAll('.reveal-generic');

  // 4) 공통 IntersectionObserver 옵션
  const observerOptions = {
    root: null,    // viewport 기준
    threshold: 0   // 화면에 1px만 보여져도 트리거
  };

  // 5) 공통 콜백 (화면 진입 시 .animate 클래스 붙이고 관찰 해제)
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  };

  // 6) 텍스트 전용 observer
  const textObserver = new IntersectionObserver(revealCallback, observerOptions);

  // 7) 이미지 전용 observer (왼쪽→오른쪽, 오른쪽→왼쪽, overlay3 별도)
  const observerLeft = new IntersectionObserver(revealCallback, observerOptions);
  const observerRight = new IntersectionObserver(revealCallback, observerOptions);
  const observerOverlay3 = new IntersectionObserver(revealCallback, observerOptions);

  // 8) genericImgs 전용 observer
  const observerGeneric = new IntersectionObserver(revealCallback, observerOptions);

  // 9) 실제로 관찰 시작
  textElems.forEach(elem => textObserver.observe(elem));
  leftImgs.forEach(img => observerLeft.observe(img));
  rightImgs.forEach(img => observerRight.observe(img));
  overlay3Imgs.forEach(img => observerOverlay3.observe(img));
  genericImgs.forEach(img => observerGeneric.observe(img));
});
