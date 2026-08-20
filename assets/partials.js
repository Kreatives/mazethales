/* =========================================================
   Maze Thales — gedeelde header + footer (injectie)
   Houdt elke pagina consistent zonder duplicatie.
   ========================================================= */
(function () {
  "use strict";

  const services = [
    ["Personal Training", "dienst.html?s=personal-training"],
    ["Small Group Coaching", "dienst.html?s=small-group-training"],
    ["Duo Personal Training", "dienst.html?s=duo-personal-training"],
    ["Personal Training aan Huis", "dienst.html?s=personal-training-aan-huis"],
  ];

  const page = document.body.dataset.page || "";
  const bare = document.body.hasAttribute("data-bare"); // landingspagina zonder nav

  const brandLogo = `<img class="brand__logo" src="assets/logo.svg" alt="Maze Thales" width="150" height="22" />`;

  /* ---------- Topbar ---------- */
  const topbar = `
    <div class="topbar">
      <div class="topbar__inner">
        <a class="topbar__item" href="tel:+31644992737">06 44 99 27 37</a>
        <span class="topbar__divider" aria-hidden="true"></span>
        <a class="topbar__item" href="mailto:mazethalesfs@gmail.com">mazethalesfs@gmail.com</a>
      </div>
    </div>`;

  /* ---------- Header ---------- */
  const serviceLinks = services
    .map(([label, href]) => `<a class="dropdown__link" href="${href}">${label}</a>`)
    .join("");

  const header = `
    <header class="site-header" id="siteHeader">
      <div class="site-header__inner">
        <a class="brand" href="index.html" aria-label="Maze Thales home">
          ${brandLogo}
        </a>

        <nav class="main-nav" id="mainNav" aria-label="Hoofdmenu">
          <div class="nav-dropdown" data-nav="diensten">
            <button class="main-nav__link nav-dropdown__toggle" aria-expanded="false" aria-haspopup="true">
              Diensten
              <svg viewBox="0 0 12 8" width="11" height="7" fill="none" aria-hidden="true"><path d="M1 1.5 6 6.5l5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div class="dropdown">
              <a class="dropdown__link dropdown__link--head" href="diensten.html">Alle diensten</a>
              ${serviceLinks}
            </div>
          </div>
          <a class="main-nav__link" data-nav="tarieven" href="tarieven.html">Tarieven</a>
          <a class="main-nav__link" data-nav="resultaten" href="resultaten.html">Resultaten</a>
          <a class="main-nav__link" data-nav="over" href="over.html">Over</a>
          <a class="main-nav__link" data-nav="contact" href="contact.html">Contact</a>
        </nav>

        <div class="site-header__actions">
          <a class="link-plain" href="https://wa.me/31644992737">Stuur WhatsApp</a>
          <a class="btn btn--gold" href="gratis-intake.html">Gratis intake</a>
        </div>

        <button class="nav-toggle" id="navToggle" aria-label="Menu openen" aria-expanded="false" aria-controls="mainNav">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>`;

  /* ---------- Footer ---------- */
  const serviceFooter = services
    .map(([label, href]) => `<a href="${href}">${label}</a>`)
    .join("");

  const footer = `
    <footer class="site-footer">
      <div class="container">
        <div class="site-footer__top site-footer__top--wide">
          <div class="site-footer__brand">
            <a class="brand" href="index.html" aria-label="Maze Thales home">
              ${brandLogo}
            </a>
            <p class="body-text">Privé personal-trainingsstudio in Spijkenisse waar je altijd op afspraak en onder begeleiding traint, in een groep van maximaal zes.</p>
            <p class="site-footer__note">Trainen gaat uitsluitend op afspraak.</p>
          </div>

          <nav class="site-footer__col" aria-label="Diensten">
            <p class="site-footer__heading">Diensten</p>
            ${serviceFooter}
          </nav>

          <nav class="site-footer__col" aria-label="Pagina's">
            <p class="site-footer__heading">Studio</p>
            <a href="over.html">Over Maze Thales</a>
            <a href="tarieven.html">Tarieven</a>
            <a href="resultaten.html">Resultaten</a>
            <a href="veelgestelde-vragen.html">Veelgestelde vragen</a>
            <a href="kennisbank.html">Kennisbank</a>
          </nav>

          <div class="site-footer__col">
            <p class="site-footer__heading">Contact</p>
            <a href="tel:+31644992737">06 44 99 27 37</a>
            <a href="https://wa.me/31644992737">WhatsApp</a>
            <a href="mailto:mazethalesfs@gmail.com">mazethalesfs@gmail.com</a>
            <p>Eikenlaan 102, 3203 BM Spijkenisse</p>
            <p>Ma t/m za, op afspraak</p>
          </div>
        </div>

        <div class="site-footer__bottom">
          <p>© <span data-year></span> Maze Thales. KvK 00000000. Btw NL000000000B00.</p>
          <div class="site-footer__legal">
            <a href="privacyverklaring.html">Privacyverklaring</a>
            <a href="algemene-voorwaarden.html">Algemene voorwaarden</a>
          </div>
        </div>
      </div>
    </footer>`;

  /* ---------- Sticky contact-widget ---------- */
  const contactWidget = `
    <div class="contact-fab" id="contactFab">
      <div class="contact-fab__panel" id="contactFabPanel" role="dialog" aria-label="Contactopties">
        <div class="contact-fab__head">
          <span class="contact-fab__avatar">
            <img src="assets/team-1.jpg" alt="Masih, trainer bij Maze Thales" />
            <span class="contact-fab__status" aria-hidden="true"></span>
          </span>
          <div>
            <p class="contact-fab__name">Masih van Maze Thales</p>
            <p class="contact-fab__sub">We reageren meestal binnen een uur</p>
          </div>
        </div>
        <div class="contact-fab__links">
          <a class="contact-fab__link" href="https://wa.me/31644992737">
            <img class="tile-icon" src="assets/icons/whatsapp.svg" alt="" aria-hidden="true" />
            <span class="contact-fab__link-body"><span class="contact-fab__link-label">WhatsApp</span><span class="contact-fab__link-sub">Stuur ons een bericht</span></span>
          </a>
          <a class="contact-fab__link" href="tel:+31644992737">
            <img class="tile-icon" src="assets/icons/telefoon.svg" alt="" aria-hidden="true" />
            <span class="contact-fab__link-body"><span class="contact-fab__link-label">Bel ons</span><span class="contact-fab__link-sub">06 44 99 27 37</span></span>
          </a>
          <a class="contact-fab__link" href="mailto:mazethalesfs@gmail.com">
            <img class="tile-icon" src="assets/icons/email.svg" alt="" aria-hidden="true" />
            <span class="contact-fab__link-body"><span class="contact-fab__link-label">E-mail</span><span class="contact-fab__link-sub">mazethalesfs@gmail.com</span></span>
          </a>
        </div>
      </div>
      <button class="contact-fab__toggle" id="contactFabToggle" type="button" aria-expanded="false" aria-controls="contactFabPanel" aria-label="Contact opnemen">
        <span class="contact-fab__avatar contact-fab__avatar--sm">
          <img src="assets/team-1.jpg" alt="" />
          <span class="contact-fab__status" aria-hidden="true"></span>
        </span>
        <span class="contact-fab__toggle-label">Contact opnemen</span>
        <svg class="contact-fab__chev" viewBox="0 0 12 8" width="12" height="8" fill="none" aria-hidden="true"><path d="M1 6.5 6 1.5l5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>`;

  /* ---------- Injectie ---------- */
  const headerSlot = document.getElementById("site-header-slot");
  const footerSlot = document.getElementById("site-footer-slot");

  if (headerSlot && !bare) headerSlot.innerHTML = topbar + header;
  if (footerSlot) footerSlot.innerHTML = footer;
  document.body.insertAdjacentHTML("beforeend", contactWidget);

  // Actieve nav markeren
  const activeLink = document.querySelector(`.main-nav [data-nav="${page}"]`);
  if (activeLink) {
    activeLink.classList.add("is-active");
    if (activeLink.classList.contains("nav-dropdown__toggle")) activeLink.setAttribute("aria-current", "page");
    else activeLink.setAttribute("aria-current", "page");
  }

  // Jaartal
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = "2026"));

  // Solide header op subpagina's (geen hero-overlay)
  const header_ = document.getElementById("siteHeader");
  if (header_ && !document.querySelector(".hero")) header_.classList.add("is-solid");

  /* ---------- Dropdown gedrag ---------- */
  const dd = document.querySelector(".nav-dropdown");
  if (dd) {
    const toggle = dd.querySelector(".nav-dropdown__toggle");
    const open = (state) => {
      dd.classList.toggle("is-open", state);
      toggle.setAttribute("aria-expanded", String(state));
    };
    dd.addEventListener("mouseenter", () => window.innerWidth > 900 && open(true));
    dd.addEventListener("mouseleave", () => window.innerWidth > 900 && open(false));
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      open(!dd.classList.contains("is-open"));
    });
    document.addEventListener("click", (e) => { if (!dd.contains(e.target)) open(false); });
  }

  /* ---------- Contact-widget gedrag ---------- */
  const fab = document.getElementById("contactFab");
  if (fab) {
    const fabToggle = document.getElementById("contactFabToggle");
    const setFab = (state) => {
      fab.classList.toggle("is-open", state);
      fabToggle.setAttribute("aria-expanded", String(state));
    };
    fabToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      setFab(!fab.classList.contains("is-open"));
    });
    document.addEventListener("click", (e) => { if (!fab.contains(e.target)) setFab(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setFab(false); });
  }
})();
