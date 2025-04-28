const form = document.getElementById("predict-form");
const dialogBox = document.getElementById("dialog-box");
const dialogMessage = document.getElementById("dialog-message");
const closeDialog = document.getElementById("close-dialog");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    brightness: parseFloat(form.brightness.value),
    bright_t31: parseFloat(form.bright_t31.value),
    frp: parseFloat(form.frp.value),
    latitude: parseFloat(form.latitude.value),
    longitude: parseFloat(form.longitude.value)
  };

  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const result = await response.json();
      dialogMessage.textContent = `🔥 Forest Fire Confidence: ${result.confidence.toFixed(2)}%`;
      dialogBox.style.display = "block";
    } else {
      dialogMessage.textContent = "❌ Prediction failed. Please try again.";
      dialogBox.style.display = "block";
    }
  } catch (error) {
    dialogMessage.textContent = "🚨 Network error or server unreachable.";
    dialogBox.style.display = "block";
  }
});

closeDialog.addEventListener("click", () => {
  dialogBox.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === dialogBox) {
    dialogBox.style.display = "none";
  }
});
