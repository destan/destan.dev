class CalloutBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['type'];
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
        const type = this.getAttribute('type') || 'info';
        // Define color schemes for different types
        const typeStyles = {
            info: {
                background: 'linear-gradient(135deg, #dbeafe, #e0f2fe)',
                border: '#93c5fd',
                titleColor: '#2563eb'
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
        // Find a <title> child for backward compatibility
        const title = this.querySelector('title')?.textContent;
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    all: initial;
                    background: ${style.background};
                    border: 1px solid ${style.border};
                    border-radius: 8px;
                    box-sizing: border-box;
                    display: block;
                    font-family: inherit;
                    margin: 2rem 0;
                    padding: 1rem;
                }
                :host *,
                :host *::before,
                :host *::after {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }
                .callout-title {
                    color: ${style.titleColor};
                    font-family: inherit;
                    font-size: 1rem;
                    font-weight: 600;
                    line-height: 1.4;
                    margin-bottom: 0.5rem;
                }
                .callout-content {
                    color: var(--text-primary, #1e293b);
                    font-family: inherit;
                    line-height: 1.6;
                }
                .callout-content ::slotted(p) {
                    margin: 0 !important;
                    margin-bottom: 0.5rem !important;
                }
                .callout-content ::slotted(p:last-child) {
                    margin-bottom: 0 !important;
                }
                .callout-content ::slotted(*) {
                    margin-top: 0 !important;
                }
                .callout-content ::slotted(*:not(:last-child)) {
                    margin-bottom: 0.75rem !important;
                }
                /* Tablet responsive design */
                @media (max-width: 768px) {
                    :host {
                        margin: 1.5rem 0;
                        padding: 1.25rem;
                    }
                    
                    .callout-title {
                        font-size: 0.9375rem;
                        margin-bottom: 0.75rem;
                    }
                    
                    .callout-content {
                        font-size: 0.9375rem;
                        line-height: 1.5;
                    }
                }

                /* Mobile responsive design */
                @media (max-width: 480px) {
                    :host {
                        border-radius: 0;
                        padding: 1rem;
                        position: relative;
                        max-width: calc(100vw - 0px);
                        box-sizing: border-box;
                    }
                    
                    .callout-title {
                        font-size: 1rem;
                        line-height: 1.3;
                    }
                    
                    .callout-content {
                        font-size: 0.9375rem;
                        line-height: 1.5;
                    }
                }

                /* Extra small mobile */
                @media (max-width: 360px) {
                    :host {
                        padding: 1rem;
                    }
                    
                    .callout-title {
                        font-size: 0.8125rem;
                    }
                    
                    .callout-content {
                        font-size: 0.8125rem;
                    }
                }
            </style>
            <div class="callout-title">
                ${title ? title : '<slot name="title"></slot>'}
            </div>
            <div class="callout-content">
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('callout-box', CalloutBox);