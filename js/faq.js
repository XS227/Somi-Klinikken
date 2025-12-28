(() => {
  const BOOKING_URL = (window.SOMI_CONFIG && window.SOMI_CONFIG.bookingUrl) || "/booking.html";
  const sections = Array.from(document.querySelectorAll("[data-faq-section]"));
  const chips = Array.from(document.querySelectorAll("[data-faq-chip]"));

  if (!sections.length) return;

  /* ---------- Utilities ---------- */
  const normalize = (s = "") => s.toLowerCase();

  function headerOffset() {
    const header = document.querySelector("[data-site-header]");
    if (!header) return 0;
    return Math.round(header.getBoundingClientRect().height + 10);
  }

  function smoothScrollTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset();
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  }

  function parseHashIntent() {
    const hash = decodeURIComponent(window.location.hash.replace("#", "")) || "";
    const [sectionId, queryPart] = hash.split("?");
    const params = new URLSearchParams(queryPart || "");
    const qa = params.get("qa");
    return { sectionId: sectionId || null, qa };
  }

  function setActiveChip(sectionId) {
    chips.forEach(chip => {
      const target = chip.getAttribute("href")?.replace("#", "");
      chip.classList.toggle("is-active", target === sectionId);
    });
  }

  /* ---------- FAQ navigation ---------- */
  function openQuestion(section, qaTerm) {
    const questions = Array.from(section.querySelectorAll("[data-faq-question]"));
    let match = questions.find(q => q.dataset.qaId === qaTerm);

    if (!match && qaTerm) {
      match = questions.find(q => normalize(q.dataset.keywords || "").includes(normalize(qaTerm)));
    }

    if (!match) match = questions[0];
    if (!match) return null;

    questions.forEach(q => { if (q !== match) q.open = false; });
    match.open = true;
    return match;
  }

  function handleIntent({ sectionId, qa, updateHash = false, scroll = true }) {
    if (!sectionId) return;
    const section = document.getElementById(sectionId);
    if (!section) return;

    const opened = openQuestion(section, qa);
    if (scroll) smoothScrollTo(sectionId);
    setActiveChip(sectionId);

    if (updateHash) {
      const hash = qa ? `#${sectionId}?qa=${qa}` : `#${sectionId}`;
      history.replaceState(null, "", hash);
    }

    if (opened && qa && scroll) {
      const top = opened.getBoundingClientRect().top + window.scrollY - headerOffset() - 6;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  }

  chips.forEach(chip => {
    chip.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = chip.getAttribute("href")?.replace("#", "");
      handleIntent({ sectionId, qa: null, updateHash: true });
    });
  });

  sections.forEach(section => {
    section.querySelectorAll("details[data-faq-question]").forEach(item => {
      item.addEventListener("toggle", () => {
        if (!item.open) return;
        sections
          .filter(other => other !== section)
          .forEach(other => other.querySelectorAll("details[data-faq-question]").forEach(d => d.open = false));

        const qaId = item.dataset.qaId;
        const hash = qaId ? `#${section.id}?qa=${qaId}` : `#${section.id}`;
        history.replaceState(null, "", hash);
        setActiveChip(section.id);
      });
    });
  });

  window.addEventListener("hashchange", () => {
    const intent = parseHashIntent();
    handleIntent({ ...intent, scroll: true });
  });

  const initialIntent = parseHashIntent();
  const defaultSection = initialIntent.sectionId || sections[0]?.id;
  handleIntent({ sectionId: defaultSection, qa: initialIntent.qa, scroll: false });

  /* ---------- Data extraction for chatbot ---------- */
  const faqData = sections.map(section => {
    const title = section.dataset.title || section.querySelector(".faq-section__title")?.textContent?.trim() || "";
    const description = section.dataset.description || section.querySelector(".faq-section__desc")?.textContent?.trim() || "";
    const questions = Array.from(section.querySelectorAll("[data-faq-question]")).map(q => {
      const summary = q.querySelector("summary")?.textContent?.trim() || "";
      const answer = q.querySelector("[data-answer-text]")?.textContent?.trim() || "";
      const qaId = q.dataset.qaId || "";
      return {
        id: qaId,
        question: summary,
        answer,
        keywords: (q.dataset.keywords || "").split(",").map(s => s.trim()).filter(Boolean),
        anchor: qaId ? `#${section.id}?qa=${qaId}` : `#${section.id}`
      };
    });
    return {
      id: section.id,
      title,
      description,
      keywords: (section.dataset.keywords || "").split(",").map(s => s.trim()).filter(Boolean),
      anchor: `#${section.id}`,
      questions
    };
  });

  const clinicFacts = {
    phone: "+47 929 39 171",
    email: "post@somiklinikken.no",
    address: "Langgata 31, 4306 Sandnes",
    opening: "Klinikken er åpen etter avtale."
  };

  const staffRules = [
    { name: "Katarina", role: "Eier og brynspesialist", keywords: ["microblading", "bryn", "permanent makeup", "pmu"], reason: "presise bryn og pigmentering" },
    { name: "Elina", role: "Autorisert sykepleier", keywords: ["injeksjon", "filler", "tox", "medisinsk"], reason: "medisinske/injeksjonsbehandlinger med trygghet" },
    { name: "Arianna", role: "Laserspesialist", keywords: ["laser", "pigment", "hårfjerning", "voks", "brynsløft"], reason: "laser og hårreduksjon samt bryn/vipper" },
    { name: "Emma", role: "Hudterapeut", keywords: ["hudpleie", "dermalogica", "peel", "ansiktsbehandling", "vipper"], reason: "hudpleie, Dermalogica og vipper/bryn" }
  ];

  function findStaff(message) {
    const msg = normalize(message);
    let best = null;
    let bestScore = 0;
    staffRules.forEach(staff => {
      const score = staff.keywords.reduce((acc, kw) => acc + (msg.includes(normalize(kw)) ? 1 : 0), 0);
      if (score > bestScore) {
        bestScore = score;
        best = staff;
      }
    });
    return bestScore > 0 ? best : null;
  }

  function findBestFaq(message) {
    const msg = normalize(message);
    let best = null;
    let bestScore = 0;
    faqData.forEach(section => {
      section.questions.forEach(q => {
        let score = 0;
        q.keywords.forEach(kw => { if (msg.includes(normalize(kw))) score += 2; });
        if (msg.includes(normalize(q.question))) score += 3;
        if (score > bestScore) {
          bestScore = score;
          best = { ...q, section };
        }
      });
    });
    return bestScore > 0 ? best : null;
  }

  function findSectionByMessage(message) {
    const msg = normalize(message);
    let best = null;
    let bestScore = 0;
    faqData.forEach(section => {
      let score = 0;
      section.keywords.forEach(kw => { if (msg.includes(normalize(kw))) score += 1; });
      if (score > bestScore) {
        bestScore = score;
        best = section;
      }
    });
    return bestScore > 0 ? best : null;
  }

  /* ---------- Chatbot ---------- */
  const widget = document.querySelector("[data-chatbot]");
  const log = widget?.querySelector("[data-chat-log]");
  const input = widget?.querySelector("[data-chat-input]");
  const sendBtn = widget?.querySelector("[data-chat-send]");
  const toggles = widget?.querySelectorAll("[data-chatbot-toggle]");
  const suggestWrap = widget?.querySelector("[data-chat-suggest]");

  if (!widget || !log || !input || !sendBtn) return;

  function appendBubble(text, isUser = false) {
    const div = document.createElement("div");
    div.className = "chatbot__bubble" + (isUser ? " is-user" : "");
    div.innerHTML = text;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  }

  function renderSuggestions(options = []) {
    suggestWrap.innerHTML = "";
    options.forEach(option => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chatbot__pill";
      btn.textContent = option.label;
      btn.addEventListener("click", () => handleUserMessage(option.message));
      suggestWrap.appendChild(btn);
    });
  }

  function makeBookingLine() {
    const external = /^https?:\/\//.test(BOOKING_URL) && !BOOKING_URL.startsWith(window.location.origin);
    const attrs = external ? ' target="_blank" rel="noopener"' : "";
    return `<a href="${BOOKING_URL}"${attrs}>Book time</a> eller ring ${clinicFacts.phone}.`;
  }

  function buildResponse(message) {
    const msg = normalize(message);
    const lines = [];
    const links = [];

    const bookingIntent = /book|bestill|endre|avbestill|time/.test(msg);
    const contactIntent = /kontakt|telefon|telefonnummer|adresse|åpni|open|åpen/.test(msg);
    const staff = findStaff(msg);
    const faq = findBestFaq(msg);
    const section = findSectionByMessage(msg);

    if (faq) {
      lines.push(`<strong>${faq.question}</strong><br>${faq.answer}`);
      links.push(`FAQ: <a href="${faq.anchor}">${faq.section.title}</a>`);
    } else if (section) {
      lines.push(`Jeg anbefaler FAQ-seksjonen <strong>${section.title}</strong> for detaljer om ${section.description.toLowerCase()}.`);
      links.push(`Åpne: <a href="${section.anchor}">${section.anchor}</a>`);
    }

    if (staff) {
      lines.push(`Anbefalt behandler: <strong>${staff.name}</strong> (${staff.role}) for ${staff.reason}.`);
    }

    if (contactIntent) {
      lines.push(`Kontakt oss på ${clinicFacts.phone} eller ${clinicFacts.email}. ${clinicFacts.opening}`);
    }

    if (bookingIntent) {
      lines.push(`Du kan endre eller bestille online. ${makeBookingLine()}`);
      links.push(`FAQ: <a href="#booking-betaling?qa=booking">Booking & betaling</a>`);
    }

    if (!lines.length) {
      lines.push(`Jeg er usikker på detaljer, men hjelper gjerne videre. ${makeBookingLine()}`);
    }

    return lines.concat(links).join("<br><br>");
  }

  function handleUserMessage(raw) {
    const text = raw.trim();
    if (!text) return;
    appendBubble(text, true);
    const response = buildResponse(text);
    appendBubble(response, false);
    input.value = "";
  }

  sendBtn.addEventListener("click", () => handleUserMessage(input.value));
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleUserMessage(input.value);
    }
  });

  toggles.forEach(btn => {
    btn.addEventListener("click", () => {
      widget.classList.toggle("is-open");
    });
  });

  appendBubble("Hei! Jeg er SOMI sin AI-chat. Jeg svarer kun med fakta fra FAQ, åpningstider og klinikkinfo. Hva lurer du på?");
  renderSuggestions([
    { label: "Varighet microblading", message: "Hvor lenge varer microblading?" },
    { label: "Etterbehandling PMU", message: "Kan jeg trene etter permanent makeup?" },
    { label: "Beste behandler på hud", message: "Hvem er best for hudpleie?" },
    { label: "Endre time", message: "Hvordan endrer jeg en time?" }
  ]);
})();
