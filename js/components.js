// Component creators for TechNuggets

// Create filter badge component
function createFilterBadge(text, type, isActive = false, onRemove = null) {
    const badge = document.createElement('div');
    badge.className = `badge badge-${type} ${isActive ? 'badge-active' : ''}`;
    badge.style.cursor = 'pointer';
    
    badge.innerHTML = `
        ${escapeHtml(text)}
        ${onRemove ? '<i data-lucide="x" style="width: 12px; height: 12px; margin-left: 4px;"></i>' : ''}
    `;
    
    if (onRemove) {
        badge.addEventListener('click', onRemove);
    }
    
    return badge;
}

// Create nugget card component
function createNuggetCard(nugget) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.nuggetId = nugget.id;
    
    const isLiked = AppState.likedNuggets.has(String(nugget.id));
    const currentLikes = nugget.likes + (isLiked ? 1 : 0);
    
    card.innerHTML = `
        <div class="card-header">
            <!-- Header with author and meta -->
            <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 0.75rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <div class="avatar">
                        ${getInitials(nugget.author.name)}
                    </div>
                    <div>
                        <p style="font-weight: 500; font-size: 0.875rem; margin: 0;">${escapeHtml(nugget.author.name)}</p>
                        <p style="font-size: 0.75rem; color: var(--muted-foreground); margin: 0;">${escapeHtml(nugget.createdAt)}</p>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <div class="badge ${getLanguageBadgeClass(nugget.language)}">
                        ${escapeHtml(nugget.language)}
                    </div>
                    ${nugget.type === 'snippet' ? '<i data-lucide="code2" style="width: 1rem; height: 1rem; color: var(--primary);"></i>' : ''}
                </div>
            </div>

            <!-- Title and description -->
            <div>
                <h3 style="font-weight: 700; font-size: 1.125rem; margin-bottom: 0.5rem; transition: var(--transition-smooth);">
                    ${escapeHtml(nugget.title)}
                </h3>
                <p style="color: var(--muted-foreground); font-size: 0.875rem; margin-bottom: 0.75rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                    ${escapeHtml(nugget.description)}
                </p>
            </div>

            <!-- Tags -->
            <div style="display: flex; flex-wrap: wrap; gap: 0.25rem; margin-top: 0.75rem;">
                <div class="badge badge-outline" style="background: hsla(193, 82%, 31%, 0.05); color: var(--accent); border-color: hsla(193, 82%, 31%, 0.2);">
                    ${escapeHtml(nugget.category)}
                </div>
                ${nugget.tags.slice(0, 3).map(tag => 
                    `<div class="badge badge-outline" style="font-size: 0.75rem;">${escapeHtml(tag)}</div>`
                ).join('')}
                ${nugget.tags.length > 3 ? 
                    `<div class="badge badge-outline" style="font-size: 0.75rem;">+${nugget.tags.length - 3}</div>` : 
                    ''
                }
            </div>
        </div>

        <div class="card-content">
            <!-- Expandable content -->
            <div class="content-area" style="display: none;">
                <div style="background: hsla(220, 14%, 96%, 0.3); border-radius: var(--border-radius); padding: 1rem; border: 1px solid hsla(220, 13%, 91%, 0.5); margin-bottom: 1rem;">
                    <pre style="font-size: 0.875rem; white-space: pre-wrap; font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace; color: var(--foreground); overflow-x: auto; margin: 0;">${escapeHtml(nugget.content)}</pre>
                </div>
            </div>

            <!-- Actions and stats -->
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 1rem; font-size: 0.875rem; color: var(--muted-foreground);">
                    <div style="display: flex; align-items: center; gap: 0.25rem;">
                        <i data-lucide="clock" style="width: 1rem; height: 1rem;"></i>
                        <span>${nugget.readTime}m</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.25rem;">
                        <i data-lucide="eye" style="width: 1rem; height: 1rem;"></i>
                        <span>${formatNumber(nugget.views)}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.25rem;">
                        <i data-lucide="heart" style="width: 1rem; height: 1rem; ${isLiked ? 'fill: #ef4444; color: #ef4444;' : ''}"></i>
                        <span class="like-count">${formatNumber(currentLikes)}</span>
                    </div>
                </div>

                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    ${nugget.type === 'snippet' ? `
                        <button class="btn btn-ghost btn-sm copy-btn" style="padding: 0.25rem;" title="Copy code">
                            <i data-lucide="copy" style="width: 1rem; height: 1rem;"></i>
                        </button>
                    ` : ''}
                    <button class="btn btn-ghost btn-sm like-btn" style="padding: 0.25rem; ${isLiked ? 'color: #ef4444;' : ''}" title="Like">
                        <i data-lucide="heart" style="width: 1rem; height: 1rem; ${isLiked ? 'fill: currentColor;' : ''}"></i>
                    </button>
                    <button class="btn btn-ghost btn-sm expand-btn" style="padding: 0.25rem;" title="Expand">
                        <i data-lucide="chevron-down" style="width: 1rem; height: 1rem;"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners
    setupCardEventListeners(card, nugget);
    
    return card;
}

// Set up event listeners for nugget card
function setupCardEventListeners(card, nugget) {
    const expandBtn = card.querySelector('.expand-btn');
    const copyBtn = card.querySelector('.copy-btn');
    const likeBtn = card.querySelector('.like-btn');
    const contentArea = card.querySelector('.content-area');
    
    let isExpanded = false;
    
    // Expand/collapse functionality
    if (expandBtn && contentArea) {
        expandBtn.addEventListener('click', () => {
            try {
                isExpanded = !isExpanded;
                const icon = expandBtn.querySelector('i');
                if (isExpanded) {
                    contentArea.style.display = 'block';
                    contentArea.style.animation = 'slideInFromTop 0.3s ease-out';
                    if (icon) icon.setAttribute('data-lucide', 'chevron-up');
                } else {
                    contentArea.style.display = 'none';
                    if (icon) icon.setAttribute('data-lucide', 'chevron-down');
                }
                // Re-initialize lucide icons for the new icon
                if (window.lucide) {
                    lucide.createIcons();
                }
            } catch (err) {
                console.error('Expand error:', err);
                showToast('Something went wrong', err.message || 'Error expanding content', 'error');
            }
        });
    }
    
    // Copy functionality
    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            try {
                const success = await copyToClipboard(nugget.content);
                if (success) {
                    showToast('Copied to clipboard!', 'The code snippet has been copied to your clipboard.');
                } else {
                    showToast('Failed to copy', 'Please try selecting and copying the text manually.', 'error');
                }
            } catch (err) {
                console.error('Copy error:', err);
            }
        });
    }
    
    // Like functionality
    if (likeBtn) {
        likeBtn.addEventListener('click', () => {
            try {
                console.log('Like button clicked for nugget:', nugget.id, 'Current likedNuggets:', Array.from(AppState.likedNuggets));
                const idStr = String(nugget.id);
                const wasLiked = AppState.likedNuggets.has(idStr);
                console.log('ID string:', idStr, 'Was liked:', wasLiked);
                
                // Update the state regardless of UI elements
                if (wasLiked) {
                    AppState.likedNuggets.delete(idStr);
                    showToast('Removed from favorites', 'This nugget has been removed from your favorites.');
                } else {
                    AppState.likedNuggets.add(idStr);
                    showToast('Added to favorites', 'This nugget has been added to your favorites.');
                }
                console.log('After click, likedNuggets:', Array.from(AppState.likedNuggets));
                
                // Save state
                if (typeof saveState === 'function') {
                    saveState();
                }
                
                // Re-render grid to update all like buttons
                if (typeof renderNuggetsGrid === 'function') {
                    renderNuggetsGrid();
                }
            } catch (err) {
                console.error('Like error:', err);
                showToast('Something went wrong', err.message || 'Error updating like state', 'error');
            }
        });
    }
}

// Create loading placeholder
function createLoadingPlaceholder() {
    const placeholder = document.createElement('div');
    placeholder.className = 'loading-placeholder';
    placeholder.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Loading amazing tech nuggets...</p>
    `;
    return placeholder;
}

// Create no results message
function createNoResultsMessage() {
    const message = document.createElement('div');
    message.className = 'no-results';
    message.innerHTML = `
        <div class="no-results-icon">🔍</div>
        <h3>No nuggets found</h3>
        <p>Try searching for different keywords or removing some filters to discover more content.</p>
    `;
    return message;
}

// Render nuggets grid
function renderNuggetsGrid() {
    console.log('Rendering nuggets grid. Current likedNuggets:', Array.from(AppState.likedNuggets));
    const grid = document.getElementById('nuggets-grid');
    const noResults = document.getElementById('no-results');
    const resultsTitle = document.getElementById('results-title');
    const resultsCount = document.getElementById('results-count');
    
    // Clear grid
    grid.innerHTML = '';
    
    if (AppState.filteredNuggets.length === 0) {
        noResults.style.display = 'block';
        resultsTitle.textContent = 'No Results Found';
        resultsCount.textContent = 'Try adjusting your filters or search term';
    } else {
        noResults.style.display = 'none';
        resultsTitle.textContent = 'Tech Nuggets';
        resultsCount.textContent = `Showing ${AppState.filteredNuggets.length} nuggets`;
        
        AppState.filteredNuggets.forEach(nugget => {
            const card = createNuggetCard(nugget);
            grid.appendChild(card);
        });
    }
    
    // Initialize lucide icons for new content
    if (window.lucide) {
        lucide.createIcons();
    }
}

// Render filter tags
function renderFilterTags() {
    const languageFilters = document.getElementById('language-filters');
    const categoryFilters = document.getElementById('category-filters');
    
    // Clear existing filters
    languageFilters.innerHTML = '';
    categoryFilters.innerHTML = '';
    
    // Render language filters
    languages.forEach(language => {
        const isSelected = AppState.selectedLanguages.has(language);
        const badge = createFilterBadge(language, isSelected ? 'default' : 'outline');
        
        if (isSelected) {
            badge.style.background = 'var(--primary)';
            badge.style.color = 'var(--primary-foreground)';
        }
        
        badge.addEventListener('click', () => {
            if (AppState.selectedLanguages.has(language)) {
                AppState.selectedLanguages.delete(language);
            } else {
                AppState.selectedLanguages.add(language);
            }
            filterNuggets();
            updateFilterDisplay();
        });
        
        languageFilters.appendChild(badge);
    });
    
    // Render category filters
    categories.forEach(category => {
        const isSelected = AppState.selectedCategories.has(category);
        const badge = createFilterBadge(category, isSelected ? 'default' : 'outline');
        
        if (isSelected) {
            badge.style.background = 'var(--accent)';
            badge.style.color = 'var(--accent-foreground)';
        }
        
        badge.addEventListener('click', () => {
            if (AppState.selectedCategories.has(category)) {
                AppState.selectedCategories.delete(category);
            } else {
                AppState.selectedCategories.add(category);
            }
            filterNuggets();
            updateFilterDisplay();
        });
        
        categoryFilters.appendChild(badge);
    });
    
    // Initialize lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }
}

// Update filter display
function updateFilterDisplay() {
    const activeFilters = document.getElementById('active-filters');
    const clearButton = document.getElementById('clear-filters');
    const filterToggle = document.getElementById('filter-toggle');
    const filtersPanel = document.getElementById('filters-panel');
    
    // Check if all required elements exist
    if (!activeFilters || !clearButton || !filterToggle || !filtersPanel) {
        console.warn('Some filter elements not found, skipping updateFilterDisplay');
        return;
    }
    
    const hasActiveFilters = AppState.selectedLanguages.size > 0 || 
                           AppState.selectedCategories.size > 0 || 
                           AppState.searchTerm;
    
    // Show/hide clear button
    clearButton.style.display = hasActiveFilters ? 'inline-flex' : 'none';
    
    // Update filter toggle button
    const isExpanded = filtersPanel.style.display === 'block';
    if (isExpanded) {
        filterToggle.style.background = 'var(--primary)';
        filterToggle.style.color = 'var(--primary-foreground)';
    } else {
        filterToggle.style.background = '';
        filterToggle.style.color = '';
    }
    
    // Clear active filters
    activeFilters.innerHTML = '';
    
    if (hasActiveFilters) {
        activeFilters.style.display = 'flex';
        
        // Add selected language badges
        AppState.selectedLanguages.forEach(language => {
            const badge = createFilterBadge(language, 'secondary', true, () => {
                AppState.selectedLanguages.delete(language);
                filterNuggets();
                updateFilterDisplay();
                renderFilterTags();
            });
            badge.style.background = 'hsla(221, 83%, 53%, 0.1)';
            badge.style.color = 'var(--primary)';
            activeFilters.appendChild(badge);
        });
        
        // Add selected category badges
        AppState.selectedCategories.forEach(category => {
            const badge = createFilterBadge(category, 'secondary', true, () => {
                AppState.selectedCategories.delete(category);
                filterNuggets();
                updateFilterDisplay();
                renderFilterTags();
            });
            badge.style.background = 'hsla(193, 82%, 31%, 0.1)';
            badge.style.color = 'var(--accent)';
            activeFilters.appendChild(badge);
        });
    } else {
        activeFilters.style.display = 'none';
    }
    
    // Re-render filter tags to update selection state
    renderFilterTags();

    // Dark Mode Toggle Functionality
class DarkModeToggle {
    constructor() {
        this.init();
    }

    init() {
        // Get the toggle button
        this.toggleBtn = document.getElementById('dark-mode-toggle');
        
        // Check for saved theme preference or default to 'light'
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        // Apply saved theme on load
        this.applyTheme(this.currentTheme);
        
        // Add event listener to toggle button
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggleTheme());
        }
        
        // Listen for system theme changes
        this.watchSystemTheme();
    }

    applyTheme(theme) {
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update current theme
        this.currentTheme = theme;
        
        // Save to localStorage
        localStorage.setItem('theme', theme);
        
        // Update toggle button appearance
        this.updateToggleButton(theme);
        
        // Dispatch custom event for other components
        document.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme } 
        }));
    }

    toggleTheme() {
        // Toggle between light and dark
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        
        // Add smooth transition class
        document.documentElement.classList.add('theme-transitioning');
        
        // Apply new theme
        this.applyTheme(newTheme);
        
        // Remove transition class after animation
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transitioning');
        }, 300);
        
        // Trigger animation on button
        this.animateToggleButton();
    }

    updateToggleButton(theme) {
        if (!this.toggleBtn) return;
        
        const sunIcon = this.toggleBtn.querySelector('.sun-icon');
        const moonIcon = this.toggleBtn.querySelector('.moon-icon');
        
        if (theme === 'dark') {
            this.toggleBtn.setAttribute('title', 'Switch to light mode');
            this.toggleBtn.setAttribute('aria-label', 'Switch to light mode');
        } else {
            this.toggleBtn.setAttribute('title', 'Switch to dark mode');
            this.toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
        }
    }

    animateToggleButton() {
        if (!this.toggleBtn) return;
        
        // Add pulse animation
        this.toggleBtn.classList.add('toggle-pulse');
        
        setTimeout(() => {
            this.toggleBtn.classList.remove('toggle-pulse');
        }, 600);
    }

    watchSystemTheme() {
        // Check if browser supports matchMedia
        if (!window.matchMedia) return;
        
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Only auto-switch if user hasn't manually set a preference
        const hasManualPreference = localStorage.getItem('theme');
        
        if (!hasManualPreference) {
            this.applyTheme(mediaQuery.matches ? 'dark' : 'light');
        }
        
        // Listen for system theme changes
        mediaQuery.addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually set a preference
            const currentManualPreference = localStorage.getItem('theme');
            if (!currentManualPreference) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    // Public method to get current theme
    getCurrentTheme() {
        return this.currentTheme;
    }

    // Public method to set theme programmatically
    setTheme(theme) {
        if (theme === 'light' || theme === 'dark') {
            this.applyTheme(theme);
        }
    }
}

// Add CSS for smooth transitions and animations
const darkModeStyles = `
    /* Smooth theme transition */
    .theme-transitioning,
    .theme-transitioning * {
        transition: background-color 0.3s ease, 
                   color 0.3s ease, 
                   border-color 0.3s ease,
                   box-shadow 0.3s ease !important;
    }

    /* Toggle button pulse animation */
    .toggle-pulse {
        animation: togglePulse 0.6s ease;
    }

    @keyframes togglePulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
            box-shadow: 0 0 20px rgba(66, 133, 244, 0.4);
        }
        100% {
            transform: scale(1);
        }
    }

    /* Enhanced dark mode toggle hover effects */
    .dark-mode-toggle:active {
        transform: scale(0.95);
    }

    /* Dark mode specific animations */
    [data-theme="dark"] .dark-mode-toggle:hover .moon-icon {
        transform: translateY(0) rotate(0deg) scale(1.1);
    }

    [data-theme="light"] .dark-mode-toggle:hover .sun-icon {
        transform: translateY(0) rotate(0deg) scale(1.1);
    }

    /* Smooth scrollbar for dark mode */
    [data-theme="dark"] ::-webkit-scrollbar {
        width: 8px;
    }

    [data-theme="dark"] ::-webkit-scrollbar-track {
        background: var(--bg-tertiary);
    }

    [data-theme="dark"] ::-webkit-scrollbar-thumb {
        background: #555;
        border-radius: 4px;
    }

    [data-theme="dark"] ::-webkit-scrollbar-thumb:hover {
        background: #777;
    }

    /* Selection colors for dark mode */
    [data-theme="dark"] ::selection {
        background: rgba(66, 133, 244, 0.3);
        color: white;
    }

    [data-theme="light"] ::selection {
        background: rgba(66, 133, 244, 0.2);
        color: #333;
    }

    /* Focus outline for better accessibility */
    .dark-mode-toggle:focus {
        outline: 2px solid #4285f4;
        outline-offset: 2px;
    }

    /* Loading spinner dark mode */
    [data-theme="dark"] .loading-spinner {
        border: 3px solid #404040;
        border-top: 3px solid #4285f4;
    }

    /* Dark mode footer adjustments */
    [data-theme="dark"] .site-footer {
        background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%);
    }

    /* Enhanced card shadows in dark mode */
    [data-theme="dark"] .card:hover {
        box-shadow: 0 8px 25px rgba(66, 133, 244, 0.1);
    }

    /* Button glow effects in dark mode */
    [data-theme="dark"] .btn-primary:hover {
        box-shadow: 0 4px 15px rgba(66, 133, 244, 0.3);
    }

    /* Search input focus in dark mode */
    [data-theme="dark"] .search-input:focus {
        box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.3);
    }
`;

// Inject styles into the page
const styleSheet = document.createElement('style');
styleSheet.textContent = darkModeStyles;
document.head.appendChild(styleSheet);

// Initialize dark mode toggle when DOM is loaded
let darkModeToggle;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        darkModeToggle = new DarkModeToggle();
    });
} else {
    darkModeToggle = new DarkModeToggle();
}

// Utility functions for other scripts
window.DarkModeUtils = {
    getCurrentTheme: () => darkModeToggle?.getCurrentTheme() || 'light',
    setTheme: (theme) => darkModeToggle?.setTheme(theme),
    toggleTheme: () => darkModeToggle?.toggleTheme(),
    
    // Helper to check if dark mode is active
    isDarkMode: () => darkModeToggle?.getCurrentTheme() === 'dark',
    
    // Add theme change listener
    onThemeChange: (callback) => {
        document.addEventListener('themeChanged', (e) => {
            callback(e.detail.theme);
        });
    }
};

// Export for ES6 modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DarkModeToggle, DarkModeUtils: window.DarkModeUtils };
}
    
    // Initializing lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }
}