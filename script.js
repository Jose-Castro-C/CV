document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const track = carousel.querySelector(".carousel__track");
    const slides = carousel.querySelectorAll(".carousel__slide");
    const previous = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");
    const status = carousel.querySelector(".carousel__status");

    if (!track || slides.length === 0 || !previous || !next || !status) {
      return;
    }

    let currentSlide = 0;
    carousel.classList.add("is-ready");

    const showSlide = (index) => {
      currentSlide = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      status.textContent = `${currentSlide + 1} de ${slides.length}`;

      slides.forEach((slide, slideIndex) => {
        slide.setAttribute("aria-label", `${slideIndex + 1} de ${slides.length}`);
        slide.setAttribute("aria-hidden", String(slideIndex !== currentSlide));
      });

      previous.disabled = slides.length < 2;
      next.disabled = slides.length < 2;
    };

    previous.addEventListener("click", () => showSlide(currentSlide - 1));
    next.addEventListener("click", () => showSlide(currentSlide + 1));
    showSlide(currentSlide);
  });
});
