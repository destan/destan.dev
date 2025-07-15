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
                    background: var(--surface);
                    border-bottom: 1px solid #e2e8f0;
                    display: block;
                    font-family: inherit;
                    padding: 1rem 0;
                }

                :host *,
                :host *::before,
                :host *::after {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                .container {
                    font-family: inherit;
                    margin: 0 auto;
                    max-width: 800px;
                    padding: 0 1.5rem;
                }

                .breadcrumbs {
                    align-items: center;
                    color: var(--text-secondary, #64748b);
                    display: flex;
                    font-family: inherit;
                    font-size: 0.875rem;
                    justify-content: flex-start;
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
                    color: var(--text-secondary, #64748b);
                    margin: 0 0.5rem;
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