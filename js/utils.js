// Utility functions for TechNuggets

// State management
const AppState = {
    searchTerm: '',
    selectedLanguages: new Set(),
    selectedCategories: new Set(),
    filteredNuggets: [],
    likedNuggets: new Set()
};

// Event emitter for state changes
class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
}

const eventBus = new EventEmitter();

// Debounce function for search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Filter nuggets based on current state
function filterNuggets() {
    const { searchTerm, selectedLanguages, selectedCategories } = AppState;
    
    AppState.filteredNuggets = sampleNuggets.filter(nugget => {
        // Search filter
        const matchesSearch = !searchTerm || 
            nugget.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            nugget.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            nugget.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            nugget.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        // Language filter
        const matchesLanguage = selectedLanguages.size === 0 || 
            selectedLanguages.has(nugget.language);

        // Category filter
        const matchesCategory = selectedCategories.size === 0 || 
            selectedCategories.has(nugget.category);

        return matchesSearch && matchesLanguage && matchesCategory;
    });

    eventBus.emit('nuggetsFiltered', AppState.filteredNuggets);
}

// Get initials from name
function getInitials(name) {
    return name.split(' ')
        .map(word => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
}

// Get language badge class
function getLanguageBadgeClass(language) {
    const classes = {
        'JavaScript': 'badge-javascript',
        'TypeScript': 'badge-typescript',
        'Python': 'badge-python',
        'React': 'badge-react',
        'Vue': 'badge-vue',
        'Angular': 'badge-angular',
        'CSS': 'badge-css',
        'Node.js': 'badge-nodejs',
        'Docker': 'badge-docker',
        'SQL': 'badge-sql'
    };
    return classes[language] || 'badge-outline';
}

// Copy to clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        } catch (err) {
            document.body.removeChild(textArea);
            return false;
        }
    }
}

// Show toast notification
function showToast(title, description, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    toast.innerHTML = `
        <div class="toast-title">${title}</div>
        <p class="toast-description">${description}</p>
    `;
    
    toastContainer.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                toastContainer.removeChild(toast);
            }, 300);
        }
    }, 3000);
}

// Smooth scroll to element
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Update URL without page reload (for future use with routing)
function updateURL(params) {
    const url = new URL(window.location);
    Object.keys(params).forEach(key => {
        if (params[key]) {
            url.searchParams.set(key, params[key]);
        } else {
            url.searchParams.delete(key);
        }
    });
    window.history.replaceState({}, '', url);
}

// Parse URL parameters (for future use)
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        search: params.get('search') || '',
        languages: params.get('languages') ? params.get('languages').split(',') : [],
        categories: params.get('categories') ? params.get('categories').split(',') : []
    };
}

// Initialize state from URL (for future use)
function initializeStateFromURL() {
    const urlParams = getUrlParams();
    AppState.searchTerm = urlParams.search;
    AppState.selectedLanguages = new Set(urlParams.languages);
    AppState.selectedCategories = new Set(urlParams.categories);
}