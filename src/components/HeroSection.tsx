import { Reveal } from './ui/Reveal';
import { HeroVideoLayer } from './ui/HeroVideoLayer';
import { PlayCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { useState, useEffect } from 'react';

const galleryItems = [
  {
    id: "bavaria",
    src: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=800&q=80",
    tag: "Bavaria",
    title: "Neuschwanstein",
    tagClass: "bg-white/20 text-white border-white/30"
  },
  {
    id: "berlin",
    src: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&w=400&q=80",
    tag: "Capital",
    title: "Berlin",
    tagClass: "bg-amber-400/20 text-amber-400 border-amber-400/20"
  },
  {
    id: "frankfurt",
    src: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&q=80",
    tag: "Finance",
    title: "Frankfurt",
    tagClass: "bg-red-500/20 text-red-400 border-red-500/20"
  },
  {
    id: "hamburg",
    src: "https://images.unsplash.com/photo-1517400766359-99a38f3cbce1?auto=format&fit=crop&w=400&q=80",
    tag: "Port",
    title: "Hamburg",
    tagClass: "bg-blue-500/20 text-blue-400 border-blue-500/20"
  },
  {
    id: "cologne",
    src: "https://images.unsplash.com/photo-1554072675-66bf59eb9cff?auto=format&fit=crop&w=400&q=80",
    tag: "History",
    title: "Cologne",
    tagClass: "bg-purple-500/20 text-purple-400 border-purple-500/20"
  }
];

export function HeroSection() {
  const text1 = "وصلت إلى المكان الصح.";
  const text2 = "تعلّم الألمانية كما تُستخدم فعلاً.";

  const [displayed1, setDisplayed1] = useState("");
  const [displayed2, setDisplayed2] = useState("");
  const [typingState, setTypingState] = useState(0); 
  // 0: waiting, 1: typing line 1, 2: typing line 2, 3: finished
  const [cards, setCards] = useState(galleryItems);

  // 3D Tilt Effect Setup
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [0, 1], [12, -12]);
  const rotateY = useTransform(springX, [0, 1], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXRel = e.clientX - rect.left;
    const mouseYRel = e.clientY - rect.top;
    mouseX.set(mouseXRel / width);
    mouseY.set(mouseYRel / height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const handleDragEnd = (event: any, info: any) => {
    // If the card is dragged far enough horizontally, swipe it away
    if (Math.abs(info.offset.x) > 100) {
      setCards((prev) => {
        const newCards = [...prev];
        const first = newCards.shift();
        if (first) newCards.push(first);
        return newCards;
      });
    }
  };

  useEffect(() => {
    let interval1: ReturnType<typeof setInterval>;
    let interval2: ReturnType<typeof setInterval>;
    let timeout2: ReturnType<typeof setTimeout>;
    
    const timeout1 = setTimeout(() => {
      setTypingState(1);
      let i = 0;
      interval1 = setInterval(() => {
        i++;
        setDisplayed1(text1.slice(0, i));
        if (i >= text1.length) {
          clearInterval(interval1);
          setTypingState(2);
          
          timeout2 = setTimeout(() => {
            let j = 0;
            interval2 = setInterval(() => {
              j++;
              setDisplayed2(text2.slice(0, j));
              if (j >= text2.length) {
                clearInterval(interval2);
                setTypingState(3);
              }
            }, 40);
          }, 400);
        }
      }, 45);
    }, 600);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-center isolate overflow-hidden">
      {/* Background Layer */}
      <HeroVideoLayer />

      {/* Hanging German Banner (Top Left) */}
      <div className="absolute top-[-10px] left-6 md:left-12 lg:left-24 w-16 md:w-24 z-40 drop-shadow-2xl animate-flag-drop">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg" 
          alt="German Flag" 
          className="w-full h-auto object-cover rounded-b-sm border-b border-x border-white/20 shadow-inner"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)' }}
        />
        {/* Ribbon knot/pin visual */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-800 border border-slate-600 shadow-sm" />
      </div>

      {/* German Typography Accent */}
      <div className="absolute top-1/4 right-[-5%] text-[10rem] md:text-[16rem] font-black text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.02)] select-none pointer-events-none -rotate-6 z-0 font-sans tracking-tighter leading-none hidden lg:block">
        DEUTSCH
      </div>
      <div className="absolute bottom-1/4 left-[-2%] text-[8rem] md:text-[12rem] font-black text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.02)] select-none pointer-events-none rotate-12 z-0 font-sans tracking-tighter leading-none hidden lg:block">
        SPRECHEN
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 py-24 min-h-[100svh] flex flex-col justify-center">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Content */}
          <div className="lg:col-span-7 flex flex-col gap-8 max-w-2xl bauhaus-pattern-overlay">
            <Reveal>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-fit shadow-lg shadow-black/20">
                {/* Subtle German Flag Motif */}
                <div className="flex gap-0.5" dir="ltr">
                  <div className="w-1.5 h-3 rounded-l-sm bg-slate-900"></div>
                  <div className="w-1.5 h-3 bg-red-600"></div>
                  <div className="w-1.5 h-3 rounded-r-sm bg-amber-400"></div>
                </div>
                <span className="text-xs font-medium text-slate-200 tracking-wide">
                  ألمانية بطريقة لغتك الأم · منهج BR-02
                </span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="relative">
                {/* German Typography Accent (Eszett / Sharp S) */}
                <span className="absolute -top-16 -right-12 text-[10rem] md:text-[14rem] text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.02)] font-serif select-none pointer-events-none -z-10 -rotate-12 leading-none">
                  ß
                </span>
                
                {/* Precision Engineering/Architectural Accent Markers */}
                <div className="absolute -right-4 md:-right-8 top-2 w-4 h-4 border-t border-r border-amber-500/30" />
                <div className="absolute -left-2 md:-left-4 bottom-2 w-4 h-4 border-b border-l border-amber-500/30" />

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] tracking-tight relative z-10">
                  {/* Invisible placeholder to maintain layout dimensions and prevent shift */}
                  <div className="opacity-0 pointer-events-none select-none" aria-hidden="true">
                    وصلت إلى المكان الصح.
                    <br />
                    <span className="inline-block mt-3">
                      تعلّم الألمانية كما تُستخدم فعلاً.
                    </span>
                  </div>

                  {/* Typing Overlay */}
                  <div className="absolute inset-0 top-0 right-0">
                    <span className="text-white">
                      {displayed1}
                      {typingState === 1 && <span className="inline-block w-[3px] h-[0.8em] bg-amber-400 mr-2 animate-pulse align-middle translate-y-[-10%]" />}
                    </span>
                    <br />
                    <span className="relative inline-block mt-3">
                      <motion.span 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: typingState >= 2 ? 1 : 0 }} 
                        className="absolute -right-6 md:-right-8 -top-6 text-5xl md:text-6xl text-amber-500/20 font-serif select-none pointer-events-none"
                      >
                        „
                      </motion.span>
                      
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
                        {displayed2}
                      </span>
                      {typingState === 2 && (
                        <span className="inline-block w-[3px] h-[0.8em] bg-amber-400 mr-2 animate-pulse align-middle translate-y-[-10%]" />
                      )}
                      
                      <motion.span 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: typingState === 3 ? 1 : 0 }} 
                        className="absolute -left-6 md:-left-8 -top-2 text-5xl md:text-6xl text-amber-500/20 font-serif select-none pointer-events-none"
                      >
                        “
                      </motion.span>
                    </span>
                  </div>
                </h1>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl">
                استغني عن حفظ القواعد الجافة والمفردات المعزولة. استمع إلى جُمل حيّة داخل مواقف واقعية، وابدأ التحدّث من أسبوعك الأول.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button className="group relative inline-flex items-center gap-2 px-8 py-4 bg-amber-400 text-amber-950 font-bold rounded-2xl overflow-hidden transition-transform hover:scale-105 active:scale-95">
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative">ابدأ مجاناً (A1 · A2)</span>
                  <ArrowLeft className="relative w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </button>
                
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-2xl border border-white/10 backdrop-blur-md transition-all hover:scale-105 active:scale-95">
                  <PlayCircle className="w-5 h-5 text-slate-400" />
                  استكشف المنهج
                </button>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="flex items-center gap-2 text-sm text-slate-400 mt-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <p>مستويان كاملان مجاناً (A1 · A2) دون الحاجة لبطاقة دفع — جرّب بنفسك.</p>
              </div>
            </Reveal>
          </div>

          {/* Modern Floating UI Elements (Right side / LTR visual) */}
          <div className="lg:col-span-5 hidden lg:block relative z-10">
            <Reveal delay={400} className="relative w-full h-[500px] flex items-center justify-center">
              
              {/* Interactive 3D Stacked Cards Gallery */}
              <div 
                className="relative w-full max-w-sm h-[400px] mx-auto z-20 flex items-center justify-center perspective-[1200px]" 
                dir="ltr"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <motion.div 
                  className="w-full h-full relative flex items-center justify-center"
                  style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                >
                  <AnimatePresence mode="popLayout">
                    {cards.slice(0, 3).map((item, idx) => {
                      const isTop = idx === 0;
                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, scale: 0.8, y: 60, rotateZ: -10 }}
                          animate={{ 
                            opacity: 1 - idx * 0.15, 
                            scale: 1 - idx * 0.05, 
                            y: idx * 24, 
                            rotateZ: isTop ? 0 : idx % 2 === 0 ? 3 : -3,
                            zIndex: 30 - idx 
                          }}
                          exit={{ opacity: 0, y: -150, scale: 1.1, rotateZ: 15, filter: "blur(10px)", transition: { duration: 0.5 } }}
                          transition={{ type: "spring", stiffness: 250, damping: 25 }}
                          drag={isTop ? "x" : false}
                          dragConstraints={{ left: 0, right: 0 }}
                          dragElastic={0.8}
                          onDragEnd={isTop ? handleDragEnd : undefined}
                          whileDrag={{ cursor: "grabbing", scale: 1.05, rotateZ: Math.random() > 0.5 ? 5 : -5 }}
                          className={`absolute w-full h-80 rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-slate-900 ${isTop ? 'cursor-grab hover:shadow-[0_20px_60px_rgba(255,255,255,0.1)]' : ''}`}
                        >
                          <img 
                            src={item.src} 
                            alt={item.title} 
                            className="w-full h-full object-cover pointer-events-none" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                          
                          {/* Premium Glassmorphism edge light */}
                          <div className="absolute inset-0 rounded-3xl border border-white/20 border-b-transparent border-r-transparent pointer-events-none" />

                          <div className="absolute bottom-6 left-6 pointer-events-none">
                            <span className={`px-3 py-1.5 backdrop-blur-md text-xs font-bold rounded-lg border mb-2 inline-block shadow-lg ${item.tagClass}`}>
                              {item.tag}
                            </span>
                            <h3 className="text-white font-black text-3xl tracking-tight drop-shadow-lg">{item.title}</h3>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Decorative Glows representing German Flag Colors (Red & Gold on Black) */}
              <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-amber-500/20 rounded-full blur-[100px] z-10 pointer-events-none" />
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-600/15 rounded-full blur-[80px] z-10 pointer-events-none" />
            </Reveal>
          </div>
        </div>
      </div>

      {/* Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-500 uppercase tracking-widest font-medium">Scroll</span>
        <div className="w-[26px] h-[42px] rounded-full border border-white/20 flex justify-center p-1 backdrop-blur-sm bg-white/5">
          <motion.div 
            animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-amber-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
