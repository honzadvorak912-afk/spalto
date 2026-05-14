/* =============================================
   SPAL TO – shared.js
   Runs on every page
   ============================================= */

(function () {
  "use strict";

  /* ---- Mark active nav link ---- */
  function setActiveNav() {
    var links = document.querySelectorAll(".nav-links a");
    var path  = window.location.pathname.split("/").pop() || "index.html";
    if (path === "") path = "index.html";
    links.forEach(function (a) {
      var href = a.getAttribute("href").split("/").pop().split("#")[0];
      if (href === path) {
        a.classList.add("active");
      } else {
        a.classList.remove("active");
      }
    });
  }

  /* ---- Sticky nav shadow on scroll ---- */
  function handleNavScroll() {
    var nav = document.querySelector(".site-nav");
    if (!nav) return;
    window.addEventListener("scroll", function () {
      nav.style.boxShadow =
        window.scrollY > 10 ? "0 2px 16px rgba(92,61,17,0.10)" : "";
    }, { passive: true });
  }

  /* ---- Smooth reveal on scroll (Intersection Observer) ---- */
  function revealOnScroll() {
    var els = document.querySelectorAll(".reveal");
    // Immediately show all - no animation issues
    els.forEach(function(el) { el.classList.add("revealed"); });
    // Also run observer for elements added later
    if (!window.IntersectionObserver) return;
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); }
      });
    }, { threshold: 0 });
    els.forEach(function(el) { io.observe(el); });
  }

  /* ---- Mobile nav toggle ---- */
  function mobileNav() {
    var toggle = document.getElementById("nav-toggle");
    var menu   = document.getElementById("nav-menu");
    if (!toggle || !menu) return;
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    menu.querySelectorAll("a").forEach(function(a) {
      a.addEventListener("click", function() {
        menu.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- "Recommend us" mini form ---- */
  function recommendForm() {
    var form = document.getElementById("recommend-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = form.querySelector(".form-msg");
      if (msg) {
        msg.textContent = "Díky! Zpráva byla odeslána.";
        msg.style.color = "#3B6D11";
      }
      form.reset();
    });
  }

  /* ---- Contact form basic feedback ---- */
  function contactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    // Formspree zpracuje odeslani - jen zobrazime potvrzeni
    form.addEventListener("submit", function(e) {
      var submitBtn = form.querySelector("button[type='submit']");
      if (submitBtn) {
        submitBtn.textContent = "Odesílám...";
        submitBtn.disabled = true;
      }
    });
  }

  /* ---- Wood card toggle ---- */
  function woodToggle() {
    document.addEventListener("click", function(e) {
      var btn = e.target;
      if (!btn.classList.contains("wood-toggle")) {
        btn = btn.closest(".wood-toggle");
      }
      if (!btn) return;
      var card = btn.closest(".wood-card");
      if (!card) return;
      card.classList.toggle("wood-open");
      btn.setAttribute("aria-expanded", card.classList.contains("wood-open"));
    });
  }

  /* ---- Init ---- */
  document.addEventListener("DOMContentLoaded", function () {
    setActiveNav();
    handleNavScroll();
    revealOnScroll();
    mobileNav();
    recommendForm();
    contactForm();
    woodToggle();
  });
})();
