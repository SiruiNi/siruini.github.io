/* === Mobile Menu === */
const menuButton = document.querySelector(".mobile-menu-button");
const closeButton = document.querySelector(".mobile-close-button");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-nav a, .mobile-site-name");

function openMobileMenu() {
  if (!mobileMenu || !menuButton) return;
  mobileMenu.classList.add("open");
  mobileMenu.setAttribute("aria-hidden", "false");
  menuButton.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
  if (!mobileMenu || !menuButton) return;
  mobileMenu.classList.remove("open");
  mobileMenu.setAttribute("aria-hidden", "true");
  menuButton.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

if (menuButton) menuButton.addEventListener("click", openMobileMenu);
if (closeButton) closeButton.addEventListener("click", closeMobileMenu);
mobileLinks.forEach((link) => link.addEventListener("click", closeMobileMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileMenu && mobileMenu.classList.contains("open")) {
    closeMobileMenu();
  }
});

/* === About Me Interest Animation === */
const aboutAnimationBlock = document.querySelector(".about-animate-block");

if (aboutAnimationBlock) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          aboutAnimationBlock.classList.remove("in-view");
          void aboutAnimationBlock.offsetWidth;
          aboutAnimationBlock.classList.add("in-view");
          observer.unobserve(aboutAnimationBlock);
        }
      });
    },
    { threshold: 0.35 }
  );

  observer.observe(aboutAnimationBlock);
}

/* === Infinite Hobby Carousel === */
const hobbyCarousel = document.querySelector("#hobbyCarousel");
const prevButton = document.querySelector(".carousel-btn.prev");
const nextButton = document.querySelector(".carousel-btn.next");

function getCarouselStep() {
  if (!hobbyCarousel) return 0;
  const firstCard = hobbyCarousel.querySelector(".hobby-card");
  if (!firstCard) return 0;
  const carouselStyle = window.getComputedStyle(hobbyCarousel);
  const gap = parseFloat(carouselStyle.columnGap || carouselStyle.gap || 0);
  return firstCard.offsetWidth + gap;
}

function scrollCarousel(direction) {
  if (!hobbyCarousel) return;
  const step = getCarouselStep();
  if (!step) return;

  const maxScrollLeft = hobbyCarousel.scrollWidth - hobbyCarousel.clientWidth;
  const currentScrollLeft = hobbyCarousel.scrollLeft;
  const tolerance = 8;

  if (direction === "next") {
    if (currentScrollLeft >= maxScrollLeft - tolerance) {
      hobbyCarousel.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      hobbyCarousel.scrollBy({ left: step, behavior: "smooth" });
    }
  }

  if (direction === "prev") {
    if (currentScrollLeft <= tolerance) {
      hobbyCarousel.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
    } else {
      hobbyCarousel.scrollBy({ left: -step, behavior: "smooth" });
    }
  }
}

if (prevButton) prevButton.addEventListener("click", () => scrollCarousel("prev"));
if (nextButton) nextButton.addEventListener("click", () => scrollCarousel("next"));
