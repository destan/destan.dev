class SyntaxHighlighter extends HTMLElement {
    constructor() {
        super();
        this.prismLoaded = false;
    }

    connectedCallback() {
        this.loadPrism().then(() => {
            this.highlightCode();
        });
    }

    async loadPrism() {
        if (this.prismLoaded || window.Prism) {
            this.prismLoaded = true;
            return;
        }

        try {
            // Load Prism CSS
            const cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css';
            document.head.appendChild(cssLink);

            // Load Prism core JS
            await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js');
            
            // Load Prism autoloader
            await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js');

            this.prismLoaded = true;
        } catch (error) {
            console.error('Failed to load Prism.js:', error);
        }
    }

    loadScript(src) {
        return new Promise((resolve, reject) => {
            // Check if script is already loaded
            if (document.querySelector(`script[src="${src}"]`)) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    highlightCode() {
        if (!window.Prism) {
            console.warn('Prism.js not loaded, syntax highlighting unavailable');
            return;
        }

        // Find all code blocks in the document and highlight them
        const codeBlocks = document.querySelectorAll('pre code[class*="language-"]');
        codeBlocks.forEach(block => {
            if (!block.classList.contains('prism-highlighted')) {
                window.Prism.highlightElement(block);
                block.classList.add('prism-highlighted');
            }
        });

        // Also highlight any new code blocks that might be added dynamically
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const newCodeBlocks = node.querySelectorAll ? 
                            node.querySelectorAll('pre code[class*="language-"]') : [];
                        newCodeBlocks.forEach(block => {
                            if (!block.classList.contains('prism-highlighted')) {
                                window.Prism.highlightElement(block);
                                block.classList.add('prism-highlighted');
                            }
                        });
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Store observer for cleanup
        this.mutationObserver = observer;
    }

    disconnectedCallback() {
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
        }
    }

    // Static method to manually highlight code blocks
    static highlightAll() {
        if (window.Prism) {
            window.Prism.highlightAll();
        }
    }
}

// Define the custom element
customElements.define('syntax-highlighter', SyntaxHighlighter);

// Automatically create an instance when the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('syntax-highlighter')) {
        const highlighter = document.createElement('syntax-highlighter');
        highlighter.style.display = 'none'; // Hidden utility component
        document.body.appendChild(highlighter);
    }
});