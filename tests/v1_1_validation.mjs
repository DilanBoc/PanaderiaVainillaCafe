import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';

const root = process.cwd();
const constantsPath = join(root, 'src/lib/constants.ts');
const constantsText = readFileSync(constantsPath, 'utf8');

const badEncodingPattern = /\u00c3|\u00c2|\ufffd|\u00e2/;
const sourceExtensions = new Set(['.ts', '.tsx', '.md', '.mjs', '.sql']);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function walk(dir, files = []) {
  for (const item of readdirSync(dir)) {
    if (['node_modules', '.next', '.git', '__pycache__'].includes(item)) continue;
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) walk(fullPath, files);
    if (stat.isFile() && sourceExtensions.has(extname(fullPath))) files.push(fullPath);
  }
  return files;
}

function countMatches(pattern) {
  return [...constantsText.matchAll(pattern)].length;
}

function validateCatalogShape() {
  assert(countMatches(/id: '[^']+'/g) >= 16, 'Debe haber suficientes ids entre categorías y productos demo.');
  assert(countMatches(/category_id: '[^']+'/g) >= 12, 'Debe haber al menos 12 productos demo.');
  assert(countMatches(/image_url: 'https:\/\//g) >= 12, 'Cada producto demo debe tener una URL pública https.');
  assert(constantsText.includes("id: 'bebidas-frias'"), 'Falta categoría de bebidas frías.');
  assert(constantsText.includes("id: 'bebidas-calientes'"), 'Falta categoría de bebidas calientes.');
}

function validateNoMojibake() {
  const offenders = [];
  for (const file of walk(root)) {
    const text = readFileSync(file, 'utf8');
    if (badEncodingPattern.test(text)) offenders.push(file.replace(`${root}\\`, ''));
  }
  assert(offenders.length === 0, `Archivos con posible texto corrupto: ${offenders.join(', ')}`);
}

function validateCriticalFlows() {
  const landing = readFileSync(join(root, 'src/components/LandingPage.tsx'), 'utf8');
  const productsAdmin = readFileSync(join(root, 'src/app/admin/products/page.tsx'), 'utf8');
  const categoriesAdmin = readFileSync(join(root, 'src/app/admin/categories/page.tsx'), 'utf8');
  const adminHome = readFileSync(join(root, 'src/app/admin/page.tsx'), 'utf8');

  assert(landing.includes('getLocalProducts'), 'La landing debe leer productos locales.');
  assert(landing.includes('Atendemos empresas, reuniones y celebraciones'), 'Falta la sección empresarial.');
  assert(landing.includes('encodeURIComponent'), 'Los mensajes de WhatsApp deben codificarse.');
  assert(!/h[o]gaza/i.test(landing), 'La UI usa un término de producto no aprobado.');
  assert(!landing.includes(`Pedidos ${'grupales'}`) && !/B(?:2)B/i.test(landing), 'La sección empresarial muestra texto interno de roadmap.');
  assert(productsAdmin.includes('saveLocalProducts'), 'Admin productos debe persistir en localStorage.');
  assert(categoriesAdmin.includes('saveLocalCategories'), 'Admin categorías debe persistir en localStorage.');
  assert(adminHome.includes('Demo sin login'), 'El panel admin debe explicar que V1.1 no tiene login real.');
}

function loadLocalCatalogForCrudTest() {
  const constantsJs = ts.transpileModule(constantsText, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;

  const constantsModule = { exports: {} };
  vm.runInNewContext(constantsJs, {
    exports: constantsModule.exports,
    module: constantsModule,
    require: () => ({}),
  });

  const localCatalogText = readFileSync(join(root, 'src/lib/localCatalog.ts'), 'utf8');
  const localCatalogJs = ts.transpileModule(localCatalogText, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;

  const storage = new Map();
  const localCatalogModule = { exports: {} };
  const sandbox = {
    exports: localCatalogModule.exports,
    module: localCatalogModule,
    window: {
      localStorage: {
        getItem: (key) => storage.get(key) ?? null,
        setItem: (key, value) => storage.set(key, value),
      },
    },
    require: (request) => {
      if (request === './constants') return constantsModule.exports;
      return {};
    },
  };

  vm.runInNewContext(localCatalogJs, sandbox);
  return localCatalogModule.exports;
}

function validateLocalCrud() {
  const catalog = loadLocalCatalogForCrudTest();
  catalog.resetLocalCatalog();

  const initialCategories = catalog.getLocalCategories();
  const initialProducts = catalog.getLocalProducts();
  const newCategory = {
    id: catalog.createLocalId('cat-test'),
    name: 'Eventos',
    slug: catalog.createSlug('Eventos'),
    created_at: new Date().toISOString(),
  };

  catalog.saveLocalCategories([...initialCategories, newCategory]);
  assert(
    catalog.getLocalCategories().some((category) => category.slug === 'eventos'),
    'CRUD categorías: la categoría creada no se puede leer desde localStorage.',
  );

  const newProduct = {
    id: catalog.createLocalId('prod-test'),
    name: 'Caja Empresarial Demo',
    description: 'Producto creado por prueba CRUD local.',
    price: 32000,
    category_id: newCategory.id,
    image_url: 'https://example.com/demo.jpg',
    is_star: false,
    created_at: new Date().toISOString(),
  };

  catalog.saveLocalProducts([newProduct, ...initialProducts]);
  assert(
    catalog.getLocalProducts().some((product) => product.name === 'Caja Empresarial Demo'),
    'CRUD productos: el producto creado no se puede leer desde localStorage.',
  );

  catalog.saveLocalProducts(catalog.getLocalProducts().filter((product) => product.id !== newProduct.id));
  assert(
    !catalog.getLocalProducts().some((product) => product.id === newProduct.id),
    'CRUD productos: el producto borrado sigue en localStorage.',
  );

  catalog.saveLocalCategories(catalog.getLocalCategories().filter((category) => category.id !== newCategory.id));
  assert(
    !catalog.getLocalCategories().some((category) => category.id === newCategory.id),
    'CRUD categorías: la categoría borrada sigue en localStorage.',
  );
}

validateCatalogShape();
validateNoMojibake();
validateCriticalFlows();
validateLocalCrud();

console.log('V1.1 validation passed: catálogo, textos, flujos críticos y CRUD local correctos.');
