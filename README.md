# Trunk-Based Development Workshop Template

Guía completa, pensada como base para un taller práctico de desarrolladores sobre Trunk-Based Development (TBD) usando Git + GitHub y herramientas open source para CI, tests y despliegue.

Este repositorio es la base para un taller práctico de **Trunk-Based Development (TBD)** usando:

- Git y GitHub
- Feature toggles (banderas de funcionalidad)
- HTML, CSS y JavaScript (sin frameworks)
- Opcional: GitHub Actions para CI

La idea es que el código sea lo más simple y universal posible para cualquier desarrollador, sin importar su lenguaje principal.

---

## 1. Objetivo del taller

Al finalizar el taller, deberías ser capaz de:

- Entender los principios básicos de **Trunk-Based Development**.
- Trabajar con:
  - Una **rama principal (`main`)** siempre desplegable.
  - **Ramas cortas** de vida muy breve (horas / 1–2 días).
  - **Pull Requests pequeños** e integraciones frecuentes.
- Usar **feature toggles** para integrar código incompleto sin romper `main`.
- Ver cómo un cambio de configuración (features.json) puede “encender” o “apagar” funcionalidades.

---

## 2. Descripción de la mini app

Este repo contiene una mini aplicación web muy simple:

1. **Calculadora básica**  
   - Permite sumar dos números.  
   - Siempre visible para todos los usuarios.

2. **Color picker (nueva funcionalidad)**  
   - Permite elegir un color y ver una vista previa.  
   - Está **controlada por un feature toggle** (`color_picker`) definido en `config/features.json`.

Estructura de archivos:

```text
index.html           # Estructura de la página (HTML)
styles.css           # Estilos básicos (CSS)
app.js               # Lógica de la calculadora y del color picker (JS)
config/features.json # Definición de feature toggles
```

---

## 3. Checklist final de Trunk-Based Development

Todos los días deberíamos poder responder “sí” a:

- [x] ¿main está desplegable y con tests verdes?  
- [ ] ¿Mis cambios de hoy se integran (o se integraron) a main?  
- [ ] ¿He evitado ramas que vivan más de 1–2 días?  
- [ ] ¿He dividido la tarea en pasos pequeños?  
- [ ] ¿Cualquier funcionalidad incompleta está protegida por un feature toggle?  
- [ ] ¿No he fusionado nada a main saltándome CI?  
- [ ] ¿He borrado mis ramas una vez fusionadas?  

