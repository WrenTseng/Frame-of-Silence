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

document.addEventListener('DOMContentLoaded', () => {
    // 聯絡表單邏輯
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

    startAutoSlide();
});



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


document.addEventListener('DOMContentLoaded', () => {
    if (typeof startAutoSlide === 'function') startAutoSlide();
    initHomeCarousel();
});


function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        if (pageId === 'home' || pageId === 'index') {
            homeCurrentSlide = 0;
            const homeCarousel = document.getElementById('home-carousel');
            if (homeCarousel) homeCarousel.style.transform = `translateX(0%)`;
        }
    }
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


document.addEventListener('DOMContentLoaded', () => {
    initHomeCarousel();
    initHomeCarousel2();
});
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


document.addEventListener('DOMContentLoaded', () => {
    if (typeof initHomeCarousel === 'function') initHomeCarousel();
    if (typeof initHomeCarousel2 === 'function') initHomeCarousel2();
    initHomeCarousel3(); 
});


let homeCurrentSlide4 = 0;
let homeTimer4 = null;

function initHomeCarousel4() {
    const carousel4 = document.getElementById('home-carousel-4');
    const slides4 = document.querySelectorAll('#home-carousel-4 img');
    
    if (!carousel4 || slides4.length === 0) return;

    if (homeTimer4) clearInterval(homeTimer4);

    homeTimer4 = setInterval(() => {
        homeCurrentSlide4 = (homeCurrentSlide4 + 1) % slides4.length;
        
        // 執行位移動畫
        carousel4.style.transform = `translateX(-${homeCurrentSlide4 * 100}%)`;
    }, 4200); 
}


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

    document.addEventListener('click', () => {
        setTimeout(scanAndInitCarousels, 60);
    });

    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(scanAndInitCarousels, 150);
    });

    window.goToSlide = function(index) {};
})();


function startAboutVideo() {
    const video = document.getElementById('aboutVideo');
    
    if (video) {
        video.currentTime = 0;
        video.play().catch(error => {
            console.log("自動播放被攔截，通常是因為尚未與頁面互動:", error);
        });

        video.onended = function() {
            video.pause();
        };
    }
}



function loadVideo() {
    document.getElementById('video-placeholder').innerHTML = 
    '<iframe src="https://www.youtube-nocookie.com/embed/TFFe0EOzT9E?autoplay=1" ' +
    'frameborder="0" allowfullscreen allow="autoplay" ' +
    'style="position:absolute; top:0; left:0; width:100%; height:100%;"></iframe>';
}

function loadVideoTwo() {
    document.getElementById('video-placeholder-2').innerHTML = 
    '<iframe src="https://www.youtube-nocookie.com/embed/P5eJj-P3218?autoplay=1" ' +
    'frameborder="0" allowfullscreen allow="autoplay" ' +
    'style="position:absolute; top:0; left:0; width:100%; height:100%;"></iframe>';
}

function loadVideoThree() {
    document.getElementById('video-placeholder-3').innerHTML = 
    '<iframe src="https://www.youtube-nocookie.com/embed/ofg0fZVeCxA?autoplay=1" ' +
    'frameborder="0" allowfullscreen allow="autoplay" ' +
    'style="position:absolute; top:0; left:0; width:100%; height:100%;"></iframe>';
}

function loadVideoFour() {
    document.getElementById('video-placeholder-4').innerHTML = 
    '<iframe src="https://www.youtube-nocookie.com/embed/_UEkfawIRWc?autoplay=1" ' +
    'frameborder="0" allowfullscreen allow="autoplay" ' +
    'style="position:absolute; top:0; left:0; width:100%; height:100%;"></iframe>';
}

function loadVideoFive() {
    document.getElementById('video-placeholder-5').innerHTML = 
    '<iframe src="https://www.youtube-nocookie.com/embed/iun6mbKiNJo?autoplay=1" ' +
    'frameborder="0" allowfullscreen allow="autoplay" ' +
    'style="position:absolute; top:0; left:0; width:100%; height:100%;"></iframe>';
}

function loadVideoSix() {
    document.getElementById('video-placeholder-6').innerHTML = 
    '<iframe src="https://www.youtube-nocookie.com/embed/w722fP8NRWA?autoplay=1" ' +
    'frameborder="0" allowfullscreen allow="autoplay" ' +
    'style="position:absolute; top:0; left:0; width:100%; height:100%;"></iframe>';
}

function loadVideoSeven() {
    document.getElementById('video-placeholder-7').innerHTML = 
    '<iframe src="https://www.youtube-nocookie.com/embed/2bE7eiAwrO8?autoplay=1" ' +
    'frameborder="0" allowfullscreen allow="autoplay" ' +
    'style="position:absolute; top:0; left:0; width:100%; height:100%;"></iframe>';
}

function loadVideoEight() {
    document.getElementById('video-placeholder-8').innerHTML = 
    '<iframe src="https://www.youtube-nocookie.com/embed/5U-gcBZVzsY?autoplay=1" ' +
    'frameborder="0" allowfullscreen allow="autoplay" ' +
    'style="position:absolute; top:0; left:0; width:100%; height:100%;"></iframe>';
}

function loadVideoNine() {
    document.getElementById('video-placeholder-9').innerHTML = 
    '<iframe src="https://www.youtube-nocookie.com/embed/wIl5BxHWu-g?autoplay=1" ' +
    'frameborder="0" allowfullscreen allow="autoplay" ' +
    'style="position:absolute; top:0; left:0; width:100%; height:100%;"></iframe>';
}

function loadVideoTen() {
    document.getElementById('video-placeholder-10').innerHTML = 
    '<iframe src="https://www.youtube-nocookie.com/embed/Fo01Wg_bAWw?autoplay=1" ' +
    'frameborder="0" allowfullscreen allow="autoplay" ' +
    'style="position:absolute; top:0; left:0; width:100%; height:100%;"></iframe>';
}

function loadVideoEleven() {
    document.getElementById('video-placeholder-11').innerHTML = 
    '<iframe src="https://www.youtube-nocookie.com/embed/XmFEk6b_jOo?autoplay=1" ' +
    'frameborder="0" allowfullscreen allow="autoplay" ' +
    'style="position:absolute; top:0; left:0; width:100%; height:100%;"></iframe>';
}

function loadVideoTwelve() {
    document.getElementById('video-placeholder-12').innerHTML = 
    '<iframe src="https://www.youtube-nocookie.com/embed/5lRJNpwY3J8?autoplay=1" ' +
    'frameborder="0" allowfullscreen allow="autoplay" ' +
    'style="position:absolute; top:0; left:0; width:100%; height:100%;"></iframe>';
}

function loadVideoThirteen() {
    document.getElementById('video-placeholder-13').innerHTML = 
    '<iframe src="https://www.youtube-nocookie.com/embed/X6E5MvM0ABA?autoplay=1" ' +
    'frameborder="0" allowfullscreen allow="autoplay" ' +
    'style="position:absolute; top:0; left:0; width:100%; height:100%;"></iframe>';
}

function loadVideoFourteen() {
    document.getElementById('video-placeholder-14').innerHTML = 
    '<iframe src="https://www.youtube-nocookie.com/embed/X6E5MvM0ABA?autoplay=1" ' +
    'frameborder="0" allowfullscreen allow="autoplay" ' +
    'style="position:absolute; top:0; left:0; width:100%; height:100%;"></iframe>';
}

// 用來暫存所有 iframe 原本網址的記憶庫
const iframeSrcMap = new Map();

function showPage(pageId) {
    // === 這裡保留你原本的所有功能，完全不變 ===
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
    // =======================================

    // === 執行百分之百靜音與停止機制 ===
    handleVideosAndSounds(pageId);
}
window.showPage = showPage;

// 核心：絕對靜音與影片重置機制
function handleVideosAndSounds(activePageId) {
    // 1. 處理原生 HTML5 <video>
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.pause();
        video.currentTime = 0;
    });

    // 2. 處理 iframe (YouTube / Vimeo 等) - 終極抹除大法
    const allIframes = document.querySelectorAll('iframe');
    
    allIframes.forEach((iframe, index) => {
        // 給每個 iframe 一個專屬的識別標籤
        if (!iframe.dataset.id) {
            iframe.dataset.id = 'iframe-' + index;
        }
        const iframeId = iframe.dataset.id;

        // 檢查這個 iframe 是不是在「當前要顯示的頁面」裡面
        const isInsideActivePage = iframe.closest('.page') && iframe.closest('.page').id === activePageId;

        if (isInsideActivePage) {
            // 如果是在要顯示的頁面，且之前被清空過，就從記憶庫撈出原本的網址還原它
            if ((!iframe.src || iframe.src === 'about:blank') && iframeSrcMap.has(iframeId)) {
                iframe.src = iframeSrcMap.get(iframeId);
            }
        } else {
            // 如果是在被隱藏的頁面，先把原本的網址記下來，然後直接把網址徹底抹空！
            // 網址變成 about:blank 之後，任何聲音、影片串流都會瞬間「絕對終止」
            if (iframe.src && iframe.src !== 'about:blank') {
                iframeSrcMap.set(iframeId, iframe.src);
                iframe.src = 'about:blank'; 
            }
        }
    });
}

