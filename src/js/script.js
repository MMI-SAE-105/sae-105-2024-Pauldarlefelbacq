const toggle = document.querySelector(".menu-btn");
const nav = document.querySelector(".menu");
const page = document.body;

// Vérifier si les éléments existent avant d'ajouter l'événement
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = toggle.ariaExpanded === "true";
    const isClosed = !isOpen;
    // Mise à jour des attributs ARIA pour accessibilité
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

// Met à jour la position du carrousel
const updateCarousel = () => {
    // Si on dépasse la dernière diapositive, revenir à la première
    if (currentIndex >= items.length) currentIndex = 0;
    // Si on dépasse la première diapositive, revenir à la dernière
    if (currentIndex < 0) currentIndex = items.length - 1;

    // track.style.transform = translateX(-${(currentIndex * 100)}%);
};

// Va à la prochaine diapositive
const moveToNextSlide = () => {
    currentIndex++;
    updateCarousel();
};

// Va à la diapositive précédente
const moveToPrevSlide = () => {
    currentIndex--;
    updateCarousel();
};

// Gestion des événements de la souris et du toucher
const startDrag = (e) => {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    previousTranslate = -currentIndex * 100;
    track.style.transition = 'none'; // Désactive la transition pour le drag
};

const drag = (e) => {
    if (!isDragging) return;
    const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const deltaX = currentX - startX;
    currentTranslate = previousTranslate + (deltaX / track.offsetWidth) * 100;
    // track.style.transform = translateX(${currentTranslate}%);
};

const stopDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = 'transform 0.5s ease-in-out'; // Réactive la transition

    // Calcul de la distance déplacée
    const movedBy = currentTranslate - previousTranslate;
    if (movedBy < -20) currentIndex++;
    if (movedBy > 20) currentIndex--;

    updateCarousel();
};

// Ajout d'écouteurs pour les événements tactiles et souris
track.addEventListener('mousedown', startDrag);
track.addEventListener('mousemove', drag);
track.addEventListener('mouseup', stopDrag);
track.addEventListener('mouseleave', stopDrag);

track.addEventListener('touchstart', startDrag);
track.addEventListener('touchmove', drag);
track.addEventListener('touchend', stopDrag);

// Navigation avec les boutons
nextButton.addEventListener('click', moveToNextSlide);
prevButton.addEventListener('click', moveToPrevSlide);