/* ============================================================
   Time Capsule: Memory Vault — Website JavaScript
   - Dark/light theme toggle
   - Mobile nav with hamburger morph
   - FAQ accordion
   - Interactive phone demo
   - Stats counter animation
   - Smooth section navigation
   ============================================================ */

(function () {
    'use strict';

    /* ---------- Prevent page flash ---------- */
    var html = document.documentElement;
    var stored = localStorage.getItem('tc-theme');
    if (stored) {
        html.setAttribute('data-theme', stored);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        html.setAttribute('data-theme', 'light');
    }
    // Ensure data-theme is always set
    if (!html.getAttribute('data-theme')) {
        html.setAttribute('data-theme', 'dark');
    }

    /* ---------- Theme toggle ---------- */
    var themeBtns = document.querySelectorAll('.theme-toggle');

    var sunSVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    var moonSVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';

    function updateToggleIcons() {
        var icon = html.getAttribute('data-theme') === 'light' ? sunSVG : moonSVG;
        themeBtns.forEach(function (btn) { btn.innerHTML = icon; });
    }
    updateToggleIcons();

    themeBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', next);
            localStorage.setItem('tc-theme', next);
            updateToggleIcons();
        });
    });

    /* ---------- Mobile nav (full-screen overlay with morph) ---------- */
    var navToggle = document.getElementById('navToggle');
    var navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            var isOpen = navLinks.classList.contains('open');
            if (isOpen) {
                // Close
                navLinks.style.opacity = '0';
                navLinks.style.transform = 'translateY(-8px)';
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-label', 'Open menu');
                document.body.style.overflow = '';
                setTimeout(function () {
                    if (!navLinks.classList.contains('open')) {
                        navLinks.classList.remove('open');
                        navLinks.style.display = '';
                    }
                }, 300);
                navLinks.classList.remove('open');
            } else {
                // Open
                navLinks.style.display = 'flex';
                navLinks.style.opacity = '0';
                navLinks.style.transform = 'translateY(-8px)';
                // Force reflow
                navLinks.offsetHeight;
                navLinks.classList.add('open');
                navLinks.style.opacity = '1';
                navLinks.style.transform = 'translateY(0)';
                navToggle.classList.add('open');
                navToggle.setAttribute('aria-label', 'Close menu');
                document.body.style.overflow = 'hidden';
            }
        });
        function closeNav() {
            navLinks.style.opacity = '0';
            navLinks.style.transform = 'translateY(-8px)';
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-label', 'Open menu');
            document.body.style.overflow = '';
            setTimeout(function () {
                navLinks.classList.remove('open');
                navLinks.style.display = '';
            }, 300);
        }
        navLinks.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', closeNav);
        });
    }

    /* ---------- Smooth instant scroll for section links ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                var navHeight = document.querySelector('.nav') ? document.querySelector('.nav').offsetHeight : 60;
                var targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });

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

    /* ---------- Stats counter animation ---------- */
    var statsAnimated = false;
    var statsSection = document.querySelector('.stats-row');
    if (statsSection) {
        function animateStats() {
            if (statsAnimated) return;
            var rect = statsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
                statsAnimated = true;
                // Animate each stat item
                var statItems = statsSection.querySelectorAll('.stat-item');
                statItems.forEach(function (item) {
                    var valueEl = item.querySelector('.stat-value');
                    var labelEl = item.querySelector('.stat-label');
                    if (!valueEl || !labelEl) return;
                    var label = labelEl.textContent.toLowerCase();

                    if (label.indexOf('on-device') !== -1) {
                        // 0% -> 100%
                        animateNumber(valueEl, 0, 100, '%', 1500);
                    } else if (label.indexOf('encryption') !== -1) {
                        // Matrix scramble to AES-256
                        animateMatrix(valueEl, 'AES-256', 1800);
                    } else if (label.indexOf('server') !== -1 || label.indexOf('data') !== -1) {
                        // Highlight 0
                        animateHighlightZero(valueEl, 1200);
                    } else if (label.indexOf('theme') !== -1) {
                        // 0 -> 6
                        animateNumber(valueEl, 0, 6, '', 1200);
                    }
                });
            }
        }

        function animateNumber(el, from, to, suffix, duration) {
            var start = null;
            el.textContent = from + suffix;
            function step(timestamp) {
                if (!start) start = timestamp;
                var progress = Math.min((timestamp - start) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
                var current = Math.round(from + (to - from) * eased);
                el.textContent = current + suffix;
                if (progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        }

        function animateMatrix(el, finalText, duration) {
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-';
            var len = finalText.length;
            var start = null;
            function step(timestamp) {
                if (!start) start = timestamp;
                var progress = Math.min((timestamp - start) / duration, 1);
                var result = '';
                for (var i = 0; i < len; i++) {
                    var charProgress = Math.min(progress * len / (i + 1), 1);
                    if (charProgress >= 1 || progress > (i + 1) / len * 0.7) {
                        result += finalText[i];
                    } else {
                        result += chars[Math.floor(Math.random() * chars.length)];
                    }
                }
                el.textContent = result;
                if (progress < 1) requestAnimationFrame(step);
                else el.textContent = finalText;
            }
            requestAnimationFrame(step);
        }

        function animateHighlightZero(el, duration) {
            el.style.opacity = '0.3';
            el.textContent = '0';
            var start = null;
            function step(timestamp) {
                if (!start) start = timestamp;
                var progress = Math.min((timestamp - start) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                el.style.opacity = 0.3 + 0.7 * eased;
                el.style.transform = 'scale(' + (0.8 + 0.2 * eased) + ')';
                if (progress < 1) requestAnimationFrame(step);
                else {
                    el.style.opacity = '1';
                    el.style.transform = 'scale(1)';
                }
            }
            requestAnimationFrame(step);
        }

        window.addEventListener('scroll', animateStats);
        animateStats(); // Check on load
    }

    /* ---------- Press form handling ---------- */
    var pressForm = document.getElementById('pressForm');
    if (pressForm) {
        pressForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var email = pressForm.querySelector('[name="email"]').value;
            var subject = pressForm.querySelector('[name="subject"]').value;
            var message = pressForm.querySelector('[name="message"]').value;
            var mailtoLink = 'mailto:austinhfrankel@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent('From: ' + email + '\n\n' + message);
            window.location.href = mailtoLink;
        });
    }

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
