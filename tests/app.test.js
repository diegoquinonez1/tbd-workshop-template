import { sumTwoNumbers, shouldShowFeature } from "../assets/app.js";

describe("sumTwoNumbers", () => {
  test("suma dos números válidos", () => {
    expect(sumTwoNumbers(2, 3)).toBe(5);
    expect(sumTwoNumbers("4", "6")).toBe(10);
  });

  test("lanza error si algún valor no es numérico", () => {
    expect(() => sumTwoNumbers("a", 2)).toThrow("Valores no numéricos");
    expect(() => sumTwoNumbers(1, "xyz")).toThrow("Valores no numéricos");
    expect(() => sumTwoNumbers("a", "b")).toThrow("Valores no numéricos");
  });
});

describe("shouldShowFeature", () => {
  test("devuelve true cuando el toggle está activo", () => {
    const features = { color_picker: true };
    expect(shouldShowFeature(features, "color_picker")).toBe(true);
  });

  test("devuelve false cuando el toggle está ausente o inactivo", () => {
    const features = { color_picker: false };
    expect(shouldShowFeature(features, "color_picker")).toBe(false);
    expect(shouldShowFeature({}, "color_picker")).toBe(false);
  });
});

describe("setupCalculator (DOM + JSDOM)", () => {
  beforeEach(() => {
    // Simulamos el HTML mínimo que necesita la calculadora
    document.body.innerHTML = `
      <section id="calculator-section">
        <input id="calc-a" type="number" />
        <input id="calc-b" type="number" />
        <button id="btn-sum">Sumar</button>
        <div id="calc-result"></div>
      </section>
    `;
    // Inicializamos la calculadora sobre este DOM
    setupCalculator();
  });

  test('muestra la suma correcta cuando se hace click en "Sumar"', () => {
    const inputA = document.getElementById("calc-a");
    const inputB = document.getElementById("calc-b");
    const btnSum = document.getElementById("btn-sum");
    const result = document.getElementById("calc-result");

    inputA.value = "5";
    inputB.value = "7";

    // Disparamos el click
    btnSum.click();

    expect(result.textContent).toBe("Resultado: 12");
  });

  test("muestra mensaje de error si los valores no son válidos", () => {
    const inputA = document.getElementById("calc-a");
    const inputB = document.getElementById("calc-b");
    const btnSum = document.getElementById("btn-sum");
    const result = document.getElementById("calc-result");

    inputA.value = "a";
    inputB.value = "2";

    btnSum.click();

    expect(result.textContent).toBe("Por favor ingresa números válidos.");
  });
});
