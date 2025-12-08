// ========== ГЛАВНЫЙ ФАЙЛ SCRIPTS ==========

// Липкий хедер и бургер-меню
document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const burgerMenu = document.getElementById('burgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const headerNavBar = document.getElementById('header-nav-bar-div');
    const pencilBanner = document.getElementById('pencil-banner-div');
    
    // ========== БУРГЕР-МЕНЮ ==========
    function toggleMobileMenu() {
        const isActive = mobileMenu.classList.contains('active');
        
        if (!isActive) {
            // Открываем меню
            document.body.classList.add('menu-open');
            mobileMenuOverlay.classList.add('active');
            mobileMenu.classList.add('active');
            if (burgerMenu) burgerMenu.classList.add('active');
            
            // Скрываем бургер на время
            setTimeout(() => {
                if (burgerMenu) burgerMenu.style.opacity = '0';
            }, 200);
        } else {
            // Закрываем меню
            document.body.classList.remove('menu-open');
            mobileMenuOverlay.classList.remove('active');
            mobileMenu.classList.remove('active');
            if (burgerMenu) {
                burgerMenu.classList.remove('active');
                burgerMenu.style.opacity = '1';
            }
        }
    }
    
    // События для открытия/закрытия меню
    if (burgerMenu) {
        burgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }
    
    if (closeMobileMenu) {
        closeMobileMenu.addEventListener('click', toggleMobileMenu);
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', toggleMobileMenu);
    }
    
    // Закрытие меню при клике на ссылку в меню
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Если это якорная ссылка (#)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Закрываем меню
                    toggleMobileMenu();
                    
                    // Скроллим к элементу
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 400);
                }
            } else {
                // Для обычных ссылок просто закрываем меню
                setTimeout(() => {
                    toggleMobileMenu();
                }, 300);
            }
        });
    });
    
    // Закрытие меню при нажатии Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
    
    // ========== ЛИПКИЙ ХЕДЕР ==========
    function handleStickyHeader() {
        if (!headerNavBar) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            headerNavBar.classList.add('sticky');
            if (pencilBanner) {
                pencilBanner.style.maxHeight = '0';
                pencilBanner.style.opacity = '0';
                pencilBanner.style.overflow = 'hidden';
                pencilBanner.style.transition = 'all 0.3s ease';
            }
        } else {
            headerNavBar.classList.remove('sticky');
            if (pencilBanner) {
                pencilBanner.style.maxHeight = '40px';
                pencilBanner.style.opacity = '1';
                pencilBanner.style.overflow = 'visible';
            }
        }
    }
    
    // Инициализация sticky header
    window.addEventListener('scroll', handleStickyHeader);
    window.addEventListener('load', handleStickyHeader);
    
    // ========== АДАПТИВНАЯ ПРОВЕРКА РАЗМЕРА ЭКРАНА ==========
    function checkViewport() {
        const isMobile = window.innerWidth <= 1024;
        
        // Показываем/скрываем элементы
        const desktopOnly = document.querySelectorAll('.desktop-only');
        const mobileOnly = document.querySelectorAll('.mobile-only');
        
        if (isMobile) {
            // На мобильных
            desktopOnly.forEach(el => {
                el.style.display = 'none';
            });
            mobileOnly.forEach(el => {
                el.style.display = 'flex';
            });
            
            // Показываем бургер
            if (burgerMenu) {
                burgerMenu.style.display = 'flex';
                burgerMenu.style.opacity = '1';
            }
            
        } else {
            // На десктопе
            desktopOnly.forEach(el => {
                el.style.display = 'flex';
            });
            mobileOnly.forEach(el => {
                el.style.display = 'none';
            });
            
            // Скрываем бургер
            if (burgerMenu) {
                burgerMenu.style.display = 'none';
            }
            
            // Закрываем мобильное меню если открыто
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    }
    
    checkViewport();
    window.addEventListener('resize', checkViewport);
    
    // ========== ПЛАВНАЯ ПРОКРУТКА ДЛЯ ЯКОРЕЙ ==========
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Если меню открыто - сначала закрываем его
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    toggleMobileMenu();
                    
                    // Ждем закрытия меню перед скроллом
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 400);
                } else {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ========== КНОПКА "НАВЕРХ" ==========
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Scroll to top');
    backToTop.setAttribute('title', 'Back to top');
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ========== СЛАЙДЕР (если есть на странице) ==========
    const sliderTrack = document.getElementById('sliderTrack');
    if (sliderTrack) {
        initSlider();
    }
    
    // ========== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ (если есть кнопка) ==========
    const themeSwitch = document.getElementById('themeSwitch');
    if (themeSwitch) {
        themeSwitch.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'warm' ? 'light' : 'warm';
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Сохраняем в localStorage
            localStorage.setItem('theme', newTheme);
            
            // Анимация кнопки
            themeSwitch.style.transform = 'scale(0.95)';
            setTimeout(() => {
                themeSwitch.style.transform = '';
            }, 200);
        });
        
        // Загрузка сохраненной темы
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }
});

// ========== ФУНКЦИЯ СЛАЙДЕРА ==========
function initSlider() {
    const sliderTrack = document.getElementById('sliderTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderDots = document.getElementById('sliderDots');
    
    if (!sliderTrack || !prevBtn || !nextBtn) return;
    
    // Данные карточек слайдера
   const sliderCards = [
    {
        id: 1,
        title: "Birthday Celebration",
        description: "Make birthdays extra special with our custom ice cream cakes and festive flavors.",
        image: "https://images.unsplash.com/photo-1532117182044-031e7cd916ee?w=800&h=600&fit=crop",
        size: "Custom Cake",
        price: "$49.99",
        badge: "Popular"
    },
    {
        id: 2,
        title: "Romantic Dinner",
        description: "Perfect dessert for date night. Elegant and sophisticated flavors to share.",
        image: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=800&h=600&fit=crop",
        size: "2-Person Set",
        price: "$29.99",
        badge: "New"
    },
    {
        id: 3,
        title: "Family Gathering",
        description: "Large tubs perfect for family events and celebrations of all kinds.",
        image: "https://images.unsplash.com/photo-1516043827470-d52c543c438f?w=800&h=600&fit=crop",
        size: "2 Liter",
        price: "$34.99",
        badge: "Best Value"
    },
    {
        id: 4,
        title: "Summer BBQ",
        description: "Refreshing flavors that complement grilled foods and outdoor parties.",
        image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&h=600&fit=crop",
        size: "Picnic Pack",
        price: "$39.99",
        badge: "Seasonal"
    },
    {
        id: 5,
        title: "Movie Night",
        description: "Classic favorites in convenient sizes for cozy nights at home.",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=800&fit=crop",
        size: "Combo Pack",
        price: "$24.99",
        badge: "Fan Favorite"
    },
    {
        id: 6,
        title: "Holiday Party",
        description: "Festive flavors and elegant presentations for holiday entertaining.",
        image: "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=800&h=800&fit=crop",
        size: "Party Pack",
        price: "$54.99",
        badge: "Limited"
    }
    ];
    
    let currentSlide = 0;
    const slidesToShow = 3;
    const totalSlides = sliderCards.length;
    let autoSlideInterval;
    
    // Создаем карточки
    function createSliderCards() {
        sliderTrack.innerHTML = '';
        
        sliderCards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'slider-card';
            cardElement.innerHTML = `
                <div class="slider-card-image">
                    <img src="${card.image}" alt="${card.title}" onerror="this.src='assets/logo.png'">
                    ${card.badge ? `<div class="slider-card-badge">${card.badge}</div>` : ''}
                </div>
                <div class="slider-card-content">
                    <h3 class="slider-card-title">${card.title}</h3>
                    <p class="slider-card-description">${card.description}</p>
                    <div class="slider-card-details">
                        <span class="slider-card-size">${card.size}</span>
                        <span class="slider-card-price">${card.price}</span>
                    </div>
                </div>
            `;
            sliderTrack.appendChild(cardElement);
        });
    }
    
    // Создаем точки
    function createDots() {
        if (!sliderDots) return;
        
        sliderDots.innerHTML = '';
        const dotsCount = Math.ceil(totalSlides / slidesToShow);
        
        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement('button');
            dot.className = 'slider-dot';
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('data-index', i);
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            sliderDots.appendChild(dot);
        }
    }
    
    // Обновляем точки
    function updateDots() {
        const dots = document.querySelectorAll('.slider-dot');
        const activeDotIndex = Math.floor(currentSlide / slidesToShow);
        
        dots.forEach((dot, index) => {
            if (index === activeDotIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Перемещаем слайдер
    function updateSliderPosition() {
        const cards = document.querySelectorAll('.slider-card');
        if (cards.length === 0) return;
        
        const cardWidth = cards[0].offsetWidth + 30;
        const translateX = -currentSlide * cardWidth;
        sliderTrack.style.transform = `translateX(${translateX}px)`;
        updateDots();
    }
    
    // Переход к определенному слайду
    function goToSlide(slideIndex) {
        const maxSlide = totalSlides - slidesToShow;
        currentSlide = slideIndex * slidesToShow;
        
        if (currentSlide < 0) {
            currentSlide = 0;
        } else if (currentSlide > maxSlide) {
            currentSlide = maxSlide;
        }
        
        updateSliderPosition();
        resetAutoSlide();
    }
    
    // Следующий слайд
    function nextSlide() {
        const maxSlide = totalSlides - slidesToShow;
        
        if (currentSlide < maxSlide) {
            currentSlide += slidesToShow;
        } else {
            currentSlide = 0;
        }
        
        updateSliderPosition();
        resetAutoSlide();
    }
    
    // Предыдущий слайд
    function prevSlide() {
        const maxSlide = totalSlides - slidesToShow;
        
        if (currentSlide > 0) {
            currentSlide -= slidesToShow;
        } else {
            currentSlide = maxSlide;
        }
        
        updateSliderPosition();
        resetAutoSlide();
    }
    
    // Автоматическое перелистывание
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Обработка свайпа на мобильных
    let startX = 0;
    let endX = 0;
    
    sliderTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    sliderTrack.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (startX - endX > swipeThreshold) {
            nextSlide();
        } else if (endX - startX > swipeThreshold) {
            prevSlide();
        }
    }
    
    // Инициализация
    createSliderCards();
    createDots();
    
    // Ждем загрузки DOM и изображений
    setTimeout(() => {
        updateSliderPosition();
        startAutoSlide();
    }, 100);
    
    // Обработчики событий
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Адаптация при изменении размера окна
    window.addEventListener('resize', updateSliderPosition);
    
    // Пауза при наведении
    sliderTrack.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    sliderTrack.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
}