/* =========================================================
   Asrarul Haque — Data Analyst Portfolio
   script.js
   ========================================================= */

(function () {
  "use strict";

  /* ---------- Helpers ---------- */
  const $ = (sel, parent = document) => parent.querySelector(sel);
  const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));
  const hasIO = "IntersectionObserver" in window;

  /* ---------- Footer year ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =========================================================
     THEME TOGGLE (dark default, saved in localStorage)
     ========================================================= */
  const root = document.documentElement;
  const themeBtn = $("#themeToggle");

  function applyTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
      if (themeBtn) themeBtn.textContent = "☀️";
    } else {
      root.removeAttribute("data-theme");
      if (themeBtn) themeBtn.textContent = "🌙";
    }
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#f5f8fc" : "#0b1220");
  }

  let savedTheme = "dark";
  try {
    savedTheme = localStorage.getItem("theme") || "dark";
  } catch (e) {}
  applyTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
    });
  }

  /* =========================================================
     MOBILE MENU
     ========================================================= */
  const hamburger = $("#hamburger");
  const mobileMenu = $("#mobileMenu");

  function setMenu(open) {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.toggle("open", open);
    mobileMenu.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", String(open));
    mobileMenu.setAttribute("aria-hidden", String(!open));
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      setMenu(!mobileMenu.classList.contains("open"));
    });

    $$(".m-link", mobileMenu).forEach((link) =>
      link.addEventListener("click", () => setMenu(false))
    );

    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) setMenu(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenu(false);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) setMenu(false);
    });
  }

  /* =========================================================
     SCROLL EFFECTS: navbar, progress bar, back-to-top
     ========================================================= */
  const navbar = $("#navbar");
  const progress = $("#scrollProgress");
  const toTop = $("#toTop");

  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (navbar) navbar.classList.toggle("scrolled", y > 20);
    if (progress) progress.style.width = (docHeight > 0 ? (y / docHeight) * 100 : 0) + "%";
    if (toTop) toTop.classList.toggle("visible", y > 500);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* =========================================================
     ACTIVE NAV LINK (highlight the section in view)
     ========================================================= */
  const navLinks = $$(".nav-link");
  const sections = $$("main section[id]");

  if (hasIO && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) =>
              link.classList.toggle("active", link.getAttribute("href") === "#" + id)
            );
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* =========================================================
     TYPING EFFECT
     ========================================================= */
  const typingEl = $("#typing");
  const roles = [
    "Data Analyst",
    "SQL Developer",
    "Power BI Dashboard Builder",
    "Tableau Storyteller",
    "Excel & Python Enthusiast",
  ];

  if (typingEl) {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
      const current = roles[roleIndex];

      if (!deleting) {
        charIndex++;
        typingEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          return setTimeout(type, 1600);
        }
        return setTimeout(type, 80);
      }

      charIndex--;
      typingEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        return setTimeout(type, 400);
      }
      setTimeout(type, 40);
    }

    type();
  }

  /* =========================================================
     REVEAL ON SCROLL
     ========================================================= */
  const revealEls = $$(".reveal");

  if (hasIO) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el, i) => {
      // small stagger for siblings
      el.style.transitionDelay = (i % 4) * 80 + "ms";
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add("show"));
  }

  /* =========================================================
     SKILL BARS (animate width when visible)
     ========================================================= */
  const barFills = $$(".bar-fill");
  const skillBarsBox = $(".skill-bars");

  function fillBars() {
    barFills.forEach((bar) => {
      bar.style.width = (bar.dataset.level || 0) + "%";
    });
  }

  if (skillBarsBox && hasIO) {
    const barObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fillBars();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    barObserver.observe(skillBarsBox);
  } else {
    fillBars();
  }

  /* =========================================================
     ANIMATED COUNTERS
     ========================================================= */
  const counters = $$(".counter");

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10) || 0;
    const duration = 1800;
    const start = performance.now();

    function step(now) {
      const progressRatio = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progressRatio, 3); // easeOutCubic
      el.textContent = Math.floor(eased * target);
      if (progressRatio < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  if (hasIO) {
    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((c) => counterObserver.observe(c));
  } else {
    counters.forEach((c) => (c.textContent = c.dataset.target));
  }

  /* =========================================================
     PROJECT FILTER
     ========================================================= */
  const filterBtns = $$(".filter-btn");
  const projectCards = $$(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      projectCards.forEach((card) => {
        const match = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("hide", !match);
        if (match) card.classList.add("show"); // make sure it is visible
      });
    });
  });

  /* =========================================================
     CONTACT FORM (validation + opens email app)
     ========================================================= */
  const form = $("#contactForm");
  const statusEl = $("#formStatus");
  const MY_EMAIL = "asrarul320@gmail.com";

  function setStatus(message, type) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = "form-status" + (type ? " " + type : "");
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if (form) {
    const fields = $$("input, textarea", form);

    fields.forEach((f) =>
      f.addEventListener("input", () => {
        f.classList.remove("error");
        setStatus("", "");
      })
    );

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = $("#name").value.trim();
      const email = $("#email").value.trim();
      const message = $("#message").value.trim();

      let valid = true;
      fields.forEach((f) => f.classList.remove("error"));

      if (!name) {
        $("#name").classList.add("error");
        valid = false;
      }
      if (!isValidEmail(email)) {
        $("#email").classList.add("error");
        valid = false;
      }
      if (message.length < 5) {
        $("#message").classList.add("error");
        valid = false;
      }

      if (!valid) {
        setStatus("Please fill all fields correctly.", "error");
        return;
      }

      const subject = encodeURIComponent("Portfolio Contact from " + name);
      const body = encodeURIComponent(
        "Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message
      );

      setStatus("Opening your email app... Please press Send there.", "success");
      window.location.href = "mailto:" + MY_EMAIL + "?subject=" + subject + "&body=" + body;
      form.reset();
    });
  }
})();
