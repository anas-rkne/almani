import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from './ui/Reveal';
import { BookOpen, Lock, Unlock, ArrowLeft, Layers, GraduationCap } from 'lucide-react';
import { GiCastle, GiCompass } from 'react-icons/gi';

export type CourseLevel = {
  id: string;
  code: string;
  free: boolean;
  title: string;
  description: string;
  stats: {
    lessons: number;
    templates: number;
  };
};

const COURSE_LEVELS: CourseLevel[] = [
  {
    id: 'a1',
    code: 'A1',
    free: true,
    title: 'المبتدئ',
    description: 'أساسيات اللغة وبناء الجمل البسيطة للحياة اليومية بثقة.',
    stats: { lessons: 20, templates: 45 },
  },
  {
    id: 'a2',
    code: 'A2',
    free: true,
    title: 'الأساسي',
    description: 'توسيع المفردات والقدرة على التعبير في المواقف المألوفة.',
    stats: { lessons: 24, templates: 60 },
  },
  {
    id: 'b1',
    code: 'B1',
    free: false,
    title: 'المتوسط',
    description: 'التواصل بطلاقة في السفر والعمل والتعبير بمرونة عن الآراء.',
    stats: { lessons: 30, templates: 85 },
  },
  {
    id: 'b2',
    code: 'B2',
    free: false,
    title: 'المتقدم',
    description: 'فهم النصوص المعقدة والتحدث بطلاقة وعفوية تامة كالمحترفين.',
    stats: { lessons: 35, templates: 110 },
  },
];

function LevelCard({ level }: { level: CourseLevel }) {
  return (
    <div className="group flex flex-col justify-between h-full p-6 lg:p-8 rounded-[2rem] bg-slate-900/40 border border-slate-800/60 backdrop-blur-xl transition-all duration-500 hover:bg-slate-800/40 hover:border-slate-700/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/5">
      
      <div className="flex flex-col gap-6">
        {/* Header: Code & Tag */}
        <div className="flex items-center justify-between">
          <div className="w-14 h-14 rounded-2xl bg-[#0a0d14] border border-slate-800 flex items-center justify-center shadow-inner group-hover:border-slate-700 transition-colors duration-500">
            <span className="font-serif text-2xl text-slate-200" dir="ltr">{level.code}</span>
          </div>
          
          <div className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide border flex items-center gap-2 shadow-sm ${
            level.free 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
              : 'bg-slate-800/50 text-slate-400 border-slate-700'
          }`}>
            {level.free ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
            {level.free ? 'مجاني بالكامل' : 'يحتاج اشتراك'}
          </div>
        </div>

        {/* Title & Desc */}
        <div>
          <h3 className="text-2xl font-bold text-slate-200 mb-3">{level.title}</h3>
          <p className="text-slate-400 font-medium leading-relaxed">{level.description}</p>
        </div>
      </div>

      {/* Footer: Stats & Button */}
      <div className="flex flex-col gap-5 mt-8 pt-6 border-t border-slate-800/50">
        <div className="flex items-center gap-4 text-sm font-medium text-slate-400">
          <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4 text-slate-500" /> {level.stats.lessons} درساً</span>
          <span className="w-1 h-1 rounded-full bg-slate-700" />
          <span className="flex items-center gap-1.5"><Layers className="w-4 h-4 text-slate-500" /> {level.stats.templates} قالباً</span>
        </div>
        
        <button className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold transition-all duration-300 ${
          level.free 
            ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.1)]' 
            : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
        }`}>
          {level.free ? 'ابدأ التعلم الآن' : 'افتح المسار'}
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}

export function CoursesBentoGridSection() {
  // Parallax Setup
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [150, -150]); // Faster upwards
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]); // Slower downwards

  return (
    <section ref={sectionRef} className="relative bg-[#030712] py-24 md:py-32" id="courses">
      <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col gap-16 md:gap-20 max-w-7xl">
        
        {/* Section Heading */}
        <div className="relative text-center max-w-3xl mx-auto flex flex-col items-center gap-6">
          
          {/* Decorative Background SVGs */}
          {/* Left SVG - Castle */}
          <motion.div 
            style={{ y: y1 }}
            className="absolute -left-20 md:-left-40 lg:-left-[16rem] top-0 hidden sm:block pointer-events-none"
          >
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [-3, 3, -3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="text-slate-800/40"
            >
              <GiCastle className="w-32 h-32 md:w-48 md:h-48 drop-shadow-sm opacity-50" />
            </motion.div>
          </motion.div>

          {/* Right SVG - Compass */}
          <motion.div 
            style={{ y: y2 }}
            className="absolute -right-20 md:-right-40 lg:-right-[16rem] top-10 hidden sm:block pointer-events-none"
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [3, -3, 3] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="text-slate-800/40"
            >
              <GiCompass className="w-32 h-32 md:w-48 md:h-48 drop-shadow-sm opacity-50" />
            </motion.div>
          </motion.div>

          <Reveal>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-amber-500 text-sm font-bold tracking-wide shadow-sm gap-2">
              <BookOpen className="w-4 h-4" />
              المسارات التعليمية
            </span>
          </Reveal>
          
          <Reveal delay={100}>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.3] md:leading-[1.2]">
              مسارات متكاملة تأخذك من <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-200 to-amber-500">
                الصفر إلى الطلاقة.
              </span>
            </h2>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="text-lg text-slate-400 leading-relaxed font-medium">
              مستويان كاملان مجاناً (A1 · A2) للبدء بلا أي قيود — اختر المسار الذي يناسب هدفك.
            </p>
          </Reveal>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-6">
          {COURSE_LEVELS.map((level, index) => {
            // A1 & A2 span 3 columns on large screens (50% width). B1 & B2 span 2 columns (33.3% width).
            const colSpan = level.id === 'a1' || level.id === 'a2' ? 'lg:col-span-3' : 'lg:col-span-2';
            
            return (
              <Reveal key={level.id} delay={index * 100} className={`${colSpan} md:col-span-1`}>
                <LevelCard level={level} />
              </Reveal>
            );
          })}

          {/* CTA Card (Spans remaining 2 columns on lg, and full width on md) */}
          <Reveal delay={400} className="lg:col-span-2 md:col-span-2">
            <div className="group relative flex flex-col justify-center items-center text-center h-full p-8 rounded-[2rem] bg-gradient-to-br from-slate-900 to-[#0a0d14] border border-amber-500/20 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-amber-500/40 hover:shadow-[0_0_40px_rgba(245,158,11,0.1)] hover:-translate-y-1">
              <div className="absolute inset-0 bg-amber-500/5 group-hover:bg-amber-500/10 transition-colors duration-500" />
              
              <div className="relative z-10 flex flex-col items-center gap-6">
                <span className="px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold tracking-wide">
                  44 درساً · أكثر من 100 قالب
                </span>
                
                <div className="space-y-3">
                  <h3 className="text-xl lg:text-2xl font-black text-white leading-snug">القوالب الأولى لك في انتظار</h3>
                  <p className="text-slate-400 font-medium text-sm lg:text-base">افتح الحساب المجاني وابدأ بناء جملك الأولى خلال دقيقة.</p>
                </div>

                <button className="flex items-center justify-center gap-3 mt-2 w-full py-3.5 rounded-xl bg-amber-500 text-slate-950 font-black transition-colors shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:bg-amber-400">
                  ابدأ رحلتك الآن
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
