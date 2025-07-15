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
                    display: block;
                    text-align: center;
                    margin-bottom: 3rem;
                    padding-bottom: 2rem;
                    border-bottom: 1px solid var(--border-color);
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
                    background-clip: text;
                    color: var(--text-primary);
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
                        <div>By <strong><slot name="author">Default Author</slot></strong></div>
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