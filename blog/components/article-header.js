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
        const author = this.getAttribute('author') || 'Destan Sarpkaya';
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
                <h1 class="article-title">${title}</h1>
                ${subtitle ? `<p class="article-subtitle">${subtitle}</p>` : ''}
                <div class="article-meta">
                    <div class="author-avatar" aria-hidden="true">${authorInitials}</div>
                    <div>
                        <div>By <strong>${author}</strong></div>
                        ${date ? `<time datetime="${date}">${this.formatDate(date)}</time>` : ''}
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

customElements.define('article-header', ArticleHeader);