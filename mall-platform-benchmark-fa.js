const dialog = document.getElementById("zoom");
document.querySelectorAll(".picture").forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    const zoomImage = dialog.querySelector("img");
    zoomImage.src = image.src;
    zoomImage.alt = image.alt;
    dialog.showModal();
  });
});
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
document
  .getElementById("close-zoom")
  .addEventListener("click", () => dialog.close());
document
  .getElementById("print-page")
  .addEventListener("click", () => window.print());
