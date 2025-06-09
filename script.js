document.addEventListener('DOMContentLoaded', function () {
  // 1) 텍스트용 셀렉터
  const textSelectors = [
    'h1:not(.name h1)',
    'h2:not(.name h2):not(.content-section h2):not(.image-wrap h2):not(.hero h2)',
    'h6:not(.name h6):not(.content-section h6):not(.hero h6)',
    'p:not(.name p)'
  ].join(', ');
  const textElems = document.querySelectorAll(textSelectors);

  // 2) 이미지용 셀렉터
  const leftImgs      = document.querySelectorAll('.reveal-left');
  const rightImgs     = document.querySelectorAll('.reveal-right');
  const overlay3Imgs  = document.querySelectorAll('.text-overlay3');
  const genericImgs   = document.querySelectorAll('.reveal-generic');

  // 3) 공통 IntersectionObserver 옵션
  const observerOptions = { root: null, threshold: 0 };

  // 4) 공통 콜백: 보이는 순간 .animate 붙이고 언옵저브
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  };

  // 5) Observer 생성
  const textObserver     = new IntersectionObserver(revealCallback, observerOptions);
  const observerLeft     = new IntersectionObserver(revealCallback, observerOptions);
  const observerRight    = new IntersectionObserver(revealCallback, observerOptions);
  const observerOverlay3 = new IntersectionObserver(revealCallback, observerOptions);
  const observerGeneric  = new IntersectionObserver(revealCallback, observerOptions);

  // 6) 관찰 시작
  textElems.forEach(el => textObserver.observe(el));
  leftImgs.forEach(img => observerLeft.observe(img));
  rightImgs.forEach(img => observerRight.observe(img));
  overlay3Imgs.forEach(img => observerOverlay3.observe(img));
  genericImgs.forEach(img => observerGeneric.observe(img));

  // ─────────────────────────────────────────────────────────────────
  // 7) 비디오 자동재생 & 반복재생(loop)
  const videos = document.querySelectorAll('section video');
  const videoOptions = { root: null, threshold: 0.5 };

  const videoCallback = (entries) => {
    entries.forEach(entry => {
      const v = entry.target;
      if (entry.isIntersecting) {
        v.muted = true;    // 자동재생을 위해 음소거
        v.loop  = true;    // 반복재생 설정
        v.play();
      } else {
        v.pause();
      }
    });
  };

  const videoObserver = new IntersectionObserver(videoCallback, videoOptions);
  videos.forEach(v => videoObserver.observe(v));
});
