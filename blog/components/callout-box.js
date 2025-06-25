class CalloutBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['title', 'type'];
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
        const type = this.getAttribute('type') || 'info';
        
        // Define color schemes for different types
        const typeStyles = {
            info: {
                background: 'linear-gradient(135deg, #dbeafe, #e0f2fe)',
                border: '#93c5fd',
                titleColor: 'var(--primary-color, #2563eb)'
            },
            warning: {
                background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                border: '#fbbf24',
                titleColor: '#d97706'
            },
            success: {
                background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
                border: '#34d399',
                titleColor: '#059669'
            },
            error: {
                background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
                border: '#f87171',
                titleColor: '#dc2626'
            }
        };

        const style = typeStyles[type] || typeStyles.info;
        
        this.shadowRoot.innerHTML = `
            <style>
                /* Reset and isolation */
                :host {
                    all: initial;
                    display: block;
                    background: ${style.background};
                    border: 1px solid ${style.border};
                    border-radius: 8px;
                    padding: 1rem;
                    margin: 2rem 0;
                    box-sizing: border-box;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    
                    /* Re-declare CSS variables since all: initial resets them */
                    --text-primary: #1e293b;
                }

                :host *,
                :host *::before,
                :host *::after {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                .callout-title {
                    font-weight: 600;
                    color: ${style.titleColor};
                    margin-bottom: 0.5rem;
                    font-size: 1rem;
                    font-family: inherit;
                    line-height: 1.4;
                }

                .callout-content {
                    color: var(--text-primary, #1e293b);
                    line-height: 1.6;
                    font-family: inherit;
                }

                /* Override shared.css paragraph styles */
                .callout-content ::slotted(p) {
                    margin: 0 !important;
                    margin-bottom: 0.5rem !important;
                }

                .callout-content ::slotted(p:last-child) {
                    margin-bottom: 0 !important;
                }

                /* Ensure proper spacing for any content */
                .callout-content ::slotted(*) {
                    margin-top: 0 !important;
                }

                .callout-content ::slotted(*:not(:last-child)) {
                    margin-bottom: 0.75rem !important;
                }

                @media (max-width: 480px) {
                    :host {
                        padding: 1rem;
                    }
                }
            </style>
            ${title ? `<div class="callout-title">${title}</div>` : ''}
            <div class="callout-content">
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('callout-box', CalloutBox);