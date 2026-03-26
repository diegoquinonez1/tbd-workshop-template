// --- Gestión de feature toggles ---

export function shouldShowFeature(features, featureName) {
  return features[featureName] === true;
}

let features = {}; // se llenará tras el fetch

async function loadFeatureToggles() {
  try {
    const response = await fetch('config/features.json', {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(
        'No se pudieron cargar los feature toggles:',
        response.status,
      );
      features = {};
      return;
    }

    features = await response.json();
    console.log('Feature toggles cargados:', features);
  } catch (error) {
    console.error('Error cargando feature toggles:', error);
    features = {};
  }
}

function isFeatureEnabled(featureName) {
  return shouldShowFeature(features, featureName);
}

// --- Calculadora básica ---

export function sumTwoNumbers(a, b) {
  const numA = Number(a);
  const numB = Number(b);

  if (Number.isNaN(numA) || Number.isNaN(numB)) {
    throw new Error('Valores no numéricos');
  }

  return numA + numB;
}

export function setupCalculator() {
  const inputA = document.getElementById('calc-a');
  const inputB = document.getElementById('calc-b');
  const btnSum = document.getElementById('btn-sum');
  const result = document.getElementById('calc-result');

  btnSum.addEventListener('click', () => {
    try {
      const sum = sumTwoNumbers(inputA.valueAsNumber, inputB.valueAsNumber);
      result.textContent = `Resultado: ${sum}`;
    } catch (e) {
      result.textContent = 'Por favor ingresa números válidos.';
    }
  });
}

// --- Color picker (controlado por toggle) ---

function setupColorPicker() {
  const section = document.getElementById('color-picker-section');

  if (!isFeatureEnabled('color_picker')) {
    section.classList.add('hidden');
    return;
  }

  section.classList.remove('hidden');

  const input = document.getElementById('color-input');
  const preview = document.getElementById('color-preview');

  input.addEventListener('input', () => {
    const color = input.value;
    preview.style.backgroundColor = color;
  });
}

// --- Inicialización de la app ---

// Solo ejecutamos la inicialización en entornos con DOM disponible
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', async () => {
    setupCalculator();
    await loadFeatureToggles();
    setupColorPicker();
  });
}