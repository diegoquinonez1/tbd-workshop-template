# Trunk‑Based Development (TBD) — Cheat Sheet

> **Objetivo:** integrar cambios pequeños y frecuentes a `main`, manteniéndola **siempre desplegable**.

---

## Tabla de contenido
- [0. Conceptos clave en este repo](#0-conceptos-clave-en-este-repo)
- [1. Flujo básico con ramas cortas](#1-flujo-básico-con-ramas-cortas)
- [2. Flujo aún más directo (sin ramas)](#2-flujo-aún-más-directo-sin-ramas)
- [3. Integración frecuente (punto clave de TBD)](#3-integración-frecuente-punto-clave-de-tbd)
- [4. Feature toggles](#4-feature-toggles)
- [5. CI (GitHub Actions) — cómo se dispara](#5-ci-github-actions--cómo-se-dispara)
- [6. Deploy estático (Render) — ligado a main (opcional)](#6-deploy-estático-render--ligado-a-main-opcional)

---

## 0. Conceptos clave en este repo

### Rama principal: `main`
- **Siempre desplegable**
- **CI en verde** (`npm test`) antes de merge

### Ramas de trabajo (cortas y opcionales)
**Formato:**
- `dev/<iniciales>/<tarea>`

**Duración:**
- Horas o a lo sumo **1–2 días**

### Pull Requests (PRs)
- Siempre **hacia `main`**
- Cambios **pequeños** y **revisables**
- CI **verde** antes de merge

### Feature toggles
- `config/features.json` controla flags (por ejemplo `color_picker`)

> [!TIP]
> Si el cambio es grande, intégralo en partes usando **feature toggles** para mantener `main` estable.

---

## 1. Flujo básico con ramas cortas

### 1.1 Crear y actualizar `main` local
```bash
git checkout main
git pull origin main
```

### 1.2 Crear una rama de trabajo corta
```bash
git checkout main
git pull origin main
git checkout -b dev/<iniciales>/<tarea>
```

**Ejemplos**
```bash
git checkout -b dev/dq/mejorar-estilos
git checkout -b dev/dq/color-picker
```

### 1.3 Probar en local (servidor estático)
```bash
npx serve .
# o
python -m http.server 8000
```

### 1.4 Ejecutar tests
```bash
npm install   # primera vez
npm test
```

### 1.5 Commit & push
```bash
git add .
git commit -m "feat: <descripción corta de la tarea>"
git push origin dev/<iniciales>/<tarea>
```

### 1.6 Pull Request a `main` (GitHub)

**Base:** `main`  
**Compare:** `dev/<iniciales>/<tarea>`

**Checklist antes de merge**
- [ ] CI (GitHub Actions) en verde
- [ ] Cambios revisados (diff limpio y pequeño)
- [ ] `main` queda desplegable

### 1.7 Borrar rama corta
```bash
# Local
git branch -d dev/<iniciales>/<tarea>

# Remoto
git push origin --delete dev/<iniciales>/<tarea>
```

---

## 2. Flujo aún más directo (sin ramas)

```bash
git checkout main
git pull origin main

# Cambios pequeños + tests
git add .
git commit -m "fix: corregir mensaje de error en calculadora"
git push origin main
```

---

## 3. Integración frecuente (punto clave de TBD)

**Mantén tu rama cerca de `main`.**  
Si tu rama dura horas y `main` avanza con otros merges, trae cambios para evitar conflictos grandes.

### Opción A: merge de `main` a tu rama
```bash
git checkout main
git pull origin main

git checkout dev/<iniciales>/<tarea>
git merge main

npm test
git push origin dev/<iniciales>/<tarea>
```

### Opción B: rebase (opcional, más avanzado)
```bash
git checkout dev/<iniciales>/<tarea>
git fetch origin
git rebase origin/main

npm test
git push --force-with-lease origin dev/<iniciales>/<tarea>
```

> **Regla de oro:** no dejes tu rama aislada muchos días. Integra con `main` con frecuencia.

---

## 4. Feature toggles

### 4.1 Revisar/editar `config/features.json`
```json
{
  "features_name": false
}
```

- `false` → la feature **no se muestra** (aunque el código esté en `main`)
- `true` → la feature **se activa**

### 4.2 Flujo típico con toggles

#### PR #1 — Integrar el código con toggle apagado
```bash
git checkout main
git pull origin main
git checkout -b dev/<iniciales>/feature_toggle

# ...cambios...
npm test
git add .
git commit -m "feat: agregar lógica base bajo toggle"
git push origin dev/<iniciales>/feature_toggle
```

✅ PR → `main` → CI verde → merge  
**Resultado:** el código vive en `main`, pero oculto.

#### PR #2 — “Lanzar” la feature (cambiar solo el toggle)
```bash
git checkout main
git pull origin main
git checkout -b dev/<iniciales>/feature_toggle_enabled

# editar config/features.json (solo el flag)
npm test
git add config/features.json
git commit -m "chore: activar feature en producción"
git push origin dev/<iniciales>/feature_toggle_enabled
```

✅ PR → `main` → CI verde → merge  
**Resultado:** el feature se vuelve visible en el deployment.

---

## 5. CI (GitHub Actions) — cómo se dispara

Ejemplo típico de `ci.yml`:
```yaml
on:
  push:
    branches: [ main, 'dev/**' ]
  pull_request:
    branches: [ main ]
```

### No necesitas comandos manuales
- Cada `git push` a `main` o `dev/**` dispara CI
- Cada PR hacia `main` dispara CI

**Tu flujo**
1) Push a tu rama:
```bash
git push origin dev/<iniciales>/<tarea>
```
2) GitHub corre CI  
3) Creas/actualizas PR → CI corre otra vez sobre el PR

---

## 6. Deploy estático (Render) — ligado a `main` (OPCIONAL)

### Producción (Render)
- Static Site en Render:
  - **Branch:** `main`
  - **Build Command:** opcional `npm test`
  - **Publish Directory:** `..`
  - **Auto-Deploy:** ON

### Cada merge a `main`
- Pasa por CI en GitHub
- Render detecta el nuevo commit
- (Opcional) ejecuta `npm test` como build
- Publica una nueva versión del sitio

> **Mensaje clave:** `main` es la fuente de verdad desplegable. TBD funciona bien porque hacemos cambios pequeños y frecuentes a `main`, siempre con tests y CI.
