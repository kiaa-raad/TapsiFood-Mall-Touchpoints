const tabs = [...document.querySelectorAll("[data-view]")];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];
const filters = [...document.querySelectorAll("[data-filter]")];
const researchCards = [...document.querySelectorAll(".research-card")];
const countLabel = document.getElementById("research-count");

function setView(view, updateUrl = true) {
  const selected = view === "research" ? "research" : "designs";
  tabs.forEach((tab) => {
    const active = tab.dataset.view === selected;
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  panels.forEach((panel) => {
    panel.hidden = panel.id !== selected;
  });
  if (updateUrl) history.replaceState(null, "", "#" + selected);
}
tabs.forEach((tab) => {
  tab.addEventListener("click", () => setView(tab.dataset.view));
  tab.addEventListener("keydown", (event) => {
    let next;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight")
      next = tabs.find((item) => item !== tab);
    if (event.key === "Home") next = tabs[0];
    if (event.key === "End") next = tabs[tabs.length - 1];
    if (!next) return;
    event.preventDefault();
    setView(next.dataset.view);
    next.focus();
  });
});
window.addEventListener("hashchange", () => {
  if (location.hash === "#research" || location.hash === "#designs")
    setView(location.hash.slice(1), false);
});
document
  .querySelector(".brand")
  .addEventListener("click", () => setView("designs"));
filters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filters.forEach((item) =>
      item.setAttribute("aria-pressed", String(item === button)),
    );
    researchCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
    countLabel.textContent =
      researchCards
        .filter((card) => !card.hidden)
        .length.toLocaleString("fa-IR") + " نمونه";
  });
});
setView(location.hash === "#research" ? "research" : "designs", false);

const dialog = document.getElementById("zoom");
const zoomImage = dialog.querySelector(".lightbox-image img");
const zoomTitle = document.getElementById("zoom-title");
const imagePosition = document.getElementById("image-position");
let imageGroup = [];
let imageIndex = 0;
let imageOpener = null;

function showImage(index) {
  imageIndex = (index + imageGroup.length) % imageGroup.length;
  const button = imageGroup[imageIndex];
  const image = button.querySelector("img");
  zoomImage.src = image.src;
  zoomImage.alt = image.alt;
  zoomTitle.textContent = button.dataset.title;
  imagePosition.textContent =
    (imageIndex + 1).toLocaleString("fa-IR") +
    " / " +
    imageGroup.length.toLocaleString("fa-IR");
}
document.querySelectorAll(".image-button").forEach((button) => {
  button.addEventListener("click", () => {
    const panel = button.closest(".gallery-panel");
    imageGroup = [...panel.querySelectorAll(".image-button")].filter(
      (item) => !item.closest("[hidden]"),
    );
    imageOpener = button;
    showImage(imageGroup.indexOf(button));
    dialog.showModal();
    document.body.classList.add("modal-open");
  });
});
document
  .getElementById("close-zoom")
  .addEventListener("click", () => dialog.close());
document
  .getElementById("next-image")
  .addEventListener("click", () => showImage(imageIndex + 1));
document
  .getElementById("previous-image")
  .addEventListener("click", () => showImage(imageIndex - 1));
dialog.addEventListener("click", (event) => {
  const bounds = dialog.getBoundingClientRect();
  if (
    event.target === dialog &&
    (event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom)
  )
    dialog.close();
});
dialog.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    showImage(imageIndex + 1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    showImage(imageIndex - 1);
  }
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
  imageOpener?.focus();
});
document
  .getElementById("print-page")
  .addEventListener("click", () => window.print());
