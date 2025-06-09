document.addEventListener('DOMContentLoaded', function () {
  const textSelectors = [
    'h1:not(.name h1)',
    'h2:not(.name h2):not(.content-section h2):not(.image-wrap h2):not(.hero h2)',
    'h6:not(.name h6):not(.content-section h6):not(.hero h6)',
    'p:not(.name p)'
  ].join(', ');
  const textElems = document.querySelectorAll(textSelectors);

  const leftImgs      = document.querySelectorAll('.reveal-left');
  const rightImgs     = document.querySelectorAll('.reveal-right');
  const overlay3Imgs  = document.querySelectorAll('.text-overlay3');
  const genericImgs   = document.querySelectorAll('.reveal-generic');

  const observerOptions = { root: null, threshold: 0 };

  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  };


  const textObserver     = new IntersectionObserver(revealCallback, observerOptions);
  const observerLeft     = new IntersectionObserver(revealCallback, observerOptions);
  const observerRight    = new IntersectionObserver(revealCallback, observerOptions);
  const observerOverlay3 = new IntersectionObserver(revealCallback, observerOptions);
  const observerGeneric  = new IntersectionObserver(revealCallback, observerOptions);

  textElems.forEach(el => textObserver.observe(el));
  leftImgs.forEach(img => observerLeft.observe(img));
  rightImgs.forEach(img => observerRight.observe(img));
  overlay3Imgs.forEach(img => observerOverlay3.observe(img));
  genericImgs.forEach(img => observerGeneric.observe(img));

 
  const videos = document.querySelectorAll('section video');
  const videoOptions = { root: null, threshold: 0.5 };

  const videoCallback = (entries) => {
    entries.forEach(entry => {
      const v = entry.target;
      if (entry.isIntersecting) {
        v.muted = true;  
        v.loop  = true; 
        v.play();
      } else {
        v.pause();
      }
    });
  };

  const videoObserver = new IntersectionObserver(videoCallback, videoOptions);
  videos.forEach(v => videoObserver.observe(v));
});
