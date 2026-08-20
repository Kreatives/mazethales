/* =========================================================
   Maze Thales — data + render voor de dienstpagina's
   Eén template (dienst.html), inhoud per ?s=slug.
   Prijzen conform de officiële tarieventabel (per 4 weken).
   ========================================================= */
(function () {
  "use strict";

  const DATA = {
    "personal-training": {
      name: "Personal Training",
      img: "assets/offer-1.jpg",
      forWhom: "Eén op één met je eigen trainer, volledig gericht op jouw doel en tempo. Dit is de vorm met de meeste aandacht en het snelste resultaat.",
      priceFrom: "€ 65 per les",
      situations: [
        "Je hebt een concreet doel en wilt daar op de kortst mogelijke termijn naartoe werken.",
        "Je traint liever zonder anderen erbij en wilt alle aandacht van de trainer.",
        "Je komt terug van een blessure en wilt dat iemand elke herhaling meekijkt.",
        "Je hebt een drukke agenda en wilt trainingen die maximaal renderen in de tijd die je hebt.",
      ],
      alt: { text: "Wil je hetzelfde, maar tegen een lager tarief en met een sparringpartner? Kijk dan naar", href: "dienst.html?s=duo-personal-training", label: "Duo Personal Training" },
      flow: "Je komt binnen, we lopen kort door hoe je je voelt en of het herstel van de vorige training goed ging. Daarna een gerichte warming-up, de hoofdoefeningen met techniekcorrectie per set, en een afsluiting die past bij je doel. Je hoeft niets mee te nemen behalve sportkleding en een handdoek.",
      get: [
        "Een persoonlijk schema afgestemd op je doel en niveau",
        "Techniekcorrectie bij elke oefening",
        "Metingen elke acht weken met een terugkoppeling",
        "Voedingsadvies wanneer je daarom vraagt",
        "Contact tussen trainingen door via de app",
        "Vaste trainingsmomenten met dezelfde trainer",
      ],
      prices: [
        { name: "6 maanden", amount: "€ 240", sub: "per 4 weken" },
        { name: "12 maanden", amount: "€ 220", sub: "per 4 weken", featured: true },
        { name: "Losse les", amount: "€ 65", sub: "per les" },
      ],
      story: { name: "Sanne, 38", metrics: [["Traject", "6 maanden"], ["Frequentie", "2x per week"]], quote: "Ik stond jarenlang in een grote zaal zonder dat er iemand meekeek. Nu weet ik bij elke oefening waarom ik het doe, en dat houd ik daardoor ook echt vol.", img: "assets/team-1.jpg" },
      faqs: [
        { q: "Kan ik ook één keer per week beginnen?", a: "Ja, veel mensen starten met één keer per week en breiden uit zodra het in hun agenda past. In de intake kijken we wat realistisch is om vol te houden." },
        { q: "Ik heb een blessure, kan ik alsnog starten?", a: "Meestal wel. We stemmen de oefeningen af op wat je lichaam nu aankan en bouwen rustig op, zodat we belasten zonder de klacht te verergeren." },
        { q: "Krijg ik steeds dezelfde trainer?", a: "Ja, je traint op vaste momenten met dezelfde trainer die je voortgang kent en je schema bijstelt." },
      ],
    },

    "small-group-training": {
      name: "Small Group Coaching",
      img: "assets/offer-2.jpg",
      forWhom: "Begeleiding in een groep van maximaal zes personen, met techniekcorrectie per persoon en zestig minuten persoonlijke begeleiding. De toegankelijkste manier om begeleid te trainen.",
      priceFrom: "€ 90 per 4 weken",
      situations: [
        "Je zoekt begeleiding, maar wilt niet het tarief van een individuele training betalen.",
        "Je traint liever met een paar anderen erbij dan helemaal alleen.",
        "Je vindt het fijn dat de trainer meekijkt, ook al sta je niet in je eentje op de vloer.",
        "Je wilt op vaste groepsmomenten trainen die in je week passen.",
      ],
      alt: { text: "Wil je toch alle aandacht voor jezelf? Kijk dan naar", href: "dienst.html?s=personal-training", label: "Personal Training" },
      flow: "De groep begint samen met een warming-up, waarna iedereen aan het werk gaat op zijn eigen niveau. De trainer loopt rond, corrigeert je vorm en past de belasting aan. Doordat de groep klein is, kom je nooit zonder correctie de deur uit.",
      get: [
        "Een groep van maximaal zes personen",
        "Zestig minuten persoonlijke begeleiding",
        "Techniekcorrectie per persoon, ook in de groep",
        "Metingen elke acht weken",
        "Vaste groepsmomenten met dezelfde trainer",
        "Een lager tarief dan individuele training",
      ],
      prices: [
        { name: "1x per week", amount: "€ 100", sub: "6 maanden, per 4 weken" },
        { name: "1x per week", amount: "€ 90", sub: "12 maanden, per 4 weken", featured: true },
        { name: "2x per week", amount: "€ 200", sub: "6 maanden, per 4 weken" },
        { name: "2x per week", amount: "€ 180", sub: "12 maanden, per 4 weken" },
      ],
      story: { name: "Youssef, 45", metrics: [["Traject", "8 maanden"], ["Frequentie", "2x per week"]], quote: "Ik dacht dat je in een groep vanzelf tussen wal en schip valt, maar met maximaal zes man wordt mijn techniek nog steeds elke keer bijgestuurd.", img: "assets/team-3.jpg" },
      faqs: [
        { q: "Kan ik het tempo van de groep bijhouden?", a: "Ja. Iedereen werkt op zijn eigen niveau, omdat de trainer de oefeningen per persoon aanpast en de belasting mee laat groeien met wat je aankan." },
        { q: "Hoe groot is de groep echt?", a: "Nooit groter dan zes personen. Dat is bewust, omdat we anders de tijd niet houden om je vorm bij te sturen." },
        { q: "Zijn de groepen op vaste tijden?", a: "Ja, je traint op vaste momenten. Zo bouw je ritme op en train je steeds met dezelfde trainer." },
      ],
    },

    "duo-personal-training": {
      name: "Duo Personal Training",
      img: "assets/offer-3.jpg",
      forWhom: "Samen met een partner, vriend of familielid op één schema, met dezelfde persoonlijke begeleiding als een individuele training tegen een lager tarief per persoon.",
      priceFrom: "€ 35 per persoon",
      situations: [
        "Je traint liever samen met iemand die je kent en die je scherp houdt.",
        "Je wilt de kosten van personal training delen zonder de begeleiding te verliezen.",
        "Jullie hebben een vergelijkbaar doel en willen op vaste momenten samen komen.",
        "Je vindt het prettig dat er iemand naast je staat op de momenten dat het zwaar wordt.",
      ],
      alt: { text: "Traint jouw partner liever niet mee? Dan is", href: "dienst.html?s=personal-training", label: "Personal Training", extra: "de logische keuze." },
      flow: "Jullie komen samen binnen en we bespreken kort hoe het herstel ging. Daarna trainen jullie op een gedeeld schema, waarbij de trainer per persoon de vorm corrigeert en de belasting aanpast. Zo werken jullie samen, maar wel elk op je eigen niveau.",
      get: [
        "Eén schema, afgestemd op jullie beide niveaus",
        "Techniekcorrectie per persoon",
        "Metingen elke acht weken",
        "Voedingsadvies op verzoek",
        "Contact tussen trainingen via de app",
        "Vaste momenten met dezelfde trainer",
      ],
      prices: [
        { name: "6 maanden", amount: "€ 130", sub: "per persoon, per 4 weken" },
        { name: "12 maanden", amount: "€ 120", sub: "per persoon, per 4 weken", featured: true },
        { name: "Losse les", amount: "€ 35", sub: "per persoon" },
      ],
      story: { name: "Mark en Lisa, 41 en 39", metrics: [["Traject", "4 maanden"], ["Frequentie", "2x per week"]], quote: "We wilden allebei fitter worden en dachten dat het samen makkelijker vol te houden zou zijn. Dat klopte, en het scheelt dat we elkaar op de vroege ochtenden uit bed bellen.", img: "assets/team-2.jpg" },
      faqs: [
        { q: "Moeten we hetzelfde niveau hebben?", a: "Nee. De trainer past de belasting per persoon aan, dus verschil in kracht of conditie is geen probleem." },
        { q: "Kan ik zelf een partner meenemen?", a: "Ja, je neemt je eigen duo-partner mee. Heb je die niet, dan kijken we of small group coaching beter past." },
        { q: "Wat als één van ons een keer niet kan?", a: "Dan train je die keer alleen of we verzetten in overleg. De afspraken hierover leggen we vooraf vast." },
      ],
    },

    "personal-training-aan-huis": {
      name: "Personal Training aan Huis",
      img: "assets/offer-4.jpg",
      forWhom: "Dezelfde begeleiding als in de studio, maar dan bij jou thuis. We komen naar je toe met het materiaal dat bij je doel past.",
      priceFrom: "€ 85 per les",
      situations: [
        "Je hebt een druk gezin of onregelmatige uren en verliest te veel tijd aan reizen.",
        "Je traint liever in je eigen omgeving dan in een studio.",
        "Je hebt thuis ruimte of een plek in de buurt waar we kunnen trainen.",
        "Je wilt begeleiding, maar de drempel om ergens naartoe te gaan is nu te hoog.",
      ],
      alt: { text: "Liever samen in een kleine groep trainen? Kijk dan naar", href: "dienst.html?s=small-group-training", label: "Small Group Coaching" },
      flow: "We komen op de afgesproken tijd bij je langs met het materiaal dat bij je schema past. Na een korte check trainen we in je woonkamer, tuin of een plek in de buurt, met dezelfde techniekcorrectie als in de studio. Jij hoeft alleen ruimte en sportkleding te regelen.",
      get: [
        "Een trainer die naar je toe komt",
        "Het benodigde materiaal, wij nemen het mee",
        "Een persoonlijk schema en techniekcorrectie",
        "Metingen elke acht weken",
        "Voedingsadvies op verzoek",
        "Vaste momenten met dezelfde trainer",
      ],
      prices: [
        { name: "6 maanden", amount: "€ 320", sub: "per 4 weken" },
        { name: "12 maanden", amount: "€ 300", sub: "per 4 weken", featured: true },
        { name: "Losse les", amount: "€ 85", sub: "per les" },
      ],
      story: { name: "Petra, 44", metrics: [["Traject", "5 maanden"], ["Frequentie", "1x per week"]], quote: "Met drie kinderen kwam ik simpelweg de deur niet uit voor de sportschool. Nu staat de trainer op donderdag in mijn tuin en is het gewoon niet meer over te slaan.", img: "assets/team-1.jpg" },
      faqs: [
        { q: "Hoeveel ruimte heb ik thuis nodig?", a: "Genoeg voor een matje en wat bewegingsruimte. In de intake kijken we samen of je woonkamer, tuin of een plek in de buurt geschikt is." },
        { q: "Komen er reiskosten bij?", a: "Binnen Spijkenisse en directe omgeving zijn die inbegrepen. Voor verder weg maken we vooraf een heldere afspraak." },
        { q: "Neem ik zelf materiaal mee?", a: "Nee, wij nemen het materiaal mee dat bij je schema past. Jij zorgt alleen voor sportkleding." },
      ],
    },
  };

  const params = new URLSearchParams(location.search);
  const slug = params.get("s") || "personal-training";
  const d = DATA[slug] || DATA["personal-training"];

  document.title = d.name + " — Maze Thales";

  const esc = (s) => String(s).replace(/</g, "&lt;");
  const el = (id) => document.getElementById(id);

  el("d-name").textContent = d.name;
  el("d-crumb").textContent = d.name;
  el("d-forwhom").textContent = d.forWhom;
  el("d-pricefrom").textContent = "Vanaf " + d.priceFrom;
  el("d-hero-img").src = d.img;
  el("d-hero-img").alt = d.name + " bij Maze Thales";

  el("d-situations").innerHTML = d.situations.map((s) => `<li>${esc(s)}</li>`).join("");
  el("d-alt").innerHTML = `${esc(d.alt.text)} <a class="link-underline" href="${d.alt.href}">${esc(d.alt.label)}</a>${d.alt.extra ? " " + esc(d.alt.extra) : ""}.`;

  el("d-flow").textContent = d.flow;
  el("d-flow-img").src = d.img;
  el("d-flow-img").alt = "Een training bij Maze Thales";

  // Icoon per "wat je krijgt"-punt, gekozen op basis van de tekst
  const pickIcon = (text) => {
    const t = text.toLowerCase();
    if (/schema|plan/.test(t)) return "schema";
    if (/techniek/.test(t)) return "techniek";
    if (/meting|meten/.test(t)) return "meetmomenten";
    if (/voeding/.test(t)) return "voeding";
    if (/app|whatsapp|contact/.test(t)) return "whatsapp";
    if (/groep|zes personen|maximaal|begeleiding/.test(t)) return "maximaal-zes";
    return "trainer-bij";
  };
  el("d-get").innerHTML = d.get
    .map(
      (g) =>
        `<li class="get-card"><img class="tile-icon" src="assets/icons/${pickIcon(g)}.svg" alt="" aria-hidden="true" /><p class="get-card__text">${esc(g)}</p></li>`
    )
    .join("");

  // Korte toggle-labels afgeleid uit de prijsgegevens (bijv. "6 mnd", "1x 12 mnd")
  const shortLabel = (f) => {
    if (/losse/i.test(f.name)) return "Losse les";
    const freq = /2x/.test(f.name) ? "2x " : /1x/.test(f.name) ? "1x " : "";
    const both = f.name + " " + f.sub;
    const term = /12/.test(both) ? "12 mnd" : /6/.test(both) ? "6 mnd" : f.name;
    return (freq + term).trim();
  };
  const checks = d.get.map((g) => `<li>${esc(g)}</li>`).join("");

  const dfreq = el("d-freq");
  dfreq.classList.add("pricing--toggle");
  dfreq.innerHTML = d.prices
    .map(
      (f, i) => `
      <div class="price-card glass${f.featured ? " price-card--featured" : ""}${i === 0 ? " is-active" : ""}" data-price="${i}">
        ${f.featured ? '<span class="price-card__tag">Beste keuze</span>' : ""}
        <p class="price-card__name">${esc(f.name)}</p>
        <div class="price-card__price"><span class="price-card__amount">${esc(f.amount)}</span></div>
        <p class="price-card__sub">${esc(f.sub)}</p>
        <ul class="price-card__list">${checks}</ul>
        <a class="btn btn--gold" href="gratis-intake.html">Plan gratis intake</a>
      </div>`
    )
    .join("");

  // Toggle ervoor (alleen zichtbaar op mobiel via CSS)
  const ptoggle = document.createElement("div");
  ptoggle.className = "price-toggle price-toggle--dienst";
  ptoggle.setAttribute("role", "tablist");
  ptoggle.setAttribute("aria-label", "Kies je optie");
  ptoggle.innerHTML = d.prices
    .map((f, i) => `<button class="price-toggle__btn${i === 0 ? " is-active" : ""}" type="button" data-price="${i}">${esc(shortLabel(f))}</button>`)
    .join("");
  dfreq.parentNode.insertBefore(ptoggle, dfreq);

  const pcards = Array.from(dfreq.children);
  const pbtns = Array.from(ptoggle.children);
  pbtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      const idx = btn.dataset.price;
      pcards.forEach((c) => c.classList.toggle("is-active", c.dataset.price === idx));
      pbtns.forEach((b) => b.classList.toggle("is-active", b === btn));
    })
  );

  // Reviews worden centraal gerenderd door reviews.js (echte Google-reviews)

  el("d-faqs").innerHTML = d.faqs
    .map(
      (f, i) => `
      <div class="accordion${i === 0 ? " is-open" : ""}">
        <button class="accordion__head" aria-expanded="${i === 0}">
          <span class="accordion__q">${esc(f.q)}</span>
          <span class="accordion__toggle" aria-hidden="true"></span>
        </button>
        <div class="accordion__panel"><p class="body-text body-text--dark">${esc(f.a)}</p></div>
      </div>`
    )
    .join("");

  // Actieve nav: markeer Diensten
  const dd = document.querySelector('.main-nav [data-nav="diensten"]');
  if (dd) dd.classList.add("is-active");
})();
