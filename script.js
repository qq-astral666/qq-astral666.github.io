const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
    // toggle просто добавляет класс, если его нет, и убирает, если он есть
    logo.classList.toggle('active-demon');
});

const text = document.querySelector(".typing");
const phrases = ["Программист", "Web Developer", "Frontend"];
let i = 0;
let j = 0;
let currentPhrase = [];
let isDeleting = false;

function type() {
    const fullPhrase = phrases[i];
    if (isDeleting) {
        currentPhrase.pop();
    } else {
        currentPhrase.push(fullPhrase[j]);
    }

    text.innerHTML = currentPhrase.join("");

    if (!isDeleting && j < fullPhrase.length) {
        j++;
    } else if (isDeleting && j > 0) {
        j--;
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            i = (i + 1) % phrases.length;
        }
    }

    const speed = isDeleting ? 100 : 200;
    setTimeout(type, speed);
}

type(); // Запускаем эффект

// Плавная прокрутка при клике на ссылки меню
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

function moveSlide(direction, button) {
    const slider = button.closest('.slider');
    const slides = slider.querySelectorAll('.slide');
    let activeIndex = 0;

    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            activeIndex = index;
            slide.classList.remove('active');
        }
    });

    let newIndex = (activeIndex + direction + slides.length) % slides.length;
    slides[newIndex].classList.add('active');
}

