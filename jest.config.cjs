/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom', // usa el entorno de navegador simulado
  // Para referenciar el módulo explícitamente:
  // testEnvironment: 'jest-environment-jsdom',
  transform: {},
  moduleFileExtensions: ['js', 'json'],
  roots: ['<rootDir>/tests']
};