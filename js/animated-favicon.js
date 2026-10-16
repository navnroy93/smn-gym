/**
 * SMN GYM — Animated Dumbbell Favicon
 * Draws a gold dumbbell on a canvas that curls/rotates in the browser tab.
 * Runs at ~15fps to conserve CPU.
 */
(function () {
    'use strict';

    var SIZE = 32;
    var canvas = document.createElement('canvas');
    canvas.width = SIZE;
    canvas.height = SIZE;
    var ctx = canvas.getContext('2d');

    var angle = 0;
    var direction = 1;
    var INTERVAL = 1000 / 15; // ~15fps

    var GOLD = '#d97706';
    var GOLD_LIGHT = '#f59e0b';
    var BG = '#1d1d1f';

    // Find or create favicon link element
    function getFaviconLink() {
        var link = document.querySelector("link[rel*='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            link.type = 'image/png';
            document.head.appendChild(link);
        }
        return link;
    }

    function drawDumbbell(rot) {
        ctx.clearRect(0, 0, SIZE, SIZE);

        // Dark circular background
        ctx.beginPath();
        ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2 - 1, 0, Math.PI * 2);
        ctx.fillStyle = BG;
        ctx.fill();

        ctx.save();
        ctx.translate(SIZE / 2, SIZE / 2);
        ctx.rotate(rot * Math.PI / 180);

        // Bar
        ctx.fillStyle = GOLD;
        roundRect(ctx, -10, -1.5, 20, 3, 1.5);
        ctx.fill();

        // Left weight plate (outer)
        ctx.fillStyle = GOLD_LIGHT;
        roundRect(ctx, -13, -6, 3.5, 12, 1.5);
        ctx.fill();

        // Left weight plate (inner)
        ctx.fillStyle = GOLD;
        roundRect(ctx, -10, -4, 2, 8, 1);
        ctx.fill();

        // Right weight plate (outer)
        ctx.fillStyle = GOLD_LIGHT;
        roundRect(ctx, 9.5, -6, 3.5, 12, 1.5);
        ctx.fill();

        // Right weight plate (inner)
        ctx.fillStyle = GOLD;
        roundRect(ctx, 8, -4, 2, 8, 1);
        ctx.fill();

        ctx.restore();
    }

    // Utility: rounded rectangle
    function roundRect(c, x, y, w, h, r) {
        c.beginPath();
        c.moveTo(x + r, y);
        c.lineTo(x + w - r, y);
        c.quadraticCurveTo(x + w, y, x + w, y + r);
        c.lineTo(x + w, y + h - r);
        c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        c.lineTo(x + r, y + h);
        c.quadraticCurveTo(x, y + h, x, y + h - r);
        c.lineTo(x, y + r);
        c.quadraticCurveTo(x, y, x + r, y);
        c.closePath();
    }

    function tick() {
        // Smooth bicep curl oscillation: ±20 degrees
        angle += direction * 2;
        if (angle >= 20) direction = -1;
        if (angle <= -20) direction = 1;

        drawDumbbell(angle);

        // Update favicon
        var faviconLink = getFaviconLink();
        faviconLink.href = canvas.toDataURL('image/png');
    }

    // Start animation loop
    function start() {
        drawDumbbell(0);
        var faviconLink = getFaviconLink();
        faviconLink.href = canvas.toDataURL('image/png');
        setInterval(tick, INTERVAL);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();
