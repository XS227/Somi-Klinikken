(() => {
  const DATA_URL = "/data/treatments.json";
  const BOOKING_URL = "https://somi.bestille.no/";

  const defaults = {
    microblading: {
      benefits: [
        "Personlig tilpasning av form og farge for naturlig resultat.",
        "Grundig konsultasjon med mulighet for spørsmål før start.",
        "Trygge verktøy og sterile engangsutstyr for å ivareta hygiene."
      ],
      prep: [
        "Unngå blodfortynnende og alkohol siste 24 timer.",
        "Møt uten sminke på brynene for best mulig kartlegging.",
        "Gi beskjed dersom du har nylige hudbehandlinger eller medisiner."
      ],
      after: [
        "Hold området rent og unngå svette, solarium og badstu første dagene.",
        "Ikke plukk i skorpene – la huden gro naturlig.",
        "Bruk anbefalt salve og solfaktor for å bevare resultatet."
      ]
    },
    "bryn-vipper": {
      benefits: [
        "Ryddige bryn og vipper som fremhever øynene dine.",
        "Skånsomme produkter tilpasset hår og hudtype.",
        "Rask behandling med umiddelbar effekt."],
      prep: [
        "Møt uten øyesminke om mulig.",
        "Unngå selvbruning rundt øyne/bryn samme dag.",
        "Gi beskjed om allergier eller om du tidligere har reagert på farge."],
      after: [
        "Unngå vann, damp og oljebaserte produkter første 24 timene.",
        "Børst bryn/vipper forsiktig for å beholde formen.",
        "Bestill vedlikeholdstime etter anbefalt intervall."],
    },
    dermalogica: {
      benefits: [
        "Tilpasset hudtype og mål, med profesjonelle Dermalogica-produkter.",
        "Veiledning fra hudterapeut med personlig produktanbefaling.",
        "Rolig behandling som kombinerer rens, peeling og målrettet pleie."],
      prep: [
        "Unngå sterke hjemmebehandlinger (retinol/AHA/BHA) 48 timer før.",
        "Kom uten tung sminke slik at analysen blir presis.",
        "Informer om medisiner, graviditet/amming og hudreaksjoner."],
      after: [
        "Bruk solfaktor daglig de første dagene etter behandling.",
        "Vent med egenpeeling og retinol i minst 48 timer.",
        "Følg hudterapeutens anbefalinger for hjemmepleie."],
    },
    hudpleie: {
      benefits: [
        "Hudfornyelse med aktive ingredienser og behagelige protokoller.",
        "Kombinasjon av rens, peel og pleie gir rask glød.",
        "Tydelige råd om hvordan du holder resultatet ved like."],
      prep: [
        "Unngå soling og selvbruning rett før behandlingen.",
        "Pause retinol/eksfolierende produkter 2 døgn i forkant.",
        "Informer om medisiner, hudsykdommer og tidligere reaksjoner."],
      after: [
        "Bruk solfaktor og unngå direkte sol første dagene.",
        "Hold huden godt fuktet og vent med sterke produkter 2–3 døgn.",
        "Ta kontakt dersom du opplever uventede reaksjoner."],
    }
  };

  function findTreatment(id, data){
    for(const cat of data.categories || []){
      const item = (cat.items || []).find(it => it.id === id);
      if(item) return { item, category: cat };
    }
    return null;
  }

  function setText(selector, text){
    const el = document.querySelector(selector);
    if(el) el.textContent = text;
  }

  function fillList(el, items){
    if(!el) return;
    el.innerHTML = (items || []).map(t => `<li>${t}</li>`).join("");
  }

  function render(treatment){
    const { item, category } = treatment;
    setText("[data-field='title']", item.name);
    setText("[data-field='lead']", item.short || "");

    setText("[data-field='price']", item.price || "");
    setText("[data-field='duration']", item.duration || "");
    setText("[data-field='category']", category.title || "");

    const tagsWrap = document.querySelector("[data-field='tags']");
    if(tagsWrap){
      const badges = [];
      if(item.popular) badges.push('<span class="pill">Populær</span>');
      (item.tags || []).forEach(tag => badges.push(`<span class="pill">${tag}</span>`));
      tagsWrap.innerHTML = badges.join("");
    }

    const def = defaults[category.id] || { benefits: [], prep: [], after: [] };
    fillList(document.querySelector("[data-list='benefits']"), def.benefits);
    fillList(document.querySelector("[data-list='prep']"), def.prep);
    fillList(document.querySelector("[data-list='aftercare']"), def.after);

    document.querySelectorAll("[data-booking-link]").forEach(a => {
      a.setAttribute("href", BOOKING_URL);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });

    const backLink = document.querySelector("[data-back-link]");
    if(backLink) backLink.setAttribute("href", `/behandlinger.html#${category.id}`);
  }

  function showError(){
    const wrap = document.querySelector("[data-treatment-page]");
    if(!wrap) return;
    wrap.innerHTML = `<div class="section-card">Fant ikke behandlingen. Gå tilbake til <a href="/behandlinger.html">oversikten</a>.</div>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("[data-treatment-page]");
    if(!root) return;
    const id = root.getAttribute("data-treatment-id");
    if(!id) return;

    fetch(DATA_URL, { cache: "no-store" })
      .then(r => r.json())
      .then(data => {
        const match = findTreatment(id, data);
        if(!match) {
          showError();
          return;
        }
        render(match);
      })
      .catch(() => showError());
  });
})();
