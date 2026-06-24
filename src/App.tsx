import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  Clock, 
  Sparkles, 
  ArrowRight,
  ChevronDown,
  Info,
  Code
} from 'lucide-react';

import { PERSONAL_INFO, BRAND_HEADLINES } from './data';
import AboutSection from './components/AboutSection';
import TechShowcase from './components/TechShowcase';
import RecruiterHighlights from './components/RecruiterHighlights';
import RecruiterConsole from './components/RecruiterConsole';
import LanyardBadge from './components/LanyardBadge';

export default function App() {
  const [activeHeadlineIdx, setActiveHeadlineIdx] = useState(0);
  const [currentUtcTime, setCurrentUtcTime] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Auto rotate headlines setiap 5.5 detik untuk pengalaman yang premium dan bersih
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeadlineIdx((prev) => (prev + 1) % BRAND_HEADLINES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // Update dynamic clock dengan format waktu lokal Indonesia (WIB/WITA/WIT)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZoneName: 'short'
      };
      setCurrentUtcTime(now.toLocaleTimeString('id-ID', options));
    };
    updateTime();
    const clockTimer = setInterval(updateTime, 1000);
    return () => clearInterval(clockTimer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div id="portfolio-container" className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-blue-500/20 selection:text-blue-300 relative overflow-x-hidden scroll-smooth">
      {/* Background radial ambient lights (Editorial glow spec) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-screen bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.09)_0%,transparent_50%),radial-gradient(circle_at_10%_80%,rgba(59,130,246,0.06)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute -left-1/4 top-1/3 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -right-1/4 top-2/3 w-[500px] h-[500px] bg-blue-700/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Grid line overlay untuk memberikan tampilan teknis premium dan berstruktur */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

      {/* Frosted Floating Navigation Header */}
      <nav id="navbar" className="sticky top-0 z-50 w-full bg-[#050505]/70 backdrop-blur-md border-b border-zinc-900/80 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center p-0.5 relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur-sm opacity-20 group-hover:opacity-60 transition duration-300" />
              <span className="relative text-base font-extrabold text-white tracking-widest font-mono select-none">E</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-zinc-200 tracking-tight leading-none uppercase">Edivho Febrian Putra</span>
              <span className="text-[9px] font-mono text-zinc-500 mt-1 uppercase tracking-widest font-semibold">Sistem Informasi • Bakrie</span>
            </div>
          </div>

          {/* Nav items untuk navigasi lompat cepat halaman */}
          <div className="hidden lg:flex items-center gap-6 text-xs text-zinc-400 font-mono font-medium">
            <a href="#about" className="hover:text-blue-400 transition-colors">TENTANG SAYA</a>
            <a href="#skills" className="hover:text-blue-400 transition-colors">PAMERAN SKILL</a>
            <a href="#why-work-with-me" className="hover:text-blue-400 transition-colors">HIGHLIGHTS</a>
            <a href="#contact-hub" className="hover:text-blue-400 transition-colors">RECRUITER HUB</a>
          </div>

          {/* Fitur Download CV otomatis langsung di navbar dengan penanganan blokir browser keamanan */}
          <div className="flex items-center gap-2">
            <a 
              href={`${window.location.origin}/CV_Edivho_Febrian_Putra.pdf`}
              download="CV_Edivho_Febrian_Putra.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-medium tracking-wide bg-gradient-to-r from-blue-950/40 to-indigo-950/40 border border-blue-800/40 hover:border-blue-500/55 text-blue-300 hover:text-white px-3.5 py-2 rounded-xl transition-all shadow-inner"
            >
              Unduh CV & Kontak
            </a>
          </div>
        </div>
      </nav>

      {/* Floating Widget: Jam waktu nyata (WIB) untuk integrasi fungsionalitas teknis */}
      <div className="absolute right-4 md:right-8 top-28 z-20 flex items-center gap-2 bg-zinc-900/40 border border-zinc-850 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-mono text-zinc-400">
        <Clock className="w-3 h-3 text-blue-400 animate-pulse" />
        <span>JKT: {currentUtcTime || 'Memuat...'}</span>
      </div>

      {/* Hero Section */}
      <header id="hero" className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto relative pointer-events-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Kolom Kiri: Penyelarasan teknis minimalis & copywriting utama */}
          <div className="lg:col-span-7 flex flex-col text-left items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/60 border border-zinc-800 text-xs text-blue-400 font-mono tracking-wider uppercase mb-5 shadow-sm">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              AVAILABLE FOR WORK
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-sans tracking-tight font-extrabold text-white leading-none uppercase select-none mt-2">
              Software<br />
              <span className="text-zinc-500 font-serif lowercase italic sm:text-5xl text-4xl block mt-2">developer</span>
            </h1>
            
            <p className="text-zinc-500 text-[11px] font-mono mt-6 flex items-center gap-1.5 uppercase tracking-widest font-semibold">
              semester 6 (ipk 3.4) <span className="inline-block w-1.5 h-3 bg-emerald-400 animate-pulse" />
            </p>
            
            <p className="text-zinc-300 text-sm md:text-base max-w-xl mt-4 leading-relaxed font-sans">
              Menciptakan produk website modern dengan tampilan clean, responsif, dan elegan. Faster With AI, Smarter with Experience
            </p>
            
            {/* Tombol Aksi Utama */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3.5 mt-10 w-full sm:w-auto">
              {/* Button Straight Ke Perangkat via WhatsApp Call/Chat */}
              <a
                href="https://wa.me/6287832187740"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 hover:border-emerald-500/60 text-emerald-400 text-xs sm:text-sm font-bold tracking-wide transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>Hubungi via WhatsApp</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-xs sm:text-sm font-bold tracking-wide text-zinc-300 transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span>{copiedEmail ? 'Email Berhasil Disalin!' : 'Salin Email'}</span>
              </button>
            </div>

            {/* Indikator Status Tambahan */}
            <div className="flex flex-col gap-2 mt-12 text-zinc-500 text-xs font-mono">
              <p className="flex items-center gap-2 select-none hover:text-zinc-400 transition-colors">
                <span className="text-blue-500 font-bold">↓</span> explore my work below
              </p>
              <p className="flex items-center gap-2 select-none hover:text-zinc-400 transition-colors">
                <span className="text-[#3ed498]">✓</span> open to full-time & freelance opportunities
              </p>
            </div>
          </div>
          
          {/* Kolom Kanan: Tampilan Gantungan Lanyard Kartu Identitas Interaktif */}
          <div className="lg:col-span-5 flex items-center justify-center relative mt-8 lg:mt-0">
            <LanyardBadge />
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 sm:mt-24 flex justify-center animate-bounce">
          <a href="#about" className="text-zinc-500 hover:text-blue-400 transition-colors flex flex-col items-center gap-1">
            <span className="text-[10px] font-mono tracking-widest uppercase">Eksplorasi</span>
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Info Strip Kompetensi */}
      <div className="bg-zinc-950/40 border-y border-zinc-900/60 py-4 px-4 overflow-hidden select-none">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-y-3 gap-x-6 text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-widest">
          <span className="flex items-center gap-2"><Terminal className="w-4 h-4 text-blue-500/80" /> Mahasiswa Sistem Informasi At Universitas Bakrie</span>
          <span className="hidden sm:inline text-zinc-800">•</span>
          <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-indigo-500/80" /> Interaksi Desain UI/UX & Fungsional button</span>
          <span className="hidden sm:inline text-zinc-800">•</span>
          <span className="flex items-center gap-2"><Info className="w-4 h-4 text-blue-500/80" /> Berfokus Pada Nilai Bisnis & IT</span>
        </div>
      </div>

      {/* Tentang Saya Section Component */}
      <div id="about">
        <AboutSection />
      </div>

      {/* Showcase Kompetensi/Skill Section Component */}
      <div id="skills">
        <TechShowcase />
      </div>

      {/* Recruiter Validation Highlights Section Component */}
      <div id="why-work-with-me">
        <RecruiterHighlights />
      </div>

      {/* Recruiter Local Hub Integration Component */}
      <div id="projects">
        <RecruiterConsole />
      </div>

      {/* Global Minimal Footers */}
      <footer id="contact-hub" className="border-t border-zinc-900/80 bg-zinc-950/60 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-500 font-mono">
          <div className="flex flex-col gap-2">
            <p className="font-bold text-zinc-400 text-sm">Portfolio Edivho Febrian Putra</p>
            <p className="text-[11px]">Mahasiswa Universitas Bakrie • Jakarta, Indonesia</p>
          </div>

          {/* Media Sosial Hub */}
          <div className="flex items-center gap-4">
            <a 
              href="mailto:edivho01@gmail.com" 
              className="p-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-cyan-400 rounded-lg transition-colors"
              title="Kirim Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a 
              href="https://linkedin.com/in/edivho-febrian-putra-2b3b91373" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-cyan-400 rounded-lg transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href="https://github.com/Edivho" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-cyan-400 rounded-lg transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href="https://wa.me/6287832187740" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-emerald-400 rounded-lg transition-colors"
              title="Hubungi via WhatsApp"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-[10px] text-zinc-650 mt-1">&copy; {new Date().getFullYear()} Edivho • Hak Cipta Dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}