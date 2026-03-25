// --- Gestión de feature toggles ---

let features = {}; // se llenará tras el fetch

async function loadFeatureToggles() {
  try {
    const response = await fetch("config/features.json", {
      cache: "no-store", // ayuda a ver cambios durante desarrollo
    });

    if (!response.ok) {
      console.error(
        "No se pudieron cargar los feature toggles:",
        response.status,
      );
      features = {}; // por defecto, todo desactivado
      return;
    }

    features = await response.json();
    console.log("Feature toggles cargados:", features);
  } catch (error) {
    console.error("Error cargando feature toggles:", error);
    features = {}; // fallback seguro
  }
}

function isFeatureEnabled(featureName) {
  return features[featureName] === true;
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

    if (Number.isNaN(a) || Number.isNaN(b)) {
      result.textContent = "Por favor ingresa números válidos.";
      return;
    }

    const sum = a + b;
    result.textContent = `Resultado: ${sum}`;
  });
}

// --- Color picker (controlado por toggle) ---

function setupColorPicker() {
  const section = document.getElementById("color-picker-section");

  if (!isFeatureEnabled("color_picker")) {
    // Funcionalidad desactivada: ocultamos la sección y salimos
    section.classList.add("hidden");
    return;
  }

  // Funcionalidad activada: mostramos la sección y conectamos eventos
  section.classList.remove("hidden");

  const input = document.getElementById("color-input");
  const preview = document.getElementById("color-preview");

  input.addEventListener("input", () => {
    const color = input.value;
    preview.style.backgroundColor = color;
  });
}

// --- Inicialización de la app ---

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Siempre inicializamos la calculadora
  setupCalculator();

  // 2. Cargamos toggles desde features.json
  await loadFeatureToggles();

  // 3. Configuramos la UI del color picker en función de los toggles
  setupColorPicker();
});
