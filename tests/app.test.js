import { sumTwoNumbers, shouldShowFeature } from '../assets/app.js';

describe('sumTwoNumbers', () => {
  test('suma dos números válidos', () => {
    expect(sumTwoNumbers(2, 3)).toBe(5);
    expect(sumTwoNumbers('4', '6')).toBe(10);
  });

  test('lanza error si algún valor no es numérico', () => {
    expect(() => sumTwoNumbers('a', 2)).toThrow('Valores no numéricos');
    expect(() => sumTwoNumbers(1, 'xyz')).toThrow('Valores no numéricos');
    expect(() => sumTwoNumbers('a', 'b')).toThrow('Valores no numéricos');
  });
});

describe('shouldShowFeature', () => {
  test('devuelve true cuando el toggle está activo', () => {
    const features = { color_picker: true };
    expect(shouldShowFeature(features, 'color_picker')).toBe(true);
  });

  test('devuelve false cuando el toggle está ausente o inactivo', () => {
    const features = { color_picker: false };
    expect(shouldShowFeature(features, 'color_picker')).toBe(false);
    expect(shouldShowFeature({}, 'color_picker')).toBe(false);
  });
});