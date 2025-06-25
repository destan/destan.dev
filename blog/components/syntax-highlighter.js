class SyntaxHighlighter extends HTMLElement {
    constructor() {
        super();
        this.prismLoaded = window.Prism ? true : false;
    }

    connectedCallback() {
        if (window.Prism) {
            this.highlightCode();
        } else {
            console.warn('Prism.js not loaded, syntax highlighting unavailable');
        }
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