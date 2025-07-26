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
                    background: var(--primary-color);
                    border-radius: 50%;
                    color: var(--primary-text-color-when-primary-color-is-bg);
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

                /* Tablet responsive design */
                @media (max-width: 768px) {
                    .author-bio {
                        margin: 2.5rem 0;
                        padding: 1.5rem;
                    }

                    .author-info {
                        flex-direction: column;
                        gap: 1rem;
                        text-align: center;
                    }

                    .author-details h4 {
                        font-size: 1.0625rem;
                    }

                    .author-title {
                        font-size: 0.8125rem;
                    }

                    .author-bio-text {
                        font-size: 0.8125rem;
                        line-height: 1.5;
                    }
                }

                /* Mobile responsive design */
                @media (max-width: 480px) {
                    .author-bio {
                        border-radius: 0;
                        margin: 2rem 0;
                        padding: 1.5rem;
                        position: relative;
                        max-width: calc(100vw - 0px);
                        box-sizing: border-box;
                    }

                    .author-info {
                        flex-direction: column;
                        gap: 0.75rem;
                        text-align: center;
                    }

                    .author-avatar {
                        height: 50px;
                        width: 50px;
                        font-size: 1.25rem;
                    }

                    .author-details h4 {
                        font-size: 1.125rem;
                    }

                    .author-title {
                        font-size: 0.875rem;
                        margin-top: 0.1875rem;
                    }

                    .author-bio-text {
                        font-size: 0.9375rem;
                        line-height: 1.5;
                    }
                }

                /* Extra small mobile */
                @media (max-width: 360px) {
                    .author-bio {
                        padding: 1.25rem;
                    }

                    .author-avatar {
                        height: 44px;
                        width: 44px;
                        font-size: 1.125rem;
                    }

                    .author-details h4 {
                        font-size: 0.9375rem;
                    }

                    .author-title {
                        font-size: 0.6875rem;
                    }

                    .author-bio-text {
                        font-size: 0.75rem;
                        line-height: 1.3;
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