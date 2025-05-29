const fileInput = document.getElementById("fileInput") as HTMLInputElement;

fileInput.addEventListener("change", async () => {
  const file = fileInput.files?.[0];
  if (!file) return;

  const text = await file.text();
  console.log(text)
});

