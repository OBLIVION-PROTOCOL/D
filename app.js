/*
════════════════════════════════════════════════════════════════
DiGiConnect JavaScript
Minimal. Progressive enhancement only.
The site works without this. This just makes it nicer.
════════════════════════════════════════════════════════════════
*/

// Wait for DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // ═══════════════════════════════════════════════════════════════
    // Mobile Menu Toggle
    // ═══════════════════════════════════════════════════════════════
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });
    }
    
    // ═══════════════════════════════════════════════════════════════
    // Smooth Scroll for Anchor Links
    // ═══════════════════════════════════════════════════════════════
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ═══════════════════════════════════════════════════════════════
    // Header Background on Scroll
    // ═══════════════════════════════════════════════════════════════
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // ═══════════════════════════════════════════════════════════════
    // Simple Fade-In on Scroll (Intersection Observer)
    // ═══════════════════════════════════════════════════════════════
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections for fade-in
    document.querySelectorAll('section').forEach(function(section) {
        section.classList.add('fade-in');
        fadeObserver.observe(section);
    });
    
    // ═══════════════════════════════════════════════════════════════
    // PWA Install Prompt
    // ═══════════════════════════════════════════════════════════════
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', function(e) {
        e.preventDefault();
        deferredPrompt = e;
        
        // Could show an install button here
        console.log('PWA install available');
    });
    
    // ═══════════════════════════════════════════════════════════════
    // Service Worker Registration removed to prevent caching issues
    // (PWA offline caching intentionally disabled)
    // ═══════════════════════════════════════════════════════════════
    
});

// ═══════════════════════════════════════════════════════════════
// Add styles for fade-in animation
// ═══════════════════════════════════════════════════════════════
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .header.scrolled {
        background: rgba(15, 23, 42, 0.98);
    }
    
    .nav-links.open {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        flex-direction: column;
        background: var(--color-bg);
        padding: var(--spacing-lg);
        border-top: 1px solid var(--color-border);
        gap: var(--spacing-md);
    }
    
    .mobile-menu.open span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu.open span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu.open span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
    }
`;
document.head.appendChild(style);
