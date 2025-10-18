const modal = document.getElementById('slideshowModal');
const slideshowImage = document.getElementById('slideshowImage');
const slideshowCaption = document.getElementById('slideshowCaption');
const closeBtn = document.getElementById('closeSlideshow');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
let currentImages = [];
let currentIndex = 0;

document.querySelectorAll('a.open').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        try {
            currentImages = JSON.parse(item.dataset.img);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return;
        }
        currentIndex = 0;

        updateSlideshow();
        modal.style.display = 'flex';
        document.querySelectorAll('a.close').forEach(close => close.style.display = 'none');
    });
});

function updateSlideshow() {
    const current = currentImages[currentIndex];
    slideshowImage.src = current.src;
    slideshowCaption.innerHTML = `<h3>${current.caption}</h3><p>${current.desc}</p>`;
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateSlideshow();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateSlideshow();
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

document.querySelectorAll('a.close').forEach(close => {
    close.addEventListener('click', (e) => {
        e.preventDefault();
        close.style.display = 'none';
    });
});

// NEU: Swipe-Funktion (für Touch-Geräte)
let startX = 0;
let endX = 0;
const minSwipeDistance = 50; // Mindestdistanz für Swipe (in Pixeln)

modal.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
});

modal.addEventListener('touchmove', function(e) {
    e.preventDefault(); // Verhindert Scrollen während Swipe
});

modal.addEventListener('touchend', function(e) {
    endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > minSwipeDistance) {
        if (diffX > 0) {
            // Swipe links: Nächstes Bild
            currentIndex = (currentIndex + 1) % currentImages.length;
        } else {
            // Swipe rechts: Vorheriges Bild
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        }
        updateSlideshow();
    }
});

// Optional: Maus-Drag für Desktop
let isDragging = false;
modal.addEventListener('mousedown', function(e) {
    startX = e.clientX;
    isDragging = true;
});

modal.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    e.preventDefault();
});

modal.addEventListener('mouseup', function(e) {
    if (!isDragging) return;
    isDragging = false;
    endX = e.clientX;
    const diffX = startX - endX;
    if (Math.abs(diffX) > minSwipeDistance) {
        if (diffX > 0) {
            currentIndex = (currentIndex + 1) % currentImages.length;
        } else {
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        }
        updateSlideshow();
    }
});