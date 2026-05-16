import requests
import sys

BASE_URL = "http://localhost:3000/api"

def run_test(name, func):
    try:
        print(f"Running test: {name}...", end=" ", flush=True)
        func()
        print("✅ PASSED")
    except Exception as e:
        print(f"❌ FAILED\nError: {e}")
        sys.exit(1)

def test_api_health():
    # Esta prueba fallará hasta que levantemos el servidor y los endpoints
    response = requests.get(f"{BASE_URL}/health")
    if response.status_code != 200:
        raise Exception(f"Expected 200, got {response.status_code}")

if __name__ == "__main__":
    print("--- Vainilla & Canela v1 Validation Suite ---")
    # run_test("API Health Check", test_api_health)
    print("Pruebas configuradas. Listo para validar endpoints CRUD.")
