document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach((carousel) => {
        const images = Array.from(carousel.querySelectorAll('.carousel-element'));

        if (images.length === 0) return;

        const height = carousel.dataset.height || 400;

        // Create wrapper structure
        const wrapper = document.createElement('div');
        wrapper.className = `relative overflow-hidden border border-gray-600 rounded-lg shadow-md w-full h-[${height}px]`;

        const track = document.createElement('div');
        track.className = 'flex transition-transform duration-500 ease-in-out w-full h-full';
        track.style.transform = 'translateX(0%)';

        images.forEach(img => {
            img.classList.add('w-full', 'h-full', 'object-contain', 'flex-shrink-0', 'p-4');
            track.appendChild(img);
        });

        wrapper.appendChild(track);

        // Navigation buttons
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '&#10094;';
        prevBtn.className = 'carousel-prev absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-80 text-white rounded-full p-2 z-10';

        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '&#10095;';
        nextBtn.className = 'carousel-next absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-80 text-white rounded-full p-2 z-10';

        wrapper.appendChild(prevBtn);
        wrapper.appendChild(nextBtn);

        // Dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-dots flex justify-center mt-4 space-x-2';

        const dots = images.map((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'dot w-3 h-3 rounded-full bg-gray-400';
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            dotsContainer.appendChild(dot);
            return dot;
        });

        // Replace original carousel content
        carousel.innerHTML = '';
        carousel.appendChild(wrapper);
        carousel.appendChild(dotsContainer);

        // Logic
        let currentIndex = 0;
        const updateCarousel = () => {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, i) => {
                dot.classList.toggle('bg-white', i === currentIndex);
                dot.classList.toggle('bg-gray-400', i !== currentIndex);
            });
        };

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateCarousel();
        });

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
            });
        });

        updateCarousel(); // Init
    });

    if (typeof AOS !== 'undefined') {
        setTimeout(() => AOS.refreshHard(), 100);
    }
});