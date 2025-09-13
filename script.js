// simple scroll-in animation (no lib)
(function(){
  function onEntry(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }
  const observer = new IntersectionObserver(onEntry, {threshold: 0.15});
  document.querySelectorAll('[data-anim]').forEach(el => observer.observe(el));

  // counters
  const counters = document.querySelectorAll('[data-counter]');
  counters.forEach(el=>{
    const target = +el.getAttribute('data-counter');
    let started = false;
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting && !started){
          started = true;
          const duration = 2000;
          const start = performance.now();
          const step = (ts)=>{
            const progress = Math.min((ts - start)/duration, 1);
            const value = Math.floor(progress * target);
            el.textContent = value.toLocaleString();
            if(progress < 1) requestAnimationFrame(step);
            else el.textContent = target.toLocaleString() + (target >= 1000 ? '+' : '');
          };
          requestAnimationFrame(step);
          io.disconnect();
        }
      });
    });
    io.observe(el);
  });

  // header active link highlight
  const navLinks = document.querySelectorAll('.nav a');
  navLinks.forEach(a=>{
    if(location.pathname.endsWith(a.getAttribute('href'))) a.classList.add('active');
  });

  // contact form demo
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      alert('Thanks! Message simulated (demo).');
      form.reset();
    });
  }
})();
