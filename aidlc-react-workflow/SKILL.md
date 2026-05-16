---
name: aidlc-react-workflow
description: Workflow iterativo basado en el paradigma ReAct (Reason, Act, Observe) para el ciclo de vida de desarrollo de IA (AI-DLC). Úsalo para estructurar el desarrollo de la aplicación Vainilla & Canela, asegurando análisis previo, ejecución quirúrgica y validación local obligatoria.
---

# AI-DLC & ReAct Workflow

Este skill define el proceso estándar para el desarrollo de la Webapp Vainilla & Canela. Cada tarea debe seguir estrictamente este ciclo.

## Core Workflow: El Loop ReAct

### 1. Analyze (Reasoning)
Antes de escribir cualquier código o ejecutar un comando, detente y analiza:
- **Contexto:** ¿Qué archivos están involucrados? Lee los archivos relevantes.
- **Dependencias:** ¿Cómo afecta este cambio al resto del sistema (DB, Props, API)?
- **Requerimientos:** Revisa el plan maestro (`vainillaycanela-plan.md`).

### 2. Plan (Planning)
Declara tu intención clara de lo que vas a hacer:
- "Voy a crear el componente X en el archivo Y."
- "Voy a actualizar la tabla Z en Supabase local."
- Describe los pasos exactos antes de actuar.

### 3. Execute (Acting)
Implementa el cambio de forma quirúrgica:
- Usa `replace` para ediciones precisas.
- Usa `write_file` solo para archivos nuevos o muy pequeños.
- Mantén la consistencia con Tailwind CSS y TypeScript.

### 4. Verify (Observing) - ¡CRÍTICO!
Toda ejecución debe ser validada:
- **Linting & Types:** `npm run lint` o `npx tsc`.
- **Base de Datos:** Verifica que las migraciones corran en el Supabase local.
- **Pruebas Automatizadas:** Ejecuta los scripts de prueba (Python/JS) definidos en la Fase 5 del plan.
- **Resultado:** Si algo falla, el ciclo vuelve a la fase de **Analyze**.

### 5. Iterate
Refina la solución basada en los errores o feedback del usuario.

## Guía de Testing Local
Para asegurar la calidad antes de la v1:
- Usa el Supabase CLI (`supabase start`, `supabase db reset`).
- Valida los endpoints de la API con scripts de Python en `tests/`.
- Nunca confirmes una funcionalidad sin haberla visto funcionar en el entorno local.

## Recursos Disponibles
- Ver [REFERENCES.md](references/testing.md) para detalles sobre el setup de Supabase local y scripts de prueba.