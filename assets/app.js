// Cargar toggles (en un entorno real sería via fetch o build; aquí lo simulamos)
const features = {
  color_picker: false, // este valor se sincroniza con features.json manualmente en el ejemplo
};

function isFeatureEnabled(name) {
  return !!features[name];
}

// --- Calculadora básica ---

function setupCalculator() {
  const inputA = document.getElementById("calc-a");
  const inputB = document.getElementById("calc-b");
  const btnSum = document.getElementById("btn-sum");
  const result = document.getElementById("calc-result");

  btnSum.addEventListener("click", () => {
    const a = Number(inputA.value);
    const b = Number(inputB.value);
    const sum = a + b;
    result.textContent = `Resultado: ${sum}`;
  });
}

// --- Color picker (feature toggle) ---

function setupColorPicker() {
  const section = document.getElementById("color-picker-section");

  if (!isFeatureEnabled("color_picker")) {
    // Si la funcionalidad está desactivada, ocultamos la sección y no hacemos nada más
    section.classList.add("hidden");
    return;
  }

  // Si está activada, mostramos la sección y conectamos la lógica
  section.classList.remove("hidden");

  const input = document.getElementById("color-input");
  const preview = document.getElementById("color-preview");

  input.addEventListener("input", () => {
    const color = input.value;
    preview.style.backgroundColor = color;
  });
}

// --- Inicialización ---

document.addEventListener("DOMContentLoaded", () => {
  setupCalculator();
  setupColorPicker();
});
