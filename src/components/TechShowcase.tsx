import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../data'; // Memastikan data.ts Anda ter-import dengan benar
import { 
  Award, 
  ShieldCheck, 
  ArrowUpRight, 
  Eye
} from 'lucide-react';

// Import gambar sertifikat asli Anda
import sertifikatImg from '../assets/images/sertifikat_data_academy.png';

interface Project {
  id: string;
  title: string;
  description: string;
  techStack?: string[];
  category?: string;
  externalUrl?: string;
}

// Custom SVG Logos untuk Tech Stack Tab
const renderSkillLogo = (id: string) => {
  switch (id) {
    case 'react':
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-[84px] h-[84px] animate-[spin_16s_linear_infinite]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
          <g stroke="#61dafb" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      );
    case 'typescript':
      return (
        <svg viewBox="0 0 100 100" className="w-[72px] h-[72px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="16" fill="#3178c6"/>
          <text x="82" y="80" fill="white" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="36" textAnchor="end">TS</text>
        </svg>
      );
    case 'tailwind':
      return (
        <svg viewBox="0 0 100 100" className="w-[76px] h-[76px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 30c-5.5 0-9.2 2.8-11 8.2 5.5-1.8 10.1-.9 13.8 2.8C56 44.2 58.7 51 64.7 51c5.5 0 9.2-2.8 11-8.2-5.5 1.8-10.1.9-13.8-2.8C58.7 36.8 56 30 50 30zm-15 20c-5.5 0-9.2 2.8-11 8.2 5.5-1.8 10.1-.9 13.8 2.8C41 64.2 43.7 71 49.7 71c5.5 0 9.2-2.8 11-8.2-5.5 1.8-10.1.9-13.8-2.8C43.7 56.8 41 50 35 50z" fill="#38bdf8" />
        </svg>
      );
    case 'html':
      return (
        <svg viewBox="0 0 100 100" className="w-[72px] h-[72px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 10l8 70 27 10 27-10 8-70H15z" fill="#e34f26" />
          <path d="M50 82.5l19.5-7.3 6.3-55.2H50v62.5z" fill="#f06529" />
          <path d="M50 34.1h13.2l-.9 10H50v-10zm0 17.5h11.6l-1.1 12-10.5 3.9v-15.9z" fill="#ebebeb" />
          <path d="M50 34.1v10H36.8l-.9-10H50zm0 17.5H35l-1 10.1 16 4.3v-14.4z" fill="#ffffff" />
        </svg>
      );
    case 'css':
      return (
        <svg viewBox="0 0 100 100" className="w-[72px] h-[72px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 10l8 70 27 10 27-10 8-70H15z" fill="#1572b6" />
          <path d="M50 82.5l19.5-7.3 6.3-55.2H50v62.5z" fill="#33a9dc" />
          <path d="M50 34.1h13.2l-1.3 14H50v-14zm0 21.5h11l-1.1 12-9.9 3.9v-15.9z" fill="#ebebeb" />
          <path d="M50 34.1v14H34.4l-.4-4h16V34.1zm0 21.5H35l-1 10.1 16 4.3v-14.4z" fill="#ffffff" />
        </svg>
      );
    case 'vite':
      return (
        <svg viewBox="0 0 100 100" className="w-[74px] h-[74px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="viteGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#41D1FF" />
              <stop offset="100%" stopColor="#BD34FE" />
            </linearGradient>
            <linearGradient id="boltGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFEA79" />
              <stop offset="100%" stopColor="#FFC517" />
            </linearGradient>
          </defs>
          <path d="M50 12L90 20L50 88L10 20Z" fill="url(#viteGrad)" opacity="0.9" />
          <path d="M52 24L32 50H50L45 78L68 40H48L52 24Z" fill="url(#boltGrad)" />
        </svg>
      );
    case 'supabase':
      return (
        <svg viewBox="0 0 96 96" className="w-[74px] h-[74px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M53.3 11a1 1 0 00-1 .9L49 32.3H32.1a1 1 0 00-.7 1.7l30 29.5a1 1 0 001.7-.8l3.3-20.4h16.9a1 1 0 00.7-1.7l-30-29.5a1 1 0 00-.7-.1z" fill="#3ecf8e"/>
          <path d="M42.7 85a1 1 0 00+1-.9l3.3-20.4H63.9a1 1 0 00.7-1.7l-30-29.5a1 1 0 00-1.7.8l-3.3 20.4H12.1a1 1 0 00-.7 1.7l30 29.5c.2.2.4.3.7.3z" fill="#3ecf8e"/>
        </svg>
      );
    case 'figma':
      return (
        <svg viewBox="0 0 100 150" className="w-[60px] h-[80px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 25c0-13.8 11.2-25 25-25h25v50H50c-13.8 0-25-11.2-25-25z" fill="#F24E1E"/>
          <path d="M50 0h25c13.8 0 25 11.2 25 25s-11.2 25-25 25H50V0z" fill="#FF7262"/>
          <path d="M25 75c0-13.8 11.2-25 25-25h25v50H50c-13.8 0-25-11.2-25-25z" fill="#A259FF"/>
          <path d="M50 50h25c13.8 0 25 11.2 25 25s-11.2 25-25 25H50V50z" fill="#1ABC9C"/>
          <path d="M25 125c0-13.8 11.2-25 25-25s25 11.2 25 25v25c0 13.8-11.2 25-25 25s-25-11.2-25-25v-25z" fill="#0ACF83"/>
        </svg>
      );
    case 'javascript':
      return (
        <svg viewBox="0 0 100 100" className="w-[72px] h-[72px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="16" fill="#f7df1e"/>
          <text x="85" y="85" fill="black" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="38" textAnchor="end">JS</text>
        </svg>
      );
    case 'mysql':
      return (
        <svg viewBox="0 0 100 100" className="w-[76px] h-[76px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M34 26c11-9 28-8 35 1 5-4 12-6 19-3-6 5-10 13-10 20 0 17 11 25 18 31-11 5-28 0-33-8-4-8-1-18 1-26 1-4 2-10 0-14-10 14-27 12-30-1M45 42a3 3 0 100-6 3 3 0 000 6z" fill="#00758f"/>
          <path d="M12 79a36 36 0 0058 11" stroke="#f29111" strokeWidth="3.5" strokeLinecap="round"/>
        </svg>
      );
    default:
      return null;
  }
};

const TECH_STACK_ITEMS = [
  { id: 'react', name: 'React.js' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'tailwind', name: 'Tailwind' },
  { id: 'html', name: 'HTML' },
  { id: 'css', name: 'CSS' },
  { id: 'vite', name: 'Vite' },
  { id: 'supabase', name: 'Supabase' },
  { id: 'figma', name: 'Figma' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'mysql', name: 'MySQL' }
];

// Interactive Micro-Frontends Mockups
const renderProjectMockup = (id: string) => {
  switch (id) {
    case 'work_well':
      return (
        <div className="w-full h-44 bg-[#FDFDFD] border border-zinc-200 rounded-xl overflow-hidden relative font-sans text-left text-zinc-800 p-3 select-none flex flex-col justify-between shadow-inner">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-1.5 mb-1 text-[9px] relative z-10 w-full">
            <div className="flex items-center gap-1 font-bold text-[#b45309]">
              <span>💼</span>
              <span>Work Well</span>
            </div>
            <div className="flex gap-2 text-zinc-500 scale-[0.9]">
              <span>Cari Workspace</span>
              <span>Keunggulan</span>
            </div>
            <button className="bg-amber-700 text-white font-semibold text-[7px] px-2 py-0.5 rounded shrink-0">Jadi Mitra</button>
          </div>
          <div className="text-center my-0.5 relative z-10">
            <h4 className="text-[10px] font-extrabold text-zinc-900 leading-tight">Cari Workspace Terdekat</h4>
            <p className="text-[6.5px] text-zinc-400 mt-0.5 scale-[0.95]">Gunakan filter cerdas untuk menemukan area kerja</p>
          </div>
          <div className="flex items-center gap-1 py-1 truncate scale-[0.85] origin-left relative z-10">
            <span className="bg-[#b45309] text-white text-[7px] px-2 py-0.5 rounded-full font-bold">Semua</span>
            <span className="bg-zinc-100 text-zinc-600 text-[7px] px-2 py-0.5 rounded-full font-medium">Coffee Shop</span>
            <span className="bg-zinc-100 text-zinc-600 text-[7px] px-2 py-0.5 rounded-full font-medium">Lounge</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 mt-0.5 relative z-10">
            <div className="bg-white border border-zinc-150 rounded-lg p-1 text-[7px] shadow-sm flex flex-col gap-0.5">
              <div className="w-full h-10 bg-zinc-200 rounded bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=120&q=50')` }} />
              <div className="font-bold text-zinc-800 flex items-center justify-between">
                <span className="truncate">Kopi Ruang Kerja</span>
                <span className="text-amber-600 font-extrabold text-[6px]">⭐ 4.8</span>
              </div>
              <div className="font-semibold text-zinc-700 text-[6px]">Rp 25.000 /jam</div>
            </div>
            <div className="bg-white border border-zinc-150 rounded-lg p-1 text-[7px] shadow-sm flex flex-col gap-0.5">
              <div className="w-full h-10 bg-zinc-200 rounded bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=120&q=50')` }} />
              <div className="font-bold text-zinc-800 flex items-center justify-between">
                <span className="truncate">Veranda Lounge</span>
                <span className="text-amber-600 font-extrabold text-[6px]">⭐ 4.9</span>
              </div>
              <div className="font-semibold text-zinc-700 text-[6px]">Rp 30.000 /jam</div>
            </div>
          </div>
        </div>
      );
    case 'open_office':
      return (
        <div className="w-full h-44 bg-[#F5F5F7] border border-zinc-200 rounded-xl overflow-hidden relative font-sans text-left text-zinc-800 p-2.5 select-none flex flex-col gap-1 shadow-inner">
          <div className="flex items-center justify-between border-b border-zinc-200/80 pb-1 mb-1 text-[8px] relative z-10 w-full">
            <div className="flex items-center gap-1 font-bold text-zinc-800">
              <span className="w-2.5 h-2.5 rounded bg-amber-800 text-white flex items-center justify-center text-[5px]">☕</span>
              <span>Open Office Admin</span>
            </div>
            <div className="text-zinc-500 font-mono scale-[0.9]">Dashboard</div>
          </div>
          <div className="grid grid-cols-3 gap-1 relative z-10">
            <div className="bg-white border border-zinc-150 rounded p-1">
              <span className="text-[5.5px] text-zinc-400 block font-semibold uppercase">TOTAL ORDER</span>
              <span className="text-[8.5px] font-extrabold text-zinc-800">2.184</span>
            </div>
            <div className="bg-white border border-zinc-150 rounded p-1">
              <span className="text-[7.5px] font-extrabold text-zinc-800 truncate block">Rp 939M</span>
            </div>
            <div className="bg-white border border-zinc-150 rounded p-1">
              <span className="text-[8.5px] font-extrabold text-zinc-800">6 Mitra</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1.5 mt-0.5 flex-1 relative z-10">
            <div className="bg-white border border-zinc-150 rounded p-1 flex flex-col justify-between">
              <span className="text-[5.5px] font-bold text-zinc-400 uppercase">TREN INCOME</span>
              <svg className="w-full h-6 overflow-visible" viewBox="0 0 100 40">
                <path d="M0 35 Q20 28, 40 20 T80 12 T100 8" fill="none" stroke="#b45309" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="bg-white border border-zinc-150 rounded p-1 flex flex-col justify-between">
              <span className="text-[5.5px] font-bold text-zinc-400 uppercase">CAPACITY</span>
              <div className="h-6 flex items-end justify-between gap-0.5">
                <span className="w-1.5 bg-amber-700 h-4 rounded-sm" />
                <span className="w-1.5 bg-amber-700 h-6 rounded-sm" />
                <span className="w-1.5 bg-amber-700 h-9 rounded-sm" />
              </div>
            </div>
          </div>
        </div>
      );
    case 'its_threedi':
      return (
        <div className="w-full h-44 bg-[#fdfafb] border border-rose-100 rounded-xl overflow-hidden relative font-sans text-center text-zinc-800 p-3 select-none flex flex-col justify-between shadow-inner">
          <div className="flex items-center justify-between border-b border-rose-100 pb-1 text-[8px] relative z-10 w-full">
            <div className="flex items-center gap-1 font-extrabold text-pink-600">
              <span>3d</span>
              <span>its.threedi</span>
            </div>
            <span className="text-[6.5px] text-[#9d174d] font-bold uppercase px-1.5 py-0.5 bg-pink-50 rounded">BUTIK PILIHAN</span>
          </div>
          <div className="my-auto relative z-10 py-0.5">
            <h3 className="text-[11px] font-extrabold text-stone-900 tracking-tight">
              Pilihan Terbaik. Premium. <span className="italic text-pink-600 font-serif">Unik.</span>
            </h3>
            <p className="text-[5.5px] text-zinc-400 max-w-[190px] mx-auto mt-0.5">Kurasi pakaian Korea standar Grade-A.</p>
          </div>
          <button className="bg-stone-900 text-white text-[6.5px] font-semibold py-1 px-2.5 rounded-lg mx-auto shadow block">
            Belanja Rilis Terbaru ➔
          </button>
        </div>
      );
    case 'agritech_figma':
      return (
        <div className="w-full h-44 bg-[#EEC94D] border border-amber-300 rounded-xl overflow-hidden relative font-sans text-left text-zinc-800 select-none flex flex-col justify-between shadow-inner">
          <div className="flex items-center justify-between bg-black/5 px-2.5 py-1 text-[8px] border-b border-black/5">
            <div className="flex items-center gap-1 font-bold text-zinc-900">
              <span>🌾</span>
              <span>AgriTech Prototype (Figma)</span>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center gap-2 px-2">
            <div className="w-[50px] h-[75px] bg-[#1a2f4c] rounded text-white p-1 flex flex-col justify-between shadow-md">
              <span className="text-[3px] text-emerald-400 font-mono">WELCOME</span>
              <div className="bg-emerald-500 text-white rounded text-[4px] py-0.5 text-center font-bold">Masuk</div>
            </div>
            <div className="w-[50px] h-[75px] bg-white rounded text-zinc-900 p-1 flex flex-col justify-between shadow-md">
              <span className="text-[3.5px] font-bold text-emerald-700">Dashboard</span>
              <div className="bg-[#ecc94b] text-zinc-900 rounded-[2px] text-[3.5px] py-0.5 text-center font-bold">Menu</div>
            </div>
          </div>
        </div>
      );
    case 'wonosobo_gis':
      return (
        <div className="w-full h-44 bg-[#05110d] border border-[#0d2a21] rounded-xl overflow-hidden relative font-sans text-left text-zinc-300 p-2.5 select-none flex flex-col justify-between shadow-inner">
          <div className="bg-zinc-950/95 border border-[#103d30] p-1 rounded w-[85px] flex flex-col gap-0.5 z-10">
            <span className="text-[6.5px] font-bold text-[#22c55e] leading-none">🏔️ Wonosobo GIS</span>
            <p className="text-[4.5px] text-zinc-400">Peta jalur pendakian interaktif.</p>
          </div>
          <div className="absolute top-[35%] left-[55%] z-20 flex flex-col items-center">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full border border-white" />
            <span className="bg-zinc-950/95 border border-amber-500 text-[4px] font-extrabold py-0.5 px-1 rounded text-white mt-0.5">Sindoro 3.136m</span>
          </div>
        </div>
      );
    default:
      return <div className="w-full h-44 bg-zinc-900 rounded-xl flex items-center justify-center text-zinc-500 text-xs">Mockup View</div>;
  }
};

const CERTIFICATE_DATA = {
  title: "Data Science & Analytics Track",
  issuer: "Cybertrend Data Academy",
  date: "September 11, 2025",
  credentialId: "CDA-2025-8893",
  skills: [
    "Kompeten dalam analisis prediktif, klasterisasi, dan visualisasi data.",
    "Verifikasi penyelesaian capstone project berskala industri."
  ]
};

export default function TechShowcase() {
  const [activeTab, setActiveTab] = useState<'projects' | 'certificates' | 'tech_stack'>('projects');

  return (
    <section 
      id="portfolio-showcase" 
      className="py-24 px-4 md:px-8 max-w-7xl mx-auto border border-zinc-900/80 relative overflow-hidden bg-[#070709] rounded-[40px] shadow-2xl my-10 select-none text-white"
    >
      {/* BACKGROUND GRAPHIC LAYER - Premium Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111115_1px,transparent_1px),linear-gradient(to_bottom,#111115_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none opacity-70" />
      
      {/* TEXTURED OVERLAY - Matte Noise Effect */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZHRoPSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii41Ii8+Cjwvc3ZnPg==')]" />

      {/* AMBIENT GLOW BACKLIGHTS */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* HEADER ZONE */}
      <div className="flex flex-col items-center justify-between gap-6 mb-12 relative z-10 w-full">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 uppercase">
            Portfolio Showcase
          </h2>
          <p className="text-zinc-400 font-sans text-sm md:text-base max-w-2xl mx-auto leading-relaxed italic">
            Explore my journey through projects, certifications, and technical expertise.
          </p>
        </div>
      </div>

      {/* Navigation Switcher Tabs */}
      <div id="portfolio-tabs-container" className="flex items-center justify-center mb-14 relative z-10">
        <div className="bg-[#121214]/90 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-1.5 flex gap-1 shadow-xl">
          {[
            { id: 'projects', label: 'Projects' },
            { id: 'certificates', label: 'Certificates' },
            { id: 'tech_stack', label: 'Tech Stack' }
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[#212124] text-white border border-zinc-700/40 shadow-md'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Render Showcase Panel */}
      <div className="relative z-10 w-full min-h-[420px]">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: PROJECTS PANEL */}
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
            >
              {PROJECTS.map((project: Project) => (
                <div
                  key={project.id}
                  className="bg-[#121214]/50 border border-zinc-900 rounded-[32px] p-5 flex flex-col justify-between shadow-xl hover:bg-[#151518]/90 hover:border-zinc-800/80 transition-all duration-300 group border-t-zinc-800/10"
                >
                  {/* Mockup Frame */}
                  <div className="w-full relative rounded-2xl overflow-hidden mb-5 transform group-hover:scale-[1.01] transition-transform duration-300">
                    {renderProjectMockup(project.id)}
                  </div>

                  {/* Text Contents */}
                  <div className="px-2 flex-1 flex flex-col justify-between text-left">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-amber-500 transition-colors truncate">
                          {project.title}
                        </h3>
                        {project.category && (
                          <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900/50 px-2 py-0.5 rounded border border-zinc-800/30 truncate max-w-[155px]">
                            {project.category}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed mb-5 line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Bottom Utility Bar: techStack & Live URL Button */}
                    <div className="flex items-center justify-between gap-4 pt-3 border-t border-zinc-900/60">
                      <div className="flex items-center gap-1.5 overflow-hidden truncate max-w-[65%]">
                        {project.techStack?.slice(0, 3).map((tag, idx) => (
                          <span 
                            key={idx} 
                            className="bg-zinc-900/90 text-zinc-400 text-[10px] font-mono font-medium px-2.5 py-1 rounded-md border border-zinc-800/40 uppercase tracking-wider shrink-0"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.techStack && project.techStack.length > 3 && (
                          <span className="text-[10px] text-zinc-500 font-mono">+{project.techStack.length - 3}</span>
                        )}
                      </div>
                      
                      {project.externalUrl ? (
                        <a
                          href={project.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-3.5 py-1.5 rounded-xl transition-all duration-200 font-bold shrink-0 shadow-sm group-hover:border-amber-500/30"
                        >
                          Live <ArrowUpRight size={13} className="text-zinc-500 group-hover:text-amber-500 transition-colors" />
                        </a>
                      ) : (
                        <span className="text-[10px] text-zinc-500 italic">No link available</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* TAB 2: CERTIFICATES PANEL */}
          {activeTab === 'certificates' && (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-[#0e0e10] border border-zinc-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-amber-500/10 text-amber-500 p-3 rounded-2xl border border-amber-500/20">
                      <Award className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                        Certified Professional
                      </span>
                      <h3 className="text-2xl font-extrabold text-white mt-2 tracking-tight">{CERTIFICATE_DATA.title}</h3>
                      <p className="text-sm text-zinc-400 font-medium">Issued by {CERTIFICATE_DATA.issuer}</p>
                    </div>
                  </div>
                </div>

                <hr className="border-zinc-800/80 my-5" />

                <div className="space-y-3.5 my-6">
                  {CERTIFICATE_DATA.skills.map((skill, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">{skill}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-5 border-t border-zinc-900 mt-8">
                  <div className="space-y-1 font-mono text-[11px] text-zinc-500">
                    <p>ID KREDENSIAL: <span className="text-zinc-400 font-sans font-medium">{CERTIFICATE_DATA.credentialId}</span></p>
                    <p>TANGGAL TERBIT: <span className="text-zinc-400 font-sans font-medium">{CERTIFICATE_DATA.date}</span></p>
                  </div>
                  
                  <a
                    href={sertifikatImg}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm px-6 py-3.5 rounded-xl border border-zinc-800 transition-all duration-200 active:scale-95 shadow-md"
                  >
                    <Eye className="w-4 h-4 text-amber-500" />
                    Lihat Sertifikasi
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: TECH STACK PANEL */}
          {activeTab === 'tech_stack' && (
            <motion.div
              key="tech_stack"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto"
            >
              {TECH_STACK_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#121214]/60 border border-zinc-900 rounded-[28px] py-9 px-6 flex flex-col items-center justify-between shadow-xl hover:bg-[#161619]/80 hover:border-zinc-800 transition-all duration-300 hover:scale-[1.04] group hover:shadow-[0_20px_40px_rgba(0,0,0,0.55)] border-t-zinc-800/25 relative"
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-white/[0.015] rounded-full filter blur-xl group-hover:bg-white/[0.035] pointer-events-none" />
                  <div className="h-24 flex items-center justify-center relative z-10 transform group-hover:scale-105 transition-transform duration-300">
                    {renderSkillLogo(item.id)}
                  </div>
                  <span className="text-xs sm:text-sm font-sans font-semibold tracking-wide text-zinc-400 group-hover:text-zinc-200 transition-colors uppercase mt-4">
                    {item.name}
                  </span>
                </div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}