
/* True when the visitor has asked their device for less animation */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


/* Open / close the mobile menu (links + Sponsor Us / Join Us buttons) */
function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  if (!toggle || !menu) return;

  function setOpen(isOpen) {
    menu.classList.toggle("open", isOpen);
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", isOpen);
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", function () {
    setOpen(!menu.classList.contains("open"));
  });

  // Close the menu after picking a link (matters for same-page links like #sponsor-us)
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
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


/* Fade elements with class "reveal" in as they scroll into view.
   Items that appear at the same time (like a row of cards) are staggered. */
function setupRevealOnScroll() {
  const items = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(function (entries) {
    entries
      .filter(function (entry) { return entry.isIntersecting; })
      .forEach(function (entry, i) {
        entry.target.style.setProperty("--reveal-delay", (Math.min(i, 5) * 90) + "ms");
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // only animate once
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


/* Home page photo band: photos slide left -> right forever.
   The HTML lists each photo once. Here we copy the set until the row is
   wider than the screen plus one set, then slide it by exactly one set
   so the loop has no visible jump. Re-runs when the window is resized. */
function setupPhotoBand() {
  const band = document.querySelector(".photo-band");
  if (!band || reduceMotion) return;

  const track = band.querySelector(".photo-track");
  const originals = Array.from(track.children);
  if (!originals.length) return;

  function addCopy() {
    originals.forEach(function (item) {
      const copy = item.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      copy.setAttribute("data-copy", "");
      copy.querySelectorAll("img").forEach(function (img) { img.alt = ""; });
      track.appendChild(copy);
    });
  }

  function build() {
    track.classList.remove("is-animated");
    track.querySelectorAll("[data-copy]").forEach(function (copy) { copy.remove(); });

    // One copy is always needed so we can measure the width of a full set
    addCopy();
    const setWidth = track.children[originals.length].offsetLeft - track.children[0].offsetLeft;
    if (setWidth <= 0) return;

    let copies = 1;
    while (track.offsetWidth < setWidth + band.offsetWidth && copies < 20) {
      addCopy();
      copies++;
    }

    track.style.setProperty("--band-shift", setWidth + "px");
    track.style.setProperty("--band-duration", (setWidth / 45) + "s"); // ~45px per second
    track.classList.add("is-animated");
  }

  build();

  let lastWidth = window.innerWidth;
  let timer = null;
  window.addEventListener("resize", function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      if (window.innerWidth === lastWidth) return; // ignore height-only changes (mobile toolbars)
      lastWidth = window.innerWidth;
      build();
    }, 200);
  });
}


/* Home page hero: soft glow follows the mouse */
function setupHeroGlow() {
  const hero = document.querySelector(".hero");
  if (!hero || reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;

  let frame = null;
  hero.addEventListener("pointermove", function (e) {
    if (frame) return;
    frame = requestAnimationFrame(function () {
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", (e.clientX - rect.left) + "px");
      hero.style.setProperty("--my", (e.clientY - rect.top) + "px");
      frame = null;
    });
  });
}


/* Home page hero: types and deletes each phrase in data-words (split by |) */
function setupTyping() {
  const el = document.querySelector(".typed");
  if (!el) return;

  const words = (el.dataset.words || "").split("|").filter(Boolean);
  if (!words.length || reduceMotion) return; // keep the text written in the HTML

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;
  el.textContent = "";

  function step() {
    const word = words[wordIndex];
    charIndex += deleting ? -1 : 1;
    el.textContent = word.slice(0, charIndex);

    let delay = deleting ? 40 : 85;
    if (!deleting && charIndex === word.length) {
      deleting = true;
      delay = 1800; // pause on the full phrase
    } else if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }
    setTimeout(step, delay);
  }

  setTimeout(step, 600);
}


/* Countdown to an event.
   Usage: <div class="countdown" data-countdown="2026-11-04T18:00:00"></div>
   The time is the visitor's local time. Once it passes, a short message shows instead
   (change it with data-ended-text="..."). */
function setupCountdowns() {
  const elements = document.querySelectorAll("[data-countdown]");
  if (!elements.length) return;

  const UNITS = [
    ["Days", 86400000],
    ["Hours", 3600000],
    ["Mins", 60000],
    ["Secs", 1000]
  ];

  const timers = Array.from(elements).map(function (el) {
    el.textContent = "";
    const target = new Date(el.dataset.countdown).getTime();

    const numbers = UNITS.map(function (unit) {
      const box = document.createElement("span");
      box.className = "countdown-unit";
      const num = document.createElement("span");
      num.className = "countdown-num";
      const label = document.createElement("span");
      label.className = "countdown-label";
      label.textContent = unit[0];
      box.append(num, label);
      el.appendChild(box);
      return num;
    });

    return { el: el, target: target, numbers: numbers, finished: false };
  });

  function finish(timer) {
    timer.finished = true;
    timer.el.textContent = "";
    const message = document.createElement("span");
    message.className = "countdown-done";
    message.textContent = timer.el.dataset.endedText || "This event has started. Stay tuned for the next one!";
    timer.el.appendChild(message);
  }

  function tick() {
    const now = Date.now();

    timers.forEach(function (timer) {
      if (timer.finished) return;
      if (isNaN(timer.target)) {
        // Bad date written in the HTML: hide instead of showing nonsense
        timer.finished = true;
        timer.el.hidden = true;
        return;
      }

      let remaining = timer.target - now;
      if (remaining <= 0) {
        finish(timer);
        return;
      }

      UNITS.forEach(function (unit, i) {
        const value = Math.floor(remaining / unit[1]);
        remaining -= value * unit[1];
        timer.numbers[i].textContent = i === 0 ? value : String(value).padStart(2, "0");
      });
    });

    if (timers.some(function (timer) { return !timer.finished; })) {
      setTimeout(tick, 1000);
    }
  }

  tick();
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
  setupPhotoBand();
  setupHeroGlow();
  setupTyping();
  setupCountdowns();
  setupYearFilter();
  setupLightbox();
  setFooterYear();
});
