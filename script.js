// === 1. 手機選單功能 ===
function toggleMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    if (!menuBtn || !navLinks) return;

    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    if (menuBtn && navLinks) {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
}
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;

// === 2. 核心輪播功能 ===
let currentSlide = 0;
let slideTimer = null;

function goToSlide(n) {
    const carousel = document.getElementById('carousel');
    const slides = document.querySelectorAll('#carousel img');
    const dots = document.querySelectorAll('.dot');
    
    if (!carousel || slides.length === 0) return;

    currentSlide = n;
    const total = slides.length;
    
    if (currentSlide >= total) currentSlide = 0;
    if (currentSlide < 0) currentSlide = total - 1;

    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, index) => {
        dot.style.opacity = (index === currentSlide) ? "1" : "0.5";
        dot.style.transform = (index === currentSlide) ? "scale(1.2)" : "scale(1)";
    });
}
window.goToSlide = goToSlide;

function startAutoSlide() {
    const slides = document.querySelectorAll('#carousel img');
    if (slides.length === 0) return;

    if (slideTimer) clearInterval(slideTimer);
    slideTimer = setInterval(() => {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }, 3000);
}

// === 3. 其他首頁輪播功能 (修復閉合錯誤) ===
let homeCurrentSlide = 0;
let homeTimer = null;

function initHomeCarousel() {
    const homeCarousel = document.getElementById('home-carousel');
    const homeSlides = document.querySelectorAll('#home-carousel img');
    if (!homeCarousel || homeSlides.length === 0) return;

    if (homeTimer) clearInterval(homeTimer);
    homeTimer = setInterval(() => {
        homeCurrentSlide = (homeCurrentSlide + 1) % homeSlides.length;
        homeCarousel.style.transform = `translateX(-${homeCurrentSlide * 100}%)`;
    }, 3000);
}

let homeCurrentSlide2 = 0;
function initHomeCarousel2() {
    const carousel2 = document.getElementById('home-carousel-2');
    const slides2 = document.querySelectorAll('#home-carousel-2 img');
    if (!carousel2 || slides2.length === 0) return;

    setInterval(() => {
        homeCurrentSlide2 = (homeCurrentSlide2 + 1) % slides2.length;
        carousel2.style.transform = `translateX(-${homeCurrentSlide2 * 100}%)`;
    }, 3000);
}

let homeCurrentSlide3 = 0;
function initHomeCarousel3() {
    const carousel3 = document.getElementById('home-carousel-3');
    const slides3 = document.querySelectorAll('#home-carousel-3 img');
    if (!carousel3 || slides3.length === 0) return;

    setInterval(() => {
        homeCurrentSlide3 = (homeCurrentSlide3 + 1) % slides3.length;
        carousel3.style.transform = `translateX(-${homeCurrentSlide3 * 100}%)`;
    }, 3000);
}

let homeCurrentSlide4 = 0;
let homeTimer4 = null;
function initHomeCarousel4() {
    const carousel4 = document.getElementById('home-carousel-4');
    const slides4 = document.querySelectorAll('#home-carousel-4 img');
    if (!carousel4 || slides4.length === 0) return;

    if (homeTimer4) clearInterval(homeTimer4);
    homeTimer4 = setInterval(() => {
        homeCurrentSlide4 = (homeCurrentSlide4 + 1) % slides4.length;
        carousel4.style.transform = `translateX(-${homeCurrentSlide4 * 100}%)`;
    }, 4200); 
}

// === 4. 獨立的 HTML5 影片自動播放安全機制 (不卡死 JS) ===
function autoPlayHtml5Videos() {
    const openingVideo = document.getElementById('openingVideo');
    const aboutVideo = document.getElementById('aboutVideo');

    const forcePlay = async (video) => {
        if (!video) return;
        try {
            video.muted = true; // 必備條件
            await video.play();
        } catch (e) {
            console.log(`${video.id} 自動播放被攔截，等待使用者點擊網頁後觸發`);
            const playOnGesture = () => {
                video.play();
                window.removeEventListener('click', playOnGesture);
                window.removeEventListener('touchstart', playOnGesture);
            };
            window.addEventListener('click', playOnGesture);
            window.addEventListener('touchstart', playOnGesture);
        }
    };

    forcePlay(openingVideo);
    forcePlay(aboutVideo);
}

// === 5. 頁面切換控制 (整合原本功能與影片靜音機制) ===
const iframeSrcMap = new Map();

function showPage(pageId) {
    // 執行切換頁面
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        closeMobileMenu();
        
        if (typeof goToSlide === "function") {
            goToSlide(0);
        }
    }

    // 呼叫優化後的影片管理
    handleVideosAndSounds(pageId);
}
window.showPage = showPage;

// 修正後的影片控制：不瞎暫停
function handleVideosAndSounds(activePageId) {
    // 1. 處理 HTML5 原生影片
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        // 如果是開場影片，或者該影片就在「當前顯示的頁面」內，就不去暫停它，讓它繼續放
        const isOpening = video.id === 'openingVideo';
        const isInsideActivePage = video.closest('.page') && video.closest('.page').id === activePageId;
        
        if (!isOpening && !isInsideActivePage) {
            video.pause();
            video.currentTime = 0;
        } else {
            // 如果切換到了包含該影片的頁面，確保它播放
            video.play().catch(()=>{});
        }
    });

    // 2. 處理 YouTube iframe 抹除與還原
    const allIframes = document.querySelectorAll('iframe');
    allIframes.forEach((iframe, index) => {
        if (!iframe.dataset.id) {
            iframe.dataset.id = 'iframe-' + index;
        }
        const iframeId = iframe.dataset.id;
        const isInsideActivePage = iframe.closest('.page') && iframe.closest('.page').id === activePageId;

        if (isInsideActivePage) {
            if ((!iframe.src || iframe.src === 'about:blank') && iframeSrcMap.has(iframeId)) {
                iframe.src = iframeSrcMap.get(iframeId);
            }
        } else {
            if (iframe.src && iframe.src !== 'about:blank') {
                iframeSrcMap.set(iframeId, iframe.src);
                iframe.src = 'about:blank'; 
            }
        }
    });
}

// === 6. YouTube 延遲載入區 ===
function loadVideoGeneric(placeholderId, videoId) {
    const el = document.getElementById(placeholderId);
    if(el) {
        el.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1" frameborder="0" allowfullscreen allow="autoplay" style="position:absolute; top:0; left:0; width:100%; height:100%;"></iframe>`;
    }
}
function loadVideo() { loadVideoGeneric('video-placeholder', 'TFFe0EOzT9E'); }
function loadVideoTwo() { loadVideoGeneric('video-placeholder-2', 'P5eJj-P3218'); }
function loadVideoThree() { loadVideoGeneric('video-placeholder-3', 'ofg0fZVeCxA'); }
function loadVideoFour() { loadVideoGeneric('video-placeholder-4', '_UEkfawIRWc'); }
function loadVideoFive() { loadVideoGeneric('video-placeholder-5', 'iun6mbKiNJo'); }
function loadVideoSix() { loadVideoGeneric('video-placeholder-6', 'w722fP8NRWA'); }
function loadVideoSeven() { loadVideoGeneric('video-placeholder-7', '2bE7eiAwrO8'); }
function loadVideoEight() { loadVideoGeneric('video-placeholder-8', '5U-gcBZVzsY'); }
function loadVideoNine() { loadVideoGeneric('video-placeholder-9', 'wIl5BxHWu-g'); }
function loadVideoTen() { loadVideoGeneric('video-placeholder-10', 'Fo01Wg_bAWw'); }
function loadVideoEleven() { loadVideoGeneric('video-placeholder-11', 'XmFEk6b_jOo'); }
function loadVideoTwelve() { loadVideoGeneric('video-placeholder-12', '5lRJNpwY3J8'); }
function loadVideoThirteen() { loadVideoGeneric('video-placeholder-13', 'X6E5MvM0ABA'); }
function loadVideoFourteen() { loadVideoGeneric('video-placeholder-14', 'X6E5MvM0ABA'); }

// === 7. 萬用輪播掃描器 (保持隔離) ===
(function() {
    const carouselSpeed = 3000;
    function setupCarousel(carouselContainer) {
        const track = carouselContainer.querySelector('[id*="carousel"]');
        if (!track) return;

        const slides = track.querySelectorAll('img');
        const dotContainer = carouselContainer.querySelector('.absolute.bottom-4');
        const dots = dotContainer ? dotContainer.querySelectorAll('.dot') : [];
        
        if (slides.length === 0) return;
        const totalSlides = slides.length;
        let currentSlide = 0;
        let timer = null;

        track.style.width = `${totalSlides * 100}%`;
        track.style.display = 'flex';
        
        slides.forEach(img => {
            img.style.setProperty('width', `${100 / totalSlides}%`, 'important');
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.flexShrink = '0';
        });

        function updateView() {
            const movePercentage = 100 / totalSlides;
            track.style.transform = `translateX(-${currentSlide * movePercentage}%)`;
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.remove('bg-white/50');
                    dot.classList.add('bg-white');
                } else {
                    dot.classList.remove('bg-white');
                    dot.classList.add('bg-white/50');
                }
            });
        }

        function startTimer() {
            if (timer) clearInterval(timer);
            timer = setInterval(() => {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateView();
            }, carouselSpeed);
        }

        dots.forEach((dot, index) => {
            dot.removeAttribute('onclick'); 
            dot.addEventListener('click', (e) => {
                e.stopPropagation(); 
                currentSlide = index;
                updateView();
                startTimer();
            });
        });

        updateView();
        startTimer();
        carouselContainer.dataset.carouselInitialized = "true";
        carouselContainer.resetCarousel = function() {
            currentSlide = 0;
            updateView();
            startTimer();
        };
    }

    function scanAndInitCarousels() {
        const carouselWrappers = document.querySelectorAll('.w-full.max-w-4xl.relative, .relative.overflow-hidden.shadow-2xl');
        carouselWrappers.forEach(wrapper => {
            const track = wrapper.querySelector('[id*="carousel"]');
            if (track) {
                if (!wrapper.dataset.carouselInitialized) {
                    setupCarousel(wrapper);
                } else if (wrapper.closest('.page')?.classList.contains('active')) {
                    if (typeof wrapper.resetCarousel === 'function') {
                        wrapper.resetCarousel();
                    }
                }
            }
        });
    }

    document.addEventListener('click', () => { setTimeout(scanAndInitCarousels, 60); });
    document.addEventListener('DOMContentLoaded', () => { setTimeout(scanAndInitCarousels, 150); });
})();

// === 8. 初始化與事件綁定 ===
document.addEventListener('DOMContentLoaded', () => {
    // 聯絡表單
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const userName = document.getElementById('form-name').value;
            if (!localStorage.getItem('hasSubmittedContact')) {
                alert(`${userName} 您好，感謝您的來信！我們將盡快與您聯絡！`);
                localStorage.setItem('hasSubmittedContact', 'true');
            }
            this.reset();
        });
    }

    // 啟動所有輪播
    startAutoSlide();
    initHomeCarousel();
    initHomeCarousel2();
    initHomeCarousel3();
    initHomeCarousel4();

    // 啟動 HTML5 影片自動播放
    autoPlayHtml5Videos();
});