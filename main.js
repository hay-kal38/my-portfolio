/* ============================================
   HAIKAL AHMED PORTFOLIO — MAIN JAVASCRIPT
   ============================================ */

'use strict';

/* ===== LOADER ===== */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    // Trigger initial reveal animations after loader
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, i * 120);
    });
  }, 1200);
});

/* ===== CUSTOM CURSOR ===== */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

if (cursor && cursorFollower) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Cursor scaling on hover
  document.querySelectorAll('a, button, .btn, .service-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2)';
      cursorFollower.style.width = '56px';
      cursorFollower.style.height = '56px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.width = '36px';
      cursorFollower.style.height = '36px';
    });
  });
}

/* ===== NAVBAR ===== */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Highlight active nav link
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

/* ===== HAMBURGER MOBILE MENU ===== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseInt(delay));
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);

  const tick = () => {
    start += step;
    if (start < target) {
      el.textContent = Math.floor(start);
      requestAnimationFrame(tick);
    } else {
      el.textContent = target;
    }
  };

  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('[data-target]');
      counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        animateCounter(counter, target);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

/* ===== SKILL BARS ANIMATION ===== */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-fill');
      fills.forEach((fill, i) => {
        setTimeout(() => {
          fill.style.width = fill.dataset.width + '%';
        }, i * 150);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(cat => {
  skillObserver.observe(cat);
});

/* ===== TESTIMONIALS SLIDER ===== */
const track = document.getElementById('testimonialsTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('sliderDots');

if (track) {
  const slides = track.children;
  const total = slides.length;
  let current = 0;
  let autoplayInterval;

  // Create dots
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.classList.add('slider-dot');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  }

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    document.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  prevBtn.addEventListener('click', () => {
    goTo(current - 1);
    resetAutoplay();
  });

  nextBtn.addEventListener('click', () => {
    goTo(current + 1);
    resetAutoplay();
  });

  function startAutoplay() {
    autoplayInterval = setInterval(() => goTo(current + 1), 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  startAutoplay();

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? current + 1 : current - 1);
      resetAutoplay();
    }
  });
}

emailjs.init("-VWW3oLVLL-IrH8Ur");

emailjs.init("-VWW3oLVLL-IrH8Ur");

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');

  btnText.style.display = 'none';
  btnLoading.style.display = 'flex';
  submitBtn.disabled = true;

  const templateParams = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    budget: document.getElementById('budget').value,
    message: document.getElementById('message').value
  };

  try {
    const response = await emailjs.send(
      "service_y7dednj",   // ✅ FIXED HERE
      "template_k3i4ccv",
      templateParams
    );

    console.log("SUCCESS:", response);

    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';

  } catch (error) {
    console.log("FULL ERROR:", error);
    alert("Failed to send message. Check console.");
  }

  btnText.style.display = 'block';
  btnLoading.style.display = 'none';
  submitBtn.disabled = false;
});

/* ===== BACK TO TOP ===== */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===== YEAR UPDATE ===== */
const yearEl = document.getElementById('currentYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ===== SMOOTH ANCHOR SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ===== PARALLAX HERO GLOWS ===== */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const glow1 = document.querySelector('.glow-1');
  const glow2 = document.querySelector('.glow-2');
  if (glow1) glow1.style.transform = `translateY(${scrollY * 0.15}px)`;
  if (glow2) glow2.style.transform = `translateY(${scrollY * -0.1}px)`;
}, { passive: true });

/* ===== SERVICE CARD TILT EFFECT ===== */
document.querySelectorAll('.service-card, .project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    setTimeout(() => {
      card.style.transition = '';
    }, 500);
  });
});

/* ===== TYPEWRITER EFFECT FOR HERO TITLE ===== */
// Subtle word swap animation
const words = ['Clients Pay For.', 'Investors Trust.', 'Users Love.', 'Scale With You.'];
let wordIndex = 0;
const gradientText = document.querySelector('.gradient-text');

if (gradientText) {
  setInterval(() => {
    wordIndex = (wordIndex + 1) % words.length;
    gradientText.style.opacity = '0';
    gradientText.style.transform = 'translateY(10px)';
    gradientText.style.transition = 'opacity 0.4s, transform 0.4s';

    setTimeout(() => {
      gradientText.textContent = words[wordIndex];
      gradientText.style.opacity = '1';
      gradientText.style.transform = 'translateY(0)';
    }, 400);
  }, 3500);
}

/* ===== TECH TAG HOVER RIPPLE ===== */
document.querySelectorAll('.tech-tag').forEach(tag => {
  tag.addEventListener('click', function() {
    this.style.transform = 'translateY(-4px) scale(1.05)';
    setTimeout(() => { this.style.transform = ''; }, 300);
  });
});

/* ===== INIT CONTACT FORM TABLE ===== */
async function initContactTable() {
  try {
    // Try to access the contact table
    await fetch('tables/contact_messages?limit=1');
  } catch (e) {
    // Table might not exist yet, that's ok
  }
}
initContactTable();

/* ===== PERFORMANCE: Lazy Load Code Card ===== */
const codeCard = document.querySelector('.code-card');
if (codeCard) {
  const codeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        codeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  codeCard.style.opacity = '0';
  codeCard.style.transform = 'translateY(30px)';
  codeCard.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  codeObserver.observe(codeCard);
}

/* ===== CONSOLE EASTER EGG ===== */
console.log('%c👋 Hey Developer!', 'font-size:24px; font-weight:bold; color:#6c63ff;');
console.log('%cLooking at my code? Nice! Haikal Ahmed built this portfolio.', 'font-size:14px; color:#00d4aa;');
console.log('%c📱 Want to hire me? WhatsApp: +254758382221', 'font-size:14px; color:#25d366; font-weight:600;');
console.log('%c✉️  Or email: haikalahmed38@gmail.com', 'font-size:14px; color:#82aaff;');
