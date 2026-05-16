document.addEventListener('DOMContentLoaded', function() {
    // Comment Form Handler
    const commentForm = document.getElementById('commentForm');
    const commentSuccessMessage = document.getElementById('commentSuccessMessage');
    const commentsContainer = document.getElementById('commentsContainer');

    // Load and display comments on page load
    loadAndDisplayComments();

    // Handle comment form submission
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const commentName = document.getElementById('commentName').value;
        const commentMessage = document.getElementById('commentMessage').value;

        const comment = {
            name: commentName,
            message: commentMessage,
            timestamp: new Date().toLocaleString('id-ID')
        };

        // Save to localStorage
        let comments = JSON.parse(localStorage.getItem('weddingComments')) || [];
        comments.push(comment);
        localStorage.setItem('weddingComments', JSON.stringify(comments));

        // Show success message
        commentSuccessMessage.style.display = 'flex';
        commentForm.reset();

        // Reload and display comments
        loadAndDisplayComments();

        // Hide success message after 3 seconds
        setTimeout(function() {
            commentSuccessMessage.style.display = 'none';
        }, 3000);

        console.log('Comment saved:', comment);
    });

    // Function to load and display comments
    function loadAndDisplayComments() {
        const comments = JSON.parse(localStorage.getItem('weddingComments')) || [];

        if (comments.length === 0) {
            commentsContainer.innerHTML = '<p class="no-comments">Belum ada ucapan. Jadilah yang pertama memberikan doa dan ucapan!</p>';
            return;
        }

        commentsContainer.innerHTML = '';
        comments.reverse().forEach(comment => {
            const commentEl = document.createElement('div');
            commentEl.className = 'comment-item';
            commentEl.innerHTML = `
                <p class="comment-name">${escapeHtml(comment.name)}</p>
                <p class="comment-text">${escapeHtml(comment.message)}</p>
                <p class="comment-time">${comment.timestamp}</p>
            `;
            commentsContainer.appendChild(commentEl);
        });
    }

    // Sanitize user input to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(function() {
                    entry.target.classList.add('visible');
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all scroll-animate elements
    document.querySelectorAll('[class*="scroll-animate"]').forEach(element => {
        observer.observe(element);
    });

    // Audio player
    const audio = document.getElementById('weddingMusic');
    const musicBtn = document.getElementById('musicToggle');

    if (audio && musicBtn) {
        let isPlaying = false;

        musicBtn.addEventListener('click', function() {
            if (isPlaying) {
                audio.pause();
                musicBtn.classList.add('paused');
                musicBtn.querySelector('.material-icons').textContent = 'music_off';
            } else {
                audio.play().catch(function() {
                    musicBtn.classList.add('paused');
                    musicBtn.querySelector('.material-icons').textContent = 'music_off';
                });
                musicBtn.classList.remove('paused');
                musicBtn.querySelector('.material-icons').textContent = 'music_note';
            }
            isPlaying = !isPlaying;
        });

        // Try autoplay on first interaction
        document.addEventListener('click', function initAudio() {
            if (!isPlaying) {
                audio.play().then(function() {
                    isPlaying = true;
                    musicBtn.classList.remove('paused');
                    musicBtn.querySelector('.material-icons').textContent = 'music_note';
                }).catch(function() {});
            }
            document.removeEventListener('click', initAudio);
        }, { once: true });
    }

    // Parallax effect for cover
    const coverSection = document.querySelector('.cover');

    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;

        if (coverSection) {
            const coverInner = coverSection.querySelector('.cover-inner');
            if (coverInner) {
                coverInner.style.transform = `translateY(${scrollY * 0.15}px)`;
            }
        }
    });

    // Scroll progress indicator
    const createProgressBar = () => {
        const progressBar = document.createElement('div');
        progressBar.id = 'scrollProgress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            height: 3px;
            background: linear-gradient(90deg, #1a3a5c, #2b6b9e);
            width: 0%;
            max-width: 420px;
            z-index: 1000;
            transition: width 0.2s ease;
        `;
        document.body.appendChild(progressBar);
    };

    createProgressBar();

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        const progressBar = document.getElementById('scrollProgress');
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    });

    // Scroll to top button
    const createScrollToTop = () => {
        const btn = document.createElement('button');
        btn.id = 'scrollToTop';
        btn.innerHTML = '↑';
        btn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 44px;
            height: 44px;
            background: #1a3a5c;
            color: #ffffff;
            border: 1px solid #ffffff;
            cursor: pointer;
            font-size: 20px;
            display: none;
            z-index: 999;
            transition: all 0.3s ease;
            font-family: 'Playfair Display', serif;
        `;

        document.body.appendChild(btn);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                btn.style.display = 'block';
            } else {
                btn.style.display = 'none';
            }
        });

        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        btn.addEventListener('mouseenter', function() {
            this.style.background = '#2b6b9e';
            this.style.color = '#ffffff';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.background = '#1a3a5c';
            this.style.color = '#ffffff';
        });
    };

    createScrollToTop();
});