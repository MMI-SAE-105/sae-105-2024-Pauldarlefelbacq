const toggle = document.querySelector(".menu-btn");
const nav = document.querySelector(".menu");
const page = document.body;

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = toggle.ariaExpanded === "true";
    const isClosed = !isOpen;
    toggle.ariaExpanded = isClosed;
    nav.ariaHidden = isOpen;
    page.classList.toggle("noscroll", isClosed);
  });
}

/* Carousel */

const track = document.querySelector('.carouseltrack__films');
const prevButton = document.querySelector('.carousel__films-button--prev');
const nextButton = document.querySelector('.carousel__films-button--next');
const items = document.querySelectorAll('.carousel__img');

let currentIndex = 0;
let isDragging = false;
let startX = 0, currentTranslate = 0, previousTranslate = 0;

const updateCarousel = () => {
    if (currentIndex >= items.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = items.length - 1;

};

const moveToNextSlide = () => {
    currentIndex++;
    updateCarousel();
};

const moveToPrevSlide = () => {
    currentIndex--;
    updateCarousel();
};

const startDrag = (e) => {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    previousTranslate = -currentIndex * 100;
    track.style.transition = 'none';
};

const drag = (e) => {
    if (!isDragging) return;
    const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const deltaX = currentX - startX;
    currentTranslate = previousTranslate + (deltaX / track.offsetWidth) * 100;
};

const stopDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = 'transform 0.5s ease-in-out';

    const movedBy = currentTranslate - previousTranslate;
    if (movedBy < -20) currentIndex++;
    if (movedBy > 20) currentIndex--;

    updateCarousel();
};

track.addEventListener('mousedown', startDrag);
track.addEventListener('mousemove', drag);
track.addEventListener('mouseup', stopDrag);
track.addEventListener('mouseleave', stopDrag);

track.addEventListener('touchstart', startDrag);
track.addEventListener('touchmove', drag);
track.addEventListener('touchend', stopDrag);

nextButton.addEventListener('click', moveToNextSlide);
prevButton.addEventListener('click', moveToPrevSlide);