// Main application logic for TechNuggets

// DOM elements
let searchInput;
let filterToggle;
let filtersPanel;
let clearFilters;

// Initialize the application
function initApp() {
    // Get DOM elements
    searchInput = document.getElementById('search-input');
    filterToggle = document.getElementById('filter-toggle');
    filtersPanel = document.getElementById('filters-panel');
    clearFilters = document.getElementById('clear-filters');
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize data
    initializeData();
    
    // Initial render
    renderInitialState();
    
    console.log('TechNuggets app initialized successfully! 🚀');
}

// Set up all event listeners
function setupEventListeners() {
    // Search input with debounce
    const debouncedSearch = debounce((value) => {
        AppState.searchTerm = value;
        filterNuggets();
        updateFilterDisplay();
    }, 300);
    
    searchInput.addEventListener('input', (e) => {
        debouncedSearch(e.target.value);
    });
    
    // Filter toggle
    filterToggle.addEventListener('click', () => {
        const isVisible = filtersPanel.style.display === 'block';
        filtersPanel.style.display = isVisible ? 'none' : 'block';
        
        if (!isVisible) {
            filtersPanel.classList.add('animate-in');
            setTimeout(() => filtersPanel.classList.remove('animate-in'), 300);
        }
        
        updateFilterDisplay();
    });
    
    // Clear filters
    clearFilters.addEventListener('click', () => {
        AppState.searchTerm = '';
        AppState.selectedLanguages.clear();
        AppState.selectedCategories.clear();
        searchInput.value = '';
        filterNuggets();
        updateFilterDisplay();
    });
    
    // Listen for filtered nuggets
    eventBus.on('nuggetsFiltered', () => {
        renderNuggetsGrid();
    });
}

// Initialize application data
function initializeData() {
    // Initialize filtered nuggets with all nuggets
    AppState.filteredNuggets = [...sampleNuggets];
    
    // Load saved state from localStorage
    loadSavedState();
    
    // Filter nuggets based on initial state
    filterNuggets();
}

// Load saved state from localStorage
function loadSavedState() {
    try {
        const savedLikes = localStorage.getItem('technuggets-likes');
        if (savedLikes) {
            const likedIds = JSON.parse(savedLikes);
            AppState.likedNuggets = new Set(likedIds);
        }
    } catch (error) {
        console.warn('Failed to load saved state:', error);
    }
}

// Save state to localStorage
function saveState() {
    try {
        localStorage.setItem('technuggets-likes', JSON.stringify([...AppState.likedNuggets]));
    } catch (error) {
        console.warn('Failed to save state:', error);
    }
}

// Render initial state
function renderInitialState() {
    // Hide loading placeholder
    setTimeout(() => {
        renderFilterTags();
        renderNuggetsGrid();
        updateFilterDisplay();
    }, 500); // Small delay for better UX
}

// Global functions for HTML onclick handlers
window.scrollToNuggets = function() {
    scrollToElement('nuggets-section');
};

// Save state before page unload
window.addEventListener('beforeunload', saveState);

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        saveState();
    }
});

// Initialize lucide icons when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }
    
    // Initialize app
    initApp();
});

// Error handling
window.addEventListener('error', (event) => {
    console.error('Application error:', event.error);
    showToast('Something went wrong', 'Please refresh the page and try again.', 'error');
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    showToast('Something went wrong', 'Please refresh the page and try again.', 'error');
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Focus search on Ctrl/Cmd + K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
    
    // Clear filters on Escape
    if (e.key === 'Escape') {
        if (filtersPanel.style.display === 'block') {
            filterToggle.click();
        } else if (searchInput === document.activeElement) {
            searchInput.blur();
        }
    }
});

// Performance monitoring (optional)
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Page loaded in ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
        }, 0);
    });
}

// Service worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

console.log('TechNuggets JavaScript loaded successfully! 🚀');