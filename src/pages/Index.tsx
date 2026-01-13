import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Reveal } from '../components/motion/Reveal';
import { SignatureInteraction } from '../components/effects/SignatureInteraction';

// --- Global Styles & Assets ---
// In a real app, these would be in index.css or tailwind config
const FONTS_URL = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap";
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

const Index = () => {
  const [isNavHidden, setIsNavHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 100) {
      setIsNavHidden(true);
    } else {
      setIsNavHidden(false);
    }
  });

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#2D2926] font-sans overflow-x-hidden selection:bg-[#B5A172] selection:text-white">
      <style>{`
        @import url('${FONTS_URL}');
        :root {
          --font-display: 'Playfair Display', serif;
          --font-body: 'Inter', sans-serif;
        }
        .font-display { font-family: var(--font-display); }
        .font-body { font-family: var(--font-body); }
      `}</style>

      {/* Noise Overlay */}
      <div 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] opacity-[0.04]"
        style={{ backgroundImage: NOISE_SVG }}
      />

      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 w-full z-[100] py-10 mix-blend-multiply transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        animate={{ y: isNavHidden ? '-100%' : '0%' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-[90%] max-w-[1400px] mx-auto px-8 flex justify-between items-center">
          <a href="#" className="font-display text-2xl font-semibold tracking-tighter">
            Maison Solstice
          </a>
          <div className="flex gap-12">
            {['Philosophy', 'Menu', 'Visit'].map((item) => (
              <span 
                key={item} 
                className="text-[0.9rem] font-medium relative cursor-pointer group"
              >
                {item}
                <span className="absolute bottom-[-4px] left-0 w-full h-[1px] bg-[#B5A172] scale-x-0 origin-right transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-hover:origin-left" />
              </span>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <header className="min-h-screen pt-32 lg:pt-48 pb-32 w-[90%] max-w-[1400px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 z-10">
          <Reveal>
            <span className="block text-[0.85rem] uppercase tracking-[0.15em] text-[#B5A172] font-medium mb-6">
              Paris 3e · Le Marais
            </span>
            <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[1.1] tracking-tight font-normal">
              Coffee as a <br />
              <span className="italic text-[#B5A172]">quiet ritual</span>
              <br />in the morning light.
            </h1>
          </Reveal>
        </div>

        <div className="lg:col-span-6 relative h-[50vh] lg:h-[80vh]">
          <Reveal delay={0.2} width="100%" className="h-full">
            <SignatureInteraction type="parallax" className="w-full h-full">
              <img 
                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop" 
                alt="Latte art on stone table" 
                className="w-full h-full object-cover"
              />
            </SignatureInteraction>
            <div className="absolute bottom-auto top-4 lg:top-auto lg:bottom-8 left-0 lg:-left-12 bg-[#F9F8F6] p-6 max-w-[250px] text-[0.8rem] border-t-2 lg:border-t-0 lg:border-l-2 border-[#B5A172] z-20">
              <p><strong>08:00 AM</strong> — The grind, the tamp, the pour. An exercise in daily precision.</p>
            </div>
          </Reveal>
        </div>
      </header>

      {/* Philosophy Section */}
      <section className="bg-[#F5F3EF] py-32 relative">
        <div className="w-[90%] max-w-[1400px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-start-3 lg:col-span-5">
            <Reveal>
              <p className="font-display text-2xl leading-relaxed font-normal text-[#2D2926]">
                We believe the city is too loud. Maison Solstice is an architectural pause; a sanctuary of honed limestone and <span className="text-[#B5A172] italic">brushed brass</span> where time slows down. We source single-origin beans from micro-lots and roast them lightly to preserve the terroir.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-start-9 lg:col-span-3 text-[0.9rem] border-t border-[#2D2926] pt-4 mt-8 lg:mt-0">
            <Reveal delay={0.2}>
              <p className="font-light text-[#4a4a4a]">
                Designed by Studio L'Aube.<br />Inspired by the Haussmannian geometry of the quarter.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-40 w-[90%] max-w-[1400px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-start-2 lg:col-span-3 lg:sticky lg:top-40 h-fit mb-12 lg:mb-0">
          <Reveal>
            <span className="block text-[0.85rem] uppercase tracking-[0.15em] text-[#B5A172] font-medium mb-6">
              La Carte
            </span>
            <h2 className="font-display text-4xl lg:text-5xl mb-4">Curated<br />Selections</h2>
            <p className="text-sm opacity-60 font-light mt-4">
              Subject to daily change<br />based on weather & mood.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-start-6 lg:col-span-6 flex flex-col">
          {[ 
            { name: "Espresso No. 3", desc: "Notes of jasmine, bergamot, and honey.", price: "€3.50" },
            { name: "Flat White", desc: "Silky microfoam, double ristretto base.", price: "€5.00" },
            { name: "V60 Pour Over", desc: "Hand-poured slow extraction. Ethiopian Yirgacheffe.", price: "€7.00" },
            { name: "Matcha Ceremonial", desc: "Kyoto sourced, whisked to order.", price: "€6.50" },
            { name: "Pain au Chocolat", desc: "AOP Butter, 70% dark Valrhona chocolate.", price: "€3.00" }
          ].map((item, index) => (
            <Reveal key={index} width="100%">
              <div className="flex justify-between items-baseline py-6 border-b border-[#E8E6E1] hover:border-[#B5A172] hover:pl-4 transition-all duration-300 ease-out cursor-default group">
                <div>
                  <span className="font-display text-2xl block">{item.name}</span>
                  <span className="block text-[0.85rem] text-[#888] mt-2 max-w-[80%] font-light">{item.desc}</span>
                </div>
                <span className="font-body text-base text-[#B5A172]">{item.price}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Interlude Section */}
      <section className="h-[70vh] relative flex items-center justify-center overflow-hidden">
        <Reveal width="100%" className="h-full absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop" 
            alt="Parisian Cafe Sunlight" 
            className="w-full h-full object-cover grayscale-[20%] sepia-[10%]"
          />
        </Reveal>
        <div className="relative z-10 text-white text-center mix-blend-soft-light">
          <Reveal>
            <h2 className="font-display text-[clamp(3rem,8vw,6rem)] tracking-tight">
              Stillness is a luxury.
            </h2>
          </Reveal>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-32 pb-24 w-[90%] max-w-[1400px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-start-2 lg:col-span-5 bg-white p-16 border border-[#E8E6E1] shadow-[0_20px_40px_rgba(0,0,0,0.02)]">
          <Reveal>
            <span className="block text-[0.85rem] uppercase tracking-[0.15em] text-[#B5A172] font-medium mb-6">
              Visit Us
            </span>
            <h3 className="font-display text-3xl mb-4">Rue des Rosiers</h3>
            <p className="mt-4 font-light text-[#4a4a4a]">14 Rue des Rosiers<br />75004 Paris, France</p>
            <br />
            <p className="font-light text-[#4a4a4a]"><strong className="font-medium text-[#2D2926]">Open Daily</strong><br />08:00 – 18:00</p>
            <motion.button 
              className="mt-8 px-8 py-4 border border-[#2D2926] text-[0.8rem] uppercase tracking-widest bg-transparent hover:bg-[#2D2926] hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Directions
            </motion.button>
          </Reveal>
        </div>
        <div className="lg:col-start-8 lg:col-span-4 h-full min-h-[400px]">
          <Reveal delay={0.2} width="100%" className="h-full">
            <img 
              src="https://images.unsplash.com/photo-1509762774605-f07212a245b0?q=80&w=2070&auto=format&fit=crop" 
              alt="Coffee beans detail" 
              className="w-full h-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2D2926] text-[#F9F8F6] py-16 text-center">
        <div className="w-[90%] max-w-[1400px] mx-auto px-8">
          <span className="font-display text-5xl mb-8 block text-[#B5A172]">Maison Solstice</span>
          <div className="flex justify-center gap-8 text-[0.85rem] opacity-70 mb-16">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Newsletter</a>
            <a href="#" className="hover:text-white transition-colors">Legal</a>
          </div>
          <p className="opacity-30 text-[0.7rem] font-light">&copy; 2024 Maison Solstice Paris.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
