import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RECRUITER_REASONS } from '../data';
import { 
  Brain, 
  Users, 
  Code, 
  Workflow, 
  Rocket, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck2
} from 'lucide-react';

// ==========================================
// 1. IMPORT FILE GAMBAR HMSI DI SINI
// ==========================================
import fotoHmsi from '../assets/images/foto_hmsi.png';

// Icon mapper helper
const getHighlightIcon = (iconName: string) => {
  switch (iconName) {
    case 'Brain':
      return <Brain className="w-5 h-5 text-blue-400" />;
    case 'Users':
      return <Users className="w-5 h-5 text-indigo-400" />;
    case 'Code':
      return <Code className="w-5 h-5 text-blue-500" />;
    case 'Workflow':
      return <Workflow className="w-5 h-5 text-indigo-500" />;
    case 'Rocket':
      return <Rocket className="w-5 h-5 text-blue-400" />;
    case 'Sparkles':
      return <Sparkles className="w-5 h-5 text-indigo-500" />;
    default:
      return <ShieldCheck className="w-5 h-5 text-zinc-400" />;
  }
};

export default function RecruiterHighlights() {
  const [activeReasonId, setActiveReasonId] = useState<string | null>('reason_1');

  return (
    <section id="why-work-with-me" className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-zinc-900/60 relative">
      {/* Absolute glow overlays */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-blue-700/5 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center mb-16">
        <div className="editorial-name-tag mb-4 shadow-sm inline-block">
          RECRUITER HIGHLIGHTS
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 font-serif">
          Mengapa <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-indigo-500 bg-clip-text text-transparent italic font-normal pr-1px">Bekerja Sama Dengan Saya?</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm leading-relaxed">
          Mengkombinasikan keunggulan pemikiran komputasi sistem informasi dengan kecakapan kepemimpinan organisasi untuk menghadirkan nilai tambah yang nyata bagi tim Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Accordion Selector (7 Columns) */}
        <div className="lg:col-span-7 space-y-4 flex flex-col justify-center">
          {RECRUITER_REASONS.map((reason, idx) => {
            const isActive = activeReasonId === reason.id;
            return (
              <div
                key={reason.id}
                id={`reason-item-${reason.id}`}
                onClick={() => setActiveReasonId(reason.id)}
                className={`group relative rounded-xl border p-4 sm:p-5 transition-all duration-300 cursor-pointer overflow-hidden ${
                  isActive
                    ? 'bg-zinc-900/50 border-blue-500/40 shadow-md shadow-blue-950/20'
                    : 'bg-zinc-900/10 border-zinc-900 hover:border-zinc-800/80 hover:bg-zinc-900/20'
                }`}
              >
                {/* Horizontal progress bar for index item */}
                <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 origin-left transition-all duration-300" 
                     style={{ width: isActive ? '100%' : '0%' }} />

                <div className="flex gap-4 items-start">
                  {/* Icon Frame */}
                  <div className={`p-2.5 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-zinc-950 border-blue-500/30'
                      : 'bg-zinc-900/60 border-zinc-800 group-hover:border-zinc-700/80'
                  }`}>
                    {getHighlightIcon(reason.iconName)}
                  </div>
                  
                  {/* Text details */}
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className={`text-base font-bold transition-colors duration-305 ${isActive ? 'text-white' : 'text-zinc-300 group-hover:text-zinc-100 font-serif'}`}>
                      {reason.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>

                  {/* Indicator Arrow */}
                  <div className="self-center">
                    <ChevronRight className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${isActive ? 'rotate-90 text-blue-400' : 'group-hover:text-zinc-300'}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Interactive Rich Detail Viewer (5 Columns) */}
        <div className="lg:col-span-5">
          <div className="bg-zinc-900/10 backdrop-blur-md rounded-2xl border border-zinc-800/80 p-6 sm:p-8 flex flex-col h-full justify-between relative overflow-hidden min-h-[380px]">
            {/* Soft backdrop glow behind active description */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {activeReasonId ? (
                <motion.div
                  key={activeReasonId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 relative z-10 flex flex-col h-full justify-between"
                >
                  {(() => {
                    const activeReason = RECRUITER_REASONS.find(r => r.id === activeReasonId)!;
                    return (
                      <>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl">
                              {getHighlightIcon(activeReason.iconName)}
                            </div>
                            <div>
                              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Detail Kompetensi</span>
                              <h4 className="text-lg font-bold text-white leading-snug">{activeReason.title}</h4>
                            </div>
                          </div>
                          
                          <p className="text-zinc-300 text-sm leading-relaxed bg-zinc-950/40 p-4 rounded-xl border border-zinc-900">
                            "{activeReason.description}"
                          </p>

                          <div className="space-y-2">
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block"> </span>
                            <p className="text-zinc-400 text-xs sm:text-sm leading-normal">
                              {activeReason.extendedDetail}
                            </p>
                          </div>

                          {/* ==========================================
                             2. RENDER GAMBAR JIKA DATA YANG AKTIF ADALAH HMSI
                             (Sesuaikan 'reason_2' dengan ID data organisasimu)
                             ========================================== */}
                          {activeReasonId === 'reason_2' && (
                            <div className="mt-3 rounded-xl overflow-hidden border border-zinc-850 bg-zinc-950/40 p-1 max-h-[200px] group/img">
                              <img 
                                src={fotoHmsi} 
                                alt="Dokumentasi Kegiatan HMSI" 
                                className="w-full h-full object-cover rounded-lg opacity-85 group-hover/img:opacity-100 transition-opacity duration-300"
                              />
                            </div>
                          )}
                        </div>

                        {/* Checklist showing validation of standard recruitment expectations */}
                        <div className="pt-6 border-t border-zinc-800/60 flex items-center gap-2 text-emerald-400 text-xs font-mono font-medium">
                          <CheckCircle2 className="w-4 h-4 shrink-0 fill-emerald-500/10" />
                          <span>Kualifikasi ini tervalidasi di perkuliahan & organisasi</span>
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center h-full text-zinc-500">
                  <ChevronRight className="w-10 h-10 text-zinc-600 animate-pulse mb-2 rotate-90" />
                  <p className="text-sm font-mono">Pilih salah satu poin di sebelah kiri untuk melihat studi kasus mendalam.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}