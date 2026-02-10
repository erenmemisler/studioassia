document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const header = document.getElementById('main-header');
    const heroSection = document.getElementById('hero');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    // Navigation Active State on Scroll (Optional/Enhanced)
    // Currently handled nicely by CSS intersection or simple scroll events could be added here

    // Header Scroll Effect - using the main-header ID defined above
    // Logic is handled by IntersectionObserver below for better performance

    // Sticky Header Effect
    // Adjust header background when scrolling past hero section
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }, { threshold: 0.95 }); // Trigger when hero is mostly out of view

    if (heroSection) {
        headerObserver.observe(heroSection);
    } else {
        // Fallback if no hero section (e.g. inner pages)
        header.classList.add('scrolled');
    }

    // Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Portfolio Filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    // Optional: Add a fade-in animation here
                    setTimeout(() => item.style.opacity = '1', 50);
                } else {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                }
            });
        });
    });

    // Contact Form Handling with EmailJS
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Change the button text/style to indicate loading
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = btn.innerText;
            btn.innerText = 'Gönderiliyor...';
            btn.disabled = true;

            // Service ID from user, Template ID placeholder
            const serviceID = 'service_k7ixbmh';
            const templateID = 'template_1g58kdc';

            emailjs.sendForm(serviceID, templateID, this, 'LlwAuYWSIcSeH3h3d')
                .then(() => {
                    btn.innerText = 'Mesaj Gönderildi!';
                    btn.style.backgroundColor = '#4CAF50'; // Green
                    contactForm.reset();

                    setTimeout(() => {
                        btn.innerText = originalBtnText;
                        btn.disabled = false;
                        btn.style.backgroundColor = '';
                    }, 3000);
                }, (err) => {
                    btn.innerText = 'Hata Oluştu';
                    btn.style.backgroundColor = '#f44336'; // Red
                    btn.disabled = false;
                    alert("Hata: " + JSON.stringify(err));

                    setTimeout(() => {
                        btn.innerText = originalBtnText;
                        btn.style.backgroundColor = '';
                    }, 3000);
                });
        });
    }

    // Scroll Animations (Fade in on scroll)
    const fadeElems = document.querySelectorAll('.fade-in, .section-header, .about-content, .service-item');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible to save performance
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElems.forEach(elem => {
        // Add base class if not present in HTML manually
        elem.classList.add('fade-in');
        appearOnScroll.observe(elem);
    });
});
