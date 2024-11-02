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
});
