class Labels extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    processLabels(labelString) {
        if (!labelString || typeof labelString !== 'string') {
            return [];
        }

        return labelString
            .split(',')
            .map(label => label.trim())
            .filter(label => label.length > 0)
            .map(label => {
                // Replace multiple spaces with single spaces, then replace spaces with hyphens
                return label.replace(/\s+/g, ' ').replace(/\s/g, '-');
            });
    }

    render() {
        const labelString = this.textContent?.trim() || '';
        const labels = this.processLabels(labelString);

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

                .labels-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin: 1rem 0;
                }

                .label {
                    background: var(--accent-color, #f59e0b);
                    border-radius: 1rem;
                    color: white;
                    font-family: inherit;
                    font-size: 0.8rem;
                    font-weight: 500;
                    line-height: 1.2;
                    padding: 0.25rem 0.75rem;
                    text-decoration: none;
                    transition: var(--transition, all 0.3s cubic-bezier(0.4, 0, 0.2, 1));
                }

                .label:hover {
                    opacity: 0.8;
                    transform: translateY(-1px);
                }

                /* Hidden state */
                :host([hidden]) {
                    display: none;
                }

                /* Tablet responsive design */
                @media (max-width: 768px) {
                    .labels-container {
                        gap: 0.375rem;
                        margin: 0.75rem 0;
                    }

                    .label {
                        font-size: 0.75rem;
                        padding: 0.1875rem 0.625rem;
                    }
                }

                /* Mobile responsive design */
                @media (max-width: 480px) {
                    .labels-container {
                        gap: 0.3125rem;
                        margin: 0.625rem 0;
                    }

                    .label {
                        font-size: 0.6875rem;
                        padding: 0.1875rem 0.5rem;
                    }
                }

                /* Extra small mobile */
                @media (max-width: 360px) {
                    .labels-container {
                        gap: 0.25rem;
                        margin: 0.5rem 0;
                    }

                    .label {
                        font-size: 0.625rem;
                        padding: 0.125rem 0.4375rem;
                    }
                }
            </style>
            <div class="labels-container">
                ${labels.map(label => `<span class="label">${label}</span>`).join('')}
            </div>
        `;
    }
}

customElements.define('labels-component', Labels);