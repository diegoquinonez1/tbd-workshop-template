# Trunk‑Based Development Cheat Sheet

## 0. Conceptos clave en este repo
- Rama principal: main
  - Siempre desplegable.
  - CI debe estar verde (npm test) antes de mergear.
- Ramas de trabajo: cortas, opcionales:
  - dev/\<iniciales\>/\<tarea\>
  - Viven horas o a lo sumo 1–2 días.
- Pull Requests:
  - Siempre hacia main.
  - Cambios pequeños, revisables, con CI verde.
- Feature toggles:
  - config/features.json controla, por ejemplo, color_picker.

---

## 1. Flujo básico con ramas cortas
### Crear y actualizar main local
git checkout main   
git pull origin main
### Crear una rama de trabajo corta
git checkout main   
git pull origin main    
git checkout -b dev/\<iniciales\>/\<tarea\>     
\# Ejemplos:    
\# git checkout -b dev/dq/mejorar-estilos   
\# git checkout -b dev/dq/color-picker
### Probar en local (servidor estático)  
npx serve . 
\# o    
python -m http.server 8000
### Ejecutar tests   
npm install    # primera vez    
npm test
### Commit & push
git add .   
git commit -m "feat: \<descripción corta de la tarea\>"   
git push origin dev/\<iniciales\>/\<tarea\>
### Pull Request a main (GitHub)
Base: main  
Compare: dev/\<iniciales\>/\<tarea\>    
Pasos:
- Verificar que el workflow de CI (GitHub Actions) está en verde.     
- Revisar cambios.    
- Merge a main.
### Borrar rama corta
\# Local    
git branch -d dev/\<iniciales\>/\<tarea\>   
\# Remoto   
git push origin --delete dev/\<iniciales\>/\<tarea\>

---

## 2. Flujo aún más directo (sin ramas)
git checkout main   
git pull origin main    
### Cambios pequeños + npm test
git add .
git commit -m "fix: corregir mensaje de error en calculadora"
git push origin main

---

## 3. Integración frecuente (punto clave de TBD)
Mantener tu rama cerca de main  
Si tu rama corta dura unas horas y main avanza con otros merges, trae cambios de main a tu rama para evitar desalineaciones grandes:    
git checkout main   
git pull origin main    
git checkout dev/\<iniciales\>/\<tarea\>    
git merge main
### Resolver conflictos si los hay
npm test    
git push origin dev/\<iniciales\>/\<tarea\>     
### O si usas rebase (opcional, más avanzado):  
git checkout dev/\<iniciales\>/\<tarea\>    
git fetch origin    
git rebase origin/main  
npm test    
git push --force-with-lease origin dev/\<iniciales\>/\<tarea\>  
### Mensaje clave:
“No dejes tu rama aislada muchos días. Integra con main con frecuencia para que los conflictos sean pequeños.”

---

## 4. Feature toggles
Revisar/editar config/features.json 
{   
  "features_name": false     
}   
- false → el feature toggle no se muestra (aunque el código esté en main).
- true → el feature toggle se activa.
### Flujo típico con toggles
Primera PR: integrar el código del feature apagado  
Rama: dev/\<iniciales\>/feature_toggle.     
git checkout main   
git pull origin main    
git checkout -b dev/dq/feature_toggle
### cambios...
npm test    
git add .   
git commit -m "feat: agregar lógica base bajo toggle"   
git push origin dev/dq/feature_toggle   
PR → main, CI verde → merge.    
Resultado: el código vive en main, pero oculto.
### Segunda PR: “lanzar” la feature cambiando solo el toggle
Rama: dev/\<iniciales\>/feature_toggle_enabled.
### Cambios:
Solo config/features.json → "features_name": true.  
git checkout main   
git pull origin main    
git checkout -b dev/dq/feature_toggle_enabled  
### editar config/features.json
npm test    
git add config/features.json    
git commit -m "chore: activar feature en producción"    
git push origin dev/dq/feature_toggle_enabled    
PR → main → CI → merge.     
Resultado: el feature se hace visible en el deployment.

---

## 5. CI (GitHub Actions) – Cómo se dispara
El workflow ci.yml normalmente se ve así:   
on:     
   push:     
    branches: [ main, 'dev/**' ]        
  pull_request:     
    branches: [ main ]      
No necesitas comandos manuales para CI:     
Cada git push a main o dev/* dispara CI.    
Cada PR hacia main dispara CI.  
Tu flujo es:
### Trabajo en rama corta
git push origin dev/\<iniciales\>/\<tarea\>     
### Trabajo en rama corta
GitHub corre CI     
Creas/actualizas PR -> CI se corre otra vez sobre el PR

---

## 6. Deploy estático (Render) – ligado a main (OPCIONAL)
Producción  
Static Site en Render:  
Branch: main.   
Build Command: opcional npm test.   
Publish Directory: ..   
Auto-Deploy: ON.    
Cada merge a main:  
- Pasa por CI en GitHub.
- Render detecta el nuevo commit.
- (Opcional) Ejecuta npm test como build.
- Publica nueva versión del sitio.
### Mensaje clave:
“main es la fuente de verdad desplegable. TBD funciona bien porque hacemos cambios pequeños y frecuentes a main, siempre con tests y CI.”
