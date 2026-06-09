document.addEventListener('DOMContentLoaded', function() {

    // ===== LOADING SCREEN =====
    var loadingScreen = document.getElementById('loadingScreen');
    setTimeout(function() {
        loadingScreen.classList.add('hidden');
    }, 1500);

    // ===== OPEN INVITATION =====
    var openBtn = document.getElementById('openBtn');
    var cover = document.getElementById('cover');
    var mainContent = document.getElementById('mainContent');
    var floatingNav = document.getElementById('floatingNav');
    var autoScrollBtn = document.getElementById('autoScrollBtn');

    openBtn.addEventListener('click', function() {
        cover.style.transition = 'transform 1s ease, opacity 1s ease';
        cover.style.transform = 'translateY(-100%)';
        cover.style.opacity = '0';
        mainContent.style.display = 'block';
        setTimeout(function() {
            cover.style.display = 'none';
            floatingNav.classList.add('active');
            autoScrollBtn.classList.add('active');
            initObserver();
        }, 1000);
        initAudio();
    });

    // ===== COUNTDOWN =====
    function updateCountdown() {
        var target = new Date('2026-07-11T09:00:00').getTime();
        var now = new Date().getTime();
        var diff = target - now;
        if (diff <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        document.getElementById('days').textContent = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
        document.getElementById('hours').textContent = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
        document.getElementById('minutes').textContent = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        document.getElementById('seconds').textContent = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ===== SCROLL ANIMATIONS (AOS-style) =====
    var observer;

    function initObserver() {
        if (observer) return;
        var options = { threshold: 0.08, rootMargin: '0px 0px -60px 0px' };
        observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function() {
                        entry.target.classList.add('visible');
                        if (entry.target.hasAttribute('data-aos')) {
                            entry.target.classList.add('aos-animate');
                        }
                    }, index * 60);
                } else {
                    // reset instantly (no transition)
                    entry.target.classList.add('no-animate');
                    entry.target.classList.remove('visible', 'aos-animate');
                    void entry.target.offsetHeight;
                    entry.target.classList.remove('no-animate');
                }
            });
        }, options);

        document.querySelectorAll('[data-aos], [class*="aos-"], [class*="fade-in"], [class*="scroll-animate"], .film-reel').forEach(function(el) {
            observer.observe(el);
        });

        // observe new comment elements
        observeComments();
    }

    function observeComments() {
        if (!observer) return;
        document.querySelectorAll('.comments-list .fade-in-left:not([data-observed])').forEach(function(el) {
            el.setAttribute('data-observed', 'true');
            observer.observe(el);
        });
    }

    // ===== NAVBAR ACTIVE STATE =====
    var navItems = document.querySelectorAll('.nav-item');
    var sections = {};
    navItems.forEach(function(item) {
        var href = item.getAttribute('href');
        if (href) {
            var id = href.replace('#', '');
            var section = document.getElementById(id);
            if (section) {
                sections[id] = { el: section, nav: item };
            }
        }
    });

    function updateNav() {
        var scrollY = window.scrollY + 120;
        var current = null;
        for (var id in sections) {
            var sec = sections[id].el;
            var offsetTop = sec.offsetTop;
            var offsetBottom = offsetTop + sec.offsetHeight;
            if (scrollY >= offsetTop && scrollY < offsetBottom) {
                current = id;
                break;
            }
        }
        if (!current && scrollY < 1) {
            current = 'quran';
        }
        navItems.forEach(function(item) { item.classList.remove('active'); });
        if (current && sections[current]) {
            sections[current].nav.classList.add('active');
        }
    }

    window.addEventListener('scroll', updateNav);

    // ===== NAVBAR SMOOTH SCROLL =====
    navItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            stopAutoScroll();
            var targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                var target = document.querySelector(targetId);
                if (target) {
                    var offset = 10;
                    var targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top: targetPos, behavior: 'smooth' });
                }
            }
        });
    });

    // ===== AUTO SCROLL =====
    var isAutoScrolling = false;
    var autoScrollTimer = null;
    var autoScrollIgnoreUntil = 0;
    var autoScrollSections = [
        'quran', 'couple', 'countdown-section', 'story',
        'event', 'gallery', 'gift', 'comments', 'closing-section'
    ];
    var autoScrollIndex = 0;

    function stopAutoScroll() {
        if (isAutoScrolling) {
            isAutoScrolling = false;
            autoScrollBtn.classList.remove('playing');
            if (autoScrollTimer) {
                clearTimeout(autoScrollTimer);
                autoScrollTimer = null;
            }
        }
    }

    function doAutoScroll() {
        if (!isAutoScrolling) return;
        if (autoScrollIndex >= autoScrollSections.length) {
            stopAutoScroll();
            return;
        }
        var target = document.getElementById(autoScrollSections[autoScrollIndex]);
        if (target) {
            autoScrollIgnoreUntil = Date.now() + 600;
            var targetPos = target.getBoundingClientRect().top + window.scrollY - 10;
            window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
        autoScrollIndex++;
        autoScrollTimer = setTimeout(doAutoScroll, 4000);
    }

    autoScrollBtn.addEventListener('click', function() {
        if (isAutoScrolling) {
            stopAutoScroll();
        } else {
            isAutoScrolling = true;
            autoScrollIndex = 0;
            autoScrollBtn.classList.add('playing');
            doAutoScroll();
        }
    });

    // stop on manual scroll (ignore programmatic scroll within 600ms)
    window.addEventListener('scroll', function() {
        if (isAutoScrolling && Date.now() > autoScrollIgnoreUntil) {
            stopAutoScroll();
        }
    }, { passive: true });

    // ===== MUSIC =====
    var audio = document.getElementById('weddingMusic');
    var musicBtn = document.getElementById('musicToggle');
    var isPlaying = false;

    function initAudio() {
        if (!audio || !musicBtn) return;
        var resume = function() {
            audio.play().then(function() {
                isPlaying = true;
                musicBtn.classList.remove('paused');
            }).catch(function() {});
        };
        musicBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (isPlaying) {
                audio.pause();
                musicBtn.classList.add('paused');
                isPlaying = false;
            } else {
                resume();
            }
        });
        document.addEventListener('click', resume, { once: true });
        document.addEventListener('touchstart', resume, { once: true });
    }

    // ===== COPY =====
    document.querySelectorAll('.copy-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            var text = this.getAttribute('data-copy');
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(function() {
                    showCopyFeedback(btn);
                }).catch(function() {
                    fallbackCopy(text, btn);
                });
            } else {
                fallbackCopy(text, btn);
            }
        });
    });

    function fallbackCopy(text, btn) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); showCopyFeedback(btn); } catch (e) {}
        document.body.removeChild(ta);
    }

    function showCopyFeedback(btn) {
        var orig = btn.innerHTML;
        btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
        btn.classList.add('copied');
        setTimeout(function() {
            btn.innerHTML = orig;
            btn.classList.remove('copied');
        }, 2000);
    }

    // ===== COMMENTS =====
    var commentForm = document.getElementById('commentForm');
    var commentsContainer = document.getElementById('commentsContainer');
    var commentSuccess = document.getElementById('commentSuccess');

    loadComments();

    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var name = document.getElementById('commentName').value.trim();
        var msg = document.getElementById('commentMessage').value.trim();
        if (!name || !msg) return;

        var comment = {
            name: escapeHtml(name),
            message: escapeHtml(msg),
            timestamp: new Date().toLocaleString('id-ID')
        };

        var comments = JSON.parse(localStorage.getItem('weddingComments')) || [];
        comments.push(comment);
        localStorage.setItem('weddingComments', JSON.stringify(comments));

        commentForm.reset();
        commentSuccess.style.display = 'flex';
        loadComments();
        setTimeout(function() {
            commentSuccess.style.display = 'none';
        }, 3000);
    });

    function loadComments() {
        var comments = JSON.parse(localStorage.getItem('weddingComments')) || [];
        if (comments.length === 0) {
            commentsContainer.innerHTML = '<p class="no-comments">Belum ada ucapan. Jadilah yang pertama!</p>';
            return;
        }
        var html = '';
        for (var i = comments.length - 1; i >= 0; i--) {
            var c = comments[i];
            html += '<div class="comment-item fade-in-left">' +
                '<div class="comment-avatar"><svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>' +
                '<div class="comment-body">' +
                '<p class="comment-name">' + c.name + '</p>' +
                '<p class="comment-text">' + c.message + '</p>' +
                '<p class="comment-date">' + c.timestamp + '</p>' +
                '</div></div>';
        }
        commentsContainer.innerHTML = html;
        observeComments();
    }

    function escapeHtml(text) {
        var d = document.createElement('div');
        d.textContent = text;
        return d.innerHTML;
    }

    // ===== PARALLAX COVER =====
    var coverSection = document.querySelector('.cover');
    window.addEventListener('scroll', function() {
        if (!coverSection) return;
        if (coverSection.style.display === 'none') return;
        var scrollY = window.pageYOffset;
        var bg = coverSection.querySelector('.cover-bg');
        if (bg) {
            bg.style.transform = 'translateY(' + (scrollY * 0.3) + 'px)';
        }
    });

    // ════════════════════════════════════════════════════════════════
    // A. NEW COUNTDOWN (Transparent) — Target: July 11, 2026
    // ════════════════════════════════════════════════════════════════
    function updateNewCountdown() {
        var target = new Date('2026-07-11T09:00:00+08:00').getTime();
        var now = Date.now();
        var diff = target - now;
        if (diff <= 0) {
            document.getElementById('newDays').textContent = '00';
            document.getElementById('newHours').textContent = '00';
            document.getElementById('newMins').textContent = '00';
            document.getElementById('newSecs').textContent = '00';
            return;
        }
        document.getElementById('newDays').textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
        document.getElementById('newHours').textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
        document.getElementById('newMins').textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
        document.getElementById('newSecs').textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    }
    updateNewCountdown();
    setInterval(updateNewCountdown, 1000);

    // ════════════════════════════════════════════════════════════════
    // C. GALLERY LIGHTBOX
    // ════════════════════════════════════════════════════════════════
    var galleryThumbs = document.querySelectorAll('.new-gallery-thumb');
    var galleryOverlay = document.getElementById('galleryOverlay');
    var galleryOverlayImg = document.getElementById('galleryOverlayImg');

    galleryThumbs.forEach(function(thumb) {
        thumb.addEventListener('click', function() {
            galleryOverlayImg.src = this.src;
            galleryOverlayImg.alt = this.alt;
            galleryOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    galleryOverlay.addEventListener('click', function() {
        this.classList.remove('active');
        document.body.style.overflow = '';
    });

    // ════════════════════════════════════════════════════════════════
    // D. WEDDING GIFT COPY BUTTONS (uses existing showCopyFeedback)
    // ════════════════════════════════════════════════════════════════
    document.querySelectorAll('.new-copy-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            var text = this.getAttribute('data-copy');
            var self = this;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(function() {
                    showCopyFeedback(self);
                }).catch(function() {
                    fallbackCopy(text, self);
                });
            } else {
                fallbackCopy(text, self);
            }
        });
    });

    // ════════════════════════════════════════════════════════════════
    // E. WISHES BOARD — Serverless POST + Local Append
    // ── REPLACE the WEBHOOK_URL below with your actual endpoint (Formspree / Netlify / Google Sheets)
    // ════════════════════════════════════════════════════════════════
    var WEBHOOK_URL = 'https://formspree.io/f/YOUR_FORM_ID_HERE';
    var newWishesForm = document.getElementById('newWishesForm');
    var newWishName = document.getElementById('newWishName');
    var newWishMessage = document.getElementById('newWishMessage');
    var newWishSubmit = document.getElementById('newWishSubmit');
    var newWishesSuccess = document.getElementById('newWishesSuccess');
    var newWishesFeed = document.getElementById('newWishesFeed');

    // Load stored wishes from localStorage
    function loadNewWishes() {
        var stored = localStorage.getItem('weddingWishes');
        var wishes = stored ? JSON.parse(stored) : [];
        if (wishes.length === 0) {
            newWishesFeed.innerHTML = '<p style="text-align:center;color:rgba(255,255,255,0.4);font-size:13px;padding:20px;font-family:Poppins,sans-serif;">Belum ada ucapan. Jadilah yang pertama!</p>';
            return;
        }
        var html = '';
        for (var i = 0; i < wishes.length; i++) {
            var w = wishes[i];
            html += '<div class="new-wishes-item">' +
                '<div class="new-wishes-item-name">' + escapeHtml(w.name) + '</div>' +
                '<div class="new-wishes-item-msg">' + escapeHtml(w.message) + '</div>' +
                '<div class="new-wishes-item-time">' + (w.timestamp || '') + '</div>' +
                '</div>';
        }
        newWishesFeed.innerHTML = html;
    }
    loadNewWishes();

    newWishesForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var name = newWishName.value.trim();
        var msg = newWishMessage.value.trim();
        if (!name || !msg) return;

        var wish = {
            name: escapeHtml(name),
            message: escapeHtml(msg),
            timestamp: new Date().toLocaleString('id-ID')
        };

        // Optimistic local append
        var stored = localStorage.getItem('weddingWishes');
        var wishes = stored ? JSON.parse(stored) : [];
        wishes.unshift(wish);
        localStorage.setItem('weddingWishes', JSON.stringify(wishes));

        newWishName.value = '';
        newWishMessage.value = '';
        newWishesSuccess.style.display = 'block';
        setTimeout(function() { newWishesSuccess.style.display = 'none'; }, 3000);

        loadNewWishes();

        // Fire-and-forget POST to serverless webhook
        try {
            fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(wish)
            }).catch(function() {});
        } catch(e) {}
    });

});
