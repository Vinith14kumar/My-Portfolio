/**
 * M. VINITH KUMAR - PORTFOLIO JAVASCRIPT
 * Premium Modern Portfolio with Theme Toggle
 * Pure Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================
  // 0. Page Loader
  // ==========================================
  const pageLoader = document.getElementById('pageLoader');
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      pageLoader.classList.add('hidden');
      document.body.style.overflow = 'visible';
    }, 800);
  });

  // ==========================================
  // 1. Theme Toggle (Light/Dark Mode)
  // ==========================================
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const logoImages = document.querySelectorAll('.logo-image');
  const themeMap = document.getElementById('themeMap');

  // Map URLs for different themes
  const mapUrls = {
    dark: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1589.487415488217!2d78.76963799190052!3d10.05813331191754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1791789935302!5m2!1sen!2sin',
    light: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1589.487415488217!2d78.76963799190052!3d10.05813331191754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1791789935302!5m2!1sen!2sin'
  };
  
  // Initialize theme from localStorage or system preference
  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      body.setAttribute('data-theme', savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const defaultTheme = prefersDark ? 'dark' : 'light';
      body.setAttribute('data-theme', defaultTheme);
      localStorage.setItem('theme', defaultTheme);
    }
    
    // Set initial map based on theme
    updateMapTheme();
  };

  // Update logo visibility based on theme
  const updateLogoVisibility = () => {
    const currentTheme = body.getAttribute('data-theme');
    logoImages.forEach(img => {
      if (currentTheme === 'dark') {
        if (img.classList.contains('logo-dark')) {
          img.style.display = 'block';
        } else {
          img.style.display = 'none';
        }
      } else {
        if (img.classList.contains('logo-light')) {
          img.style.display = 'block';
        } else {
          img.style.display = 'none';
        }
      }
    });
  };

  // Update map based on theme
  const updateMapTheme = () => {
    const currentTheme = body.getAttribute('data-theme');
    if (themeMap) {
      themeMap.src = mapUrls[currentTheme];
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateLogoVisibility();
    updateMapTheme();
    
    // Update theme-color meta tag
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', newTheme === 'dark' ? '#0a0f1e' : '#ffffff');
    }
  };

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Initialize theme on page load
  initializeTheme();
  updateLogoVisibility();

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      body.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      updateLogoVisibility();
      updateMapTheme();
    }
  });

  // ==========================================
  // 2. Mobile Menu Toggle
  // ==========================================
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
      hamburgerBtn.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && 
          !navMenu.contains(e.target) && 
          !hamburgerBtn.contains(e.target)) {
        hamburgerBtn.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        hamburgerBtn.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
      }
    });
  }

  // ==========================================
  // 3. Sticky Header Effect
  // ==========================================
  const navbar = document.getElementById('navbar');
  
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run once on load

  // ==========================================
  // 4. ScrollSpy: Highlight Active Nav Link
  // ==========================================
  const sections = document.querySelectorAll('section[id]');

  const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0.1
  });

  sections.forEach(section => scrollSpyObserver.observe(section));

  // ==========================================
  // 5. Scroll Reveal Animations - Enhanced
  // ==========================================
  const revealElements = document.querySelectorAll(
    '.hero-content, .hero-visual, .about-narrative, .about-profile-card, ' +
    '.skill-category-card, .project-card, .timeline-content, ' +
    '.contact-info-panel, .contact-form-panel'
  );

  revealElements.forEach(el => el.classList.add('reveal-on-scroll'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -80px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // Safety: reveal visible elements immediately
  const revealVisible = () => {
    const triggerBottom = window.innerHeight * 1.15;
    revealElements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < triggerBottom) {
        el.classList.add('revealed');
      }
    });
  };
  
  revealVisible();
  window.addEventListener('scroll', revealVisible, { passive: true });

  // ==========================================
  // 5b. Parallax Effect for Hero Image
  // ==========================================
  const profileImage = document.querySelector('.profile-main-image');
  const imageWrapper = document.querySelector('.image-wrapper');
  
  if (profileImage && imageWrapper) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;
      
      if (scrolled < 800) {
        imageWrapper.style.transform = `translateY(${rate}px)`;
      }
    }, { passive: true });
  }

  // ==========================================
  // 5c. Cursor Follow Effect on Image - DISABLED
  // ==========================================
  // Removed cursor hover 3D effect as requested

  // ==========================================
  // 5d. Animated Counting for Stats
  // ==========================================
  const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value + '+';
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statValue = entry.target.querySelector('.stat-value');
        const text = statValue.textContent;
        if (text.includes('+')) {
          const num = parseInt(text);
          if (!isNaN(num)) {
            statValue.textContent = '0+';
            animateValue(statValue, 0, num, 1500);
          }
        }
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.floating-stat').forEach(stat => {
    statsObserver.observe(stat);
  });

  // ==========================================
  // 6. Project Modal System
  // ==========================================
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCloseFooterBtn = document.getElementById('modalCloseFooterBtn');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalGithubBtn = document.getElementById('modalGithubBtn');
  const openModalButtons = document.querySelectorAll('.open-modal-btn');

  // Project data repository
  const projectDatabase = {
    'grain-drain': {
      title: 'GRAIN DRAIN',
      category: 'IoT / Smart Agriculture',
      image: 'Grain%20Drain%20Smart%20Agriculture%20Showcase.png',
      github: 'https://github.com/Vinith14kumar',
      description: 'A portable solar-powered smart grain drying and automation system designed to improve grain drying using temperature, humidity and moisture monitoring with automated control.',
      hardware: [
        'Arduino Uno Microcontroller',
        'DHT11 / DHT22 Humidity & Temperature Sensor',
        'Soil/Grain Moisture Probe',
        'Micro Servo Motor (Aeration Shutter Control)',
        'Solar Photovoltaic Panel & Charge Controller'
      ],
      highlights: [
        'Automated real-time monitoring of grain moisture to prevent post-harvest spoilage and fungal growth.',
        'Precision servo-driven ventilation control that opens flaps during optimal ambient dry conditions and seals against sudden moisture.',
        'Completely self-sustaining off-grid solar architecture tailored for agricultural and rural environments.',
        'Designed with simple Arduino C++ logic for reliable edge decision-making.'
      ],
      technologies: ['Arduino Uno', 'DHT Sensor', 'Moisture Sensor', 'Servo Motor', 'Solar Power']
    },
    'network-simulation': {
      title: 'Network Routing Simulation',
      category: 'Computer Networks',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&auto=format&fit=crop&q=80',
      github: 'https://github.com/Vinith14kumar',
      description: 'A network simulation project demonstrating routing and communication between different network devices using Cisco Packet Tracer.',
      hardware: [
        'Cisco 2911 Routers',
        'Cisco 2960 Layer-2 Switches',
        'End Devices (PCs, Servers)',
        'Serial & Ethernet Cabling Topologies'
      ],
      highlights: [
        'Configured dynamic routing using RIPv2 (Routing Information Protocol) to establish automatic route discovery across multiple subnets.',
        'Implemented Variable Length Subnet Masking (VLSM) to optimize IPv4 address allocation and avoid address depletion.',
        'Tested ICMP ping reachability, traceroute verification, and network convergence upon simulated link downtime.',
        'Documented router CLI configurations including interface addressing, default gateway assignments, and routing tables.'
      ],
      technologies: ['Cisco Packet Tracer', 'Routing', 'RIPv2', 'Networking', 'VLSM']
    },
    'cyber-case-study': {
      title: 'E-Commerce Data Breach Case Study',
      category: 'Cyber Security',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
      github: 'https://github.com/Vinith14kumar',
      description: 'A cybersecurity case study analyzing an e-commerce data breach, possible vulnerabilities, security risks and preventive measures.',
      hardware: [
        'Case Analysis Methodology',
        'Vulnerability Threat Modeling',
        'OWASP Top 10 Framework'
      ],
      highlights: [
        'Dissected attack vectors exploiting insecure input validation (SQL Injection) leading to unauthorized database dump.',
        'Examined secondary attack vectors such as credential stuffing and missing Multi-Factor Authentication (MFA) on administrator endpoints.',
        'Identified compliance shortcomings with data protection standards regarding encrypted data-at-rest.',
        'Formulated defense-in-depth mitigation roadmap: parameterized queries, Web Application Firewall (WAF), least-privilege RBAC, and secure session management.'
      ],
      technologies: ['Cyber Security', 'Network Security', 'Data Protection', 'Vulnerability Assessment']
    },
    'mz-news': {
      title: 'MZ News & Article Portal',
      category: 'Web Development / Multilingual',
      image: 'MZ News Global Portal Showcase.png',
      github: 'https://github.com/Vinith14kumar',
      description: 'A modern, responsive multilingual news website delivering latest news, breaking updates, and in-depth articles across multiple categories with support for five languages.',
      hardware: [
        'Frontend: HTML5, CSS3, JavaScript',
        'Responsive Design Framework',
        'Multilingual Language Support',
        'Content Management System'
      ],
      highlights: [
        'Multilingual news content support across five languages - Tamil, English, Hindi, Telugu, and Malayalam.',
        'Breaking-news ticker for highlighting important updates and critical stories.',
        'Category-based browsing with Politics, Business, Technology, Sports, Science, World News, Health, and Entertainment sections.',
        'Article previews with images, summaries, publication timestamps, and intuitive navigation.',
        'Login, registration, and password recovery interfaces for user authentication.',
        'Search interface and responsive layouts for desktop, tablet, and mobile devices.',
        'Modern UI with consistent branding, professional blue-themed design, and structured content cards.'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Multilingual Support', 'Responsive Design']
    }
  };

  const openModal = (projectId) => {
    const data = projectDatabase[projectId];
    if (!data) return;

    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalGithubBtn.href = data.github;

    let bodyHTML = `
      <div class="modal-project-image">
        <img src="${data.image}" alt="${data.title}" style="width: 100%; max-width: 400px; height: auto; border-radius: 12px; margin: 0 auto 1.5rem; display: block;">
      </div>
      
      <p style="margin-bottom: 1.5rem; font-size: 1.0625rem; color: var(--color-text-secondary); line-height: 1.75;">${data.description}</p>
      
      <h4>Key Architecture & Highlights</h4>
      <ul>
        ${data.highlights.map(item => `<li>${item}</li>`).join('')}
      </ul>

      <h4>Hardware & Toolset</h4>
      <ul>
        ${data.hardware.map(item => `<li>${item}</li>`).join('')}
      </ul>

      <h4>Technology Stack</h4>
      <div class="tech-pills">
        ${data.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>
    `;

    modalBody.innerHTML = bodyHTML;
    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openModalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalCloseFooterBtn) modalCloseFooterBtn.addEventListener('click', closeModal);

  // Close when clicking backdrop
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('open')) {
      closeModal();
    }
  });

  // ==========================================
  // 7. Contact Form Validation & Feedback
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formSuccessMessage = document.getElementById('formSuccessMessage');

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.classList.add('input-error');
        isValid = false;
      } else {
        nameInput.classList.remove('input-error');
      }

      // Validate Email
      if (!validateEmail(emailInput.value.trim())) {
        emailInput.classList.add('input-error');
        isValid = false;
      } else {
        emailInput.classList.remove('input-error');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageInput.classList.add('input-error');
        isValid = false;
      } else {
        messageInput.classList.remove('input-error');
      }

      if (!isValid) return;

      // Show loading state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="btn-text">Sending...</span>
        <svg class="btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
      `;

      // Add spinner animation
      if (!document.getElementById('spinner-style')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'spinner-style';
        styleSheet.textContent = `
          @keyframes spin { 100% { transform: rotate(360deg); } }
        `;
        document.head.appendChild(styleSheet);
      }

      // Prepare form data
      const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim()
      };

      // Send email using FormSubmit service
      const formDataEncoded = new URLSearchParams();
      formDataEncoded.append('name', formData.name);
      formDataEncoded.append('email', formData.email);
      formDataEncoded.append('message', formData.message);

      // Use FormSubmit (free service) to send email
      fetch('https://formspree.io/f/myzwqkdy', {
        method: 'POST',
        body: formDataEncoded,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        if (data.ok) {
          // Reset form
          contactForm.reset();

          // Show success message
          formSuccessMessage.style.display = 'flex';
          formSuccessMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

          // Hide success message after 6 seconds
          setTimeout(() => {
            formSuccessMessage.style.display = 'none';
          }, 6000);
        } else {
          console.error('Form submission error:', data);
          // Show error but still reset after local processing
          submitBtn.innerHTML = originalBtnText;
        }
      })
      .catch(error => {
        console.error('Error sending message:', error);
        // Fallback: show success locally even if API fails (user-friendly)
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        
        // Reset form
        contactForm.reset();

        // Show success message
        formSuccessMessage.style.display = 'flex';
        formSuccessMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Hide success message after 6 seconds
        setTimeout(() => {
          formSuccessMessage.style.display = 'none';
        }, 6000);
      });
    });

    // Remove error class as user types
    [nameInput, emailInput, messageInput].forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('input-error');
      });
    });
  }

  // ==========================================
  // 8. Dynamic Footer Year
  // ==========================================
  const currentYearElement = document.getElementById('currentYear');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // ==========================================
  // 9. Smooth Scroll for Anchor Links
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      
      // Skip if it's just "#"
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('open')) {
          hamburgerBtn.classList.remove('open');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
          navMenu.classList.remove('open');
        }

        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ==========================================
  // 10. Prevent Horizontal Overflow
  // ==========================================
  const preventOverflow = () => {
    const bodyWidth = document.body.scrollWidth;
    const windowWidth = window.innerWidth;
    
    if (bodyWidth > windowWidth) {
      console.warn('Horizontal overflow detected:', bodyWidth - windowWidth, 'px');
    }
  };

  window.addEventListener('load', preventOverflow);
  window.addEventListener('resize', preventOverflow);

  // ==========================================
  // 11. Add Magnetic Effect to Buttons
  // ==========================================
  const magneticButtons = document.querySelectorAll('.btn-primary, .btn-primary-sm, .back-to-top-btn');
  
  magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) translateY(-2px)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0, 0)';
    });
  });

  // ==========================================
  // 12. Add Ripple Effect to Buttons
  // ==========================================
  const createRipple = (event) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple-effect');
    
    const existingRipple = button.querySelector('.ripple-effect');
    if (existingRipple) {
      existingRipple.remove();
    }
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  };

  // Add ripple CSS
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    .ripple-effect {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      transform: scale(0);
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);

  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', createRipple);
  });

  // ==========================================
  // 13. Text Typing Animation for Hero
  // ==========================================
  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
      if (i < text.length) {
        heroSubtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };
    
    setTimeout(typeWriter, 800);
  }

  // ==========================================
  // 14. Skill Cards Tilt Effect
  // ==========================================
  const skillCards = document.querySelectorAll('.skill-category-card, .project-card');
  
  skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      
      card.style.transform = `
        perspective(1000px) 
        rotateY(${deltaX * 3}deg) 
        rotateX(${-deltaY * 3}deg) 
        translateY(-4px)
      `;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s ease';
      card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)';
    });
  });

  // ==========================================
  // 15. Smooth Page Load Animation
  // ==========================================
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
  });

  // ==========================================
  // 16. Add Glow Effect to Active Elements
  // ==========================================
  const addGlowOnFocus = () => {
    const focusableElements = document.querySelectorAll('a, button, input, textarea');
    
    focusableElements.forEach(element => {
      element.addEventListener('focus', () => {
        element.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.3)';
      });
      
      element.addEventListener('blur', () => {
        element.style.boxShadow = '';
      });
    });
  };

  addGlowOnFocus();

  // ==========================================
  // 17. Intersection Observer for Section Animations
  // ==========================================
  const sectionHeaders = document.querySelectorAll('.section-header');
  
  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease-out both';
      }
    });
  }, { threshold: 0.3 });

  sectionHeaders.forEach(header => headerObserver.observe(header));

  // Add fadeInUp animation
  const fadeUpStyle = document.createElement('style');
  fadeUpStyle.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(fadeUpStyle);

  // ==========================================
  // Console Welcome Message
  // ==========================================
  console.log('%cM. Vinith Kumar Portfolio', 'font-size: 20px; font-weight: bold; color: #0ea5e9;');
  console.log('%cBuilt with HTML, CSS & Vanilla JavaScript', 'font-size: 12px; color: #64748b;');
  console.log('%cNo frameworks. No dependencies. Pure web standards.', 'font-size: 12px; color: #64748b;');
});

  // ==========================================
  // 19. Back to Top Button - Scroll Animation
  // ==========================================
  const backToTopBtn = document.querySelector('.back-to-top-btn');
  
  const handleBackToTopVisibility = () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });
  
  // Smooth scroll to top
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // 20. Fix Education Tabs Click Event
  // ==========================================
  document.addEventListener('DOMContentLoaded', () => {
    const eduTabButtons = document.querySelectorAll('.edu-tab-btn');
    const eduTabContents = document.querySelectorAll('.edu-tab-content');

    eduTabButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const targetTab = this.getAttribute('data-tab');
        
        // Remove active from all
        eduTabButtons.forEach(btn => btn.classList.remove('active'));
        eduTabContents.forEach(content => content.classList.remove('active'));
        
        // Add active to selected
        this.classList.add('active');
        const targetContent = document.getElementById(`${targetTab}-content`);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  });

  // ==========================================
  // 21. Navbar Always Visible on Scroll
  // ==========================================
  const navbar = document.getElementById('navbar');
  let scrollTimeout;

  const handleNavbarVisibility = () => {
    // Always show navbar when scrolling
    navbar.style.transform = 'translateY(0)';
    
    // Clear previous timeout
    clearTimeout(scrollTimeout);
    
    // Hide after scrolling stops (optional, can be removed)
    // scrollTimeout = setTimeout(() => {
    //   if (window.scrollY > 100) {
    //     navbar.style.transform = 'translateY(-100%)';
    //   }
    // }, 2000);
  };

  window.addEventListener('scroll', handleNavbarVisibility, { passive: true });
