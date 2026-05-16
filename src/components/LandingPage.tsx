'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronDown,
  Clock,
  Croissant,
  ExternalLink,
  Heart,
  Leaf,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  Navigation,
  Phone,
  ShoppingCart,
  Sparkles,
  UsersRound,
  X,
} from 'lucide-react';
import { Category, Product } from '@/types';
import { getLocalCategories, getLocalProducts } from '@/lib/localCatalog';

const PHONE_NUMBER = '573202381555';

function whatsappHref(message: string) {
  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function LandingPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const loadCatalog = () => {
      setCategories(getLocalCategories());
      setProducts(getLocalProducts());
    };

    loadCatalog();
    window.addEventListener('storage', loadCatalog);

    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('storage', loadCatalog);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const filteredProducts = useMemo(
    () => activeCategory === 'all'
      ? products
      : products.filter((product) => product.category_id === activeCategory),
    [activeCategory, products],
  );

  return (
    <div className="min-h-screen font-sans">
      <nav className={`fixed w-full z-[100] transition-all duration-500 ${isScrolled ? 'py-2' : 'py-4'}`} id="main-nav">
        <div className={`max-w-7xl mx-auto transition-all duration-500 ${isScrolled ? 'px-4' : 'px-6 lg:px-12'}`}>
          <div className="flex justify-between items-center bg-white/75 backdrop-blur-md rounded-2xl px-4 sm:px-6 py-3 border border-white/30 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#7B3F00] rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-900/20">
                <Croissant className="w-6 h-6" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-serif font-bold tracking-tight">Vainilla & Canela</h1>
                <p className="text-[9px] uppercase tracking-[0.3em] font-semibold text-stone-500">Melgar · Tolima</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-7 font-medium text-sm text-stone-600">
              <a href="#inicio" className="hover:text-[#7B3F00] transition-colors">Inicio</a>
              <a href="#masa-madre" className="hover:text-[#7B3F00] transition-colors">Masa Madre</a>
              <a href="#menu" className="hover:text-[#7B3F00] transition-colors">Menú</a>
              <a href="#eventos" className="hover:text-[#7B3F00] transition-colors">Eventos</a>
              <a href="#contacto" className="hover:text-[#7B3F00] transition-colors">Contacto</a>
            </div>

            <div className="flex items-center gap-3">
              <a href={whatsappHref('Hola, quiero hacer un pedido en Vainilla & Canela.')} className="hidden sm:block bg-[#7B3F00] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#5D2F00] transition-all shadow-md active:scale-95">
                Hacer Pedido
              </a>
              <button
                type="button"
                aria-label="Abrir menú"
                className="md:hidden p-2 text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-2 bg-white rounded-2xl p-6 border border-stone-100 shadow-xl">
              <div className="flex flex-col gap-4 font-medium text-stone-600">
                {[
                  ['Inicio', '#inicio'],
                  ['Masa Madre', '#masa-madre'],
                  ['Menú', '#menu'],
                  ['Eventos', '#eventos'],
                  ['Contacto', '#contacto'],
                ].map(([label, href]) => (
                  <a key={href} href={href} onClick={() => setIsMenuOpen(false)} className="hover:text-[#7B3F00] py-2 border-b border-stone-50">
                    {label}
                  </a>
                ))}
                <a href={whatsappHref('Hola, quiero hacer un pedido en Vainilla & Canela.')} className="bg-[#7B3F00] text-white px-5 py-4 rounded-xl text-center font-bold mt-2">
                  Hacer Pedido
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section id="inicio" className="relative h-screen min-h-[620px] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Panadería artesanal" />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-2xl text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">Abierto hoy en La Florida</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-tight mb-8">
              El arte de lo <br className="hidden sm:block" /> <span className="italic text-orange-200">hecho a mano</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-stone-100/90 mb-10 font-light leading-relaxed max-w-xl">
              Panes de fermentación lenta, bebidas frías, cafés y detalles dulces para disfrutar en Melgar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#menu" className="bg-white text-[#7B3F00] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-orange-50 transition-all shadow-xl text-center">
                Ver Catálogo
              </a>
              <a href="#eventos" className="bg-transparent border border-white/40 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all text-center">
                Eventos y Empresas
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white animate-bounce hidden md:block">
          <ChevronDown className="w-8 h-8 opacity-50" />
        </div>
      </section>

      <section id="masa-madre" className="py-16 md:py-28 px-6 bg-[#FDF9F3]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-center">
            <div className="lg:col-span-5 relative max-w-[420px] sm:max-w-[520px] lg:max-w-none mx-auto w-full">
              <div className="aspect-[5/4] sm:aspect-[4/3] lg:aspect-[4/5] max-h-[360px] sm:max-h-[430px] lg:max-h-none rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10">
                <img src="https://images.unsplash.com/photo-1585478259715-876a6a81fc08?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Pan de masa madre" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-40 sm:w-56 h-40 sm:h-56 bg-orange-100 rounded-full blur-3xl -z-0 opacity-60" />
              <div className="absolute -bottom-5 right-3 sm:-right-4 bg-white p-4 sm:p-5 rounded-2xl shadow-xl z-20 max-w-[160px] border border-stone-100">
                <p className="text-3xl sm:text-4xl font-serif font-bold text-[#7B3F00]">48h</p>
                <p className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-stone-500">Fermentación natural</p>
              </div>
            </div>

            <div className="lg:col-span-7 lg:pl-10">
              <span className="text-orange-600 font-bold tracking-widest uppercase text-xs mb-4 block">Nuestra Especialidad</span>
              <h3 className="text-3xl sm:text-4xl md:text-6xl font-serif mb-8 leading-tight">La magia de nuestra <br className="hidden sm:block" /><span className="italic">masa madre</span></h3>
              <p className="text-base sm:text-lg text-stone-600 mb-8 leading-relaxed">
                No es solo pan, es un proceso vivo. Nuestra masa madre es el corazón de la casa: corteza crujiente, aroma profundo y una miga aireada pensada para disfrutarse con calma.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-10">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-stone-100 shadow-sm">
                  <Leaf className="w-6 h-6 text-green-600 shrink-0" />
                  <div>
                    <h5 className="font-bold text-sm sm:text-base">Fermentación lenta</h5>
                    <p className="text-xs text-stone-500">Proceso natural con sabor más profundo.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-stone-100 shadow-sm">
                  <Heart className="w-6 h-6 text-red-500 shrink-0" />
                  <div>
                    <h5 className="font-bold text-sm sm:text-base">Hecho cada día</h5>
                    <p className="text-xs text-stone-500">Panes frescos para mesa, regalo o reunión.</p>
                  </div>
                </div>
              </div>

              <a href={whatsappHref('Hola, me interesa probar la hogaza de masa madre.')} target="_blank" className="inline-flex items-center justify-center gap-3 bg-[#7B3F00] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold hover:shadow-2xl transition-all hover:scale-105 active:scale-95 w-full sm:w-auto">
                Pedir una Hogaza
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-6 italic">Tentaciones Artesanales</h3>
            <p className="text-stone-500 text-sm sm:text-base">Un catálogo local para demo: categorías, filtros y productos listos para validar con la dueña.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold border border-stone-200 transition-all shadow-sm ${activeCategory === 'all' ? 'bg-[#7B3F00] text-white' : 'bg-white hover:bg-stone-50'}`}
            >
              Todo
            </button>
            {categories.map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold border border-stone-200 transition-all shadow-sm ${activeCategory === cat.id ? 'bg-[#7B3F00] text-white' : 'bg-white hover:bg-stone-50'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="card-shadow bg-white rounded-[1.75rem] overflow-hidden border border-stone-100 flex flex-col h-full group">
                <div className="h-48 sm:h-56 md:h-60 relative overflow-hidden bg-stone-100">
                  <img
                    src={product.image_url || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={product.name}
                  />
                  {product.is_star && (
                    <div className="absolute top-4 left-4 bg-[#7B3F00] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Estrella</div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="text-lg sm:text-xl font-bold mb-2">{product.name}</h4>
                  <p className="text-stone-500 text-xs sm:text-sm mb-6 flex-grow leading-relaxed line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl sm:text-2xl font-serif font-bold text-stone-900">${(product.price / 1000).toFixed(1)}k</span>
                    <a aria-label={`Pedir ${product.name}`} href={whatsappHref(`Hola, quiero pedir ${product.name}.`)} className="bg-green-50 text-green-700 p-2.5 sm:p-3 rounded-2xl hover:bg-green-600 hover:text-white transition-all shadow-sm">
                      <ShoppingCart className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="eventos" className="py-20 md:py-28 px-6 bg-[#F7F0E8]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="text-orange-700 font-bold tracking-widest uppercase text-xs mb-4 block">Empresas y Celebraciones</span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-6 leading-tight">Atendemos empresas, reuniones y celebraciones</h3>
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
              Preparamos panes, bebidas y pasabocas para desayunos empresariales, juntas, cumpleaños y encuentros familiares. La idea para V1.1 es validar interés y recoger pedidos por WhatsApp.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                ['Empresas', 'Refrigerios y desayunos para equipos.', BriefcaseBusiness],
                ['Reuniones', 'Opciones dulces y saladas para compartir.', UsersRound],
                ['Celebraciones', 'Detalles artesanales para fechas especiales.', Sparkles],
              ].map(([title, text, Icon]) => (
                <div key={title as string} className="bg-white/75 border border-white rounded-2xl p-5 shadow-sm">
                  <Icon className="w-6 h-6 text-[#7B3F00] mb-4" />
                  <h4 className="font-bold mb-2">{title as string}</h4>
                  <p className="text-sm text-stone-500 leading-relaxed">{text as string}</p>
                </div>
              ))}
            </div>
            <a href={whatsappHref('Hola, quiero información para una empresa, reunión o celebración.')} className="inline-flex items-center justify-center gap-3 bg-[#7B3F00] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#5D2F00] transition-all w-full sm:w-auto">
              Cotizar por WhatsApp
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl aspect-[4/3] bg-stone-200">
              <img src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80&w=1000" alt="Mesa preparada para reunión" className="w-full h-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
                <p className="font-serif text-2xl font-bold">Pedidos grupales</p>
                <p className="text-sm text-white/80">Una línea clara para validar ventas B2B en V2.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="py-20 md:py-28 bg-stone-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-[#7B3F00] blur-[100px] sm:blur-[120px] opacity-20 -z-0" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-20 items-center">
            <div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-8 leading-tight">Visítanos en el corazón de <span className="italic text-orange-300">Melgar</span></h3>
              <p className="text-stone-400 text-base sm:text-lg mb-10 sm:mb-12 max-w-lg">
                El Barrio La Florida te espera con pan recién horneado, bebidas y un momento tranquilo para compartir.
              </p>

              <div className="space-y-6 sm:space-y-8">
                <div className="flex gap-4 sm:gap-6 items-start">
                  <div className="bg-stone-800 p-3 sm:p-4 rounded-2xl text-orange-400 shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h5 className="text-base sm:text-lg font-bold mb-1">Nuestra Ubicación</h5>
                    <p className="text-sm sm:text-base text-stone-400">Calle 7B #11-61, Barrio La Florida<br />Melgar, Tolima</p>
                  </div>
                </div>
                <div className="flex gap-4 sm:gap-6 items-start">
                  <div className="bg-stone-800 p-3 sm:p-4 rounded-2xl text-green-400 shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h5 className="text-base sm:text-lg font-bold mb-1">Horarios</h5>
                    <p className="text-sm sm:text-base text-stone-400">Todos los días<br />7:00 AM - 9:00 PM</p>
                  </div>
                </div>
                <div className="flex gap-4 sm:gap-6 items-start">
                  <div className="bg-stone-800 p-3 sm:p-4 rounded-2xl text-blue-400 shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h5 className="text-base sm:text-lg font-bold mb-1">WhatsApp</h5>
                    <p className="text-sm sm:text-base text-stone-400">+57 320 238 1555</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-stone-800 rounded-[2.5rem] sm:rounded-[3rem] p-3 sm:p-4 shadow-2xl border border-stone-700 h-[350px] sm:h-[450px] overflow-hidden relative">
                <div className="w-full h-full bg-stone-900 rounded-[2rem] sm:rounded-[2.5rem] flex flex-col items-center justify-center text-center p-6 sm:p-10 group overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1000')] opacity-20 group-hover:scale-110 transition-transform duration-1000 grayscale" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#7B3F00] rounded-full flex items-center justify-center mb-6 mx-auto shadow-2xl shadow-orange-900/50">
                      <Navigation className="text-white w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <p className="text-lg sm:text-xl font-serif font-bold mb-4">La Florida, Melgar</p>
                    <a href="https://maps.google.com/?q=Calle+7B+%2311+-61,+Melgar,+Tolima" target="_blank" className="bg-white text-stone-950 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm hover:bg-orange-50 transition-all flex items-center gap-2 mx-auto w-fit">
                      Cómo Llegar
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-stone-950 border-t border-stone-800 py-16 sm:py-20 px-6 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#7B3F00]/20 rounded-2xl flex items-center justify-center text-[#7B3F00] border border-[#7B3F00]/30">
              <Croissant className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-2xl font-serif font-bold text-white italic">Vainilla & Canela</h4>
              <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Tradición melgarense</p>
            </div>
          </div>

          <div className="flex gap-6 sm:gap-8 text-stone-400 font-medium text-xs sm:text-sm">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href={whatsappHref('Hola, quiero más información sobre Vainilla & Canela.')} className="hover:text-green-500 transition-colors">WhatsApp</a>
            <a href="/admin" className="hover:text-white transition-colors">Admin demo</a>
          </div>

          <p className="text-stone-600 text-[10px] sm:text-xs">
            &copy; 2026 Vainilla & Canela. Calle 7B #11-61, Melgar.
          </p>
        </div>
      </footer>

      <a href={whatsappHref('Hola, quiero hacer un pedido en Vainilla & Canela.')} target="_blank" className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[200] whatsapp-float group">
        <div className="flex items-center gap-3 bg-green-500 text-white p-4 sm:px-5 sm:py-5 rounded-full sm:rounded-[2rem] shadow-2xl hover:bg-green-600 transition-all">
          <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />
          <div className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold hidden sm:block">
            Pide por WhatsApp
          </div>
        </div>
      </a>
    </div>
  );
}
