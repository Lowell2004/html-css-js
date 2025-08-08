document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const aboutSection = document.querySelector('#hero-section');
  const projectBoxes = document.querySelectorAll('.project-box');
  const projectTitles = document.querySelectorAll('.project-title');
  const startBtn = document.getElementById('startBtn');
  const introSection = document.getElementById('intro');
  const contactSection = document.getElementById('contact');
  const portfolioSection = document.getElementById('portfolio');
  const contactForm = document.getElementById('contactForm');
  const portfolioCards = document.querySelectorAll('#portfolio .card');
  if (!navbar) return;

  const showNav = () => {
    navbar.classList.remove('navbar--hidden');
    navbar.classList.add('navbar--visible');
  };
  const hideNav = () => {
    navbar.classList.remove('navbar--visible');
    navbar.classList.add('navbar--hidden');
  };

  // Hide navbar only while Intro is visible; show it elsewhere (About, Projects, Contact)
  hideNav();
  const introObserver = (() => {
    if (!introSection) { showNav(); return null; }
    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          hideNav();
        } else {
          showNav();
        }
      },
      { root: null, threshold: 0.2 }
    );
    obs.observe(introSection);
    return obs;
  })();

  // If page loads scrolled past intro or with a hash, ensure navbar is shown
  if (window.scrollY > 50 || location.hash) {
    showNav();
  }

  // Start button behavior: scroll to About section and ensure navbar is visible
  if (startBtn) {
    startBtn.addEventListener('click', function() {
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
      showNav();
    });
  }

  // Mock contact submit
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('contactSubmit');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }
      // Simulate async send
      setTimeout(() => {
        // Reset form
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        }
        // Show success modal
        const modalEl = document.getElementById('contactSuccessModal');
        if (modalEl) {
          const modal = new bootstrap.Modal(modalEl);
          modal.show();
        }
      }, 1000);
    });
  }

  // Card click handler: change background color when clicking a card (not buttons)
  portfolioCards.forEach((card) => {
    const colors = ['#f8d7da','#f8d7da', '#d1e7dd', '#cff4fc'];
    let clickCount = 0;
    card.addEventListener('click', (e) => {
      if (e.target.closest('button, a')) return; // ignore button/link inside card
      clickCount++;
      const colorIdx = clickCount % colors.length;
      card.style.backgroundColor = colors[colorIdx];
    });
  });

  // Toggle active state on project containers
  projectBoxes.forEach((box) => {
    const prevent = (e) => e.stopPropagation();
    // Prevent clicks on inner interactive elements from toggling container
    box.querySelectorAll('a, button').forEach((el) => el.addEventListener('click', prevent));

    const toggleActive = () => box.classList.toggle('active');
    box.addEventListener('click', toggleActive);
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleActive();
      }
    });
  });

  // Exact integration: cycle card background on project title click
  document.querySelectorAll('.project-title').forEach((title) => {
    const colors = ['#f8d7da','#f8d7da', '#d1e7dd', '#cff4fc'];
    let clickCount = 0;
    title.addEventListener('click', (e) => {
        clickCount++;
        const colorIdx = clickCount % colors.length;
        title.closest('.card').style.backgroundColor = colors[colorIdx];
    });
  });
});

