/**
 * Components Bundle
 * All web components bundled into a single file for faster loading
 * This file is auto-generated - do not edit manually
 */

// Site Header Component
class SiteHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['current-page'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        if (this.shadowRoot) {
            this.render();
        }
    }

    render() {
        const currentPage = this.getAttribute('current-page') || '';
        
        this.shadowRoot.innerHTML = `
            <style>
                /* Reset and isolation */
                :host {
                    all: initial;
                    display: block;
                    background: #f8fafc;
                    border-bottom: 1px solid #e2e8f0;
                    padding: 1rem 0;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    
                    /* Re-declare CSS variables since all: initial resets them */
                    --surface: #f8fafc;
                    --border-color: #e2e8f0;
                    --primary-color: #2563eb;
                    --text-secondary: #64748b;
                    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                :host *,
                :host *::before,
                :host *::after {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                    font-family: inherit;
                }

                .breadcrumbs {
                    display: flex;
                    align-items: center;
                    font-size: 0.875rem;
                    color: var(--text-secondary, #64748b);
                    margin-bottom: 1rem;
                    font-family: inherit;
                    line-height: 1.4;
                }

                .breadcrumbs a {
                    color: var(--text-secondary, #64748b);
                    text-decoration: none;
                    transition: var(--transition, all 0.3s cubic-bezier(0.4, 0, 0.2, 1));
                }

                .breadcrumbs a:hover {
                    color: var(--primary-color, #2563eb);
                }

                .breadcrumbs-separator {
                    margin: 0 0.5rem;
                    color: var(--text-secondary, #64748b);
                }

                @media (max-width: 480px) {
                    .breadcrumbs {
                        font-size: 0.75rem;
                    }
                    
                    .container {
                        padding: 0 1rem;
                    }
                }
            </style>
            <div class="container">
                <nav class="breadcrumbs" aria-label="Breadcrumb">
                    <a href="/">Home</a>
                    <span class="breadcrumbs-separator" aria-hidden="true">›</span>
                    <a href="/blog">Blog</a>
                    <span class="breadcrumbs-separator" aria-hidden="true">›</span>
                    <a href="/blog/tech">Tech</a>
                    <span class="breadcrumbs-separator" aria-hidden="true">›</span>
                    <span aria-current="page">\${currentPage}</span>
                </nav>
            </div>
        `;
    }
}

// Article Header Component
class ArticleHeader extends HTMLElement {
    static get observedAttributes() {
        return ['title', 'subtitle', 'date', 'author', 'author-initials'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        if (this.shadowRoot) {
            this.render();
        }
    }

    render() {
        const title = this.getAttribute('title') || '';
        const subtitle = this.getAttribute('subtitle') || '';
        const date = this.getAttribute('date') || '';
        const author = this.getAttribute('author') || 'Sarah Chen';
        const authorInitials = this.getAttribute('author-initials') || 'SC';

        // Create shadow DOM
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
        }

        this.shadowRoot.innerHTML = `
            <style>
                /* Reset and isolation */
                :host {
                    all: initial;
                    display: block;
                    text-align: center;
                    margin-bottom: 3rem;
                    padding-bottom: 2rem;
                    border-bottom: 1px solid #e2e8f0;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    
                    /* Re-declare CSS variables since all: initial resets them */
                    --border-color: #e2e8f0;
                    --primary-color: #2563eb;
                    --accent-color: #f59e0b;
                    --text-primary: #1e293b;
                    --text-secondary: #64748b;
                }

                :host *,
                :host *::before,
                :host *::after {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                .article-title {
                    font-size: 3rem;
                    font-weight: 800;
                    margin-bottom: 1rem;
                    background: linear-gradient(135deg, var(--primary-color, #2563eb), var(--accent-color, #f59e0b));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    color: var(--text-primary, #1e293b);
                    font-family: inherit;
                    line-height: 1.2;
                }

                .article-subtitle {
                    font-size: 1.25rem;
                    color: var(--text-secondary, #64748b);
                    margin-bottom: 2rem;
                    font-weight: 400;
                    font-family: inherit;
                    line-height: 1.4;
                }

                .article-meta {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 1rem;
                    font-size: 0.875rem;
                    color: var(--text-secondary, #64748b);
                    font-family: inherit;
                    line-height: 1.4;
                }

                .author-info {
                    font-family: inherit;
                }

                .author-info div {
                    font-family: inherit;
                }

                time {
                    font-family: inherit;
                }

                .author-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, var(--primary-color, #2563eb), var(--accent-color, #f59e0b));
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 600;
                }

                @media (max-width: 768px) {
                    .article-title {
                        font-size: 2rem;
                    }

                    .article-subtitle {
                        font-size: 1rem;
                    }

                    .article-meta {
                        flex-direction: column;
                        gap: 0.5rem;
                    }
                }
            </style>
            <header>
                <h1 class="article-title">\${title}</h1>
                \${subtitle ? `<p class="article-subtitle">\${subtitle}</p>` : ''}
                <div class="article-meta">
                    <div class="author-avatar" aria-hidden="true">\${authorInitials}</div>
                    <div>
                        <div>By <strong>\${author}</strong></div>
                        \${date ? `<time datetime="\${date}">\${this.formatDate(date)}</time>` : ''}
                    </div>
                </div>
            </header>
        `;
    }

    formatDate(dateString) {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return dateString;
        }
    }
}

// Smooth Scroll Component (Critical for UX)
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
        document.removeEventListener('click', this.handleAnchorClick);
    }

    setupSmoothScrolling() {
        document.addEventListener('click', this.handleAnchorClick);
    }

    handleAnchorClick(e) {
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

            if (history.pushState) {
                history.pushState(null, null, href);
            }

            if (target.tabIndex < 0) {
                target.tabIndex = -1;
            }
            target.focus();
        }
    }

    setupAccessibility() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #2563eb;
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

        if (!document.querySelector('.skip-link')) {
            document.body.insertBefore(skipLink, document.body.firstChild);
        }

        const mainElement = document.querySelector('main');
        if (mainElement && !mainElement.id) {
            mainElement.id = 'main';
        }
    }

    static scrollToElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    static scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Register all critical components immediately
customElements.define('site-header', SiteHeader);
customElements.define('article-header', ArticleHeader);
customElements.define('smooth-scroll', SmoothScroll);

// Auto-initialize smooth scroll
document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('smooth-scroll')) {
        const smoothScroll = document.createElement('smooth-scroll');
        smoothScroll.style.display = 'none';
        document.body.appendChild(smoothScroll);
    }
});

console.log('Critical components bundle loaded');