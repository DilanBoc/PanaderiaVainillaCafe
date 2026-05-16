# Vainilla & Canela Webapp

Demo local V1.1 para validar la experiencia de una panadería artesanal antes de conectar Supabase en V2.

## Objetivo de V1.1

- Mostrar una landing responsive con catálogo, filtros y contacto por WhatsApp.
- Permitir una demo local de administración de categorías y productos.
- Mantener los datos en `localStorage` para que la dueña vea el flujo sin depender de backend.
- Dejar la estructura lista para cambiar la fuente local por Supabase en V2.

## Rutas

- `/`: landing pública.
- `/admin`: entrada al panel demo local. No tiene login en V1.1.
- `/admin/categories`: demo local para crear y borrar categorías.
- `/admin/products`: demo local para crear y borrar productos.

Los cambios del admin se guardan solo en el navegador actual. El botón `Restaurar demo` devuelve el catálogo inicial. En V1.1 no hay credenciales: el objetivo es validar el flujo visual y funcional antes de construir autenticación real en V2.

## Comandos

```bash
npm.cmd run dev
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run test:v1
npm.cmd run build
```

En PowerShell puede ser necesario usar `npm.cmd` porque algunos equipos bloquean `npm.ps1`.

## Plan de testing V1.1

1. `npm.cmd run lint`: valida reglas de Next/React/TypeScript.
2. `npm.cmd run typecheck`: valida tipos sin emitir build.
3. `npm.cmd run test:v1`: valida catálogo local, textos sin caracteres corruptos, rutas admin y mensajes de WhatsApp.
4. `npm.cmd run build`: confirma que la app compile para producción si el entorno Windows permite el proceso completo.
5. Prueba manual:
   - Abrir `/`.
   - Filtrar productos por categoría.
   - Entrar a `/admin/categories`, crear una categoría.
   - Entrar a `/admin/products`, crear un producto con URL pública.
   - Volver a `/` y confirmar que aparece en el catálogo.
   - Probar responsive móvil, especialmente la sección de masa madre.

## Pendiente para V2

- Conectar Supabase como fuente real.
- Agregar autenticación para admin.
- Subida real de imágenes.
- Pedidos más estructurados si WhatsApp simple se queda corto.
