/**
 * Loading Indicator Component
 * Shows loading progress for web components
 */

class LoadingIndicator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isVisible = false;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.show();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    all: initial;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 9999;
                    pointer-events: none;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                }

                .progress-bar {
                    height: 2px;
                    background: linear-gradient(90deg, #2563eb, #f59e0b);
                    transform-origin: left;
                    transform: scaleX(0);
                    transition: transform 0.3s ease-out;
                    opacity: 0;
                }

                .progress-bar.visible {
                    opacity: 1;
                }

                .loading-text {
                    position: absolute;
                    top: 10px;
                    right: 20px;
                    background: rgba(255, 255, 255, 0.95);
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    color: #64748b;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    transform: translateY(-50px);
                    opacity: 0;
                    transition: all 0.3s ease-out;
                    backdrop-filter: blur(10px);
                }

                .loading-text.visible {
                    transform: translateY(0);
                    opacity: 1;
                }

                .spinner {
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    border: 2px solid #e2e8f0;
                    border-top: 2px solid #2563eb;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin-right: 0.5rem;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .fade-out {
                    opacity: 0 !important;
                    transform: translateY(-20px) !important;
                }

                @media (max-width: 768px) {
                    .loading-text {
                        right: 10px;
                        padding: 0.25rem 0.75rem;
                        font-size: 0.6875rem;
                    }
                    
                    .spinner {
                        width: 10px;
                        height: 10px;
                        margin-right: 0.25rem;
                    }
                }
            </style>
            <div class="progress-bar"></div>
            <div class="loading-text">
                <span class="spinner"></span>
                <span class="text">Loading components...</span>
            </div>
        `;
    }

    setupEventListeners() {
        // Listen for component loading events
        document.addEventListener('component-loaded', (e) => {
            this.updateProgress();
        });

        // Auto-hide after all components are loaded
        const checkComplete = () => {
            if (window.componentLoader) {
                const status = window.componentLoader.getLoadingStatus();
                if (status.loaded === status.total && status.loading === 0) {
                    setTimeout(() => this.hide(), 500);
                } else {
                    setTimeout(checkComplete, 100);
                }
            }
        };

        setTimeout(checkComplete, 1000);
    }

    updateProgress() {
        if (!window.componentLoader) return;

        const status = window.componentLoader.getLoadingStatus();
        const progressBar = this.shadowRoot.querySelector('.progress-bar');
        const textElement = this.shadowRoot.querySelector('.text');
        
        const progress = status.total > 0 ? (status.loaded / status.total) : 0;
        
        if (progressBar) {
            progressBar.style.transform = `scaleX(${progress})`;
        }

        if (textElement) {
            if (status.loaded === status.total && status.loading === 0) {
                textElement.textContent = 'Components ready!';
            } else {
                textElement.textContent = `Loading components... ${status.loaded}/${status.total}`;
            }
        }
    }

    show() {
        if (this.isVisible) return;
        
        this.isVisible = true;
        const progressBar = this.shadowRoot.querySelector('.progress-bar');
        const loadingText = this.shadowRoot.querySelector('.loading-text');
        
        if (progressBar) {
            progressBar.classList.add('visible');
        }
        
        if (loadingText) {
            setTimeout(() => {
                loadingText.classList.add('visible');
            }, 100);
        }

        this.updateProgress();
    }

    hide() {
        if (!this.isVisible) return;

        const progressBar = this.shadowRoot.querySelector('.progress-bar');
        const loadingText = this.shadowRoot.querySelector('.loading-text');
        
        if (loadingText) {
            loadingText.classList.add('fade-out');
        }
        
        if (progressBar) {
            progressBar.style.transform = 'scaleX(1)';
            setTimeout(() => {
                progressBar.classList.add('fade-out');
            }, 200);
        }

        setTimeout(() => {
            this.isVisible = false;
            this.remove();
        }, 1000);
    }

    // Static method to create and show loading indicator
    static show() {
        if (!document.querySelector('loading-indicator')) {
            const indicator = document.createElement('loading-indicator');
            document.body.appendChild(indicator);
        }
    }

    // Static method to hide loading indicator
    static hide() {
        const indicator = document.querySelector('loading-indicator');
        if (indicator) {
            indicator.hide();
        }
    }
}

customElements.define('loading-indicator', LoadingIndicator);