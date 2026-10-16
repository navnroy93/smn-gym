/**
 * SMN GYM — Theme Switcher (Light ↔ Dark)
 * Inserts a Moon/Sun toggle into the navbar .apple-nav-cta
 * Persists choice in localStorage
 */
(function () {
    'use strict';

    const STORAGE_KEY = 'smn-gym-theme';

    // Determine initial theme
    function getInitialTheme() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'dark' || saved === 'light') return saved;
        // Follow system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    // Apply theme to DOM
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
        updateToggleIcon(theme);
    }

    // Update toggle icon
    function updateToggleIcon(theme) {
        const thumb = document.querySelector('.theme-toggle-thumb');
        if (thumb) {
            thumb.textContent = theme === 'dark' ? '☀️' : '🌙';
            thumb.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        }
    }

    // Create the toggle button
    function createToggle() {
        const btn = document.createElement('button');
        btn.className = 'theme-toggle-btn';
        btn.setAttribute('aria-label', 'Toggle theme');
        btn.setAttribute('title', 'Toggle Light/Dark Mode');

        const track = document.createElement('div');
        track.className = 'theme-toggle-track';

        const thumb = document.createElement('div');
        thumb.className = 'theme-toggle-thumb';

        track.appendChild(thumb);
        btn.appendChild(track);

        btn.addEventListener('click', function () {
            const current = document.documentElement.getAttribute('data-theme') || 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
        });

        return btn;
    }

    // Insert toggle into navbar
    function init() {
        const theme = getInitialTheme();
        applyTheme(theme);

        const ctaContainer = document.querySelector('.apple-nav-cta');
        if (!ctaContainer) return;

        const toggle = createToggle();
        // Insert before the Book Tour button
        ctaContainer.insertBefore(toggle, ctaContainer.firstChild);

        updateToggleIcon(theme);

        // Listen for system preference changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
                if (!localStorage.getItem(STORAGE_KEY)) {
                    applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
