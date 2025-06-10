document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach((carouselContainer) => {
        const inner = carouselContainer.querySelector('.carousel-inner');
        const prevBtn = carouselContainer.querySelector('.carousel-prev');
        const nextBtn = carouselContainer.querySelector('.carousel-next');
        const dots = carouselContainer.querySelectorAll('.dot');

        let index = 0;
        const total = inner.children.length;

        const update = () => {
            inner.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((dot, i) => {
                dot.classList.toggle('bg-white', i === index);
                dot.classList.toggle('bg-gray-400', i !== index);
            });
        };

        prevBtn.addEventListener('click', () => {
            index = (index - 1 + total) % total;
            update();
        });

        nextBtn.addEventListener('click', () => {
            index = (index + 1) % total;
            update();
        });

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                index = i;
                update();
            });
        });

        update();
    });
});
