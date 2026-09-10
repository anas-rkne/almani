import { Reveal } from './ui/Reveal';
import { motion } from 'framer-motion';
import { GiCastle } from 'react-icons/gi';
import { 
  ArchiveX, Layers, 
  FileText, MessageCircle, 
  UserMinus, Zap, 
  BookX, Lightbulb,
  Landmark
} from 'lucide-react';

const COMPARISONS = [
  {
    id: 1,
    title: 'النهج الأساسي',
    old: 'قاعدة معزولة عن الموقف',
    oldIcon: ArchiveX,
    new: 'موقف، صوت، إحساس ككتلة واحدة',
    newIcon: Layers,
  },
  {
    id: 2,
    title: 'الاستخدام الفعلي',
    old: 'كلمة في الدفتر، لا كلمة في اللسان',
    oldIcon: FileText,
    new: 'جملة حيّة تُستخدم غداً فعلاً',
    newIcon: MessageCircle,
  },
  {
    id: 3,
    title: 'النتيجة بعد التعلم',
    old: 'صمت أمام الأجنبي بعد سنين',
    oldIcon: UserMinus,
    new: 'كلام من الأسبوع الأول',
    newIcon: Zap,
  },
  {
    id: 4,
    title: 'استيعاب القواعد',
    old: 'تبدأ بالقواعد ثم تحتار أين تستخدمها',
    oldIcon: BookX,
    new: 'القاعدة تُستنبط لاحقاً تلقائياً',
    newIcon: Lightbulb,
  }
];

export function PhilosophySection() {
  return (
    <section id="philosophy" className="relative py-24 md:py-32 bg-slate-950 overflow-hidden" dir="rtl">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col gap-16 md:gap-24">
        
        {/* Section Heading */}
        <div className="relative text-center max-w-3xl mx-auto flex flex-col items-center gap-6">
          
          {/* German Culture SVGs - Floating background elements */}
          {/* Left SVG - Castle */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-32 md:-left-48 lg:-left-[18rem] top-0 text-slate-800/40 hidden sm:block pointer-events-none"
          >
            <GiCastle className="w-32 h-32 md:w-48 md:h-48 drop-shadow-sm opacity-50" />
          </motion.div>

          {/* Right SVG - Brandenburg Gate (Landmark) */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -right-32 md:-right-48 lg:-right-[18rem] top-10 text-slate-800/40 hidden sm:block pointer-events-none"
          >
            <Landmark className="w-32 h-32 md:w-48 md:h-48 drop-shadow-sm opacity-50" strokeWidth={1} />
          </motion.div>

          <Reveal>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-amber-500 text-sm font-bold tracking-wide shadow-sm">
              الفلسفة · لماذا تفشل الطرق التقليدية؟
            </span>
          </Reveal>
          
          <Reveal delay={100}>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              الطفل لا يدرس قواعد؛ <br className="hidden md:block" />
              الطفل يعيش اللغة.
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-xl md:text-2xl text-amber-400/90 font-medium">
              واللغة لا تُحفظ بالدراسة — تُعاش بالموقف والصوت.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl">
              كيف تعلمت لغتك الأم؟ وكيف تدرّس المدرسة اللغة؟ المدرسة تعكس الاتجاه: قاعدة بعيدة عن الموقف. نحن نعيده: الموقف أولاً، ثم الجملة، ثم الاستنباط.
            </p>
          </Reveal>
        </div>

        {/* Bento Box Grid */}
        <div className="grid md:grid-cols-2 gap-4 lg:gap-6 max-w-6xl mx-auto w-full">
          {COMPARISONS.map((comp, idx) => (
            <Reveal key={comp.id} delay={400 + idx * 100}>
              <div className="group relative flex flex-col rounded-[2rem] border border-slate-800/60 bg-slate-900/40 backdrop-blur-xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-slate-700/80 hover:shadow-[0_20px_60px_rgba(245,158,11,0.05)]">
                
                {/* Bento Title */}
                <div className="px-6 pt-6 pb-4 border-b border-slate-800/50 bg-slate-900/20">
                  <h3 className="text-sm font-bold text-slate-400 tracking-widest uppercase">{comp.title}</h3>
                </div>

                {/* Split Content (Left/Right) using CSS Grid */}
                <div className="grid grid-cols-2 flex-1 divide-x divide-x-reverse divide-slate-800/50">
                  
                  {/* Old Way (Dull, noisy, crossed out) */}
                  <div className="p-6 flex flex-col gap-4 relative overflow-hidden bg-[#0a0d14]/80 grayscale-[50%]">
                    {/* CSS Noise Pattern */}
                    <div 
                      className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                    />
                    
                    <div className="flex flex-col items-start gap-3 relative z-10">
                      <div className="p-2.5 rounded-xl bg-slate-800 text-slate-500 border border-slate-700/50 mb-1">
                        <comp.oldIcon className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <span className="text-xs font-bold text-slate-500 bg-slate-800/50 px-2.5 py-1 rounded-md">التقليدية</span>
                    </div>
                    <p className="text-slate-500 font-medium leading-relaxed line-through decoration-slate-700 relative z-10 mt-auto">
                      {comp.old}
                    </p>
                  </div>

                  {/* New Way (Glowing, highlighted) */}
                  <div className="p-6 flex flex-col gap-4 relative overflow-hidden bg-slate-800/20 group-hover:bg-slate-800/40 transition-colors duration-500">
                    {/* Hover Glow */}
                    <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-500" />
                    
                    <div className="flex flex-col items-start gap-3 relative z-10">
                      <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)] group-hover:scale-110 group-hover:bg-amber-500/25 transition-all duration-300 mb-1">
                        <comp.newIcon className="w-5 h-5" strokeWidth={2} />
                      </div>
                      <span className="text-xs font-black text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md shadow-sm">طريقتنا</span>
                    </div>
                    <p className="text-slate-100 font-bold text-lg leading-relaxed relative z-10 drop-shadow-md mt-auto">
                      {comp.new}
                    </p>
                  </div>

                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
