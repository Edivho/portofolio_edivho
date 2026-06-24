import React from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data';
import { 
  GraduationCap, 
  MapPin, 
  Mail, 
  Code2, 
  Award,
  CircleDot
} from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 md:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background abstract decoration elements */}
      <div className="absolute -right-40 top-1/4 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-10 bottom-10 w-64 h-64 bg-blue-700/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="text-center md:text-left mb-12">
        {/* Editorial Left-Border Accent Bar Label */}
        <div className="editorial-name-tag mb-4 shadow-sm inline-block">
          Mengenal Lebih Dekat
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-2 font-serif">
          Tentang <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent italic font-normal pr-1">Edivho Febrian Putra</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Professional Profile Card (4 Columns) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 xl:col-span-4 bg-zinc-900/10 border border-zinc-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl relative group overflow-hidden card-with-left-line"
        >
          {/* Subtle moving top light bar on hover */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

          {/* Interactive Profile Representation (Stylized avatar icon card with tech vibes) */}
          <div className="flex flex-col items-center text-center pb-6 border-b border-zinc-800/60">
            <div className="relative mb-4 group/avatar">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-md opacity-30 group-hover/avatar:opacity-60 transition duration-500" />
              <div className="relative w-28 h-28 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center p-0.5">
                {/* Modern visual initials placeholder with beautiful design details */}
                <div className="w-full h-full rounded-[14px] bg-gradient-to-br from-zinc-900 to-zinc-950 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:10px_10px] opacity-10" />
                  <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent font-sans">
                    EFP
                  </span>
                  <Code2 className="w-4 h-4 text-blue-500/45 mt-1" />
                </div>
              </div>
              
              {/* Online status tag */}
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 border-2 border-zinc-950"></span>
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors font-serif">
              {PERSONAL_INFO.name}
            </h3>
            <p className="text-xs text-blue-400 font-mono font-medium max-w-xs uppercase tracking-wide">
              {PERSONAL_INFO.roleid}
            </p>
          </div>

          {/* Core Info Metadata Grid */}
          <div className="py-6 space-y-4 text-sm">
            <div className="flex items-center gap-3.5 text-zinc-400 hover:text-zinc-300 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-zinc-950/60 flex items-center justify-center text-blue-400 border border-zinc-800">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Pendidikan</p>
                <p className="font-semibold text-zinc-200 text-xs sm:text-sm">{PERSONAL_INFO.university}</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 text-zinc-400 hover:text-zinc-300 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-zinc-950/60 flex items-center justify-center text-indigo-400 border border-zinc-800">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Lokasi Base</p>
                <p className="font-semibold text-zinc-200 text-xs sm:text-sm">{PERSONAL_INFO.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 text-zinc-400 hover:text-zinc-300 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-zinc-950/60 flex items-center justify-center text-blue-400 border border-zinc-800">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Kontak Email</p>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="font-mono text-blue-400 hover:underline text-xs text-zinc-250">
                  {PERSONAL_INFO.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3.5 text-zinc-400 hover:text-zinc-300 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-zinc-950/60 flex items-center justify-center text-indigo-400 border border-zinc-800">
                <Award className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Fokus Utama</p>
                <p className="font-semibold text-zinc-200 text-xs sm:text-sm">Produk Digital & Sistem Informasi</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-950/40 rounded-xl p-3 border border-zinc-800/50 text-center font-mono text-[10px] text-zinc-500 flex items-center justify-center gap-2">
            <CircleDot className="w-3 h-3 text-blue-400 animate-pulse" />
            <span>Aktif kuliah </span>
          </div>
        </motion.div>

        {/* Right Side: Detailed Professional Narrative (7 Columns) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between bg-zinc-900/10 border border-zinc-800/40 rounded-2xl p-6 sm:p-8"
        >
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 font-serif tracking-tight leading-relaxed">
              Membangun Solusi, Menyelaraskan Bisnis, dan Mengakselerasi Dampak Melalui Sistem Informasi.
            </h3>
            
            <p className="text-zinc-305 text-sm sm:text-base leading-relaxed font-sans first-letter:text-5xl first-letter:font-extrabold first-letter:text-blue-500 first-letter:float-left first-letter:mr-3 first-letter:font-serif">
              {PERSONAL_INFO.bioId}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}