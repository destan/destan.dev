class AuthorBio extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['author', 'author-initials', 'title', 'bio'];
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
        const author = this.getAttribute('author') || 'Sarah Chen';
        const authorInitials = this.getAttribute('author-initials') || 'SC';
        const title = this.getAttribute('title') || 'Senior Software Engineer';
        const bio = this.getAttribute('bio') || 'Passionate about building scalable web applications and sharing knowledge through technical writing.';

        this.shadowRoot.innerHTML = `
            <style>
                /* Reset and isolation */
                :host {
                    all: initial;
                    display: block;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    
                    /* Re-declare CSS variables since all: initial resets them */
                    --surface: #f8fafc;
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

                .author-bio {
                    background: var(--surface, #f8fafc);
                    border-radius: 12px;
                    padding: 2rem;
                    margin: 3rem 0;
                    border: 1px solid var(--border-color, #e2e8f0);
                    font-family: inherit;
                }

                .author-info {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }

                .author-avatar {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, var(--primary-color, #2563eb), var(--accent-color, #f59e0b));
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 600;
                    font-size: 1.5rem;
                    flex-shrink: 0;
                }

                .author-details h4 {
                    margin: 0;
                    color: var(--text-primary, #1e293b);
                    font-size: 1.125rem;
                    font-weight: 600;
                    line-height: 1.4;
                }

                .author-title {
                    color: var(--text-secondary, #64748b);
                    font-size: 0.875rem;
                    margin-top: 0.25rem;
                    font-weight: 400;
                }

                .author-bio-text {
                    color: var(--text-primary, #1e293b);
                    line-height: 1.6;
                    font-size: 0.875rem;
                    margin: 0;
                }

                @media (max-width: 768px) {
                    .author-info {
                        flex-direction: column;
                        text-align: center;
                        gap: 1rem;
                    }

                    .author-bio {
                        padding: 1.5rem;
                    }
                }

                @media (max-width: 480px) {
                    .author-bio {
                        padding: 1rem;
                        margin: 2rem 0;
                    }
                }
            </style>
            <div class="author-bio">
                <div class="author-info">
                    <div class="author-avatar" aria-hidden="true">${authorInitials}</div>
                    <div class="author-details">
                        <h4>${author}</h4>
                        <div class="author-title">${title}</div>
                    </div>
                </div>
                <p class="author-bio-text">${bio}</p>
            </div>
        `;
    }
}

customElements.define('author-bio', AuthorBio);