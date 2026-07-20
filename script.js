/* =========================================
   वासुदेव कुटुम्बकम् — One Earth, One Family
   Interactions & Animations
   ========================================= */

(function () {
  'use strict';

  // ============================================================
  // 1. STAR FIELD — Canvas Particle Background
  // ============================================================
  function initStarField() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, stars, shootingStars;

    function resize() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }

    function createStars(count) {
      const arr = [];
      for (let i = 0; i < count; i++) {
        arr.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
      return arr;
    }

    function createShootingStars() {
      return [];
    }

    function addShootingStar() {
      if (shootingStars.length > 2) return;
      shootingStars.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.3,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 6 + 4,
        angle: Math.PI / 6 + Math.random() * 0.3,
        opacity: 1,
        decay: Math.random() * 0.015 + 0.01,
      });
    }

    function drawStars(time) {
      ctx.clearRect(0, 0, width, height);

      // Draw stars
      for (const star of stars) {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        const opacity = star.opacity * (0.6 + 0.4 * twinkle);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 220, 255, ${opacity})`;
        ctx.fill();

        // Glow for brighter stars
        if (star.radius > 1) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 200, 255, ${opacity * 0.1})`;
          ctx.fill();
        }
      }

      // Draw shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        const endX = ss.x + Math.cos(ss.angle) * ss.length;
        const endY = ss.y + Math.sin(ss.angle) * ss.length;

        const gradient = ctx.createLinearGradient(ss.x, ss.y, endX, endY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.opacity -= ss.decay;

        if (ss.opacity <= 0 || ss.x > width || ss.y > height) {
          shootingStars.splice(i, 1);
        }
      }
    }

    function animate(time) {
      drawStars(time);
      requestAnimationFrame(animate);
    }

    // Occasional shooting stars
    setInterval(() => {
      if (Math.random() < 0.4) addShootingStar();
    }, 2000);

    window.addEventListener('resize', () => {
      resize();
      stars = createStars(Math.min(200, Math.floor(width * height / 5000)));
    });

    resize();
    stars = createStars(Math.min(200, Math.floor(width * height / 5000)));
    shootingStars = createShootingStars();
    requestAnimationFrame(animate);
  }

  // ============================================================
  // 2. SCROLL REVEAL — Intersection Observer
  // ============================================================
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  // ============================================================
  // 3. ANIMATED COUNTERS — Numbers count up on scroll
  // ============================================================
  function initCounters() {
    const numbers = document.querySelectorAll('.stat-number[data-target]');
    if (!numbers.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    numbers.forEach((el) => observer.observe(el));

    function animateCounter(el) {
      const target = parseFloat(el.dataset.target);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const duration = 2000;
      const isDecimal = target % 1 !== 0;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;

        if (isDecimal) {
          el.textContent = prefix + current.toFixed(2) + suffix;
        } else {
          el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
        }

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          if (isDecimal) {
            el.textContent = prefix + target.toFixed(2) + suffix;
          } else {
            el.textContent = prefix + target.toLocaleString() + suffix;
          }
        }
      }

      requestAnimationFrame(update);
    }
  }

  // ============================================================
  // 4. QUOTES CAROUSEL
  // ============================================================
  function initQuotesCarousel() {
    const track = document.getElementById('quotes-track');
    const dotsContainer = document.getElementById('quotes-dots');
    const prevBtn = document.getElementById('quote-prev');
    const nextBtn = document.getElementById('quote-next');

    if (!track || !dotsContainer) return;

    const slides = track.querySelectorAll('.quote-slide');
    let currentIndex = 0;
    let autoplayInterval;

    // Create dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('quote-dot');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to quote ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
      currentIndex = index;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateDots();
      resetAutoplay();
    }

    function updateDots() {
      const dots = dotsContainer.querySelectorAll('.quote-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function nextSlide() {
      goToSlide((currentIndex + 1) % slides.length);
    }

    function prevSlide() {
      goToSlide((currentIndex - 1 + slides.length) % slides.length);
    }

    function resetAutoplay() {
      clearInterval(autoplayInterval);
      autoplayInterval = setInterval(nextSlide, 6000);
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      const carousel = document.getElementById('quotes-carousel');
      const rect = carousel.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!isVisible) return;

      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
    }, { passive: true });

    // Start autoplay
    autoplayInterval = setInterval(nextSlide, 6000);
  }

  // ============================================================
  // 5. NAVBAR — Scroll effects & mobile toggle
  // ============================================================
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');

    if (!navbar) return;

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      navbar.classList.toggle('scrolled', scrollY > 50);
      lastScroll = scrollY;
    }, { passive: true });

    // Mobile toggle
    if (toggle && links) {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('active');
        document.body.style.overflow = links.classList.contains('active') ? 'hidden' : '';
      });

      // Close on link click
      links.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          toggle.classList.remove('active');
          links.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }
  }

  // ============================================================
  // 6. PLEDGE BUTTON — Interactive counter
  // ============================================================
  function initPledge() {
    const btn = document.getElementById('pledge-btn');
    const countEl = document.getElementById('pledge-count');
    if (!btn || !countEl) return;

    // Simulated global count
    let baseCount = 42847;
    const stored = localStorage.getItem('vk_pledged');

    if (stored === 'true') {
      btn.classList.add('pledged');
      btn.textContent = '✓ You Are a Global Citizen';
      baseCount += 1;
    }

    // Animate to base count
    animatePledgeCount(countEl, 0, baseCount, 1500);

    btn.addEventListener('click', () => {
      if (btn.classList.contains('pledged')) return;

      btn.classList.add('pledged');
      btn.textContent = '✓ You Are a Global Citizen';
      localStorage.setItem('vk_pledged', 'true');

      baseCount += 1;
      animatePledgeCount(countEl, baseCount - 1, baseCount, 300);

      // Burst animation
      createConfetti(btn);
    });

    function animatePledgeCount(el, from, to, duration) {
      const start = performance.now();
      function update(time) {
        const progress = Math.min((time - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(from + (to - from) * eased);
        el.textContent = current.toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    }

    function createConfetti(origin) {
      const rect = origin.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const emojis = ['🌍', '🕊️', '✨', '💛', '🌏', '🌎', '🤝', '⭐'];

      for (let i = 0; i < 12; i++) {
        const particle = document.createElement('span');
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.cssText = `
          position: fixed;
          left: ${centerX}px;
          top: ${centerY}px;
          font-size: ${Math.random() * 16 + 12}px;
          pointer-events: none;
          z-index: 9999;
          transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        `;
        document.body.appendChild(particle);

        requestAnimationFrame(() => {
          const angle = (Math.PI * 2 * i) / 12;
          const distance = Math.random() * 120 + 60;
          particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance - 50}px) scale(0)`;
          particle.style.opacity = '0';
        });

        setTimeout(() => particle.remove(), 1200);
      }
    }
  }

  // ============================================================
  // 7. SMOOTH SCROLL — Enhanced scroll for anchor links
  // ============================================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          const navHeight = document.getElementById('navbar').offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        }
      });
    });
  }

  // ============================================================
  // 8. PARALLAX — Subtle parallax on hero elements
  // ============================================================
  function initParallax() {
    const earth = document.querySelector('.hero-earth');
    const content = document.querySelector('.hero-content');
    if (!earth || !content) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = document.querySelector('.hero').offsetHeight;

      if (scrollY < heroHeight) {
        const progress = scrollY / heroHeight;
        earth.style.transform = `translateY(${scrollY * 0.3}px) scale(${1 + progress * 0.1})`;
        earth.style.opacity = 0.15 - progress * 0.15;
        content.style.transform = `translateY(${scrollY * 0.15}px)`;
        content.style.opacity = 1 - progress * 1.2;
      }
    }, { passive: true });
  }

  // ============================================================
  // INIT — Boot everything on DOM ready
  // ============================================================
  document.addEventListener('DOMContentLoaded', () => {
    initStarField();
    initScrollReveal();
    initCounters();
    initQuotesCarousel();
    initNavbar();
    initPledge();
    initSmoothScroll();
    initParallax();

    // Log a message of unity
    console.log(
      '%c🌍 वासुदेव कुटुम्बकम् — The World is One Family 🌍',
      'color: #f0c040; font-size: 16px; font-weight: bold; background: #050510; padding: 10px 20px; border-radius: 8px;'
    );
  });
})();
