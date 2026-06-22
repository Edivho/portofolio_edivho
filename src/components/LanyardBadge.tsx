import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'motion/react';
import { PERSONAL_INFO } from '../data';
import { ShieldCheck, Barcode, HelpCircle } from 'lucide-react';

export default function LanyardBadge() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Unified Motion coordinates for hover displacement & draggable physics
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Trigger fall/drop animation on initial mount, and then run persistent organic wobble loop
  useEffect(() => {
    dragY.set(-280);
    const dropAnimation = animate(dragY, 0, {
      type: 'spring',
      stiffness: 120,
      damping: 11,
      mass: 1.5,
      delay: 0.1
    });

    return () => {
      dropAnimation.stop();
    };
  }, []);

  useEffect(() => {
    if (isDragging || isHovered) return;

    let active = true;
    let animX: any = null;
    let animY: any = null;

    async function wobbleLoop() {
      // 1.5s delay after dropping before starting relaxed ambient bobbing
      await new Promise((r) => setTimeout(r, 1500));
      if (!active) return;

      while (active) {
        animY = animate(dragY, -8, {
          duration: 2.2,
          ease: 'easeInOut'
        });
        await animY;
        if (!active) break;

        animX = animate(dragX, 6, {
          duration: 1.8,
          ease: 'easeInOut'
        });
        await animX;
        if (!active) break;

        animY = animate(dragY, 8, {
          duration: 2.5,
          ease: 'easeInOut'
        });
        await animY;
        if (!active) break;

        animX = animate(dragX, -6, {
          duration: 1.8,
          ease: 'easeInOut'
        });
        await animX;
        if (!active) break;

        animY = animate(dragY, 0, {
          duration: 2.2,
          ease: 'easeInOut'
        });
        await animY;
        if (!active) break;

        animX = animate(dragX, 0, {
          duration: 1.8,
          ease: 'easeInOut'
        });
        await animX;
        if (!active) break;
      }
    }

    wobbleLoop();

    return () => {
      active = false;
      if (animX) animX.stop();
      if (animY) animY.stop();
    };
  }, [isDragging, isHovered]);

  // Elastic spring configurations to give the rubber lanyard immense character
  const springX = useSpring(dragX, { damping: 28, stiffness: 220, mass: 0.5 });
  const springY = useSpring(dragY, { damping: 28, stiffness: 220, mass: 0.5 });

  // Map the spring offset to 3D rotation angles for amazing responsive perspective
  const rotateX = useTransform(springY, [-150, 250], [18, -25]);
  const rotateY = useTransform(springX, [-150, 150], [-20, 20]);

  // Calculate the high-fidelity shadow trail mimicking physical distance
  const shadowX = useTransform(springX, [-180, 180], [35, -35]);
  const shadowY = useTransform(springY, [-180, 250], [15, 45]);
  const shadowBlur = useTransform(springY, [-100, 250], [16, 28]);
  const shadowScale = useTransform(springY, [-100, 250], [0.95, 0.85]);

  // Dynamic tension thread endpoints
  const stringX = useTransform(dragX, (xVal) => 140 + xVal);
  const stringY = useTransform(dragY, (yVal) => 182 + yVal);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize values between -0.5 and 0.5
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    // Apply soft tilt offset (within ~30px bounds)
    dragX.set(relativeX * 32);
    dragY.set(relativeY * 32);
  };

  const handleMouseLeave = () => {
    if (isDragging) return;
    setIsHovered(false);
    // Smoothly ease back to resting coordinate (0,0)
    dragX.set(0);
    dragY.set(0);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[460px] w-[280px] mx-auto select-none">
      
      {/* Dynamic interactive tutorial badge showing drag capability helper */}
      <div className="absolute top-4 pointer-events-none z-30 select-none px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-[10px] font-mono text-zinc-400 font-bold tracking-wide uppercase flex items-center gap-1.5 shadow-md animate-pulse">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
        Geser / Seret Kartu (Drag Me)
      </div>

      {/* Elegant hanging lanyard strap extending to the top boundary */}
      <div className="absolute top-0 bottom-[310px] w-[24px] pointer-events-none z-0 flex flex-col items-center overflow-hidden">
        {/* Repeating strap texture like in the reference "3D CARD" */}
        <div className="w-[12px] h-full bg-zinc-950 border-x border-zinc-800/80 flex flex-col gap-2 items-center justify-around py-2">
          <span className="text-[6px] tracking-[0.15em] font-mono font-bold text-zinc-700 origin-center rotate-90 my-1">EDIVHO DEV</span>
          <span className="text-[6px] tracking-[0.15em] font-mono font-bold text-zinc-700 origin-center rotate-90 my-1">EDIVHO DEV</span>
          <span className="text-[6px] tracking-[0.15em] font-mono font-bold text-zinc-700 origin-center rotate-90 my-1">EDIVHO DEV</span>
          <span className="text-[6px] tracking-[0.15em] font-mono font-bold text-zinc-700 origin-center rotate-90 my-1">EDIVHO DEV</span>
        </div>
      </div>

      {/* Floating lanyard clip connector node */}
      <div className="absolute top-[138px] z-10 w-9 h-7 bg-zinc-900 border border-zinc-800 rounded-md shadow-lg flex flex-col items-center justify-between p-1">
        <div className="w-4 h-1.5 bg-zinc-950 border border-zinc-850 rounded-full" />
        <div className="w-5 h-2.5 bg-zinc-800 border-t border-zinc-700/60 rounded-sm flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
        </div>
      </div>

      {/* Dynamic Retractable Metallic Tension String drawing coordinate line */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-15 style-string-layer" style={{ overflow: 'visible' }}>
        {/* Steel core drop-shadow sleeve */}
        <motion.line
          x1={140}
          y1={154}
          x2={stringX}
          y2={stringY}
          stroke="rgba(0, 0, 0, 0.45)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* High tension nylon fiber blue thread */}
        <motion.line
          x1={140}
          y1={154}
          x2={stringX}
          y2={stringY}
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Glow core reflection light */}
        <motion.line
          x1={140}
          y1={154}
          x2={stringX}
          y2={stringY}
          stroke="#93c5fd"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
      </svg>

      {/* Main interactive 3D motion container card body - Draggable and Responsive! */}
      <motion.div
        ref={cardRef}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.88}
        dragTransition={{ bounceStiffness: 420, bounceDamping: 24 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => {
          setIsDragging(false);
          dragX.set(0);
          dragY.set(0);
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          x: dragX,
          y: dragY,
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="w-[280px] h-[390px] mt-[160px] bg-[#111111]/95 text-zinc-200 rounded-2xl border-2 border-zinc-800/90 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col p-4 backdrop-blur-md cursor-grab active:cursor-grabbing group z-20"
      >
        {/* Subtle white gloss reflection cover overlay */}
        <div className="absolute inset-x-0 top-0 h-[170px] bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
        <div className="absolute -inset-y-20 -left-20 w-40 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent rotate-45 transform pointer-events-none group-hover:translate-x-96 transition-transform duration-1000 ease-out" />

        {/* Lanyard punch hole cut out at the top of the card */}
        <div className="w-full flex justify-center mb-4 pt-1">
          <div className="w-10 h-3 rounded-full bg-zinc-950 border border-zinc-850/80 shadow-inner flex items-center justify-around px-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
          </div>
        </div>

        {/* Interior Badge Card Wrapper */}
        <div className="flex-1 flex flex-col justify-between border border-zinc-850/60 rounded-xl p-3 bg-zinc-950/45 select-none relative">
          
          {/* Top header region */}
          <div className="flex items-center justify-between border-b border-zinc-900/80 pb-2 mb-2">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono font-bold tracking-widest text-[#eff0f1] uppercase">IDENTITY CARD</span>
              <span className="text-[7px] font-mono text-zinc-500 tracking-wider">SECURE LEDGER ACCESS</span>
            </div>
            <div className="flex items-center gap-1 text-[8px] font-mono text-emerald-400 bg-emerald-950/20 px-1.5 py-0.5 rounded border border-emerald-900/30">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE
            </div>
          </div>

          {/* Centered Profile Picture - exactly matching generated avatar */}
          <div className="flex-1 overflow-hidden rounded-lg border border-zinc-850 relative bg-zinc-900 group-hover:border-zinc-700/80 transition-colors">
            <img 
              src={PERSONAL_INFO.avatar} 
              alt={PERSONAL_INFO.name} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-lg saturate-[0.85] contrast-[1.05] hover:saturate-100 transition-all duration-300 pointer-events-none"
            />
            {/* Ambient vignette inner mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Bottom Card Meta Details */}
          <div className="mt-2 pt-2 border-t border-zinc-900/80 flex flex-col gap-0.5">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-bold text-zinc-100 tracking-tight leading-none truncate">{PERSONAL_INFO.name}</span>
              <span className="text-[8px] font-mono text-blue-400 font-extrabold uppercase shrink-0">IPK 3.40</span>
            </div>
            
            <div className="flex items-center justify-between gap-1 text-[8px] font-mono text-zinc-500 mt-1">
              <span>SEM 6 / SIS. INFO</span>
              <span>BAKRIE UNIV</span>
            </div>

            {/* Simulated bar code block */}
            <div className="flex items-center justify-between border-t border-zinc-900/60 pt-2 mt-1 gap-2">
              <div className="font-mono text-[7px] text-zinc-650 tracking-wider">
                UID: 2026.06.20.99
              </div>
              <div className="flex items-center text-zinc-500 shrink-0">
                <Barcode className="w-6 h-3 text-zinc-500" />
              </div>
            </div>
          </div>

        </div>

      </motion.div>

      {/* Floating high-fidelity drop-shadow mimic */}
      <motion.div 
        style={{
          x: shadowX,
          y: shadowY,
          blur: shadowBlur,
          scale: shadowScale,
        }}
        className="absolute -bottom-6 w-[200px] h-[15px] bg-black/60 rounded-full blur-xl pointer-events-none z-10"
      />
    </div>
  );
}

