class SmoothScroll extends HTMLElement {
    constructor() {
        super();
        this.handleAnchorClick = this.handleAnchorClick.bind(this);
    }

    connectedCallback() {
        this.setupSmoothScrolling();
        this.setupAccessibility();
    }

    disconnectedCallback() {
        // Clean up event listeners
        document.removeEventListener('click', this.handleAnchorClick);
    }

    setupSmoothScrolling() {
        // Handle anchor link clicks for smooth scrolling
        document.addEventListener('click', this.handleAnchorClick);
    }

    handleAnchorClick(e) {
        // Check if the clicked element is an anchor link
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;

        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;

        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Update URL without triggering page reload
            if (history.pushState) {
                history.pushState(null, null, href);
            }

            // Focus management for accessibility
            if (target.tabIndex < 0) {
                target.tabIndex = -1;
            }
            target.focus();
        }
    }

    setupAccessibility() {
        // Enhanced accessibility: skip to main content functionality
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-color, #2563eb);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            font-size: 14px;
            transition: top 0.3s ease;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        // Insert skip link if it doesn't exist
        if (!document.querySelector('.skip-link')) {
            document.body.insertBefore(skipLink, document.body.firstChild);
        }

        // Ensure main element has ID for skip link
        const mainElement = document.querySelector('main');
        if (mainElement && !mainElement.id) {
            mainElement.id = 'main';
        }
    }

    // Static method to scroll to element by ID
    static scrollToElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Static method to scroll to top
    static scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Define the custom element
customElements.define('smooth-scroll', SmoothScroll);

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('smooth-scroll')) {
        const smoothScroll = document.createElement('smooth-scroll');
        smoothScroll.style.display = 'none'; // Hidden utility component
        document.body.appendChild(smoothScroll);
    }
});