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
        const author = this.getAttribute('author') || 'Destan Sarpkaya';
        const authorInitials = this.getAttribute('author-initials') || 'DS';
        const title = this.getAttribute('title') || 'Software Architect';
        const bio = this.getAttribute('bio') || 'Passionate about building scalable web applications and sharing knowledge through technical writing.';

        this.shadowRoot.innerHTML = `
            <style>
                /* Reset and isolation */
                :host {
                    all: initial;
                    display: block;
                    font-family: inherit;
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
                    border: 1px solid var(--border-color, #e2e8f0);
                    border-radius: 12px;
                    font-family: inherit;
                    margin: 3rem 0;
                    padding: 2rem;
                }

                .author-info {
                    align-items: center;
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }

                .author-avatar {
                    align-items: center;
                    background: linear-gradient(135deg, var(--primary-color, #2563eb), var(--accent-color, #f59e0b));
                    border-radius: 50%;
                    color: white;
                    display: flex;
                    flex-shrink: 0;
                    font-size: 1.5rem;
                    font-weight: 600;
                    height: 60px;
                    justify-content: center;
                    width: 60px;
                }

                .author-details h4 {
                    color: var(--text-primary, #1e293b);
                    font-size: 1.125rem;
                    font-weight: 600;
                    line-height: 1.4;
                    margin: 0;
                }

                .author-title {
                    color: var(--text-secondary, #64748b);
                    font-size: 0.875rem;
                    font-weight: 400;
                    margin-top: 0.25rem;
                }

                .author-bio-text {
                    color: var(--text-primary, #1e293b);
                    font-size: 0.875rem;
                    line-height: 1.6;
                    margin: 0;
                }

                @media (max-width: 768px) {
                    .author-info {
                        flex-direction: column;
                        gap: 1rem;
                        text-align: center;
                    }

                    .author-bio {
                        padding: 1.5rem;
                    }
                }

                @media (max-width: 480px) {
                    .author-bio {
                        margin: 2rem 0;
                        padding: 1rem;
                    }
                }
            </style>
            <div class="author-bio">
                <div class="author-info">
                    <div class="author-avatar" aria-hidden="true">${authorInitials}</div>
                    <div class="author-details">
                        <strong>${author}</strong>
                        <div class="author-title">${title}</div>
                    </div>
                </div>
                <p class="author-bio-text">${bio}</p>
            </div>
        `;
    }
}

customElements.define('author-bio', AuthorBio);