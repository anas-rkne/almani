import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Reveal } from './ui/Reveal';
import { Sparkles, Puzzle, Plus, ArrowLeft, ChevronLeft } from 'lucide-react';
import { GiEagleEmblem, GiOakLeaf } from 'react-icons/gi';

const PATTERN_BASE = {
  german: "Ich hätte gern",
  meaning: "أودّ أن أحصل على",
  stat: "هذا القالب وحده يُمكّنك من بناء أكثر من 50 جملة صحيحة للاستخدام اليومي في المطاعم والمقاهي، دون الحاجة للتفكير في قواعد التصريف."
};

const PATTERN_BRANCHES = [
  { german: "einen Kaffee, bitte.", meaning: "قهوة، من فضلك.", complexity: 25 },
  { german: "die Speisekarte.", meaning: "قائمة الطعام.", complexity: 15 },
  { german: "einen Tisch für zwei.", meaning: "طاولة لشخصين.", complexity: 60 },
  { german: "die Rechnung, bitte.", meaning: "الفاتورة، من فضلك.", complexity: 40 },
  { german: "ein Glas Wasser.", meaning: "كأس من الماء.", complexity: 45 }
];

export function PatternSystemSection() {
  const [active, setActive] = useState(0);
  const branch = PATTERN_BRANCHES[active];

  // Parallax Setup
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [150, -150]); // Faster upwards
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]); // Slower downwards
  const y3 = useTransform(scrollYProgress, [0, 1], [80, -80]);   // Background glow movement

  return (
    <section ref={sectionRef} className="relative bg-[#030712] py-24 md:py-32 overflow-hidden" id="pattern-system">
      {/* Background Glow with Parallax */}
      <motion.div 
        style={{ y: y3 }} 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px]" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col gap-16 md:gap-24 max-w-7xl">
        
        {/* Section Heading */}
        <div className="relative text-center max-w-3xl mx-auto flex flex-col items-center gap-6">
          
          {/* Heritage SVGs - Floating background elements */}
          {/* Left SVG - Eagle Emblem */}
          <motion.div 
            style={{ y: y1 }}
            className="absolute -left-20 md:-left-40 lg:-left-[16rem] top-0 hidden sm:block pointer-events-none"
          >
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="text-slate-800/40"
            >
              <GiEagleEmblem className="w-32 h-32 md:w-48 md:h-48 drop-shadow-sm opacity-50" />
            </motion.div>
          </motion.div>

          {/* Right SVG - Oak Leaf */}
          <motion.div 
            style={{ y: y2 }}
            className="absolute -right-20 md:-right-40 lg:-right-[16rem] top-10 hidden sm:block pointer-events-none"
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [2, -2, 2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="text-slate-800/40"
            >
              <GiOakLeaf className="w-32 h-32 md:w-48 md:h-48 drop-shadow-sm opacity-50" />
            </motion.div>
          </motion.div>

          <Reveal>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-amber-500 text-sm font-bold tracking-wide shadow-sm gap-2">
              <Puzzle className="w-4 h-4" />
              المنهج · القوالب اللغوية (Lexical Approach)
            </span>
          </Reveal>
          
          <Reveal delay={100}>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.3] md:leading-[1.2]">
              لا تبدأ من المفردات المعزولة — <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-200 to-amber-500">
                ابدأ من القوالب الجاهزة.
              </span>
            </h2>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="text-lg text-slate-400 leading-relaxed font-medium">
              مفهوم مدعوم برؤية Lewis (The Lexical Approach) · شبكة تُسلّط الضوء على قاعدة أساسية لتوليد جمل صحيحة فوراً، لتعيش اللغة بدلاً من أن تدرس قواعدها.
            </p>
          </Reveal>
        </div>

        {/* Interactive Interactive Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left: The Visualizer Stage */}
          <div className="lg:col-span-7">
            <Reveal delay={300} className="w-full">
              <motion.div 
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative p-6 md:p-10 rounded-[2.5rem] bg-slate-900/40 border border-slate-800/60 backdrop-blur-xl shadow-2xl overflow-hidden group"
              >
                
                {/* Subtle Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="flex flex-col gap-8 relative z-10">
                  
                  {/* Base Token */}
                  <div className="flex items-start md:items-center gap-4 flex-col md:flex-row">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 font-mono text-sm">
                      01
                    </div>
                    <div className="flex-1 w-full bg-[#0a0d14] rounded-2xl p-5 border border-slate-800/80 shadow-inner relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500/50" />
                      <p className="font-serif text-2xl md:text-3xl text-slate-200 tracking-wide" dir="ltr">
                        {PATTERN_BASE.german}
                      </p>
                      <p className="text-slate-500 mt-2 font-medium">{PATTERN_BASE.meaning}</p>
                    </div>
                  </div>

                  {/* Connector */}
                  <div className="relative flex justify-center py-2">
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent -translate-y-1/2" />
                    <div className="relative w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-500 z-10 shadow-sm">
                      <Plus className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Branch Token (Animated) */}
                  <div className="flex items-start md:items-center gap-4 flex-col md:flex-row">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 font-mono text-sm shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                      02
                    </div>
                    <div className="flex-1 w-full bg-slate-800/40 rounded-2xl p-5 border border-amber-500/20 shadow-inner relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={branch.german}
                          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="font-serif text-2xl md:text-3xl text-amber-400 tracking-wide" dir="ltr">
                            {branch.german}
                          </p>
                          <p className="text-slate-400 mt-2 font-medium">{branch.meaning}</p>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Equals / Result line */}
                  <div className="pt-6 mt-2 border-t border-slate-800/60 flex flex-col items-center text-center gap-3">
                    <span className="text-xs font-bold text-slate-500 tracking-widest uppercase bg-slate-900/50 px-3 py-1 rounded-full border border-slate-800">
                      النتيجة النهائية
                    </span>
                    <AnimatePresence mode="wait">
                      <motion.p 
                        key={branch.meaning}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed"
                      >
                        {PATTERN_BASE.meaning} <span className="text-amber-500 font-bold">{branch.meaning}</span>
                      </motion.p>
                    </AnimatePresence>
                  </div>

                </div>
              </motion.div>
            </Reveal>
          </div>

          {/* Right: Selectors & CTA */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <Reveal delay={400} className="w-full">
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold text-slate-200 flex items-center gap-3">
                  اختر المتغير (المتلازمة):
                </h3>
                <div className="flex flex-col gap-3">
                  {PATTERN_BRANCHES.map((item, index) => {
                    const isActive = index === active;
                    return (
                      <button
                        key={item.german}
                        type="button"
                        onClick={() => setActive(index)}
                        className={`group relative flex flex-col gap-3 p-4 rounded-xl text-right transition-all duration-300 overflow-hidden ${
                          isActive 
                            ? 'bg-amber-500/10 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.05)]' 
                            : 'bg-slate-900/40 border-slate-800/60 hover:bg-slate-800/60 hover:border-slate-700'
                        } border`}
                      >
                        {/* Active indicator background slide */}
                        {isActive && (
                          <motion.div 
                            layoutId="active-branch-bg"
                            className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent pointer-events-none"
                            initial={false}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        
                        <div className="flex items-center justify-between w-full relative z-10">
                          <span className={`font-serif text-lg tracking-wide ${isActive ? 'text-amber-400' : 'text-slate-300 group-hover:text-slate-100'}`} dir="ltr">
                            {item.german}
                          </span>
                          
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${isActive ? 'bg-amber-500/20 text-amber-500' : 'bg-slate-800 text-slate-500 group-hover:text-slate-300'}`}>
                            <ChevronLeft className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Progress Bar for Complexity */}
                        <div className="flex items-center justify-end w-full gap-3 relative z-10 opacity-80 mt-1">
                          <span className="text-[10px] text-slate-500 font-medium tracking-wide">مستوى التعقيد</span>
                          <div className="w-32 h-1.5 bg-slate-800/80 rounded-full overflow-hidden flex justify-end" dir="ltr">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${item.complexity}%` }}
                              transition={{ duration: 1, ease: "easeOut", delay: isActive ? 0 : 0.1 }}
                              className={`h-full rounded-full ${isActive ? 'bg-amber-500' : 'bg-slate-600 group-hover:bg-amber-500/60'}`}
                            />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <Reveal delay={500} className="w-full">
              <div className="flex flex-col gap-6 p-6 rounded-2xl border border-slate-800/50 bg-[#0a0d14]/80 relative overflow-hidden">
                <Sparkles className="absolute top-0 left-0 text-amber-500/10 w-32 h-32 -translate-x-10 -translate-y-10" />
                <p className="text-slate-400 font-medium leading-relaxed relative z-10">
                  {PATTERN_BASE.stat}
                </p>
                
                <button className="relative z-10 flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-amber-500 text-slate-950 font-black text-lg hover:bg-amber-400 transition-colors shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                  ابدأ بقالبك الأول
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
