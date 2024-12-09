document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.futuristic-header');
    const menuToggle = document.getElementById('menu-toggle');
    const mainMenu = document.getElementById('main-menu');
    const logo = document.querySelector('.logo');
    let menuTimeout;

    // Set a variable for the original header height
    const originalHeaderHeight = header.offsetHeight;

    // Set a variable for the reduced header height
    const reducedHeaderHeight = 60; // Adjust this value as needed

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        mainMenu.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu after clicking a link
                mainMenu.classList.remove('active');
            }
        });
    });

    // Update the scroll event to adjust header width
    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY;

        // Adjust header width and hide/show the menu
        if (scrollPosition > 0) {
            const logoWidth = logo.offsetWidth; // Get the logo width
            header.style.width = `${logoWidth + 100}px`; // Set width to logo width + extra space
            mainMenu.classList.remove('active'); // Hide entire menu
            mainMenu.style.display = 'none'; // Ensure menu is hidden
        } else {
            header.style.width = '100%'; // Reset to full width
            mainMenu.classList.add('active'); // Show menu when at the top
            mainMenu.style.display = 'flex'; // Show menu
        }

        // Highlight active section in navigation
        navLinks.forEach(link => {
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const sectionTop = targetSection.offsetTop - header.offsetHeight - 5;
                const sectionBottom = sectionTop + targetSection.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    });

    // Show menu for 5 seconds on logo hover
    logo.addEventListener('mouseover', () => {
        mainMenu.classList.add('active'); // Show the menu
        mainMenu.style.display = 'flex'; // Ensure the menu is displayed
        clearTimeout(menuTimeout); // Clear any existing timeout
        menuTimeout = setTimeout(() => {
            mainMenu.classList.remove('active'); // Hide the menu after 5 seconds
            mainMenu.style.display = 'none'; // Ensure the menu is hidden
        }, 5000); // Show for 5 seconds
    });

    // Ensure the menu stays visible while hovering over it
    mainMenu.addEventListener('mouseover', () => {
        clearTimeout(menuTimeout); // Clear the timeout if hovering over the menu
    });

    // Hide the menu when not hovering
    mainMenu.addEventListener('mouseleave', () => {
        menuTimeout = setTimeout(() => {
            mainMenu.classList.remove('active'); // Hide the menu when not hovering
            mainMenu.style.display = 'none'; // Ensure the menu is hidden
        }, 5000); // Hide after 5 seconds
    });

    // Add hover effect to expand header width
    header.addEventListener('mouseover', () => {
        header.style.width = '100%'; // Expand to full width on hover
    });

    // Add blur effect to header
    header.style.backdropFilter = 'blur(10px)'; // Apply blur effect
    header.style.transition = 'border-radius 0.3s'; // Smooth transition for border-radius

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = document.querySelector('.futuristic-header').offsetHeight;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                entry.target.classList.remove('animate');
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.feature-item, .event-item').forEach(item => {
        observer.observe(item);
    });

    window.addEventListener('scroll', function() {
        const parallaxElement = document.querySelector('.hero');
        const speed = 0.5;
        parallaxElement.style.transform = `translateY(${window.scrollY * speed}px)`;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Get all timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Create the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add 'is-visible' class when timeline item enters viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Once animation is done, stop observing the element
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Element becomes visible when 20% of it enters the viewport
        threshold: 0.2,
        // Start animation slightly before element enters viewport
        rootMargin: '0px 0px -100px 0px'
    });

    // Start observing each timeline item
    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Fallback for browsers that don't support Intersection Observer
    function showItemsOnScroll() {
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight * 0.8) {
                item.classList.add('is-visible');
            }
        });
    }

    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
        // If not supported, use scroll event
        window.addEventListener('scroll', showItemsOnScroll);
        // Initial check for items in view
        showItemsOnScroll();
    }
});