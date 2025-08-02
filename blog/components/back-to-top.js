class BackToTop extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.handleScroll = this.handleScroll.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    disconnectedCallback() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Reset and isolation */
                :host {
                    all: initial;
                    bottom: 2rem;
                    font-family: inherit;
                    position: fixed;
                    right: 2rem;
                    z-index: 1000;
                }

                :host *,
                :host *::before,
                :host *::after {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                .back-to-top-button {
                    align-items: center;
                    background: var(--primary-color, #2563eb);
                    border: none;
                    border-radius: 50%;
                    box-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05));
                    color: var(--primary-text-color-when-primary-color-is-bg);
                    cursor: pointer;
                    display: flex;
                    font-family: inherit;
                    font-size: 1.25rem;
                    font-weight: 600;
                    height: 50px;
                    justify-content: center;
                    line-height: 1;
                    opacity: 0;
                    transform: translateY(100px);
                    transition: var(--transition, all 0.3s cubic-bezier(0.4, 0, 0.2, 1));
                    width: 50px;
                }

                .back-to-top-button.visible {
                    opacity: 1;
                    transform: translateY(0);
                }

                .back-to-top-button:hover {
                    background: var(--primary-dark, #1d4ed8);
                    transform: translateY(-2px);
                }

                .back-to-top-button:focus {
                    outline: 2px solid var(--primary-color, #2563eb);
                    outline-offset: 2px;
                }

                @media (max-width: 768px) {
                    :host {
                        bottom: 1rem;
                        right: 1rem;
                    }

                    .back-to-top-button {
                        height: 45px;
                        width: 45px;
                    }
                }

                @media print {
                    :host {
                        display: none;
                    }
                }
            </style>
            <button class="back-to-top-button" aria-label="Back to top" title="Back to top">
                ↑
            </button>
        `;
    }

    setupEventListeners() {
        const button = this.shadowRoot.querySelector('.back-to-top-button');
        
        window.addEventListener('scroll', this.handleScroll, { passive: true });
        button.addEventListener('click', this.scrollToTop);
    }

    handleScroll() {
        const button = this.shadowRoot.querySelector('.back-to-top-button');
        
        if (window.pageYOffset > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

customElements.define('back-to-top', BackToTop);