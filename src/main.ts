const dropZone = document.getElementById("dropZone") as HTMLElement;

dropZone.addEventListener("dragover", (event) => {
  event.preventDefault(); // Necesario para permitir drop
  dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragover");
});

dropZone.addEventListener("drop", async (event) => {
  event.preventDefault();
  dropZone.classList.remove("dragover");

  const file = event.dataTransfer?.files[0];
  if (!file) return;

  const text = await file.text();
  console.log(text); // Aquí puedes llamar a tu función de análisis
});
