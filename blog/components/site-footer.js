class SiteFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const currentYear = new Date().getFullYear();
        
        this.shadowRoot.innerHTML = `
            <style>
                /* Reset and isolation */
                :host {
                    all: initial;
                    display: block;
                    background: #f8fafc;
                    border-top: 1px solid #e2e8f0;
                    padding: 2rem 0;
                    text-align: center;
                    color: #64748b;
                    margin-top: 4rem;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    
                    /* Re-declare CSS variables since all: initial resets them */
                    --surface: #f8fafc;
                    --border-color: #e2e8f0;
                    --text-secondary: #64748b;
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

                p {
                    margin: 0;
                    line-height: 1.5;
                    font-family: inherit;
                }

                @media (max-width: 768px) {
                    .container {
                        padding: 0 1rem;
                    }
                }

                @media print {
                    :host {
                        display: none;
                    }
                }
            </style>
            <div class="container">
                <p>&copy; ${currentYear} DevBlog. All rights reserved. Built with semantic HTML5 and modern CSS.</p>
            </div>
        `;
    }
}

customElements.define('site-footer', SiteFooter);