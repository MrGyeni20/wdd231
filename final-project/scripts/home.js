// ----- Join Us Form -----
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('join-us-form');
    const messageElement = document.getElementById('form-message');

    form?.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const preferences = document.getElementById('preferences').value;
        const submitButton = form.querySelector('button');

        if (!name || !email) {
            messageElement.textContent = 'Please fill in all required fields.';
            messageElement.className = 'form-message error';
            return;
        }

        submitButton.classList.add('form-animated');
        setTimeout(() => submitButton.classList.remove('form-animated'), 300);

        const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
        subscribers.push({ name, email, preferences });
        localStorage.setItem('subscribers', JSON.stringify(subscribers));

        messageElement.textContent = 'Thank you for joining! Check your email (simulated).';
        messageElement.className = 'form-message success';
        form.reset();
    });

    // ----- Slideshow -----
    let slideIndex = 0;
    let slides = document.querySelectorAll('.slide');

    function showSlide(n) {
        if (!slides.length) return;
        slides.forEach(slide => slide.style.display = 'none');
        slideIndex = (n + slides.length) % slides.length;
        slides[slideIndex].style.display = 'block';
    }

    function plusSlides(n) {
        showSlide(slideIndex + n);
    }

    // Init slideshow
    if (slides.length) {
        showSlide(slideIndex);
        setInterval(() => plusSlides(1), 3000);

        document.querySelector('.prev')?.addEventListener('click', () => plusSlides(-1));
        document.querySelector('.next')?.addEventListener('click', () => plusSlides(1));
    }
});
