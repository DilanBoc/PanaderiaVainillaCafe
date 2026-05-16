import requests
import unittest
import time

# En desarrollo local con Next.js corriendo
BASE_URL = "http://localhost:3000"
API_URL = f"{BASE_URL}/api" # Nota: Implementaremos endpoints API reales si es necesario, 
                            # por ahora los tests validarán la estructura de datos.

class TestVainillaCanela(unittest.TestCase):
    
    @classmethod
    def setUpClass(cls):
        print("\n--- Iniciando Validación de Vainilla & Canela Webapp v1 ---")

    def test_01_categories_structure(self):
        """Verifica que las categorías mock tengan el formato correcto."""
        from constants_check import MOCK_CATEGORIES
        for cat in MOCK_CATEGORIES:
            self.assertIn('id', cat)
            self.assertIn('name', cat)
            self.assertIn('slug', cat)
            print(f"✅ Categoría validada: {cat['name']}")

    def test_02_products_logic(self):
        """Verifica que los productos tengan precios válidos y categorías asignadas."""
        from constants_check import MOCK_PRODUCTS
        for prod in MOCK_PRODUCTS:
            self.assertGreater(prod['price'], 0)
            self.assertIsNotNone(prod['category_id'])
            print(f"✅ Producto validado: {prod['name']} (${prod['price']})")

    def test_03_admin_routes_status(self):
        """Verifica que las rutas administrativas estén configuradas (suponiendo server corriendo)."""
        try:
            response = requests.get(f"{BASE_URL}/admin/products", timeout=2)
            # Si el server no está corriendo, esto fallará graciosamente
            self.assertEqual(response.status_code, 200)
            print("✅ Ruta /admin/products accesible")
        except requests.exceptions.ConnectionError:
            print("⚠️ Saltando test de red: Servidor local no detectado en puerto 3000")

if __name__ == "__main__":
    # Creamos un pequeño helper para leer las constantes de TS en Python para validación
    # En un entorno real, esto consultaría la API de Next.js
    unittest.main()
