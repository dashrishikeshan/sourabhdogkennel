const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    if (!item) return;
    const wasOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach((openItem) => {
      openItem.classList.remove("open");
    });
    if (!wasOpen) item.classList.add("open");
  });
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".faq-wrap")) return;
  document.querySelectorAll(".faq-item.open").forEach((item) => {
    item.classList.remove("open");
  });
});

const contactForm = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");

if (contactForm && formNote) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formNote.textContent = "Thank you. Sourabh Dog Kennel will contact you shortly.";
    contactForm.reset();
  });
}

document.querySelectorAll("[data-testimonial-slider]").forEach((slider) => {
  const track = slider.querySelector(".testimonial-track");
  const cards = Array.from(slider.querySelectorAll(".testimonial"));
  if (!track || cards.length <= 3) return;

  let index = 0;

  const visibleCount = () => {
    if (window.matchMedia("(max-width: 720px)").matches) return 1;
    if (window.matchMedia("(max-width: 960px)").matches) return 2;
    return 3;
  };

  const update = () => {
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const cardWidth = cards[0].getBoundingClientRect().width + gap;
    const maxIndex = Math.max(0, cards.length - visibleCount());
    index = index > maxIndex ? 0 : index;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  };

  window.addEventListener("resize", update);
  setInterval(() => {
    const maxIndex = Math.max(0, cards.length - visibleCount());
    index = index >= maxIndex ? 0 : index + 1;
    update();
  }, 3600);
  update();
});
