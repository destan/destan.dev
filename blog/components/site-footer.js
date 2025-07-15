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
                    background: #f8fafc;
                    border-top: 1px solid #e2e8f0;
                    color: #64748b;
                    display: block;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    margin-top: 4rem;
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

                .container {
                    font-family: inherit;
                    margin: 0 auto;
                    max-width: 800px;
                    padding: 0 1.5rem;
                }

                p {
                    font-family: inherit;
                    line-height: 1.5;
                    margin: 0;
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