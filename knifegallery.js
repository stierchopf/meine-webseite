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