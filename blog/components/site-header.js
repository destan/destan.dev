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
        // Get breadcrumbs from child element
        const breadcrumbsElement = this.querySelector('bread-crumbs');
        const currentPageElement = this.querySelector('current-page');
        
        const breadcrumbsText = breadcrumbsElement ? breadcrumbsElement.textContent.trim() : '';

        // Split breadcrumbs by ' > ' and create links
        const breadcrumbParts = breadcrumbsText ? breadcrumbsText.split(/\s*>\s*/) : [];
        let breadcrumbsHTML = '';

        if (breadcrumbParts.length > 0) {
            breadcrumbsHTML = breadcrumbParts.map((part, index) => {
                const isLast = index === breadcrumbParts.length - 1;
                const trimmedPart = part.trim();
                
                // Generate appropriate links based on breadcrumb text
                let href = '/';
                if (trimmedPart.toLowerCase() === 'home') {
                    href = '/';
                } else {
                    // Build path from breadcrumb parts up to current index
                    const pathParts = breadcrumbParts.slice(1, index + 1).map(p => p.trim().toLowerCase().replace(/\s+/g, '-'));
                    href = '/' + pathParts.join('/');
                }
                
                return `<a href="${href}">${trimmedPart}</a>`;
            }).join('<span class="breadcrumbs-separator" aria-hidden="true">›</span>');
        }

        breadcrumbsHTML += `<span class="breadcrumbs-separator" aria-hidden="true">›</span><span aria-current="page">${currentPageElement.textContent.trim()}</span>`
        
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
                    justify-content: flex-start;
                    font-size: 0.875rem;
                    color: var(--text-secondary, #64748b);
                    font-family: inherit;
                    line-height: 1.4;
                    min-height: 2rem;
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
                    ${breadcrumbsHTML}
                </nav>
            </div>
        `;
    }
}

customElements.define('site-header', SiteHeader);