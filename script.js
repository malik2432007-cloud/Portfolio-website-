// ---------- Theme Toggle (Light Editorial / Dark Emerald) ----------
const themeBtn = document.getElementById("themeToggle");
const rootEl = document.documentElement;

function applyTheme(theme) {
  rootEl.setAttribute("data-theme", theme);
  if (themeBtn) {
    themeBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    themeBtn.innerHTML =
      theme === "dark"
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
  }
  try {
    localStorage.setItem("am_theme", theme);
  } catch (e) {}
}

let savedTheme = "light";
try {
  savedTheme = localStorage.getItem("am_theme") || "light";
} catch (e) {}
applyTheme(savedTheme);

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const next = rootEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
  });
}

// ---------- Smooth Role Rotator ----------
const roleList = [
  "BCA 3rd Year Student",
  "Frontend Web Developer",
  "Python Problem Solver",
  "Web Developer Intern"
];
const roleBadge = document.getElementById("roleRotator");
let roleIdx = 0;

if (roleBadge) {
  setInterval(() => {
    roleBadge.classList.add("fade");
    setTimeout(() => {
      roleIdx = (roleIdx + 1) % roleList.length;
      roleBadge.textContent = roleList[roleIdx];
      roleBadge.classList.remove("fade");
    }, 240);
  }, 2600);
}

// ---------- Interactive Hero Terminal Tabs ----------
const termData = {
  profile: {
    cmd: "$ cat abdul_malik.json",
    lines: [
      '{',
      '  <span class="term-key">"name"</span>: <span class="term-val">"Abdul Malik"</span>,',
      '  <span class="term-key">"program"</span>: <span class="term-val">"BCA — 3rd Year"</span>,',
      '  <span class="term-key">"university"</span>: <span class="term-val">"MUIT"</span>,',
      '  <span class="term-key">"focus"</span>: <span class="term-val">"Clean Web Apps &amp; Python"</span>',
      '}'
    ]
  },
  stack: {
    cmd: "$ ls ./core-skills",
    lines: [
      '<span class="term-key">frontend/</span>   HTML5  CSS3  JavaScript',
      '<span class="term-key">backend/</span>    Python  SQL  OOP',
      '<span class="term-key">workflow/</span>   Git  GitHub  Responsive UI',
      '<span class="term-dim"># Always learning &amp; shipping projects</span>'
    ]
  },
  status: {
    cmd: "$ git status --short",
    lines: [
      '<span class="term-key">role</span>     web developer intern',
      '<span class="term-key">state</span>    open to collaborations',
      '<span class="term-key">goal</span>     building practical software',
      '<span class="term-dim"># Ready for new challenges</span>'
    ]
  }
};

const termBody = document.getElementById("terminalBody");
const termTabs = document.querySelectorAll(".term-tab");

function renderTerminal(key) {
  const entry = termData[key];
  if (!entry || !termBody) return;
  termBody.innerHTML =
    '<div class="term-cmd">' + entry.cmd + "</div>" +
    entry.lines.map((line) => "<div>" + line + "</div>").join("");
}

termTabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    termTabs.forEach((t) => t.classList.remove("active"));
    btn.classList.add("active");
    renderTerminal(btn.dataset.tab);
  });
});
renderTerminal("profile");

// ---------- Mobile Menu ----------
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ---------- Scroll Progress, Sticky Nav, Active Link, Back to Top ----------
const scrollBar = document.getElementById("scrollBar");
const topbar = document.getElementById("topbar");
const backTop = document.getElementById("backTop");
const sections = document.querySelectorAll("main section");
const navAnchors = document.querySelectorAll("#navLinks a");

function handleScroll() {
  const y = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollBar) {
    scrollBar.style.width = (maxScroll > 0 ? (y / maxScroll) * 100 : 0) + "%";
  }
  if (topbar) topbar.classList.toggle("scrolled", y > 18);
  if (backTop) backTop.classList.toggle("show", y > 480);

  let activeId = "home";
  sections.forEach((sec) => {
    if (y >= sec.offsetTop - 150) activeId = sec.id;
  });
  navAnchors.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + activeId);
  });
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

if (backTop) {
  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ---------- Skill Category Filter ----------
const skillFilters = document.querySelectorAll("[data-skill-filter]");
const skillCards = document.querySelectorAll(".skill-card");

skillFilters.forEach((btn) => {
  btn.addEventListener("click", () => {
    skillFilters.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.skillFilter;
    skillCards.forEach((card) => {
      const match = cat === "all" || card.dataset.category === cat;
      card.classList.toggle("hidden", !match);
    });
  });
});

// ---------- Project Category Filter ----------
const projectFilters = document.querySelectorAll("[data-project-filter]");
const projectCards = document.querySelectorAll(".project-card");

projectFilters.forEach((btn) => {
  btn.addEventListener("click", () => {
    projectFilters.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.projectFilter;
    projectCards.forEach((card) => {
      const match = cat === "all" || card.dataset.category === cat;
      card.classList.toggle("hidden", !match);
    });
  });
});

// ---------- Toast Helper ----------
const toastEl = document.getElementById("toast");
let toastTimer = null;

function showToast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 3000);
}

// ---------- Copy Email Button ----------
const copyEmailBtn = document.getElementById("copyEmailBtn");
if (copyEmailBtn) {
  copyEmailBtn.addEventListener("click", () => {
    const email = copyEmailBtn.dataset.copy || "abdul.malik@example.com";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(
        () => showToast("Copied email: " + email),
        () => fallbackCopy(email)
      );
    } else {
      fallbackCopy(email);
    }
  });
}

function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
    showToast("Copied email: " + text);
  } catch (e) {
    showToast("Email: " + text);
  }
  document.body.removeChild(ta);
}

// ---------- Contact Form Handler ----------
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    const action = contactForm.getAttribute("action") || "";
    if (action.includes("YOUR_FORM_ID")) {
      e.preventDefault();
      const sender = (contactForm.querySelector('[name="name"]') || {}).value || "there";
      showToast("Thanks, " + sender + "! Replace YOUR_FORM_ID in index.html to enable live form delivery.");
      contactForm.reset();
    }
  });
}

// ---------- Scroll Reveal, Skill Bars & Stat Counters ----------
const revealItems = document.querySelectorAll(".reveal");

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  if (isNaN(target)) return;
  let current = 0;
  const suffix = el.dataset.suffix || "";
  el.textContent = "0" + suffix;
  const stepMs = Math.max(40, Math.floor(600 / Math.max(target, 1)));
  const timer = setInterval(() => {
    current++;
    el.textContent = current + suffix;
    if (current >= target) clearInterval(timer);
  }, stepMs);
}

function revealSection(sec) {
  sec.classList.add("visible");
  sec.querySelectorAll(".skill-fill").forEach((bar) => {
    bar.style.width = (bar.dataset.level || "0") + "%";
  });
  sec.querySelectorAll("[data-count]").forEach(animateCounter);
}

if ("IntersectionObserver" in window) {
  document.documentElement.classList.add("js");
  document.querySelectorAll(".skill-fill").forEach((b) => (b.style.width = "0%"));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealSection(entry.target);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.08 }
  );

  revealItems.forEach((el) => io.observe(el));

  setTimeout(() => {
    revealItems.forEach((el) => {
      if (!el.classList.contains("visible")) revealSection(el);
    });
  }, 2400);
} else {
  revealItems.forEach(revealSection);
}

