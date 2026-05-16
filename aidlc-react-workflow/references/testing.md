# Referencia de Testing y Entorno Local

Este documento detalla cómo configurar y ejecutar pruebas para la Webapp Vainilla & Canela.

## 1. Supabase Local (Docker)
Para correr la base de datos localmente:
1. Asegúrate de tener Docker instalado y corriendo.
2. Inicializa supabase: `npx supabase init`
3. Inicia los servicios: `npx supabase start`
4. Aplica migraciones: `npx supabase db reset`

## 2. Scripts de Prueba en Python
Los scripts deben residir en la carpeta `/tests` del proyecto principal.

### Ejemplo de Prueba de API (API Validation)
```python
import requests

BASE_URL = "http://localhost:3000/api"

def test_get_categories():
    response = requests.get(f"{BASE_URL}/categories")
    assert response.status_code == 200
    print("✅ Prueba de categorías exitosa")

if __name__ == "__main__":
    test_get_categories()
```

## 3. Verificación de V1
Antes de marcar una tarea como completada para la versión 1.0:
1. La base de datos local debe reflejar el esquema final.
2. Los scripts de prueba deben pasar al 100%.
3. No debe haber errores de TypeScript (`npx tsc`).
4. El despliegue en Vercel Preview debe ser exitoso.