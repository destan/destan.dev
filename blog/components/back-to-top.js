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
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    z-index: 1000;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    
                    /* Re-declare CSS variables since all: initial resets them */
                    --primary-color: #2563eb;
                    --primary-dark: #1d4ed8;
                    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                :host *,
                :host *::before,
                :host *::after {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                .back-to-top-button {
                    width: 50px;
                    height: 50px;
                    background: var(--primary-color, #2563eb);
                    color: white;
                    border: none;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.25rem;
                    font-family: inherit;
                    font-weight: 600;
                    line-height: 1;
                    box-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05));
                    transform: translateY(100px);
                    opacity: 0;
                    transition: var(--transition, all 0.3s cubic-bezier(0.4, 0, 0.2, 1));
                }

                .back-to-top-button.visible {
                    transform: translateY(0);
                    opacity: 1;
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
                        width: 45px;
                        height: 45px;
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