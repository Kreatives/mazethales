/* =========================================================
   Maze Thales — interacties
   ========================================================= */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Jaartal footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = "2026";

  /* ---------- Marquee: dupliceer de kaarten voor een naadloze loop ---------- */
  document.querySelectorAll(".marquee__track").forEach((track) => {
    track.innerHTML += track.innerHTML;
  });

  /* ---------- Placeholder-foto's: tijdelijke online stockfoto's ---------- */
  // Zolang de echte assets nog ontbreken, tonen we neutrale grijstinten
  // via picsum (deterministisch per bestandsnaam), zodat niets leeg blijft.
  const stockify = (img) => {
    if (img.dataset.stocked) return;
    img.dataset.stocked = "1";
    const src = img.getAttribute("src") || "";
    const seed = src.replace(/[^a-z0-9]/gi, "").slice(-18) || "mazethales";
    const w = img.getAttribute("width") || 1000;
    const h = img.getAttribute("height") || 750;
    img.src = `https://picsum.photos/seed/${seed}/${w}/${h}?grayscale`;
  };
  document.querySelectorAll("img[src^='assets/']").forEach((img) => {
    if (img.complete && img.naturalWidth === 0) stockify(img);
    img.addEventListener("error", () => stockify(img));
  });

  /* ---------- Topbar-hoogte -> header eronder ---------- */
  const topbar = document.querySelector(".topbar");
  const setTopbarHeight = () => {
    if (topbar) document.documentElement.style.setProperty("--topbar-h", topbar.offsetHeight + "px");
  };
  setTopbarHeight();
  window.addEventListener("resize", setTopbarHeight, { passive: true });

  /* ---------- Sticky header ---------- */
  const header = document.getElementById("siteHeader");
  const onScroll = () => {
    const threshold = topbar ? topbar.offsetHeight : 38;
    if (window.scrollY > threshold) header.classList.add("is-stuck");
    else header.classList.remove("is-stuck");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobiel menu ---------- */
  const navToggle = document.getElementById("navToggle");
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const open = header.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
    });
    header.querySelectorAll(".main-nav__link").forEach((link) => {
      link.addEventListener("click", () => {
        // De dropdown-toggle (Diensten) klapt alleen het submenu uit, niet het hele menu dicht
        if (link.classList.contains("nav-dropdown__toggle")) return;
        header.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Aanbod: tabs + slider ---------- */
  const offerTrack = document.getElementById("offerTrack");
  if (offerTrack) {
    const tabs = Array.from(document.querySelectorAll(".offer__tabs .tab"));
    const slides = Array.from(offerTrack.querySelectorAll(".offer-slide"));
    let activeIndex = 0;

    // Clones aan de uiteinden zodat er ook links/rechts een card peekt bij de eerste en laatste slide
    const leadClone = slides[slides.length - 1].cloneNode(true);
    const tailClone = slides[0].cloneNode(true);
    [leadClone, tailClone].forEach((c) => c.classList.add("is-clone"));
    leadClone.classList.remove("is-active");
    tailClone.classList.remove("is-active");
    offerTrack.insertBefore(leadClone, slides[0]);
    offerTrack.appendChild(tailClone);
    leadClone.addEventListener("click", () => setOffer(slides.length - 1));
    tailClone.addEventListener("click", () => setOffer(0));

    function setOffer(index) {
      activeIndex = index;
      const viewport = offerTrack.parentElement;
      const slide = slides[index];
      // Centreer de actieve slide in de viewport
      const offset = slide.offsetLeft - (viewport.clientWidth - slide.offsetWidth) / 2;
      offerTrack.style.transform = `translateX(${-offset}px)`;

      tabs.forEach((t, i) => {
        const on = i === index;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", String(on));
      });
      slides.forEach((s, i) => s.classList.toggle("is-active", i === index));
    }

    tabs.forEach((tab, i) => tab.addEventListener("click", () => setOffer(i)));
    slides.forEach((slide, i) => slide.addEventListener("click", () => setOffer(i)));

    setOffer(0);
    window.addEventListener("resize", () => setOffer(activeIndex), { passive: true });
  }

  /* ---------- 3D coverflow (aanpak) ---------- */
  const coverflow = document.getElementById("coverflow");
  if (coverflow) {
    const stage = document.getElementById("cfStage");
    const cards = Array.from(stage.querySelectorAll(".cf-card"));
    const n = cards.length;
    const dotsWrap = document.getElementById("cfDots");
    // Horizontale spreiding van de kaarten, schaalt mee met de breedte
    // zodat de 3D-animatie ook op mobiel netjes past.
    const spread = () => Math.max(150, Math.min(340, stage.clientWidth * 0.52));

    let current = 0;   // vloeiende positie (kan fractioneel zijn tijdens slepen)
    let target = 0;    // doel-index
    let animating = false;

    cards.forEach((_, i) => {
      const d = document.createElement("button");
      d.className = "cf-dot";
      d.type = "button";
      d.setAttribute("role", "tab");
      d.setAttribute("aria-label", "Stap " + (i + 1));
      d.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(d);
    });
    const dots = Array.from(dotsWrap.children);

    const wrap = (raw) => {
      while (raw > n / 2) raw -= n;
      while (raw < -n / 2) raw += n;
      return raw;
    };

    const render = () => {
      const u = spread();
      cards.forEach((card, i) => {
        const off = wrap(i - current);
        const a = Math.abs(off);
        const tx = off * u;
        const tz = -a * 180;
        const ry = off * 34;
        const sc = Math.max(0.72, 1 - a * 0.14);
        const br = Math.max(0.5, 1 - a * 0.32);
        card.style.transform = `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${sc})`;
        card.style.opacity = a > 1.6 ? "0" : "1";
        card.style.filter = `brightness(${br})`;
        card.style.zIndex = String(1000 - Math.round(a * 100));
      });
      const activeI = ((Math.round(current) % n) + n) % n;
      cards.forEach((c, i) => c.classList.toggle("is-active", i === activeI));
      const targetI = ((Math.round(target) % n) + n) % n;
      dots.forEach((d, i) => d.classList.toggle("is-active", i === targetI));
    };

    const animate = () => {
      animating = true;
      current += (target - current) * 0.18;
      if (Math.abs(target - current) < 0.001) { current = target; animating = false; render(); return; }
      render();
      requestAnimationFrame(animate);
    };
    const kick = () => { if (!animating) requestAnimationFrame(animate); };
    const goTo = (i) => { target = i; kick(); };
    const step = (dir) => { target += dir; kick(); };

    document.getElementById("cfPrev").addEventListener("click", () => step(-1));
    document.getElementById("cfNext").addEventListener("click", () => step(1));
    cards.forEach((card, i) => card.addEventListener("click", () => {
      if (wrap(i - Math.round(current)) !== 0) goTo(i);
    }));

    // Slepen
    let dragging = false, startX = 0, startCurrent = 0, moved = false;
    const down = (e) => {
      dragging = true; moved = false;
      startX = e.touches ? e.touches[0].clientX : e.clientX;
      startCurrent = current;
      animating = false;
      stage.classList.add("is-dragging");
    };
    const move = (e) => {
      if (!dragging) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const dx = x - startX;
      if (Math.abs(dx) > 4) moved = true;
      current = startCurrent - dx / spread();
      render();
    };
    const up = () => {
      if (!dragging) return;
      dragging = false;
      stage.classList.remove("is-dragging");
      target = Math.round(current);
      kick();
    };
    stage.addEventListener("mousedown", down);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    stage.addEventListener("touchstart", down, { passive: true });
    stage.addEventListener("touchmove", move, { passive: true });
    stage.addEventListener("touchend", up);
    // klik onderdrukken na slepen
    stage.addEventListener("click", (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);

    window.addEventListener("resize", render, { passive: true });
    render();
  }

  /* ---------- Toggles die een tabelkolom tonen (tarieven + vergelijking) ---------- */
  const wireColumnToggle = (toggleId, tableId, attr) => {
    const toggle = document.getElementById(toggleId);
    const table = document.getElementById(tableId);
    if (!toggle || !table) return;
    const btns = Array.from(toggle.querySelectorAll(".price-toggle__btn"));
    btns.forEach((btn) =>
      btn.addEventListener("click", () => {
        table.dataset[attr] = btn.dataset[attr];
        btns.forEach((b) => {
          const on = b === btn;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-selected", String(on));
        });
      })
    );
  };
  wireColumnToggle("priceToggle", "priceTable", "plan");
  wireColumnToggle("compareToggle", "compareTable", "col");

  /* ---------- Media-carousel (galerij) ---------- */
  const mcTrack = document.getElementById("mcTrack");
  if (mcTrack) {
    const amount = () => Math.max(240, mcTrack.clientWidth * 0.85);
    const prev = document.getElementById("mcPrev");
    const next = document.getElementById("mcNext");
    if (prev) prev.addEventListener("click", () => mcTrack.scrollBy({ left: -amount(), behavior: "smooth" }));
    if (next) next.addEventListener("click", () => mcTrack.scrollBy({ left: amount(), behavior: "smooth" }));
  }

  /* ---------- Reviews: slider met dots ---------- */
  const reviewsTrack = document.getElementById("reviewsTrack");
  const reviewsDots = document.getElementById("reviewsDots");
  if (reviewsTrack && reviewsDots) {
    const cards = Array.from(reviewsTrack.children);

    const perView = () => {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    };

    let page = 0;

    const pageCount = () => Math.max(1, cards.length - perView() + 1);

    const buildDots = () => {
      reviewsDots.innerHTML = "";
      const count = pageCount();
      for (let i = 0; i < count; i++) {
        const dot = document.createElement("button");
        dot.className = "reviews__dot" + (i === page ? " is-active" : "");
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", `Ga naar review ${i + 1}`);
        dot.addEventListener("click", () => goTo(i));
        reviewsDots.appendChild(dot);
      }
    };

    const goTo = (index) => {
      const count = pageCount();
      page = Math.min(Math.max(index, 0), count - 1);
      const card = cards[0];
      const gap = 24;
      const step = card.offsetWidth + gap;
      reviewsTrack.style.transform = `translateX(${-step * page}px)`;
      reviewsDots.querySelectorAll(".reviews__dot").forEach((d, i) =>
        d.classList.toggle("is-active", i === page)
      );
    };

    buildDots();
    goTo(0);
    window.addEventListener("resize", () => { buildDots(); goTo(Math.min(page, pageCount() - 1)); }, { passive: true });
  }

  /* ---------- FAQ accordion ---------- */
  const accordions = Array.from(document.querySelectorAll(".accordion"));
  accordions.forEach((item) => {
    const head = item.querySelector(".accordion__head");
    const panel = item.querySelector(".accordion__panel");

    const setState = (open) => {
      item.classList.toggle("is-open", open);
      head.setAttribute("aria-expanded", String(open));
      panel.style.maxHeight = open ? panel.scrollHeight + "px" : "0px";
    };

    setState(item.classList.contains("is-open"));
    head.addEventListener("click", () => setState(!item.classList.contains("is-open")));
  });

  const recalcOpenAccordions = () => {
    accordions.forEach((item) => {
      if (item.classList.contains("is-open")) {
        const panel = item.querySelector(".accordion__panel");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  };
  window.addEventListener("resize", recalcOpenAccordions, { passive: true });
  // Herbereken zodra de Adobe fonts geladen zijn (teksthoogte kan dan wijzigen)
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(recalcOpenAccordions);

  /* ---------- Cijfers laten optellen zodra ze in beeld komen ---------- */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    const format = (val, dec, suffix) => val.toFixed(dec) + suffix;
    const run = (el) => {
      const to = parseFloat(el.dataset.count);
      const dec = parseInt(el.dataset.decimals || "0", 10);
      const suffix = el.dataset.suffix || "";
      if (prefersReduced) { el.textContent = format(to, dec, suffix); return; }
      const dur = 1700;
      const ease = (t) => 1 - Math.pow(1 - t, 3);
      let start = null;
      const tick = (ts) => {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        el.textContent = format(to * ease(p), dec, suffix);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = format(to, dec, suffix);
      };
      requestAnimationFrame(tick);
    };
    if ("IntersectionObserver" in window && !prefersReduced) {
      counters.forEach((el) => (el.textContent = (0).toFixed(parseInt(el.dataset.decimals || "0", 10)) + (el.dataset.suffix || "")));
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
      }, { threshold: 0.4 });
      counters.forEach((el) => io.observe(el));
    }
  }

  /* ---------- Rustige reveals (GSAP + SplitText) ---------- */
  if (prefersReduced || typeof gsap === "undefined") return;

  document.documentElement.classList.add("reveal-ready");
  gsap.registerPlugin(ScrollTrigger);

  // Hero-kop: woord-voor-woord reveal, spaties blijven behouden via SplitText.
  // (Sectiekoppen niet, die bevatten gouden gradient-woorden met background-clip: text.)
  if (typeof SplitText !== "undefined") {
    const heroTitle = document.querySelector(".hero__title");
    if (heroTitle) {
      const split = new SplitText(heroTitle, { type: "words", wordsClass: "reveal-word" });
      gsap.set(split.words, { yPercent: 40, opacity: 0 });
      gsap.to(split.words, {
        yPercent: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.04,
        scrollTrigger: { trigger: heroTitle, start: "top 90%" },
      });
    }
  }

  // Overige blokken: rustige fade + lichte y-translate
  const revealSelectors = [
    ".section-title", ".feature-card", ".who__media", ".team-card",
    ".review-card", ".accordion", ".contact-cards", ".offer__tabs",
    ".hero__stats", ".approach__footer", ".studio__card", ".cta__checks",
  ];
  revealSelectors.forEach((sel) => {
    gsap.utils.toArray(sel).forEach((el, i) => {
      gsap.fromTo(el,
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
          delay: (i % 3) * 0.06,
          scrollTrigger: { trigger: el, start: "top 88%" },
        }
      );
    });
  });
})();
