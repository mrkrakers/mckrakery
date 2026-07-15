const searchInput = document.querySelector("#search");
const cards = [...document.querySelectorAll(".tool-card")];
const chips = [...document.querySelectorAll(".chip")];
const navFilters = [...document.querySelectorAll(".nav-link")];
const resultCount = document.querySelector(".result-count");
const emptyState = document.querySelector(".empty-state");
const emptyButton = emptyState.querySelector("button");
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

let activeCategory = "all";

function filterCards() {
  const query = searchInput.value.trim().toLowerCase();
  let visible = 0;

  cards.forEach((card) => {
    const matchesCategory = activeCategory === "all" || card.dataset.category === activeCategory;
    const matchesSearch = card.dataset.name.toLowerCase().includes(query);
    const show = matchesCategory && matchesSearch;
    card.classList.toggle("filtered-out", !show);
    if (show) visible += 1;
  });

  resultCount.textContent = String(visible);
  emptyState.hidden = visible !== 0;
}

function setCategory(category) {
  activeCategory = category;
  chips.forEach((chip) => chip.classList.toggle("active", chip.dataset.filter === category));
  navFilters.forEach((link) => link.classList.toggle("active", link.dataset.category === category));
  filterCards();
  document.querySelector(".catalog").scrollIntoView({ behavior: "smooth", block: "start" });
}

chips.forEach((chip) => chip.addEventListener("click", () => setCategory(chip.dataset.filter)));
navFilters.forEach((link) => link.addEventListener("click", () => {
  setCategory(link.dataset.category);
  navLinks.classList.remove("open");
  menuButton.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}));

searchInput.addEventListener("input", filterCards);
emptyButton.addEventListener("click", () => {
  searchInput.value = "";
  setCategory("all");
  searchInput.focus();
});

menuButton.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuButton.classList.toggle("open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".navigation") && navLinks.classList.contains("open")) {
    navLinks.classList.remove("open");
    menuButton.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }
});

document.querySelectorAll('a[href="#"]').forEach((link) => link.addEventListener("click", (event) => event.preventDefault()));
