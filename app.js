/* ============================================================
   Time Capsule: Memory Vault — Website JavaScript
   - Dark/light theme toggle
   - Mobile nav
   - FAQ accordion
   - Interactive phone demo
   ============================================================ */

(function () {
    'use strict';

    /* ---------- Theme toggle ---------- */
    var html = document.documentElement;
    var themeBtn = document.getElementById('themeToggle');
    var stored = localStorage.getItem('tc-theme');

    // Respect system preference, then stored preference
    if (stored) {
        html.setAttribute('data-theme', stored);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        html.setAttribute('data-theme', 'light');
    }

    var sunSVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    var moonSVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';

    function updateToggleIcon() {
        if (!themeBtn) return;
        themeBtn.innerHTML = html.getAttribute('data-theme') === 'light' ? sunSVG : moonSVG;
    }
    updateToggleIcon();

    if (themeBtn) {
        themeBtn.addEventListener('click', function () {
            var next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', next);
            localStorage.setItem('tc-theme', next);
            updateToggleIcon();
        });
    }

    /* ---------- Mobile nav (full-screen overlay) ---------- */
    var navToggle = document.getElementById('navToggle');
    var navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            var isOpen = navLinks.classList.toggle('open');
            navToggle.innerHTML = isOpen ? '&#10005;' : '&#9776;';
            navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
        function closeNav() {
            navLinks.classList.remove('open');
            navToggle.innerHTML = '&#9776;';
            navToggle.setAttribute('aria-label', 'Open menu');
            document.body.style.overflow = '';
        }
        navLinks.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', closeNav);
        });
    }

    /* ---------- FAQ accordion (multiple open) ---------- */
    document.querySelectorAll('.faq-question').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var item = btn.closest('.faq-item');
            var isOpen = item.classList.contains('open');
            if (isOpen) {
                item.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    /* ---------- Interactive phone demo ---------- */
    var phoneScreen = document.getElementById('phoneScreen');
    if (!phoneScreen) return;

    var screens = phoneScreen.querySelectorAll('.demo-screen');
    var dots = document.querySelectorAll('.phone-dot');
    var currentScreen = 0;

    var lockOpenSVG = '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#66c7ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>';
    var lockClosedSVG = '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#4dd98c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>';

    function goToScreen(index) {
        // Prevent going to same screen
        if (index === currentScreen && screens[index].classList.contains('active')) return;

        screens.forEach(function (s, i) {
            s.classList.remove('active', 'exit');
            if (i === currentScreen && i !== index) s.classList.add('exit');
        });

        currentScreen = index;
        screens.forEach(function (s) { s.classList.remove('exit'); });
        screens[currentScreen].classList.add('active');

        dots.forEach(function (d, i) {
            d.classList.toggle('active', i === currentScreen);
        });

        // Trigger screen-specific logic
        if (currentScreen === 5) runLoadingDemo();
    }

    // Button clicks advance screens
    phoneScreen.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-next]');
        if (btn) {
            var next = parseInt(btn.getAttribute('data-next'), 10);
            goToScreen(next);
        }
    });

    // Dot clicks
    dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
            goToScreen(parseInt(dot.getAttribute('data-dot'), 10));
        });
    });

    /* -- Screen 1: Name chips fill input -- */
    phoneScreen.addEventListener('click', function (e) {
        var chip = e.target.closest('[data-fill]');
        if (chip) {
            var input = document.getElementById('demoInput');
            if (input) input.textContent = chip.getAttribute('data-fill');
            // Highlight chip
            chip.closest('.demo-chip-row').querySelectorAll('.demo-chip').forEach(function (c) { c.classList.remove('selected'); });
            chip.classList.add('selected');
        }
    });

    /* -- Screen 2: Media grid toggle -- */
    var addedItems = 0;
    var demoItemCount = document.getElementById('demoItemCount');
    var mediaGrid = document.getElementById('demoMediaGrid');
    if (mediaGrid) {
        mediaGrid.addEventListener('click', function (e) {
            var item = e.target.closest('.demo-media-item');
            if (!item) return;
            item.classList.toggle('active');
            // Count active items
            addedItems = mediaGrid.querySelectorAll('.demo-media-item.active').length;
            if (demoItemCount) demoItemCount.textContent = addedItems + ' item' + (addedItems !== 1 ? 's' : '') + ' added';
        });
    }

    /* -- Screen 3: Date chips -- */
    var dateChips = document.getElementById('demoDateChips');
    var dateDisplay = document.getElementById('demoDateDisplay');
    if (dateChips) {
        dateChips.addEventListener('click', function (e) {
            var chip = e.target.closest('.demo-chip');
            if (!chip) return;
            dateChips.querySelectorAll('.demo-chip').forEach(function (c) { c.classList.remove('selected'); });
            chip.classList.add('selected');
            var val = chip.getAttribute('data-date');
            var d = new Date();
            if (val === '1m') d.setMonth(d.getMonth() + 1);
            else if (val === '1y') d.setFullYear(d.getFullYear() + 1);
            else if (val === '5y') d.setFullYear(d.getFullYear() + 5);
            else if (val === '10y') d.setFullYear(d.getFullYear() + 10);
            if (dateDisplay) dateDisplay.textContent = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        });
    }

    /* -- Screen 4: Hold to lock -- */
    var holdBtn = document.getElementById('demoHoldBtn');
    var lockProgress = document.getElementById('demoLockProgress');
    var lockTitle = document.getElementById('demoLockTitle');
    var vaultInner = document.getElementById('demoVaultInner');
    var holdTimer = null;
    var holdProgress2 = 0;
    var locked = false;

    function resetLock() {
        holdProgress2 = 0;
        locked = false;
        if (lockProgress) lockProgress.style.width = '0%';
        if (holdBtn) { holdBtn.textContent = 'Hold to Lock'; holdBtn.style.background = '#66c7ff'; }
        if (lockTitle) lockTitle.textContent = 'Seal your capsule';
        if (vaultInner) vaultInner.innerHTML = lockOpenSVG;
    }

    if (holdBtn) {
        function startHold() {
            if (locked) {
                goToScreen(5);
                return;
            }
            holdTimer = setInterval(function () {
                holdProgress2 = Math.min(holdProgress2 + 3, 100);
                if (lockProgress) lockProgress.style.width = holdProgress2 + '%';
                if (holdProgress2 >= 100 && !locked) {
                    clearInterval(holdTimer);
                    locked = true;
                    if (holdBtn) { holdBtn.textContent = 'Continue'; holdBtn.style.background = '#4dd98c'; }
                    if (lockTitle) lockTitle.textContent = 'Capsule sealed!';
                    if (vaultInner) vaultInner.innerHTML = lockClosedSVG;
                }
            }, 40);
        }
        function stopHold() {
            clearInterval(holdTimer);
            if (!locked) {
                holdProgress2 = 0;
                if (lockProgress) lockProgress.style.width = '0%';
            }
        }

        holdBtn.addEventListener('mousedown', startHold);
        holdBtn.addEventListener('mouseup', stopHold);
        holdBtn.addEventListener('mouseleave', stopHold);
        holdBtn.addEventListener('touchstart', function (e) { e.preventDefault(); startHold(); }, { passive: false });
        holdBtn.addEventListener('touchend', stopHold);
        holdBtn.addEventListener('touchcancel', stopHold);
    }

    // Reset lock state when navigating to screen 4
    var origGoTo = goToScreen;
    goToScreen = function (index) {
        if (index === 4) resetLock();
        origGoTo(index);
    };

    /* -- Screen 5: Loading animation -- */
    function runLoadingDemo() {
        var percent = document.getElementById('demoPercent');
        var progress = document.getElementById('demoLoadProgress');
        var checklist = document.getElementById('demoChecklist');
        var loadBtn = document.getElementById('demoLoadBtn');
        if (!percent || !progress || !checklist) return;

        var items = checklist.querySelectorAll('.demo-check-item');
        items.forEach(function (it) { it.classList.remove('done'); it.querySelector('.demo-check-dot').textContent = ''; });
        percent.textContent = '0%';
        progress.style.width = '0%';
        if (loadBtn) { loadBtn.style.opacity = '0'; loadBtn.style.pointerEvents = 'none'; }

        var current = 0;
        var targets = [20, 40, 60, 80, 100];
        var idx = 0;

        var iv = setInterval(function () {
            current++;
            percent.textContent = current + '%';
            progress.style.width = current + '%';

            if (idx < items.length && current >= targets[idx]) {
                items[idx].classList.add('done');
                items[idx].querySelector('.demo-check-dot').textContent = '\u2713';
                idx++;
            }

            if (current >= 100) {
                clearInterval(iv);
                if (loadBtn) { loadBtn.style.opacity = '1'; loadBtn.style.pointerEvents = 'auto'; }
            }
        }, 30);
    }

})();
