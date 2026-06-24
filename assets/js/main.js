/* =====================================================
   FARRIEL PRATAMA - CV LANDING PAGE
   Main JavaScript
   ===================================================== */

'use strict';

/* ===== PRELOADER ===== */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 800);
});


/* ===== NAVBAR ===== */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const navToggle = document.getElementById('nav-toggle');
const navLinksContainer = document.getElementById('nav-links');
const mobileOverlay = document.getElementById('mobile-overlay');

// Scroll behavior
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
  mobileOverlay.classList.toggle('open');
});

mobileOverlay.addEventListener('click', () => {
  navToggle.classList.remove('open');
  navLinksContainer.classList.remove('open');
  mobileOverlay.classList.remove('open');
});

// Close mobile menu on nav link click
navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinksContainer.classList.remove('open');
    mobileOverlay.classList.remove('open');
  });
});

// Active nav link on scroll
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
      const top = target.offsetTop - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ===== DOWNLOAD CV ===== */
document.getElementById('btn-download-cv').addEventListener('click', () => {
  // Create a simple text CV for demo
  const cvContent = `FARRIEL PRATAMA
Mahasiswa Universitas Semarang (USM)

KONTAK:
Email: farel1diva@gmail.com
WhatsApp: +62 851-4102-7945
Lokasi: Semarang, Jawa Tengah, Indonesia
GitHub: github.com/farrielpratama
LinkedIn: linkedin.com/in/farrielpratama

TENTANG:
Saya adalah mahasiswa Universitas Semarang (USM) yang bersemangat mempelajari 
hal baru dan memiliki ketertarikan di bidang IT dan Elektronika.

PENDIDIKAN:
- Universitas Semarang (USM) (2025 - Sekarang)
  IPK: 4.00
- SMK Migas Cepu - Teknik Elektronika Industri (2022 - 2025)

SKILLS:
- HTML & CSS: 90%
- JavaScript: 80%
- React.js: 75%
- Node.js: 70%
- Python: 65%
- PHP: 72%
- MySQL: 70%

PROYEK:
1. TaskHub - Aplikasi manajemen tugas (React, Node.js, MongoDB)
2. Portfolio Website - Website pribadi (HTML, CSS, JavaScript)
3. Sistem Informasi Perpustakaan (PHP, MySQL, Bootstrap)

PENGALAMAN:
- IT Support - PT. Nayati Indonesia (2024)
- Assembling - PT. Bambang Djaja (2024)`;

  const blob = new Blob([cvContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'CV-Farriel-Pratama.txt';
  a.click();
  URL.revokeObjectURL(url);
  
  // Button feedback
  const btn = document.getElementById('btn-download-cv');
  const originalHTML = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Downloaded!';
  btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = '';
  }, 2500);
});

/* ===== AOS (Animate On Scroll) ===== */
const aosElements = document.querySelectorAll('[data-aos]');

const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute('data-aos-delay') || 0;
      setTimeout(() => {
        entry.target.classList.add('aos-animate');
      }, parseInt(delay));
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

aosElements.forEach(el => aosObserver.observe(el));

/* ===== SKILL BARS ANIMATION ===== */
function animateSkillBars(bars) {
  bars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = width + '%';
  });
}

// Animate mini skill bars when hero section is visible
const heroSection = document.getElementById('home');
let heroAnimated = false;

const heroObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !heroAnimated) {
    heroAnimated = true;
    setTimeout(() => {
      animateSkillBars(document.querySelectorAll('.bar-fill'));
    }, 600);
  }
}, { threshold: 0.3 });

heroObserver.observe(heroSection);

// Animate full skill bars in skills section
const skillsSection = document.getElementById('skills');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !skillsAnimated) {
    skillsAnimated = true;
    setTimeout(() => {
      animateSkillBars(document.querySelectorAll('.bar-fill-full'));
    }, 300);
  }
}, { threshold: 0.2 });

if (skillsSection) skillsObserver.observe(skillsSection);

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

const statsSection = document.getElementById('stats');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !statsAnimated) {
    statsAnimated = true;
    document.querySelectorAll('.stat-number').forEach(el => {
      const target = parseInt(el.getAttribute('data-target'));
      animateCounter(el, target);
    });
  }
}, { threshold: 0.5 });

if (statsSection) statsObserver.observe(statsSection);

/* ===== PROJECT FILTER ===== */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.style.display = 'block';
        card.style.animation = 'fadeInUp 0.4s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      // Shake animation on empty required fields
      [document.getElementById('contact-name'), 
       document.getElementById('contact-email'),
       document.getElementById('contact-message')].forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#ef4444';
          field.style.animation = 'shake 0.4s ease';
          setTimeout(() => {
            field.style.animation = '';
            field.style.borderColor = '';
          }, 400);
        }
      });
      return;
    }

    // Simulate form submission
    const submitBtn = document.getElementById('btn-submit-form');
    const btnText = submitBtn.querySelector('.btn-text');
    btnText.textContent = 'Mengirim...';
    submitBtn.disabled = true;

    setTimeout(() => {
      contactForm.reset();
      submitBtn.disabled = false;
      btnText.textContent = 'Kirim Pesan';
      formSuccess.classList.add('show');
      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    }, 1500);
  });
}

/* ===== SCROLL TO TOP ===== */
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.style.opacity = '1';
      backToTop.style.visibility = 'visible';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.visibility = 'hidden';
    }
  });
}

/* ===== TYPING EFFECT for Hero Title ===== */
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const texts = [
    'Mahasiswa Teknik Informatika',
    'Web Developer',
    'Front-End Developer',
    'Full Stack Enthusiast'
  ];
  let currentIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const current = texts[currentIndex];
    if (isDeleting) {
      heroTitle.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      heroTitle.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
      speed = 2500; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentIndex = (currentIndex + 1) % texts.length;
      speed = 300;
    }

    setTimeout(typeEffect, speed);
  }

  // Start typing effect after preloader
  setTimeout(typeEffect, 1200);
}

/* ===== PARALLAX on Hero Shapes ===== */
document.addEventListener('mousemove', (e) => {
  const shapes = document.querySelectorAll('.shape');
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  shapes.forEach((shape, i) => {
    const factor = (i + 1) * 0.5;
    shape.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

/* ===== SHAKE KEYFRAME ===== */
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-8px); }
    75% { transform: translateX(8px); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(shakeStyle);

/* ===== INITIALIZE ON DOM READY ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Set initial scroll indicator opacity
  const scrollIndicator = document.getElementById('scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      const opacity = Math.max(0, 1 - window.scrollY / 200);
      scrollIndicator.style.opacity = opacity;
    });
  }

  // Back to top initial state
  if (backToTop) {
    backToTop.style.opacity = '0';
    backToTop.style.visibility = 'hidden';
    backToTop.style.transition = 'all 0.3s ease';
  }

  console.log('%cðŸš€ Farriel Pratama Portfolio', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
  console.log('%cBuilt with â¤ï¸ using HTML, CSS & JavaScript', 'color: #94a3b8;');
});

