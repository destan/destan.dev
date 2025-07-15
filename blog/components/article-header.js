class ArticleHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // We render here to ensure the component's children (for slots) are available in the DOM
        this.render();
    }

    render() {
        // Read content from child elements using their slot name.
        // The ?. is optional chaining, which prevents errors if the element doesn't exist.
        const date = this.querySelector('[slot="date"]')?.textContent || '';
        const author = this.querySelector('[slot="author"]')?.textContent || 'Destan Sarpkaya';
        let authorInitials = this.querySelector('[slot="author-initials"]')?.textContent || '';

        // Smartly generate initials if they are not provided, making the component easier to use.
        if (!authorInitials && author) {
            authorInitials = author.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        }

        this.shadowRoot.innerHTML = `
            <style>
                /* Reset and isolation */
                :host {
                    border-bottom: 1px solid var(--border-color);
                    display: block;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    margin-bottom: 3rem;
                    padding-bottom: 2rem;
                    text-align: center;
                }

                :host *,
                :host *::before,
                :host *::after {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                .article-title {
                    background-clip: text;
                    color: var(--text-primary);
                    font-family: inherit;
                    font-size: 3rem;
                    font-weight: 800;
                    line-height: 1.2;
                    margin-bottom: 1rem;
                }

                .article-subtitle {
                    color: var(--text-secondary, #64748b);
                    font-family: inherit;
                    font-size: 1.25rem;
                    font-weight: 400;
                    line-height: 1.4;
                    margin-bottom: 2rem;
                }

                .article-meta {
                    align-items: center;
                    color: var(--text-secondary, #64748b);
                    display: flex;
                    font-size: 0.875rem;
                    gap: 1rem;
                    justify-content: center;
                }

                .author-avatar {
                    align-items: center;
                    background: var(--primary-color);
                    border-radius: 50%;
                    color: white;
                    display: flex;
                    font-weight: 600;
                    height: 40px;
                    justify-content: center;
                    width: 40px;
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
                <div class="article-title">
                    <!-- This slot will be filled by the element with slot="title" -->
                    <slot name="title">A Default Title</slot>
                </div>
                <div class="article-subtitle">
                    <slot name="subtitle"></slot>
                </div>
                <div class="article-meta">
                    <div class="author-avatar" aria-hidden="true">${authorInitials}</div>
                    <div>
                        <div>By <strong><slot name="author">Destan Sarpkaya</slot></strong></div>
                        ${date ? `<time datetime="${date}">${this.formatDate(date)}</time>` : ''}
                    </div>
                </div>
            </header>
        `;
    }

    formatDate(dateString) {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            // Add timeZone to prevent off-by-one-day errors depending on the user's location
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'UTC'
            });
        } catch {
            return dateString;
        }
    }
}

customElements.define('article-header', ArticleHeader);