/* =========================================================
   Asrarul Haque — Data Analyst Portfolio
   script.js  (mobile-friendly, no lightbox)
   ========================================================= */
  /* =========================================================
     HAMESHA HOME SE KHULE
     (purani scroll position aur URL ka #about ignore karta hai)
     ========================================================= */
  function goHome() {
    // URL se #about, #projects jaisa hash hata do
    if (location.hash) {
      history.replaceState(null, "", location.pathname + location.search);
    }
    // smooth-scroll band karke seedha top par jao
    const html = document.documentElement;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    html.style.scrollBehavior = "";
  }

  goHome();                                   // page banate hi
  window.addEventListener("load", goHome);    // sab load hone ke baad (browser restore kare to dobara)
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) goHome();                // Back button se wapas aane par
  });

(function () {
  "use strict";

  /* ---------- Helpers ---------- */
  const $ = (sel, parent = document) => parent.querySelector(sel);
  const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));
  const hasIO = "IntersectionObserver" in window;
  const reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Footer year ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =========================================================
     THEME TOGGLE
     (saved theme page load se pehle <head> me lag chuka hota hai,
      yahan sirf button icon aur toggle sambhalte hain)
     ========================================================= */
  const root = document.documentElement;
  const themeBtn = $("#themeToggle");
  const themeMeta = $('meta[name="theme-color"]');

  function applyTheme(theme) {
    const isLight = theme === "light";
    if (isLight) root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");

    if (themeBtn) {
      themeBtn.textContent = isLight ? "☀️" : "🌙";
      themeBtn.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
      );
    }
    if (themeMeta) themeMeta.setAttribute("content", isLight ? "#f5f8fc" : "#0b1220");
  }

  applyTheme(root.getAttribute("data-theme") === "light" ? "light" : "dark");

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
    hamburger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mobileMenu.setAttribute("aria-hidden", String(!open));
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      setMenu(!mobileMenu.classList.contains("open"));
    });

    // menu ka link dabane par menu band
    $$(".m-link", mobileMenu).forEach((link) =>
      link.addEventListener("click", () => setMenu(false))
    );

    // bahar tap/click karne par band
    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) setMenu(false);
    });

    // screen bada hone par (tablet rotate / laptop) band
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 900) setMenu(false);
    });
  }

  // Esc dabane par menu band
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });

  /* =========================================================
     SCROLL EFFECTS: navbar, progress bar, back-to-top
     (requestAnimationFrame se, taaki phone par scroll smooth rahe)
     ========================================================= */
  const navbar = $("#navbar");
  const progress = $("#scrollProgress");
  const toTop = $("#toTop");
  let ticking = false;

  function updateScrollUI() {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (navbar) navbar.classList.toggle("scrolled", y > 20);
    if (progress) progress.style.width = (docHeight > 0 ? (y / docHeight) * 100 : 0) + "%";
    if (toTop) toTop.classList.toggle("visible", y > 500);
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateScrollUI);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  updateScrollUI();

  if (toTop) {
    toTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
    );
  }

  /* =========================================================
     ACTIVE NAV LINK (jo section dikh raha ho wo highlight)
     ========================================================= */
  const navLinks = $$(".nav-link");
  const sections = $$("main section[id]");

  if (hasIO && sections.length && navLinks.length) {
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
    if (reduceMotion) {
      // animation pasand nahi karne waalon ke liye seedha text
      typingEl.textContent = roles[0];
    } else {
      let roleIndex = 0;
      let charIndex = 0;
      let deleting = false;

      const type = () => {
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
      };

      type();
    }
  }

  /* =========================================================
     REVEAL ON SCROLL
     ========================================================= */
  const revealEls = $$(".reveal");

  function showEl(el) {
    el.classList.add("show");
    // animation ke baad delay hata do, taaki hover effect turant chale
    setTimeout(() => {
      el.style.transitionDelay = "";
    }, 1000);
  }

  if (hasIO && !reduceMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            showEl(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    revealEls.forEach((el) => {
      // delay sirf ek hi parent ke andar ke bhai-behan elements me (max 4)
      const siblings = el.parentElement ? $$(":scope > .reveal", el.parentElement) : [el];
      const index = Math.max(siblings.indexOf(el), 0);
      el.style.transitionDelay = (index % 4) * 80 + "ms";
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add("show"));
  }

  /* =========================================================
     SKILL BARS (visible hone par fill)
     ========================================================= */
  const barFills = $$(".bar-fill");
  const skillBarsBox = $(".skill-bars");

  function fillBars() {
    barFills.forEach((bar) => {
      bar.style.width = (bar.dataset.level || 0) + "%";
    });
  }

  if (skillBarsBox && hasIO && !reduceMotion) {
    const barObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fillBars();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 }
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
    const duration = 1600;
    const start = performance.now();

    function step(now) {
      const ratio = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - ratio, 3); // easeOutCubic
      el.textContent = Math.floor(eased * target);
      if (ratio < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  if (hasIO && !reduceMotion) {
    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
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

      filterBtns.forEach((b) => {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-pressed", String(b === btn));
      });

      projectCards.forEach((card) => {
        const match = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("hide", !match);
        if (match) card.classList.add("show"); // card invisible na reh jaye
      });

      // mobile par active button screen me aa jaye (filters side-swipe hote hain)
      if (btn.scrollIntoView) {
        btn.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
      }
    });
  });

  /* =========================================================
     CONTACT FORM (validation + email app kholta hai)
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
    const nameInput = $("#name");
    const emailInput = $("#email");
    const messageInput = $("#message");
    const fields = [nameInput, emailInput, messageInput].filter(Boolean);

    fields.forEach((f) =>
      f.addEventListener("input", () => {
        f.classList.remove("error");
        setStatus("", "");
      })
    );

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      fields.forEach((f) => f.classList.remove("error"));
      let firstInvalid = null;

      if (!name) {
        nameInput.classList.add("error");
        firstInvalid = firstInvalid || nameInput;
      }
      if (!isValidEmail(email)) {
        emailInput.classList.add("error");
        firstInvalid = firstInvalid || emailInput;
      }
      if (message.length < 5) {
        messageInput.classList.add("error");
        firstInvalid = firstInvalid || messageInput;
      }

      if (firstInvalid) {
        setStatus("Please fill all fields correctly.", "error");
        firstInvalid.focus();
        return;
      }

      const subject = encodeURIComponent("Portfolio Contact from " + name);
      const body = encodeURIComponent(
        "Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message
      );

      setStatus(
        "Opening your email app... Press Send there. (If it doesn't open, email me at " +
          MY_EMAIL +
          ")",
        "success"
      );
      window.location.href = "mailto:" + MY_EMAIL + "?subject=" + subject + "&body=" + body;
      // form reset nahi kiya, taaki email app na khule to message na khoye
    });
  }
})();
