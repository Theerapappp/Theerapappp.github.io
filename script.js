document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animation setup
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };

    const revealOptions = {
        threshold: 0.1,  // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 2. Navbar shrink/shadow/blur on scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('py-2');
            navbar.classList.remove('py-4');
        } else {
            navbar.classList.add('py-4');
            navbar.classList.remove('py-2');
        }
    });

    // 3. Cute companion cursor effect (follows mouse somewhat softly)
    const cursorCompanion = document.getElementById('cursor-companion');
    
    // Only enable custom companion on desktop and prevent touch issues
    const isTouchDevice = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
    
    if (!isTouchDevice && window.matchMedia("(min-width: 768px)").matches) {
        cursorCompanion.classList.remove('hidden');
        
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        
        let companionX = window.innerWidth / 2;
        let companionY = window.innerHeight / 2;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Loop for smooth follow effect
        const smoothFollow = () => {
            // Speed factor
            const speed = 0.12;
            
            // The cursor floats slightly to the bottom right of the main mouse
            companionX += (mouseX - companionX) * speed + 2; 
            companionY += (mouseY - companionY) * speed + 2;
            
            cursorCompanion.style.left = companionX + 'px';
            cursorCompanion.style.top = companionY + 'px';
            
            requestAnimationFrame(smoothFollow);
        }
        
        smoothFollow();
        
        // Hide when mouse leaves the window
        document.addEventListener('mouseout', (e) => {
            if (e.relatedTarget === null) {
                cursorCompanion.style.opacity = '0';
            }
        });
        document.addEventListener('mouseover', () => {
            cursorCompanion.style.opacity = '1';
        });
    }
    
    // 4. Add interactive click squish to cards
    const projectCards = document.querySelectorAll('#projects .group');
    projectCards.forEach(card => {
        card.addEventListener('mousedown', () => {
            card.style.transform = 'scale(0.97)';
        });
        card.addEventListener('mouseup', () => {
            card.style.transform = '';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});
