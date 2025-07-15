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

        const title = this.querySelector('[slot="title"]')?.textContent || '';
        const subTitle = this.querySelector('[slot="subtitle"]')?.textContent || '';
        const date = this.querySelector('[slot="date"]')?.textContent || '';
        const author = this.querySelector('[slot="author"]')?.textContent || 'Destan Sarpkaya';
        let authorInitials = this.querySelector('[slot="author-initials"]')?.textContent || '';

        if (!authorInitials && author) {
            authorInitials = author.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        }

        this.shadowRoot.innerHTML = `
            <style>
                /* Reset and isolation */
                :host {
                    border-bottom: 1px solid var(--border-color);
                    display: block;
                    font-family: inherit;
                    margin-bottom: 3rem;
                    padding: 2rem 0;
                    text-align: center;
                }

                :host *,
                :host *::before,
                :host *::after {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                h1 {
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
                <h1>${title}</h1>
                <p class="article-subtitle">${subTitle}</p>
                <div class="article-meta">
                    <div class="author-avatar" aria-hidden="true">${authorInitials}</div>
                    <div>
                        <div>By <strong><slot rel="author"  name="author">Destan Sarpkaya</slot></strong></div>
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