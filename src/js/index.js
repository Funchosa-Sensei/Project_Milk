import '../scss/main.scss';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import IMask from 'imask';

// --- ЛОГИКА ТЕМНОЙ ТЕМЫ ---
const themeSwitcherBtn = document.querySelector('.theme-switcher__btn');
const body = document.body;

const applyTheme = (theme) => {
    if (theme === 'dark') {
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
    }
};

if (themeSwitcherBtn) {
    themeSwitcherBtn.addEventListener('click', () => {
        const isDark = body.classList.contains('dark-theme');
        const newTheme = isDark ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// --- ИМПОРТ ИЗОБРАЖЕНИЙ ---
import productTvorogImg from '../assets/images/product-tvorog.png';
import productAyranImg from '../assets/images/product-ayran.png';
import productMilkImg from '../assets/images/product-milk.png';
import productYogurtImg from '../assets/images/product-yogurt.png';
import hitSmetanaImg from '../assets/images/hit-smetana.png';
import hitTvorogImg from '../assets/images/hit-tvorog.png';
import hitMasloImg from '../assets/images/hit-maslo.png';
import hitMolokoImg from '../assets/images/hit-moloko.png';
import recipePancakesImg from '../assets/images/recipe-pancakes.png';
import recipeDonutsImg from '../assets/images/recipe-donuts.png';
import recipeCasseroleImg from '../assets/images/recipe-casserole.png';
import recipeKraffinImg from '../assets/images/recipe-kraffin.png';

// --- ДАННЫЕ ДЛЯ СЛАЙДЕРОВ ---
const popularData = [
    { imgSrc: productTvorogImg, title: 'Творог', desc: 'Улучшает жировой обмен, профилактика заболеваний сердца и сосудов', bg: 'green' },
    { imgSrc: productAyranImg, title: 'Айран', desc: 'Стимулирует пищеварение, улучшает микрофлору кишечника', bg: 'blue' },
    { imgSrc: productMilkImg, title: 'Молоко', desc: 'Улучшает работу иммунной системы, понижает кровяное давление и еще...', bg: 'pink' },
    { imgSrc: productYogurtImg, title: 'Йогурт', desc: 'Улучшает работу иммунной системы, понижает кровяное давление и тд', bg: 'beige' },
];
const hitsData = [
    { imgSrc: hitSmetanaImg, title: 'Сметана 20%', weight: '200 г', shelfLife: '14 суток' },
    { imgSrc: hitTvorogImg, title: 'Творог обезжиренный', weight: '170 г', shelfLife: '10 суток', gost: true },
    { imgSrc: hitMasloImg, title: 'Масло сливочное', weight: '170 г', shelfLife: '120 суток' },
    { imgSrc: hitMolokoImg, title: 'Молоко 2,5%', weight: '900 г, 1 л', shelfLife: '9 суток' },
];
const recipesData = [
    { imgSrc: recipePancakesImg, title: 'ОЛАДЬИ<br>С ТВОРОГОМ', category: 'Десерт', time: '35 минут', overlay: 'blue' },
    { imgSrc: recipeDonutsImg, title: 'ПОНЧИКИ<br>ИЗ ТВОРОГА', category: 'Десерт', time: '35 минут', overlay: 'pink' },
    { imgSrc: recipeCasseroleImg, title: 'ТВОРОЖНАЯ<br>ЗАПЕКАНКА', category: 'Десерт', time: '35 минут', overlay: 'green' },
    { imgSrc: recipeKraffinImg, title: 'КУЛИЧ<br>КРАФФИН', category: 'Десерт', time: '35 минут', overlay: 'orange' },
];

// --- КОД ДЛЯ ЯНДЕКС.КАРТЫ ---
function initMap() {
    ymaps.ready(() => {
        const mapCenter = [44.6098, 40.1058];
        const myMap = new ymaps.Map("yandex-map", {
            center: mapCenter,
            zoom: 15,
            controls: ['zoomControl']
        });
        myMap.behaviors.disable('scrollZoom');
        const myPlacemark = new ymaps.Placemark(mapCenter, {}, {
            iconLayout: 'default#image',
            iconImageHref: 'https://cdn-icons-png.flaticon.com/512/3448/3448493.png',
            iconImageSize: [50, 50],
            iconImageOffset: [-25, -50]
        });
        myMap.geoObjects.add(myPlacemark);
    });
}
window.initMap = initMap;

// --- ОСНОВНАЯ ЛОГИКА ПОСЛЕ ЗАГРУЗКИ DOM ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Применение сохраненной или системной темы
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    }

    // --- ИНИЦИАЛИЗАЦИЯ СЛАЙДЕРОВ ---
    const generateSlides = (selector, data, html) => {
        const container = document.querySelector(`${selector} .swiper-wrapper`);
        if (container) container.innerHTML = data.map(html).join('');
    };
    
generateSlides('.popular__slider', popularData, d => `<div class="swiper-slide"><div class="product-card product-card--${d.bg}"><img class="product-card__image" src="${d.imgSrc}" alt="${d.title}"><h3 class="product-card__title">${d.title}</h3><p class="product-card__description">${d.desc}</p><a href="#" class="btn btn--outline">Смотреть каталог</a></div></div>`);    generateSlides('.hits__slider', hitsData, d => `<div class="swiper-slide"><div class="hit-card">${d.gost ? '<svg class="hit-card__gost" viewBox="0 0 100 60"><rect width="100" height="60" rx="15" fill="#00A99D"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="white">ГОСТ</text></svg>' : ''}<img class="hit-card__image" src="${d.imgSrc}" alt="${d.title}"><h3 class="hit-card__title">${d.title}</h3><ul class="hit-card__info"><li><svg class="hit-card__icon" viewBox="0 0 24 24"><path d="M19 12h-2V8h-2v4h-2V8h-2v4H9V8H7v4H5V8H3v8h2v-2h2v2h2v-2h2v2h2v-2h2v2h2v-4h2v-2z"></path></svg>Упаковка: ${d.weight}</li><li><svg class="hit-card__icon" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>Срок годности: ${d.shelfLife}</li></ul></div></div>`);
    
    let recipesSwiper;
    const initRecipesSwiper = (data) => {
        generateSlides('.recipes__slider', data, d => `<div class="swiper-slide"><a href="#" class="recipe-card"><img class="recipe-card__bg" src="${d.imgSrc}" alt="${d.title.replace(/<br>/g, ' ')}"><div class="recipe-card__overlay recipe-card__overlay--${d.overlay}"></div><div class="recipe-card__content"><h3 class="recipe-card__title">${d.title}</h3><div class="recipe-card__meta"><span><svg class="recipe-card__icon" viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17C6.47 5.79 5.06 6.73 4 8.13c-2.52 3.39-1.44 8.04 2.05 10.33C9.07 20.36 12 17.55 12 17.55s2.93 2.81 5.95 1.91c3.5-1.04 4.58-5.69 2.05-9.08-.85-1.18-2.02-2.1-3.35-2.33z"/></svg>${d.category}</span><span><svg class="recipe-card__icon" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>${d.time}</span></div></div></a></div>`);
        if (document.querySelector('.recipes__slider')) {
            recipesSwiper = new Swiper('.recipes__slider', { loop: true, spaceBetween: 30, navigation: { nextEl: '.recipes-button-next', prevEl: '.recipes-button-prev' }, breakpoints: { 320:{slidesPerView:1.2}, 576:{slidesPerView:2}, 992:{slidesPerView:3}, 1200:{slidesPerView:4} } });
        }
    };

    initRecipesSwiper(recipesData);
    if (document.querySelector('.popular__slider')) new Swiper('.popular__slider', { loop: true, spaceBetween: 30, navigation: { nextEl: '.popular-button-next', prevEl: '.popular-button-prev' }, breakpoints: { 320:{slidesPerView:1.2}, 768:{slidesPerView:2}, 1024:{slidesPerView:3}, 1440:{slidesPerView:4} } });
    if (document.querySelector('.hits__slider')) new Swiper('.hits__slider', { loop: true, spaceBetween: 30, navigation: { nextEl: '.hits-button-next', prevEl: '.hits-button-prev' }, breakpoints: { 320:{slidesPerView:1.2}, 576:{slidesPerView:2}, 992:{slidesPerView:3}, 1200:{slidesPerView:4} } });
    
    // --- ФИЛЬТР РЕЦЕПТОВ ---
    const filterButtons = document.querySelectorAll('.recipes__filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('is-active'));
            button.classList.add('is-active');

            const category = button.textContent.trim().replace(/<svg.*<\/svg>/, '').trim();
            let filteredData = recipesData;
            if (category !== 'Все подряд') {
                filteredData = recipesData.filter(recipe => recipe.category === category);
            }
            
            if (recipesSwiper) recipesSwiper.destroy(true, true);
            initRecipesSwiper(filteredData);
        });
    });
    
    // --- АНИМАЦИИ ПРИ СКРОЛЛЕ ---
    const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('in-view'); }); }, { threshold: 0.1 });
    document.querySelectorAll('.hero, .popular, .traditions, .hits, .recipes, .geography, .contacts-section').forEach(section => observer.observe(section));

    // --- ПЛАВНЫЙ СКРОЛЛ К ЯКОРЯМ ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1 && document.querySelector(targetId)) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- МОБИЛЬНОЕ МЕНЮ ---
    const burgerBtn = document.querySelector('.header__burger-btn');
    const navMenu = document.querySelector('.header__nav');
    const navLinks = document.querySelectorAll('.nav__link');

    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.toggle('is-active');
        navMenu.classList.toggle('is-open');
        document.body.classList.toggle('no-scroll');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('is-open')) {
                burgerBtn.classList.remove('is-active');
                navMenu.classList.remove('is-open');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // --- МАСКА ДЛЯ ТЕЛЕФОНА ---
    const phoneInput = document.getElementById('user-phone');
    if (phoneInput) {
        IMask(phoneInput, {
            mask: '+{7} (000) 000-00-00'
        });
    }

    // --- ВАЛИДАЦИЯ ФОРМЫ ---
    const form = document.getElementById('feedback-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            const name = document.getElementById('user-name');
            const phone = document.getElementById('user-phone');
            const message = document.getElementById('user-message');
            
            [name, phone, message].forEach(input => {
                const group = input.parentElement;
                group.classList.remove('is-invalid');
            });

            const cyrillicPattern = /^[а-яА-ЯёЁ\s-]+$/;
            if (name.value.trim() === '' || !cyrillicPattern.test(name.value.trim())) {
                name.parentElement.classList.add('is-invalid');
                name.nextElementSibling.textContent = 'Пожалуйста, введите имя на кириллице';
                isValid = false;
            } else {
                name.nextElementSibling.textContent = 'Пожалуйста, введите имя';
            }

            if (phone.value.replace(/\D/g, '').length !== 11) {
                phone.parentElement.classList.add('is-invalid');
                isValid = false;
            }
            if (message.value.trim() === '') {
                message.parentElement.classList.add('is-invalid');
                isValid = false;
            }

            if (isValid) {
                console.log('Форма валидна! Отправляем данные:', {
                    name: name.value,
                    phone: phone.value,
                    message: message.value
                });
                alert('Спасибо! Ваше сообщение отправлено.');
                form.reset();
            } else {
                console.log('Форма содержит ошибки.');
            }
        });

        const nameInput = document.getElementById('user-name');
        if(nameInput) {
            nameInput.addEventListener('input', () => {
                const cyrillicPattern = /[^а-яА-ЯёЁ\s-]/g;
                if (cyrillicPattern.test(nameInput.value)) {
                    nameInput.value = nameInput.value.replace(cyrillicPattern, '');
                }
            });
        }
    }
    
    // --- КНОПКА "НАВЕРХ" ---
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('is-visible');
            } else {
                scrollToTopBtn.classList.remove('is-visible');
            }
        });
    }

    // --- ЗАГРУЗКА ЯНДЕКС.КАРТЫ ---
    const API_KEY = '0d42ff46-38c7-4314-97d5-ee98db5ed9e8';
    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=ru_RU&onload=initMap`;
    document.head.appendChild(script);
});