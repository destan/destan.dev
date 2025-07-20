class SmoothScroll extends HTMLElement {
    constructor() {
        super();
        this.handleAnchorClick = this.handleAnchorClick.bind(this);
    }

    connectedCallback() {
        this.setupSmoothScrolling();
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