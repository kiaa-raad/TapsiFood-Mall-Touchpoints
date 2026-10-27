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

const copyStatus = document.getElementById("copy-status");
document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copy);
    const text = target.textContent;
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(text);
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(target);
      selection.removeAllRanges();
      selection.addRange(range);
      copyStatus.textContent =
        "متن انتخاب شد؛ برای کپی از Ctrl+C یا گزینه Copy استفاده کن.";
      return;
    }
    const originalLabel = button.textContent;
    button.textContent = "کپی شد";
    copyStatus.textContent = "پرامپت کپی شد.";
    window.setTimeout(() => {
      button.textContent = originalLabel;
    }, 1800);
  });
});
