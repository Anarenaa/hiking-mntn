function scrollToElement(id) {
    const element = document.getElementById(id);
    if (!element) return;

    const yOffset = -50; // Відступ для фіксованого header'а (якщо є)
    const targetY = element.getBoundingClientRect().top + window.scrollY + yOffset;

    let startY = window.scrollY;
    let distance = targetY - startY;
    let startTime = null;

    function animationScroll(currentTime) {
        if (!startTime) startTime = currentTime;
        let timeElapsed = currentTime - startTime;
        let progress = Math.min(timeElapsed / 500, 1); // Час анімації: 500 мс

        let easeInOut = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        let newY = startY + distance * easeInOut;
        window.scrollTo(0, newY);

        if (progress < 1) {
            requestAnimationFrame(animationScroll);
        } else {
            window.scrollTo(0, targetY); // Фіксуємо точне положення в кінці
        }
    }

    requestAnimationFrame(animationScroll);
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            let targetId = this.getAttribute("href").substring(1);
            scrollToElement(targetId);
        });
    });
});

const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const activeId = entry.target.id;
            
            document.querySelectorAll('.site-list__item').forEach(item => {
                item.classList.remove('site-list__item--active');
            });

            const activeLink = document.querySelector(`.site-list__link[href="#${activeId}"]`);

            if(activeLink){
                activeLink.closest('.site-list__item').classList.add('site-list__item--active');
            }
        }
    });
}, {threshold: 0.5});//50% секції

document.querySelectorAll('#slide-0, #slide-1, #slide-2, #slide-3').forEach(element => {
    observer.observe(element)
})