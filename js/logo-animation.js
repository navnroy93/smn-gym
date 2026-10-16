/**
 * SMN GYM — Animated Dumbbell Logo (Navbar)
 * Replaces the Font Awesome dumbbell icon with an animated SVG:
 *  - Continuous subtle lifting/rocking reps
 *  - Metallic sheen sweep effect
 *  - Energetic power curl flex on hover
 */
(function () {
    'use strict';

    function init() {
        const logoIcon = document.querySelector('.apple-logo-icon');
        if (!logoIcon) return;

        // Remove existing FA icon
        const faIcon = logoIcon.querySelector('i.fas, i.fa');
        if (faIcon) faIcon.remove();

        // Create SVG container
        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('viewBox', '0 0 64 64');
        svg.setAttribute('width', '20');
        svg.setAttribute('height', '20');
        svg.style.overflow = 'visible';

        // Defs: metallic sheen gradient
        const defs = document.createElementNS(svgNS, 'defs');

        // Gold gradient for the dumbbell
        const grad = document.createElementNS(svgNS, 'linearGradient');
        grad.setAttribute('id', 'db-gold');
        grad.setAttribute('x1', '0%');
        grad.setAttribute('y1', '0%');
        grad.setAttribute('x2', '100%');
        grad.setAttribute('y2', '100%');
        const stop1 = document.createElementNS(svgNS, 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', '#f59e0b');
        const stop2 = document.createElementNS(svgNS, 'stop');
        stop2.setAttribute('offset', '50%');
        stop2.setAttribute('stop-color', '#d97706');
        const stop3 = document.createElementNS(svgNS, 'stop');
        stop3.setAttribute('offset', '100%');
        stop3.setAttribute('stop-color', '#b45309');
        grad.appendChild(stop1);
        grad.appendChild(stop2);
        grad.appendChild(stop3);
        defs.appendChild(grad);

        // Sheen gradient (moving highlight)
        const sheen = document.createElementNS(svgNS, 'linearGradient');
        sheen.setAttribute('id', 'db-sheen');
        sheen.setAttribute('x1', '0%');
        sheen.setAttribute('y1', '0%');
        sheen.setAttribute('x2', '100%');
        sheen.setAttribute('y2', '0%');
        sheen.setAttribute('gradientUnits', 'userSpaceOnUse');
        const s1 = document.createElementNS(svgNS, 'stop');
        s1.setAttribute('offset', '0%');
        s1.setAttribute('stop-color', 'rgba(255,255,255,0)');
        const s2 = document.createElementNS(svgNS, 'stop');
        s2.setAttribute('offset', '40%');
        s2.setAttribute('stop-color', 'rgba(255,255,255,0)');
        const s3 = document.createElementNS(svgNS, 'stop');
        s3.setAttribute('offset', '50%');
        s3.setAttribute('stop-color', 'rgba(255,255,255,0.5)');
        const s4 = document.createElementNS(svgNS, 'stop');
        s4.setAttribute('offset', '60%');
        s4.setAttribute('stop-color', 'rgba(255,255,255,0)');
        const s5 = document.createElementNS(svgNS, 'stop');
        s5.setAttribute('offset', '100%');
        s5.setAttribute('stop-color', 'rgba(255,255,255,0)');
        sheen.appendChild(s1);
        sheen.appendChild(s2);
        sheen.appendChild(s3);
        sheen.appendChild(s4);
        sheen.appendChild(s5);
        defs.appendChild(sheen);

        svg.appendChild(defs);

        // Dumbbell group (will be rotated for animation)
        const dbGroup = document.createElementNS(svgNS, 'g');
        dbGroup.setAttribute('transform-origin', '32 32');

        // Bar (horizontal)
        const bar = document.createElementNS(svgNS, 'rect');
        bar.setAttribute('x', '12');
        bar.setAttribute('y', '29');
        bar.setAttribute('width', '40');
        bar.setAttribute('height', '6');
        bar.setAttribute('rx', '3');
        bar.setAttribute('fill', 'url(#db-gold)');
        dbGroup.appendChild(bar);

        // Left weight - outer
        const lw1 = document.createElementNS(svgNS, 'rect');
        lw1.setAttribute('x', '4');
        lw1.setAttribute('y', '20');
        lw1.setAttribute('width', '8');
        lw1.setAttribute('height', '24');
        lw1.setAttribute('rx', '3');
        lw1.setAttribute('fill', 'url(#db-gold)');
        dbGroup.appendChild(lw1);

        // Left weight - inner
        const lw2 = document.createElementNS(svgNS, 'rect');
        lw2.setAttribute('x', '11');
        lw2.setAttribute('y', '24');
        lw2.setAttribute('width', '5');
        lw2.setAttribute('height', '16');
        lw2.setAttribute('rx', '2');
        lw2.setAttribute('fill', 'url(#db-gold)');
        dbGroup.appendChild(lw2);

        // Right weight - outer
        const rw1 = document.createElementNS(svgNS, 'rect');
        rw1.setAttribute('x', '52');
        rw1.setAttribute('y', '20');
        rw1.setAttribute('width', '8');
        rw1.setAttribute('height', '24');
        rw1.setAttribute('rx', '3');
        rw1.setAttribute('fill', 'url(#db-gold)');
        dbGroup.appendChild(rw1);

        // Right weight - inner
        const rw2 = document.createElementNS(svgNS, 'rect');
        rw2.setAttribute('x', '48');
        rw2.setAttribute('y', '24');
        rw2.setAttribute('width', '5');
        rw2.setAttribute('height', '16');
        rw2.setAttribute('rx', '2');
        rw2.setAttribute('fill', 'url(#db-gold)');
        dbGroup.appendChild(rw2);

        // Sheen overlay rectangle
        const sheenRect = document.createElementNS(svgNS, 'rect');
        sheenRect.setAttribute('x', '4');
        sheenRect.setAttribute('y', '18');
        sheenRect.setAttribute('width', '56');
        sheenRect.setAttribute('height', '28');
        sheenRect.setAttribute('rx', '3');
        sheenRect.setAttribute('fill', 'url(#db-sheen)');
        sheenRect.setAttribute('opacity', '0.7');
        sheenRect.style.pointerEvents = 'none';
        dbGroup.appendChild(sheenRect);

        svg.appendChild(dbGroup);
        logoIcon.appendChild(svg);

        // ── Animation Engine ──────────────────────────────────────────────
        let angle = 0;
        let direction = 1;
        let sheenOffset = -20;
        let isHovering = false;
        let hoverAngle = 0;
        let hoverDir = 1;
        const maxAngle = 8;       // normal rocking degrees
        const hoverMaxAngle = 20; // hover curl degrees
        const speed = 0.3;
        const hoverSpeed = 1.8;

        function animate() {
            if (isHovering) {
                // Energetic power curl
                hoverAngle += hoverDir * hoverSpeed;
                if (hoverAngle > hoverMaxAngle) { hoverDir = -1; }
                if (hoverAngle < -hoverMaxAngle) { hoverDir = 1; }
                dbGroup.setAttribute('transform', 'rotate(' + hoverAngle + ' 32 32)');
            } else {
                // Gentle rocking
                angle += direction * speed;
                if (angle > maxAngle) { direction = -1; }
                if (angle < -maxAngle) { direction = 1; }
                // Ease-in-out via sine
                var easedAngle = Math.sin(angle * Math.PI / maxAngle / 2) * maxAngle;
                dbGroup.setAttribute('transform', 'rotate(' + easedAngle + ' 32 32)');
            }

            // Metallic sheen sweep
            sheenOffset += 0.5;
            if (sheenOffset > 80) sheenOffset = -20;
            sheen.setAttribute('x1', sheenOffset + '%');
            sheen.setAttribute('x2', (sheenOffset + 30) + '%');

            requestAnimationFrame(animate);
        }

        // Hover events
        logoIcon.addEventListener('mouseenter', function () {
            isHovering = true;
            hoverAngle = angle;
            hoverDir = 1;
        });

        logoIcon.addEventListener('mouseleave', function () {
            isHovering = false;
            angle = hoverAngle;
            if (angle > maxAngle) angle = maxAngle;
            if (angle < -maxAngle) angle = -maxAngle;
        });

        requestAnimationFrame(animate);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
