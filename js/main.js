
/* Open / close the mobile hamburger menu */
function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", function () {
    const isOpen = links.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", isOpen);
  });
}


/* Add a shadow to the header once the page is scrolled */
function setupHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 10);
  });
}


/* Fade elements with class "reveal" in as they scroll into view */
function setupRevealOnScroll() {
  const items = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // only animate once
      }
    });
  }, { threshold: 0.15 });

  items.forEach(function (item) {
    observer.observe(item);
  });
}


/* Count numbers up from 0 when the stats row appears.*/
function setupCounters() {
  const counters = document.querySelectorAll(".stat-number");

  function countUp(el) {
    const target = Number(el.dataset.target);
    const suffix = el.dataset.suffix || "";
    const duration = 1500; // milliseconds
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function (counter) {
    observer.observe(counter);
  });
}


/* Events page: show only the year that was clicked.
   Buttons use data-year="2025" */
function setupYearFilter() {
  const buttons = document.querySelectorAll(".filter-btn");
  const groups = document.querySelectorAll(".year-group");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const year = button.dataset.year;

      buttons.forEach(function (b) { b.classList.remove("active"); });
      button.classList.add("active");

      groups.forEach(function (group) {
        group.hidden = year !== "all" && group.dataset.year !== year;
      });
    });
  });
}


/* Click an event poster to see it full screen */
function setupLightbox() {
  const lightbox = document.querySelector(".lightbox");
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector("img");

  document.querySelectorAll(".event-poster img").forEach(function (poster) {
    poster.addEventListener("click", function () {
      lightboxImg.src = poster.src;
      lightboxImg.alt = poster.alt;
      lightbox.classList.add("open");
    });
  });

  function close() {
    lightbox.classList.remove("open");
  }

  lightbox.addEventListener("click", close);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
}


/* Keep the copyright year current */
function setFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}


/* Run everything once the page has loaded */
document.addEventListener("DOMContentLoaded", function () {
  setupMobileNav();
  setupHeaderScroll();
  setupRevealOnScroll();
  setupCounters();
  setupYearFilter();
  setupLightbox();
  setFooterYear();
});
