document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul li a');
  let lastScrollTop = 0;
  const delta = 5;
  const headerHeight = header.offsetHeight;

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      const offsetPosition = targetSection.offsetTop - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });

  // Enhanced header effect on scroll
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (Math.abs(lastScrollTop - scrollTop) <= delta) return;

    if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
      // Scrolling down
      header.style.transform = `translateY(-${headerHeight}px)`;
      header.style.opacity = '0';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
      header.style.opacity = '1';
    }

    if (scrollTop === 0) {
      header.style.backgroundColor = 'rgba(28, 28, 28, 0.95)';
    } else {
      header.style.backgroundColor = 'rgba(28, 28, 28, 1)';
    }
    
    lastScrollTop = scrollTop;

    // Highlight active section in navigation
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 10;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href').substring(1) === currentSection);
    });
  });

  // Form validation
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateForm()) {
        alert('Form submitted successfully!');
        contactForm.reset();
      }
    });
  }

  function validateForm() {
    let isValid = true;
    const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    });
    return isValid;
  }

  const menuToggle = document.getElementById('menu-toggle');
  const mainMenu = document.getElementById('main-menu');

  menuToggle.addEventListener('click', () => {
    mainMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
});
