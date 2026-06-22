import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data';
import { 
  Award, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  ArrowUpRight, 
  Terminal, 
  Layers, 
  Code2,
  X,
  Printer,
  Download,
  Eye,
  Maximize2
} from 'lucide-react';

// Custom high-fidelity brand SVGs matching the requested layout precisely
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
    case 'laravel':
      return (
        <svg viewBox="0 0 100 100" className="w-[72px] h-[72px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M83.8 24.2L53.1 6.5c-1.9-1.1-4.3-1.1-6.2 0L16.2 24.2c-1.9 1.1-3.1 3.1-3.1 5.3v35.4c0 2.2 1.2 4.2 3.1 5.3l30.7 17.7c1.9 1.1 4.3 1.1 6.2 0l30.7-17.7c1.9-1.1 3.1-3.1 3.1-5.3V29.5c0-2.2-1.2-4.2-3.1-5.3z" fill="#ff2d20"/>
          <path d="M50 20l20 11.5v23L50 66 30 54.5v-23L50 20z" fill="#ffffff" opacity="0.15"/>
          <path d="M52 28v42l16-9.2V37.2L52 28zM32 37.2v17.6c0 .7.4 1.4 1 1.7L46 64V46.4l-14-9.2z" fill="#ffffff"/>
        </svg>
      );
    case 'supabase':
      return (
        <svg viewBox="0 0 96 96" className="w-[74px] h-[74px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M53.3 11a1 1 0 00-1 .9L49 32.3H32.1a1 1 0 00-.7 1.7l30 29.5a1 1 0 001.7-.8l3.3-20.4h16.9a1 1 0 00.7-1.7l-30-29.5a1 1 0 00-.7-.1z" fill="#3ecf8e"/>
          <path d="M42.7 85a1 1 0 001-.9l3.3-20.4H63.9a1 1 0 00.7-1.7l-30-29.5a1 1 0 00-1.7.8l-3.3 20.4H12.1a1 1 0 00-.7 1.7l30 29.5c.2.2.4.3.7.3z" fill="#3ecf8e"/>
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

// Precise list order from the user's reference screenshot
const TECH_STACK_ITEMS = [
  { id: 'react', name: 'React.Js' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'tailwind', name: 'Tailwind' },
  { id: 'html', name: 'HTML' },
  { id: 'css', name: 'CSS' },
  { id: 'vite', name: 'Vite' },
  { id: 'laravel', name: 'Laravel' },
  { id: 'supabase', name: 'Supabase' },
  { id: 'figma', name: 'Figma' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'mysql', name: 'MySQL' }
];

const renderProjectMockup = (id: string) => {
  switch (id) {
    case 'work_well':
      return (
        <div className="w-full h-44 bg-[#FDFDFD] border border-zinc-200 rounded-xl overflow-hidden relative font-sans text-left text-zinc-850 p-3 select-none flex flex-col justify-between shadow-inner">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-1.5 mb-1 text-[9px] relative z-10 w-full">
            <div className="flex items-center gap-1 font-bold text-[#b45309]">
              <span>💼</span>
              <span>Work Well</span>
            </div>
            <div className="flex gap-2 text-zinc-500 scale-[0.9]">
              <span>Cari Workspace</span>
              <span>Keunggulan</span>
            </div>
            <button className="bg-amber-700 hover:bg-amber-850 text-white font-semibold text-[7px] px-2 py-0.5 rounded cursor-default shrink-0">Jadi Mitra</button>
          </div>
          <div className="text-center my-0.5 relative z-10">
            <h4 className="text-[10px] font-extrabold text-zinc-900 leading-tight">Cari Workspace Terdekat</h4>
            <p className="text-[6.5px] text-zinc-400 mt-0.5 scale-[0.95]">Gunakan filter cerdas di bawah untuk menemukan area kerja</p>
          </div>
          <div className="flex items-center gap-1 py-1 truncate scale-[0.85] origin-left relative z-10">
            <span className="bg-[#b45309] text-white text-[7px] px-2 py-0.5 rounded-full font-bold shadow-sm">Semua</span>
            <span className="bg-zinc-100 text-zinc-600 text-[7px] px-2 py-0.5 rounded-full font-medium">Coffee Shop</span>
            <span className="bg-zinc-100 text-zinc-600 text-[7px] px-2 py-0.5 rounded-full font-medium">Lounge</span>
            <span className="bg-zinc-100 text-zinc-650 text-[7px] px-2 py-0.5 rounded-full font-medium">Meeting Room</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 mt-0.5 relative z-10">
            <div className="bg-white border border-zinc-150 rounded-lg p-1 text-[7px] shadow-sm flex flex-col gap-0.5">
              <div className="w-full h-10 bg-zinc-200 rounded bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=120&q=50')` }} />
              <div className="font-bold text-zinc-800 flex items-center justify-between">
                <span className="truncate">Kopi Ruang Kerja</span>
                <span className="text-amber-600 shrink-0 font-extrabold text-[6px]">⭐ 4.8</span>
              </div>
              <div className="text-zinc-500 text-[6px]">Jakarta Selatan</div>
              <div className="font-semibold text-zinc-705 border-t border-zinc-100 mt-0.5 pt-0.5 text-[6px] tracking-tight">Rp 25.000 /jam</div>
            </div>
            <div className="bg-white border border-zinc-150 rounded-lg p-1 text-[7px] shadow-sm flex flex-col gap-0.5">
              <div className="w-full h-10 bg-zinc-200 rounded bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=120&q=50')` }} />
              <div className="font-bold text-zinc-800 flex items-center justify-between">
                <span className="truncate">Veranda Lounge</span>
                <span className="text-amber-600 shrink-0 font-extrabold text-[6px]">⭐ 4.9</span>
              </div>
              <div className="text-zinc-500 text-[6px]">Dago, Bandung</div>
              <div className="font-semibold text-zinc-705 border-t border-zinc-100 mt-0.5 pt-0.5 text-[6px] tracking-tight">Rp 30.000 /jam</div>
            </div>
          </div>
        </div>
      );
    case 'open_office':
      return (
        <div className="w-full h-44 bg-[#F5F5F7] border border-zinc-200 rounded-xl overflow-hidden relative font-sans text-left text-zinc-800 p-2.5 select-none flex flex-col gap-1 shadow-inner">
          <div className="flex items-center justify-between border-b border-zinc-200/80 pb-1 mb-1 text-[8px] relative z-10 w-full">
            <div className="flex items-center gap-1 font-bold text-zinc-800">
              <span className="w-2.5 h-2.5 rounded bg-amber-805 text-white flex items-center justify-center text-[5px]">☕</span>
              <span>Open Office Admin</span>
            </div>
            <div className="text-zinc-500 font-mono scale-[0.9]">17 Juni 2026</div>
            <button className="bg-amber-700 text-white text-[6.5px] font-bold px-1.5 py-0.5 rounded cursor-default shrink-0">Ekspor Laporan</button>
          </div>
          <div className="grid grid-cols-3 gap-1 relative z-10">
            <div className="bg-white border border-zinc-150 rounded p-1 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <span className="text-[5.5px] text-zinc-400 block font-semibold truncate scale-[0.95] origin-left uppercase">TOTAL ORDER</span>
              <span className="text-[8.5px] font-extrabold text-zinc-800">2.184</span>
              <span className="text-[5px] font-bold text-emerald-500 block truncate scale-[0.9] origin-left">↗ +14.5%</span>
            </div>
            <div className="bg-white border border-zinc-150 rounded p-1 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <span className="text-[5.5px] text-zinc-400 block font-semibold truncate scale-[0.95] origin-left uppercase">REVENUE</span>
              <span className="text-[7.5px] font-extrabold text-zinc-800 truncate block">Rp 939M</span>
              <span className="text-[5px] font-bold text-emerald-500 block truncate scale-[0.9] origin-left">↗ +18.2%</span>
            </div>
            <div className="bg-white border border-zinc-150 rounded p-1 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <span className="text-[5.5px] text-zinc-400 block font-semibold truncate scale-[0.95] origin-left uppercase">PARTNER</span>
              <span className="text-[8.5px] font-extrabold text-zinc-800">6 Mitra</span>
              <span className="text-[5px] font-bold text-emerald-500 block truncate scale-[0.9] origin-left">↗ +8.3%</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1.5 mt-0.5 flex-1 select-none relative z-10">
            <div className="bg-white border border-zinc-150 rounded p-1 flex flex-col justify-between">
              <span className="text-[5.5px] font-bold text-zinc-400 uppercase tracking-wider scale-[0.9] origin-left">TREN INCOME</span>
              <div className="h-10 relative flex items-end">
                <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 40">
                  <path d="M0 35 Q20 28, 40 20 T80 12 T100 8" fill="none" stroke="#b45309" strokeWidth="1.5" />
                  <path d="M0 35 Q20 28, 40 20 T80 12 T100 8 L100 40 L0 40 Z" fill="rgba(180,83,9,0.05)" />
                </svg>
              </div>
            </div>
            <div className="bg-white border border-zinc-150 rounded p-1 flex flex-col justify-between">
              <span className="text-[5.5px] font-bold text-zinc-400 uppercase tracking-wider scale-[0.9] origin-left font-mono">CAPACITY</span>
              <div className="h-10 flex items-end justify-between gap-0.5 px-0.5">
                <span className="w-1.5 bg-amber-700/30 h-4 rounded-sm" />
                <span className="w-1.5 bg-amber-700/50 h-5 rounded-sm" />
                <span className="w-1.5 bg-amber-700/70 h-7 rounded-sm" />
                <span className="w-1.5 bg-amber-700 h-9 rounded-sm" />
                <span className="w-1.5 bg-amber-700/80 h-8 rounded-sm" />
                <span className="w-1.5 bg-amber-700/60 h-6 rounded-sm" />
              </div>
            </div>
          </div>
        </div>
      );
    case 'its_threedi':
      return (
        <div className="w-full h-44 bg-[#fdfafb] border border-rose-100 rounded-xl overflow-hidden relative font-sans text-center text-zinc-850 p-3 select-none flex flex-col justify-between shadow-inner">
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-rose-50/50 to-transparent pointer-events-none" />
          <div className="flex items-center justify-between border-b border-rose-100 pb-1 text-[8px] relative z-10 w-full">
            <div className="flex items-center gap-1 font-extrabold text-pink-600">
              <span className="w-3.5 h-3.5 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center text-[6px]">3d</span>
              <span>its.threedi</span>
            </div>
            <span className="text-[6.5px] tracking-widest text-[#9d174d] font-bold uppercase px-1.5 py-0.5 bg-pink-50 rounded">BUTIK PILIHAN</span>
            <div className="flex gap-2 text-zinc-400 scale-[0.8]">
              <span>Katalog</span>
              <span>Instagram</span>
            </div>
          </div>
          <div className="my-auto relative z-10 py-0.5 flex flex-col items-center">
            <h4 className="text-[7px] text-[#db2777] uppercase font-mono font-bold tracking-widest">PILIHAN TERBAIK • PREMIUM • THRIFT</h4>
            <h3 className="text-[11px] font-extrabold text-stone-900 tracking-tight leading-relaxed mt-0.5">
              Pilihan Terbaik. Premium. <span className="italic text-pink-600 font-serif font-medium">Unik &amp; Istimewa.</span>
            </h3>
            <p className="text-[5.5px] text-zinc-400 max-w-[190px] leading-tight mt-0.5 scale-[0.95]">
              Setiap perilisan menghadirkan pakaian impor Korea. Kurasi standar Grade-A, diperiksa manual dan higienis.
            </p>
          </div>
          <div className="flex items-center justify-center gap-1 relative z-10 scale-[0.8] origin-bottom">
            <button className="bg-stone-900 hover:bg-stone-800 text-white text-[6.5px] font-semibold py-1 px-2.5 rounded-lg border border-stone-800 shadow flex items-center gap-1 cursor-default shrink-0">
              Belanja Rilis Terbaru ➔
            </button>
            <button className="bg-white hover:bg-zinc-50 text-stone-850 text-[6.5px] font-bold py-1 px-2.2 rounded-lg border border-zinc-250 shadow-sm flex items-center gap-1 cursor-default shrink-0">
              🎵 Tonton Live TikTok
            </button>
            <button className="bg-white hover:bg-zinc-50 text-stone-850 text-[6.5px] font-bold py-1 px-1.5 rounded-lg border border-zinc-250 shadow-sm flex items-center gap-1 cursor-default shrink-0">
              📸 Ins
            </button>
          </div>
        </div>
      );
    case 'agritech_figma':
      return (
        <div className="w-full h-44 bg-[#EEC94D] border border-amber-300 rounded-xl overflow-hidden relative font-sans text-left text-zinc-800 select-none flex flex-col justify-between shadow-inner">
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 opacity-[0.05] pointer-events-none">
            {Array.from({ length: 72 }).map((_, i) => (
              <div key={i} className="border border-black" />
            ))}
          </div>
          <div className="flex items-center justify-between bg-black/5 px-2.5 py-1 text-[8px] relative z-10 border-b border-black/5">
            <div className="flex items-center gap-1 font-bold text-zinc-905">
              <span>🌾</span>
              <span>AgriTech Prototype (Figma UI)</span>
            </div>
            <span className="text-[5.5px] tracking-widest text-[#1c5235] font-bold px-1.5 py-0.5 bg-emerald-100 rounded">FIGMA BOARD</span>
          </div>
          <div className="flex-1 flex items-center gap-1 px-1 py-1 relative z-10 overflow-x-auto">
            <div className="min-w-[48px] w-[48px] h-[82px] bg-[#1a2f4c] rounded border border-stone-800 text-white p-1 flex flex-col justify-between shadow-md shrink-0 scale-[0.9]">
              <span className="text-[3.5px] text-emerald-400 font-mono tracking-widest uppercase">WELCOME</span>
              <div className="h-5 w-full rounded bg-white/10 flex items-center justify-center text-[7px]">🌱</div>
              <div className="text-[3px] leading-tight text-white/80 shrink-0">Kebun Pintar</div>
              <div className="bg-emerald-500 text-white rounded text-[3.5px] py-0.5 text-center font-bold">Masuk</div>
            </div>
            <div className="min-w-[48px] w-[48px] h-[82px] bg-white rounded border border-stone-300 text-zinc-900 p-1 flex flex-col justify-between shadow-md shrink-0 scale-[0.9]">
              <div className="flex items-center justify-between text-[3.5px] text-zinc-400 leading-none">
                <span>28°C</span>
                <span>☁️</span>
              </div>
              <div className="text-center font-bold text-[4.5px] text-emerald-700 leading-none truncate">Halo, Edi</div>
              <div className="bg-emerald-50 border border-emerald-100 rounded-[2px] p-0.5 flex flex-col justify-between flex-1 my-0.5 font-sans">
                <span className="text-[2.5px] text-zinc-400 font-bold uppercase block scale-[0.85] origin-left">IRIGASI</span>
                <div className="flex justify-between items-center mt-0.5">
                  <span className="text-[3.5px] font-semibold text-zinc-700 scale-[0.95]">Lahan 1</span>
                  <span className="text-[3px] bg-emerald-500 text-white px-0.5 rounded font-mono">28%</span>
                </div>
              </div>
              <div className="bg-[#ecc94b] text-zinc-900 rounded-[2px] text-[3.5px] py-0.5 text-center font-bold">Dasbor</div>
            </div>
            <div className="min-w-[48px] w-[48px] h-[82px] bg-zinc-950 rounded border border-stone-800 text-white p-1 flex flex-col justify-between shadow-md shrink-0 scale-[0.9]">
              <span className="text-[3.5px] text-yellow-500 font-bold uppercase block tracking-wider leading-none">ESTIMASI</span>
              <span className="text-[5.5px] font-bold block leading-none text-white mt-0.5">Rp 25M</span>
              <div className="h-5 flex items-end gap-0.5 my-1 bg-white/5 p-0.5 rounded">
                <span className="w-1 bg-emerald-500 h-2" />
                <span className="w-1 bg-emerald-500 h-3" />
                <span className="w-1 bg-yellow-400 h-4.5" />
              </div>
              <div className="text-[3px] text-zinc-500 scale-[0.85] origin-left truncate">Progress</div>
            </div>
          </div>
          <div className="bg-[#1e1e1e] text-zinc-450 px-2 py-0.5 text-[5.5px] font-mono flex items-center justify-center gap-1.5 border-t border-zinc-800 rounded-b-xl">
            <span className="text-blue-400">⌖ Select</span>
            <span>|</span>
            <span>📐 Grid</span>
            <span>|</span>
            <span>✎ Vector Pen</span>
          </div>
        </div>
      );
    case 'wonosobo_gis':
      return (
        <div className="w-full h-44 bg-[#05110d] border border-[#0d2a21] rounded-xl overflow-hidden relative font-sans text-left text-zinc-300 p-2.5 select-none flex flex-col justify-between shadow-inner">
          <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 35 C 40 10, 110 65, 200 15" fill="none" stroke="#22c55e" strokeWidth="1" />
            <path d="M 0 65 C 70 45, 140 105, 250 75" fill="none" stroke="#22c55e" strokeWidth="1" />
            <path d="M 0 115 C 80 85, 180 135, 250 110" fill="none" stroke="#2c5240" strokeWidth="1.5" />
          </svg>
          <div className="flex items-start justify-between relative z-10 w-full">
            <div className="bg-zinc-950/95 border border-[#103d30] p-1 rounded w-[85px] flex flex-col gap-0.5">
              <span className="text-[6.5px] font-bold text-[#22c55e] flex items-center gap-0.5 leading-none">🏔️ Eksplorasi</span>
              <p className="text-[4.5px] text-zinc-400 leading-tight">Peta jalur pendakian Gunung Wonosobo.</p>
              <div className="bg-[#0c241f] text-white text-[4.5px] px-1 py-0.5 rounded mt-0.5 font-bold text-center border border-[#194c3c]">Reset Map</div>
            </div>
            <div className="bg-zinc-950/95 border border-[#103d30] p-1 rounded text-[5px] flex flex-col gap-0.5 min-w-[62px] font-mono leading-none">
              <div className="text-[5.5px] font-bold text-zinc-400 border-b border-[#0f3a2c] pb-0.5 mb-0.5 uppercase tracking-wider">Layer Control</div>
              <div className="text-emerald-400 flex items-center gap-0.5 font-bold">☑ Basecamp</div>
              <div className="text-emerald-400 flex items-center gap-0.5 font-bold">☑ Pos Istirahat</div>
              <div className="text-emerald-400 flex items-center gap-0.5 font-bold">☑ Puncak</div>
            </div>
          </div>
          <div className="absolute top-[35%] left-[55%] z-20 flex flex-col items-center">
            <span className="w-1 h-1 bg-amber-500 rounded-full animate-ping absolute" />
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full border border-white relative z-10" />
            <span className="bg-zinc-950/95 border border-amber-500 text-[4px] font-extrabold py-0.2 px-0.8 rounded text-white mt-0.5 whitespace-nowrap">Sindoro 3.136m</span>
          </div>
          <div className="absolute top-[58%] left-[28%] z-20 flex flex-col items-center">
            <span className="w-1 h-1 bg-amber-500 rounded-full animate-ping absolute" />
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full border border-white relative z-10" />
            <span className="bg-zinc-950/95 border border-amber-500 text-[4px] font-extrabold py-0.2 px-0.8 rounded text-white mt-0.5 whitespace-nowrap font-sans">Kembang 2.340m</span>
          </div>
          <div className="bg-zinc-950/95 border border-[#103d30] p-1 rounded z-10 text-[4.5px] flex items-center gap-1.5 max-w-[190px] font-mono scale-[0.9] origin-bottom-left leading-none">
            <span className="font-extrabold text-zinc-400">ELEVASI:</span>
            <div className="flex items-center gap-0.5"><span className="w-1 h-1 bg-emerald-500 rounded-full" /> <span>Dataran</span></div>
            <div className="flex items-center gap-0.5"><span className="w-1 h-1 bg-green-500 rounded-full" /> <span>Hutan</span></div>
            <div className="flex items-center gap-0.5"><span className="w-1 h-1 bg-amber-500 rounded-full" /> <span>Alpin</span></div>
          </div>
        </div>
      );
    default:
      return (
        <div className="w-full h-44 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-zinc-500 text-xs font-mono">
          Interactive Mockup Unavailable
        </div>
      );
  }
};

export default function TechShowcase() {
  // Defaulting active tab to 'projects' so the portfolio documentation is visible right at page load!
  const [activeTab, setActiveTab] = useState<'projects' | 'certificates' | 'tech_stack'>('projects');

  const [selectedCert, setSelectedCert] = useState<any>(null);
  const [useScannedOverlay, setUseScannedOverlay] = useState<boolean>(true);

  const certificates = [
    {
      id: 'cert-data-academy',
      title: 'Exam Preparation of Business Intelligence Analyst',
      issuer: 'Cybertrend Data Academy',
      date: 'September 11, 2025',
      code: '11092025.CDA.BIA.BNSP.11337',
      skills: ['Business Intelligence', 'Data Analysis', 'Enterprise Reporting', 'BNSP Prep', 'Professional Competence'],
      hours: 12
    }
  ];

  return (
    <section id="portfolio-showcase" className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-zinc-900/80 relative overflow-hidden select-none">
      {/* Decorative background grid and ambient lighting mirroring the screenshot vibe */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111115_1px,transparent_1px),linear-gradient(to_bottom,#111115_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none opacity-45" />
      <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Header styled exactly like reference screenshot */}
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 uppercase select-none">
          Portfolio Showcase
        </h2>
        <p className="text-zinc-400 font-sans text-sm md:text-base max-w-2xl mx-auto leading-relaxed italic">
          Explore my journey through projects, certifications, and technical expertise.
        </p>
      </div>

      {/* Switcher Navigation Tabs - Exactly mirroring capsule structure in the screenshot */}
      <div id="portfolio-tabs-container" className="flex items-center justify-center mb-14 relative z-10">
        <div className="bg-[#121214]/90 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-1.5 flex gap-1 shadow-2xl">
          {[
            { id: 'projects', label: 'Projects' },
            { id: 'certificates', label: 'Certificates' },
            { id: 'tech_stack', label: 'Tech Stack' }
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
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

      {/* Render Active Tab with Smooth Fade & Scale Animation */}
      <div className="relative z-10 w-full min-h-[420px]">
        <AnimatePresence mode="wait">
          {activeTab === 'tech_stack' && (
            <motion.div
              key="tech_stack"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto"
            >
              {TECH_STACK_ITEMS.map((item) => (
                <div
                  key={item.id}
                  id={`tech-card-${item.id}`}
                  className="bg-[#121214]/60 border border-zinc-900 rounded-[28px] py-9 px-6 flex flex-col items-center justify-between shadow-xl hover:bg-[#161619]/80 hover:border-zinc-800 transition-all duration-300 hover:scale-[1.04] cursor-pointer group hover:shadow-[0_20px_40px_rgba(0,0,0,0.55)] border-t border-t-zinc-800/25 select-none"
                >
                  {/* Embedded soft radiant circle behind logos on hover */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-white/[0.015] rounded-full filter blur-xl group-hover:bg-white/[0.035] transition-all duration-500 pointer-events-none" />

                  {/* Logo Center */}
                  <div className="h-24 flex items-center justify-center relative z-10 transform group-hover:scale-105 transition-transform duration-300">
                    {renderSkillLogo(item.id)}
                  </div>

                  {/* Tech Name bottom label */}
                  <span className="text-xs sm:text-sm font-sans font-semibold tracking-wide text-zinc-400 group-hover:text-zinc-200 transition-colors uppercase mt-4 select-none relative z-10">
                    {item.name}
                  </span>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
            >
              {PROJECTS.map((project) => (
                <div
                  key={project.id}
                  id={`portfolio-project-card-${project.id}`}
                  className="bg-[#121214]/60 border border-zinc-900 rounded-[28px] p-6 hover:bg-[#161619]/80 hover:border-zinc-800 transition-all duration-300 flex flex-col justify-between shadow-xl group border-t border-t-zinc-800/25 min-h-[520px]"
                >
                  <div className="space-y-4">
                    {/* Visual Interface mockup showing high fidelity representation from start */}
                    <div className="rounded-2xl overflow-hidden shadow-2xl bg-zinc-950/40 border border-zinc-800/80 mb-4 transform group-hover:scale-[1.015] transition-transform duration-300 relative select-none">
                      {renderProjectMockup(project.id)}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase font-bold px-2 py-0.5 rounded bg-blue-950/20 border border-blue-900/30">
                        {project.category}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">2026.06</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-4 font-normal">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-zinc-900/60 mt-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 3).map((badge) => (
                          <span key={badge} className="text-[9px] font-mono text-zinc-500 bg-zinc-950/60 px-2 py-0.5 rounded border border-zinc-900">
                            {badge}
                          </span>
                        ))}
                      </div>
                      
                      {project.externalUrl && (
                        <a
                          href={project.externalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 text-blue-400 hover:text-blue-300 flex items-center gap-1 text-[11px] font-mono font-bold hover:underline"
                        >
                          Luncurkan
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'certificates' && (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
            >
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  id={`portfolio-cert-card-${cert.id}`}
                  onClick={() => setSelectedCert(cert)}
                  className="bg-[#121214]/60 border border-zinc-900 rounded-[28px] p-6 hover:bg-[#161619]/80 hover:border-zinc-800 transition-all duration-300 flex flex-col justify-between shadow-xl border-t border-t-zinc-800/25 group cursor-pointer hover:scale-[1.015]"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/10 px-2.5 py-0.5 rounded border border-emerald-900/20">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                        Verified Credential
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase">{cert.date}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">
                      {cert.title}
                    </h3>

                    <p className="text-[11px] font-mono text-zinc-400 mt-1 leading-none uppercase tracking-wide">
                      ISSUED BY: {cert.issuer}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-3">
                      {cert.skills.map((skill) => (
                        <span key={skill} className="text-[9px] font-mono text-zinc-400 bg-zinc-950/65 px-2.5 py-1 rounded border border-zinc-900">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-zinc-900/60 mt-6 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-zinc-600 font-semibold tracking-wide select-all">ID: {cert.code}</span>
                    
                    <span className="text-zinc-500 group-hover:text-emerald-400 font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors">
                      <span className="text-[10px] uppercase tracking-wider scale-[0.9] origin-right opacity-0 group-hover:opacity-100 transition-all duration-300">
                        Buka Sertifikat
                      </span>
                      <Award className="w-5 h-5 flex-shrink-0" />
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Certificate High-Fidelity Modal */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
              onClick={() => setSelectedCert(null)}
            >
              <div className="absolute top-4 right-4 z-50 flex flex-wrap items-center justify-end gap-2.5 max-w-[calc(100vw-2rem)]">
                {/* Information hint badge */}
                <span className="text-[9px] font-mono text-zinc-400 hidden lg:inline-block bg-zinc-900/80 px-2.5 py-1.5 rounded-lg border border-zinc-800">
                  💡 Tip: Tekan CTRL+P atau Cetak untuk menyimpan sebagai PDF vektor kualitas asli
                </span>
                
                {/* Toggle scanned CS watermark effect */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setUseScannedOverlay(!useScannedOverlay);
                  }}
                  className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/60 rounded-xl px-3 py-2 text-[11px] font-mono font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                  title="Toggle CamScanner watermark and scanned texture"
                >
                  <Eye className={`w-3.5 h-3.5 ${useScannedOverlay ? 'text-emerald-400' : 'text-zinc-400'}`} />
                  <span>{useScannedOverlay ? 'Tampilan Bersih' : 'Tampilan Scan'}</span>
                </button>

                {/* Print/Save PDF button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.print();
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl px-4 py-2 text-[11px] font-mono font-bold flex items-center gap-1.5 transition-all shadow-lg active:scale-95 cursor-pointer"
                  title="Print / Save to PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak / Simpan PDF</span>
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="bg-zinc-900 hover:bg-zinc-805 text-zinc-200 rounded-xl p-2 transition-all cursor-pointer border border-zinc-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scalable Container wrapper */}
              <motion.div
                initial={{ scale: 0.96, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.96, y: 10 }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                className="w-full max-w-4xl max-h-[85vh] overflow-y-auto sm:overflow-visible my-auto shadow-2xl relative scrollbar-none"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Print CSS to strip out dark website backgrounds and print only the vector certificate */}
                <style dangerouslySetInnerHTML={{ __html: `
                  @media print {
                    body {
                      background: white !important;
                      color: black !important;
                      -webkit-print-color-adjust: exact !important;
                      print-color-adjust: exact !important;
                    }
                    /* Hide all UI elements */
                    #portfolio-showcase,
                    button,
                    nav,
                    .absolute,
                    .fixed,
                    header,
                    footer,
                    aside,
                    .z-50,
                    #printable-certificate-container + * {
                      display: none !important;
                    }
                    body > * {
                      visibility: hidden !important;
                    }
                    #printable-certificate-container,
                    #printable-certificate-container * {
                      visibility: visible !important;
                      color: black !important;
                    }
                    #printable-certificate-container {
                      display: block !important;
                      position: fixed !important;
                      left: 0 !important;
                      top: 0 !important;
                      width: 297mm !important; /* A4 Landscape exact dimensions */
                      height: 210mm !important;
                      margin: 0 !important;
                      padding: 1.5cm !important;
                      border: none !important;
                      box-shadow: none !important;
                      background: white !important;
                      transform: none !important;
                    }
                  }
                `}} />

                {/* Highly authentic interactive and print-ready digital replica of the certificate */}
                <div
                  id="printable-certificate-container"
                  className={`w-full aspect-[1.414/1] bg-white text-[#111111] overflow-hidden rounded-2xl relative shadow-[0_30px_70px_rgba(0,0,0,0.85)] p-6 md:p-12 font-sans border border-zinc-200 transition-all ${
                    useScannedOverlay ? 'brightness-[0.98] sepia-[0.03] contrast-[1.03] bg-[#FCFAF5]' : ''
                  }`}
                  style={{
                    backgroundImage: useScannedOverlay ? 'radial-gradient(rgba(0, 0, 0, 0.015) 1px, transparent 1px)' : 'none',
                    backgroundSize: '16px 16px'
                  }}
                >
                  {/* Subtle noise paper sheet cover texture overlay (CamScanner emulation) */}
                  {useScannedOverlay && (
                    <div className="absolute inset-0 bg-repeat pointer-events-none opacity-[0.045] bg-[url('https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80')]" />
                  )}

                  {/* Top-left ornamental vector geometric triangles */}
                  <svg className="absolute top-0 left-0 w-[24%] h-[32%] pointer-events-none select-none" viewBox="0 0 160 160" preserveAspectRatio="none">
                    <g opacity="0.9">
                      {/* Intersecting shapes of cyan, green, gold, gray */}
                      <polygon points="0,0 80,0 0,80" fill="#cbd5e1" /> {/* Grey base */}
                      <polygon points="80,0 120,0 40,80" fill="#f59e0b" /> {/* Gold block */}
                      <polygon points="0,80 80,80 0,160" fill="#059669" /> {/* Emerald block */}
                      <polygon points="40,80 80,0 80,80" fill="#f97316" /> {/* Orange block */}
                      <polygon points="80,80 120,0 150,55" fill="#475569" /> {/* Slate block */}
                      <polygon points="0,160 65,110 0,110" fill="#2563eb" /> {/* Primary Blue block */}
                      <polygon points="0,0 40,0 0,40" fill="#fbbf24" /> {/* Bright yellow edge Accent */}
                    </g>
                  </svg>

                  {/* Bottom-right ornamental vector geometric triangles (Symmetric counterpart) */}
                  <svg className="absolute bottom-0 right-0 w-[24%] h-[32%] pointer-events-none select-none" viewBox="0 0 160 160" preserveAspectRatio="none" transform="rotate(180 80 80)">
                    <g opacity="0.9">
                      <polygon points="0,0 80,0 0,80" fill="#cbd5e1" />
                      <polygon points="80,0 120,0 40,80" fill="#f59e0b" />
                      <polygon points="0,80 80,80 0,160" fill="#059669" />
                      <polygon points="40,80 80,0 80,80" fill="#f97316" />
                      <polygon points="80,80 120,0 150,55" fill="#475569" />
                      <polygon points="0,160 65,110 0,110" fill="#2563eb" />
                      <polygon points="0,0 40,0 0,40" fill="#fbbf24" />
                    </g>
                  </svg>

                  {/* Top Right Registered Credential Control ID */}
                  <div className="absolute top-4 right-6 md:top-8 md:right-10 text-right pointer-events-auto">
                    <p className="font-mono text-[7px] md:text-[10px] font-bold text-zinc-900 tracking-wider">
                      {selectedCert.code}
                    </p>
                  </div>

                  {/* Top Center Data Academy Logo brand */}
                  <div className="flex flex-col items-center justify-center mt-3 md:mt-1 relative z-21">
                    <div className="flex items-center gap-1">
                      <span className="font-sans font-extrabold text-[15px] md:text-[23px] text-[#065f46] tracking-wide uppercase leading-none">
                        data
                      </span>
                    </div>
                    {/* Integrated aca||emy wordmark */}
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="bg-[#1e3a8a] text-white font-extrabold px-1 text-[11px] md:text-[15px] rounded-sm font-sans tracking-tight leading-none py-0.5">
                        aca
                      </span>
                      <div className="flex gap-[2px] items-center">
                        <span className="w-[3px] h-[13px] md:h-[18px] bg-sky-500 rounded-sm"></span>
                        <span className="w-[3px] h-[13px] md:h-[18px] bg-emerald-500 rounded-sm"></span>
                      </div>
                      <span className="text-zinc-900 font-extrabold text-[12px] md:text-[16px] tracking-tight font-sans leading-none">
                        emy
                      </span>
                    </div>
                    
                    <span className="text-[4px] md:text-[5.5px] font-mono tracking-[0.25em] font-extrabold bg-zinc-950 text-white px-2.5 py-0.5 rounded-[1px] uppercase mt-1 leading-none select-none">
                      CYBERTREND DATA ACADEMY
                    </span>
                  </div>

                  {/* Main content area */}
                  <div className="text-center my-auto flex flex-col justify-center relative z-20">
                    <h1 className="font-serif text-3xl md:text-5xl font-black tracking-[0.05em] text-[#0c0c0e] leading-none mb-1 select-text">
                      CERTIFICATE
                    </h1>
                    <h2 className="font-sans text-[10px] md:text-[14px] font-extrabold tracking-[0.3em] text-[#1c1c1f] leading-relaxed mb-4 md:mb-5 select-text uppercase">
                      OF COMPLETION
                    </h2>
                    
                    <p className="font-sans text-[7px] md:text-[9.5px] font-bold tracking-[0.16em] text-zinc-500 uppercase mb-3 select-text leading-none">
                      THIS CERTIFICATE IS PRESENTED TO
                    </p>

                    {/* Presented Recipient Name */}
                    <div className="my-1.5 md:my-2 inline-block mx-auto max-w-lg md:max-w-xl">
                      <h3 className="font-serif text-xl md:text-3.5xl font-extrabold text-[#050505] tracking-wide select-text uppercase border-b-2 border-stone-900 pb-1 px-8 inline-block leading-normal">
                        EDIVHO FEBRIAN PUTRA
                      </h3>
                    </div>

                    {/* Detailed Course information */}
                    <div className="space-y-1 md:space-y-1.5 mt-3 md:mt-4 text-center max-w-xl md:max-w-2xl mx-auto">
                      <p className="font-sans text-stone-600 text-[9px] md:text-[12.5px] leading-relaxed font-normal select-text">
                        Successfully Accomplished at 12 hours of learning for
                      </p>
                      <h4 className="font-sans text-[11px] md:text-[15.5px] font-black tracking-tight text-zinc-950 uppercase py-0.5 select-text leading-snug">
                        "EXAM PREPARATION OF BUSINESS INTELLIGENCE ANALYST"
                      </h4>
                      <p className="font-sans text-stone-600 text-[8px] md:text-[11.5px] leading-relaxed select-text font-normal">
                        as Prescribed Requirements for Professional Competence Development
                      </p>
                    </div>

                    {/* Date and Location line */}
                    <div className="mt-3.5 md:mt-5">
                      <p className="font-sans text-[9px] md:text-[12px] font-bold text-zinc-800 tracking-wide select-text">
                        Jakarta, September 11, 2025
                      </p>
                    </div>
                  </div>

                  {/* Signatures and Certification Seal Row */}
                  <div className="grid grid-cols-3 items-end relative z-20 min-h-[90px] md:min-h-[120px] px-6">
                    
                    {/* Left Director Signature & Official blue-violet ink Stamp */}
                    <div className="text-center relative flex flex-col items-center">
                      <div className="h-10 md:h-14 relative flex items-center justify-center w-full">
                        
                        {/* Interactive vector hand stroke signature */}
                        <svg className="w-16 h-8 md:w-24 md:h-12 text-[#1e40af]/85 absolute z-10 transform -rotate-1 select-none pointer-events-none" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                          <path d="M10 24 C 25 12, 35 32, 24 45 C 10 32, 45 16, 55 20 C 65 26, 75 12, 85 16 M22 21 L 70 23" />
                        </svg>

                        {/* Highly authentic Round Blue Ink Stamp */}
                        <div className="absolute w-[68px] h-[68px] md:w-[96px] md:h-[96px] rounded-full border border-dotted border-blue-500/35 flex items-center justify-center transform rotate-[-12deg] pointer-events-none select-none bg-blue-500/[0.005]">
                          <div className="rounded-full border border-dashed border-blue-500/35 w-[calc(100%-4px)] h-[calc(100%-4px)] flex items-center justify-center">
                            <span className="text-[3.5px] md:text-[5px] font-black text-blue-500/30 font-sans uppercase tracking-tight text-center leading-[1.05]">
                              CYBERTREND<br/>DATA ACADEMY<br/>★ APPROVED ★
                            </span>
                          </div>
                        </div>

                      </div>
                      <div className="border-t border-zinc-250 w-[75%] mx-auto mt-1" />
                      <p className="font-sans text-[7.5px] md:text-[9.5px] font-black text-zinc-900 mt-1 uppercase leading-none select-text">
                        Luthfy Ardiansyah
                      </p>
                      <p className="font-sans text-[5.5px] md:text-[7.5px] text-zinc-500 tracking-wider uppercase mt-1 leading-none select-text font-bold">
                        Training Director
                      </p>
                    </div>

                    {/* Golden Ribbon Medal Seal */}
                    <div className="flex flex-col items-center justify-center relative select-none">
                      <div className="relative w-12 h-12 md:w-[70px] md:h-[70px] rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-300 border-2 border-amber-500 shadow-lg flex items-center justify-center">
                        <div className="absolute inset-[3px] rounded-full border border-dashed border-amber-600/40" />
                        
                        {/* Hanging ribbons backing */}
                        <div 
                          className="absolute -bottom-3 -left-1.5 w-4.5 h-8.5 bg-amber-700/85 transform rotate-[14deg] origin-top"
                          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)' }}
                        />
                        <div 
                          className="absolute -bottom-3 -right-1.5 w-4.5 h-8.5 bg-amber-600/85 transform rotate-[-14deg] origin-top"
                          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)' }}
                        />

                        {/* Seal content */}
                        <svg className="w-5 h-5 md:w-7 md:h-7 text-amber-900/90 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      </div>
                    </div>

                    {/* Right Trainer signature & title */}
                    <div className="text-center relative flex flex-col items-center">
                      <div className="h-10 md:h-14 relative flex items-center justify-center w-full">
                        {/* Hand stroked signature */}
                        <svg className="w-16 h-8 md:w-24 md:h-12 text-[#1f2937] absolute z-10 transform rotate-1 select-none pointer-events-none" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round">
                          <path d="M15 32 C 25 14, 35 4, 52 23 C 64 42, 73 11, 85 15 M36 26 Q 56 18, 76 28" />
                        </svg>
                      </div>
                      <div className="border-t border-zinc-250 w-[75%] mx-auto mt-1" />
                      <p className="font-sans text-[7.5px] md:text-[9.5px] font-black text-zinc-900 mt-1 uppercase leading-none select-text">
                        Nurul Muminah
                      </p>
                      <p className="font-sans text-[5.5px] md:text-[7.5px] text-zinc-500 tracking-wider uppercase mt-1 leading-none select-text font-bold">
                        Head of Trainer
                      </p>
                    </div>

                  </div>

                  {/* CS CamScanner watermark tag (Matches user's exact scanned experience) */}
                  {useScannedOverlay && (
                    <div className="absolute bottom-1 right-2 bg-white/90 border border-zinc-200/80 shadow-sm rounded px-1.5 py-0.5 text-[5px] md:text-[7px] font-sans font-bold text-emerald-800 flex items-center gap-1 select-none pointer-events-none opacity-80 leading-none">
                      <span className="bg-[#128a64] text-white rounded-[1px] px-0.6 py-0.2 font-black text-[4.5px] md:text-[6.5px]">CS</span>
                      <span>Dipindai dengan CamScanner</span>
                    </div>
                  )}

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

