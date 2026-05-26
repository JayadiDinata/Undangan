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

    openBtn.addEventListener('click', function() {
        cover.style.transition = 'transform 1s ease, opacity 1s ease';
        cover.style.transform = 'translateY(-100%)';
        cover.style.opacity = '0';
        mainContent.style.display = 'block';
        setTimeout(function() {
            cover.style.display = 'none';
            floatingNav.classList.add('active');
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
        var options = { threshold: 0.08, rootMargin: '0px 0px -30px 0px' };
        observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function() {
                        entry.target.classList.add('visible');
                    }, index * 60);
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        document.querySelectorAll('[class*="aos-"], [class*="fade-in"], [class*="scroll-animate"]').forEach(function(el) {
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

    // ===== MUSIC =====
    var audio = document.getElementById('weddingMusic');
    var musicBtn = document.getElementById('musicToggle');
    var isPlaying = false;

    function initAudio() {
        if (!audio || !musicBtn) return;
        musicBtn.addEventListener('click', function() {
            if (isPlaying) {
                audio.pause();
                musicBtn.classList.add('paused');
            } else {
                audio.play().catch(function() {});
                musicBtn.classList.remove('paused');
            }
            isPlaying = !isPlaying;
        });
        var initPlay = function() {
            if (!isPlaying) {
                audio.play().then(function() {
                    isPlaying = true;
                    musicBtn.classList.remove('paused');
                }).catch(function() {});
            }
            document.removeEventListener('click', initPlay);
        };
        document.addEventListener('click', initPlay, { once: true });
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

});
