import unittest

from tests.constants_check import MOCK_CATEGORIES, MOCK_PRODUCTS


class TestVainillaCanelaLegacy(unittest.TestCase):
    def test_categories_structure(self):
        for category in MOCK_CATEGORIES:
            self.assertIn('id', category)
            self.assertIn('name', category)
            self.assertIn('slug', category)

    def test_products_logic(self):
        category_ids = {category['id'] for category in MOCK_CATEGORIES}
        for product in MOCK_PRODUCTS:
            self.assertGreater(product['price'], 0)
            self.assertIn(product['category_id'], category_ids)


if __name__ == '__main__':
    unittest.main()
