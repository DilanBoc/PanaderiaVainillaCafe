import requests
import sys

# Configuración básica
BASE_URL = "http://localhost:3000/api"

def run_test(name, func):
    try:
        print(f"Running test: {name}...", end=" ")
        func()
        print("✅ PASSED")
    except Exception as e:
        print(f"❌ FAILED\nError: {e}")
        sys.exit(1)

def test_health():
    # Implementar prueba de salud de la API
    pass

if __name__ == "__main__":
    print("--- Vainilla & Canela Test Suite ---")
    # run_test("API Health", test_health)
