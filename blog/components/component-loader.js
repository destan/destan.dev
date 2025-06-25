/**
 * Fast Component Loader
 * Optimizes web component loading with preloading, bundling, and caching
 */

class ComponentLoader {
    constructor() {
        this.loadedComponents = new Set();
        this.loadingPromises = new Map();
        this.componentCache = new Map();
        this.baseUrl = '../components/';
        
        // Component dependencies and loading order
        this.components = {
            'site-header': { file: 'site-header.js', priority: 'high' },
            'site-footer': { file: 'site-footer.js', priority: 'low' },
            'article-header': { file: 'article-header.js', priority: 'high' },
            'author-bio': { file: 'author-bio.js', priority: 'medium' },
            'callout-box': { file: 'callout-box.js', priority: 'medium' },
            'back-to-top': { file: 'back-to-top.js', priority: 'low' },
            'syntax-highlighter': { file: 'syntax-highlighter.js', priority: 'high' }, // Critical for code styling
            'smooth-scroll': { file: 'smooth-scroll.js', priority: 'high' }
        };
    }

    /**
     * Initialize the loader and start preloading critical components
     */
    async init() {
        // Check if we should prioritize SEO
        if (this.shouldPrioritizeSEO()) {
            console.log('SEO mode: Loading all components immediately');
            await this.loadAllComponentsForSEO();
            return;
        }

        // Performance mode for regular users
        console.log('Performance mode: Using smart loading strategy');
        
        // Start loading critical components immediately
        this.preloadCriticalComponents();
        
        // Set up intersection observer for lazy loading
        this.setupLazyLoading();
        
        // Preload components that are likely to be needed
        this.preloadVisibleComponents();
    }

    /**
     * Preload high-priority components immediately
     */
    preloadCriticalComponents() {
        const criticalComponents = Object.entries(this.components)
            .filter(([_, config]) => config.priority === 'high')
            .map(([name]) => name);

        // Load critical components in parallel
        Promise.all(criticalComponents.map(name => this.loadComponent(name)))
            .then(() => {
                console.log('Critical components loaded');
            })
            .catch(error => {
                console.error('Failed to load critical components:', error);
            });
    }

    /**
     * Set up intersection observer for lazy loading of components (SEO-friendly)
     */
    setupLazyLoading() {
        // Skip lazy loading for bots/crawlers - load everything immediately for SEO
        if (this.isBotOrCrawler()) {
            console.log('Bot/crawler detected - loading all components for SEO');
            this.loadAllComponentsForSEO();
            return;
        }

        if (!window.IntersectionObserver) {
            // Fallback: load all components if IntersectionObserver not supported
            this.loadAllComponentsForSEO();
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const componentName = element.tagName.toLowerCase();
                    
                    if (this.components[componentName] && !this.loadedComponents.has(componentName)) {
                        this.loadComponent(componentName);
                        observer.unobserve(element);
                    }
                }
            });
        }, {
            rootMargin: '200px', // Increased for better UX - start loading earlier
            threshold: 0.1
        });

        // Observe all custom elements that haven't loaded yet
        Object.keys(this.components).forEach(componentName => {
            const elements = document.querySelectorAll(componentName);
            elements.forEach(element => {
                if (!this.loadedComponents.has(componentName)) {
                    observer.observe(element);
                }
            });
        });
    }

    /**
     * Preload components that are visible in the viewport
     */
    preloadVisibleComponents() {
        // Wait a bit for critical components to load first
        setTimeout(() => {
            Object.keys(this.components).forEach(componentName => {
                const elements = document.querySelectorAll(componentName);
                if (elements.length > 0 && !this.loadedComponents.has(componentName)) {
                    this.loadComponent(componentName);
                }
            });
        }, 100);
    }

    /**
     * Load a specific component with caching and error handling
     */
    async loadComponent(componentName) {
        // Return existing promise if already loading
        if (this.loadingPromises.has(componentName)) {
            return this.loadingPromises.get(componentName);
        }

        // Return immediately if already loaded
        if (this.loadedComponents.has(componentName)) {
            return Promise.resolve();
        }

        const config = this.components[componentName];
        if (!config) {
            console.warn(`Unknown component: ${componentName}`);
            return Promise.reject(new Error(`Unknown component: ${componentName}`));
        }

        // Create loading promise
        const loadingPromise = this.loadScript(config.file)
            .then(() => {
                this.loadedComponents.add(componentName);
                this.loadingPromises.delete(componentName);
                console.log(`Component loaded: ${componentName}`);
                
                // Dispatch custom event for component loaded
                document.dispatchEvent(new CustomEvent('component-loaded', {
                    detail: { componentName }
                }));
            })
            .catch(error => {
                this.loadingPromises.delete(componentName);
                console.error(`Failed to load component ${componentName}:`, error);
                throw error;
            });

        this.loadingPromises.set(componentName, loadingPromise);
        return loadingPromise;
    }

    /**
     * Load multiple components in parallel
     */
    async loadComponents(componentNames) {
        const promises = componentNames.map(name => this.loadComponent(name));
        return Promise.all(promises);
    }

    /**
     * Load all components
     */
    async loadAllComponents() {
        const componentNames = Object.keys(this.components);
        return this.loadComponents(componentNames);
    }

    /**
     * Load a script with caching and performance optimizations
     */
    loadScript(filename) {
        const url = this.baseUrl + filename;
        
        // Check cache first
        if (this.componentCache.has(url)) {
            return this.componentCache.get(url);
        }

        // Check if script is already in DOM
        const existingScript = document.querySelector(`script[src="${url}"]`);
        if (existingScript) {
            return Promise.resolve();
        }

        const promise = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.async = true;
            script.defer = true;
            
            // Add performance hints
            script.crossOrigin = 'anonymous';
            
            script.onload = () => {
                resolve();
            };
            
            script.onerror = () => {
                reject(new Error(`Failed to load script: ${url}`));
            };

            // Use requestIdleCallback if available for non-critical components
            if (window.requestIdleCallback && !this.isCriticalComponent(filename)) {
                requestIdleCallback(() => {
                    document.head.appendChild(script);
                });
            } else {
                document.head.appendChild(script);
            }
        });

        this.componentCache.set(url, promise);
        return promise;
    }

    /**
     * Check if a component is critical for initial render
     */
    isCriticalComponent(filename) {
        const criticalFiles = ['site-header.js', 'article-header.js', 'smooth-scroll.js', 'syntax-highlighter.js'];
        return criticalFiles.includes(filename);
    }

    /**
     * Preload component files using link rel="preload"
     */
    preloadComponentFiles() {
        Object.values(this.components).forEach(config => {
            if (config.priority === 'high') {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = this.baseUrl + config.file;
                link.as = 'script';
                link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
            }
        });
    }

    /**
     * Detect if the current user agent is a bot or crawler
     */
    isBotOrCrawler() {
        const userAgent = navigator.userAgent.toLowerCase();
        const botPatterns = [
            'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider',
            'yandexbot', 'facebookexternalhit', 'twitterbot', 'linkedinbot',
            'whatsapp', 'telegrambot', 'applebot', 'discordbot', 'skypeuri',
            'crawler', 'spider', 'bot', 'scraper', 'archive', 'lighthouse'
        ];
        
        return botPatterns.some(pattern => userAgent.includes(pattern)) ||
               // Check for missing features that bots often lack
               !window.requestAnimationFrame ||
               !window.IntersectionObserver ||
               // Check for programmatic access patterns
               navigator.webdriver === true;
    }

    /**
     * Load all components immediately for SEO (bots/crawlers)
     */
    async loadAllComponentsForSEO() {
        console.log('Loading all components immediately for SEO optimization');
        
        // Load all components without any delays
        const componentNames = Object.keys(this.components);
        
        try {
            await Promise.all(componentNames.map(name => this.loadComponent(name)));
            console.log('All components loaded for SEO');
        } catch (error) {
            console.error('Error loading components for SEO:', error);
        }
    }

    /**
     * Check if we should prioritize SEO over performance
     */
    shouldPrioritizeSEO() {
        return this.isBotOrCrawler() || 
               // Also prioritize SEO if page was accessed via social media or search
               document.referrer.includes('google') ||
               document.referrer.includes('bing') ||
               document.referrer.includes('facebook') ||
               document.referrer.includes('twitter') ||
               document.referrer.includes('linkedin');
    }

    /**
     * Get loading status
     */
    getLoadingStatus() {
        const total = Object.keys(this.components).length;
        const loaded = this.loadedComponents.size;
        const loading = this.loadingPromises.size;
        
        return {
            total,
            loaded,
            loading,
            remaining: total - loaded - loading,
            percentage: Math.round((loaded / total) * 100)
        };
    }
}

// Create global instance
window.componentLoader = new ComponentLoader();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.componentLoader.init();
    });
} else {
    window.componentLoader.init();
}

// Expose utility functions
window.loadComponent = (name) => window.componentLoader.loadComponent(name);
window.loadComponents = (names) => window.componentLoader.loadComponents(names);
window.getComponentLoadingStatus = () => window.componentLoader.getLoadingStatus();