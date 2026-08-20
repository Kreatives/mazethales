/* =========================================================
   Maze Thales — echte Google-reviews (genormaliseerd)
   Rendert member-cards in elke <... data-reviews> marquee-track,
   dubbel voor een naadloze loop, met om en om een donkerder kaart.
   ========================================================= */
(function () {
  "use strict";
  if (window.__mtReviewsRendered) return;
  window.__mtReviewsRendered = true;

  const REVIEWS = [
    { name: "Zelyn Mirano-Honingh", text: "Masih is ontzettend deskundig en betrokken bij wat hij doet. Elke sessie voelt persoonlijk en op mij afgestemd, nooit een standaardaanpak. Hij denkt echt met je mee en helpt je gezonder worden op een manier die bij je leven past. Voor mij een absolute aanrader." },
    { name: "Vinoth Kumar", text: "Masih is een topcoach die zijn techniek goed beheerst en me vanaf dag één op gang kreeg. Hij blijft mijn grenzen verleggen en helpt me mijn lichaam beter aan te sturen. Ik train met steeds meer plezier en merk dat mijn zelfvertrouwen met de week groeit." },
    { name: "Taqi Musavi", text: "Ik trainde al jaren op eigen houtje, maar kreeg last van mijn onderrug en schouders. Sinds ik bij Maze Thales begon heb ik enorm veel geleerd over techniek en rustige opbouw. De begeleiding is persoonlijk en mijn klachten zijn inmiddels merkbaar afgenomen." },
    { name: "Anis Rahim", text: "Op advies van mijn huisarts en fysio ging ik sporten en kwam ik bij Maze Thales terecht. Na een gratis proeftraining was ik meteen om. De tijd, rust, kennis en motivatie die Masih biedt zijn ongekend. Vier maanden verder voel ik me steeds beter en fitter worden." },
    { name: "A. S. H.", text: "Een kleine studio met precies de juiste apparatuur en de kennis van Masih, en daar gaat het uiteindelijk om. Na een gratis proeftraining voelde ik me al snel thuis. Hij biedt personal en small group training en stelt voedings en trainingsplannen volledig op maat op." },
    { name: "Naomi van Marion", text: "Ik train al een tijdje bij Maze Thales en vind het een fijne studio. Eén keer per week personal training is voor mij precies genoeg naast mijn volleybal. Masih houdt daar rekening mee en helpt me gericht met sprongkracht, zodat het goed aansluit bij mijn sport." },
    { name: "Edwin N.", text: "Na drie maanden trainen met Masih zie en voel ik echte vooruitgang. De begeleiding is persoonlijk, betrokken en professioneel en ik word continu uitgedaagd, maar altijd op mijn eigen tempo. Je hebt bovendien de hele gym voor jezelf, waardoor er geen afleiding of ruis is." },
    { name: "Shan Ratnayaka", text: "Bij Maze Thales krijg je een training op maat die echt resultaat oplevert. Masih combineert diepgaande kennis, motivatie en persoonlijke aandacht om je naar een hoger niveau te tillen. Of je nu wilt afvallen, spiermassa wilt opbouwen of fitter wilt worden, je verlaat elke sessie vol energie." },
    { name: "F. M.", text: "Fijn dat je eerst een intake en een gratis proefles krijgt om te kijken of het klikt. Professioneel, goede begeleiding en nette apparatuur. Masih geeft je echt energie om het beste uit je training te halen. Ik heb ook een voedingsschema laten opstellen, prijs en kwaliteit meer dan waard." },
    { name: "Shane A.", text: "Een ervaren trainer die let op de details en op de mind-muscle connectie. Daardoor voelt licht gewicht nog steeds zwaar en train je een stuk effectiever. De gym heeft een mooie uitstraling en je traint privé met persoonlijke één op één coaching. Zeker een aanrader." },
    { name: "Mohamed Umar", text: "Een superfijne studio met top personal training. Alles wordt afgestemd op je doelen, je energie en je niveau. Persoonlijke aandacht, motiverende begeleiding en altijd een goede sfeer. Een echte aanrader voor iedereen die serieus en met plezier aan zijn conditie wil werken." },
    { name: "Ansar Omarjar", text: "Goede en professionele begeleiding, precies wat je nodig hebt als je echt iets wilt bereiken. Masih let op de details en stemt alles af op jouw doelen en niveau. Ik ben in twee maanden tien kilo afgevallen en voel me sindsdien een stuk sterker en energieker." },
  ];

  const esc = (s) => String(s).replace(/</g, "&lt;");
  const initials = (n) =>
    n.replace(/[^A-Za-zÀ-ÿ ]/g, "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
  const STARS =
    '<div class="stars stars--gold" role="img" aria-label="5 sterren"><span></span><span></span><span></span><span></span><span></span></div>';

  const card = (r, i) => `
    <article class="member-card${i % 2 === 1 ? " member-card--alt" : ""}">
      <div class="member-card__head">
        <span class="member-avatar" aria-hidden="true">${initials(r.name)}</span>
        <div>
          <p class="member-card__name">${esc(r.name)}</p>
        </div>
      </div>
      <p class="member-card__text">${esc(r.text)}</p>
      ${STARS}
    </article>`;

  const html = REVIEWS.map(card).join("");
  const dupe = html.replace(/<article /g, '<article aria-hidden="true" ');

  document.querySelectorAll("[data-reviews]").forEach((track) => {
    track.innerHTML = html + dupe;
    // Rustige, constante snelheid (~28px/s) ongeacht kaartbreedte of scherm
    requestAnimationFrame(() => {
      const half = track.scrollWidth / 2;
      if (half > 0) track.style.animationDuration = Math.round(half / 28) + "s";
    });
  });
})();
