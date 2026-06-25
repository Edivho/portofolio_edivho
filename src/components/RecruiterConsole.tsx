import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Sparkles, 
  Mail, 
  Trash2, 
  CheckCircle2, 
  ExternalLink,
  Briefcase
} from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface RecruiterMessage {
  id: string;
  name: string;
  company: string;
  email: string;
  role: string;
  message: string;
  timestamp: string;
}

export default function RecruiterConsole() {
  const [messages, setMessages] = useState<RecruiterMessage[]>([]);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [role] = useState('Koneksi Baru');
  const [message, setMessage] = useState('');
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Memuat pesan lokal dari localStorage saat komponen pertama kali dimuat
  useEffect(() => {
    try {
      const stored = localStorage.getItem('edivho_recruiter_submissions');
      if (stored) {
        setMessages(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Gagal memuat basis data pesan lokal:", e);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    
    if (!name || !email || !message) {
      setValidationError("Harap lengkapi nama, email, dan pesan anda.");
      return;
    }

    setIsSubmitting(true);

    // Menyusun struktur data form
    const formData = new FormData();
    formData.append("access_key", "6d0ded13-e423-4d40-9676-0253d2f83101");
    formData.append("name", name);
    formData.append("email", email);
    formData.append("subject", `💼 Tawaran Baru dari ${company || 'Independen'}`);
    
    // Parameter krusial untuk melatih Gmail agar mengenali pengirim resmi (Anti-Spam)
    formData.append("from_name", "Portfolio Edivho Contact Hub");

    // Format isi pesan yang akan dikirimkan ke Gmail pribadi Anda
    const detailPesan = `
Nama Pengirim: ${name}
Perusahaan/Organisasi: ${company || 'Independen / Pribadi'}
Email Kontak: ${email}
Tipe Hubungan: ${role}

Isi Pesan:
"${message}"
    `.trim();
    
    formData.append("message", detailPesan);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData, // Mengirimkan objek FormData langsung
      });

      const result = await response.json();

      if (result.success) {
        // Simpan ke antrean log lokal jika pengiriman ke email utama berhasil
        const newMessage: RecruiterMessage = {
          id: Math.random().toString(36).substr(2, 9),
          name,
          company: company || 'Independen / Pribadi',
          email,
          role,
          message,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' - Hari Ini',
        };

        const updated = [newMessage, ...messages];
        setMessages(updated);
        
        try {
          localStorage.setItem('edivho_recruiter_submissions', JSON.stringify(updated));
        } catch (err) {
          console.error(err);
        }

        // Reset Form Inputs & Tampilkan Banner Sukses
        setName('');
        setCompany('');
        setEmail('');
        setMessage('');
        setIsSubmitSuccess(true);
        
        // Sembunyikan banner sukses secara otomatis setelah 4 detik
        setTimeout(() => {
          setIsSubmitSuccess(false);
        }, 4000);
      } else {
        setValidationError(result.message || "Gagal mengirim pesan ke server. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setValidationError("Terjadi kesalahan jaringan atau CORS block. Silakan periksa koneksi Anda.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
    try {
      localStorage.removeItem('edivho_recruiter_submissions');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section id="contact-hub" className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-zinc-900/60 relative">
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-blue-700/5 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center mb-16">
        <div className="editorial-name-tag mb-4 shadow-sm inline-block">
          KONEKSIKAN PELUANG
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 font-serif">
          Hubungi <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent italic font-normal pr-1px">Edivho Sekarang</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Apakah Anda seorang recruiter atau pimpinan tim? Gunakan terminal penawaran di bawah ini untuk mengirimkan undangan wawancara, tawaran kolaborasi, atau kueri bisnis langsung ke email pribadi saya.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Recruiter Form Console */}
        <div className="lg:col-span-7 bg-zinc-900/10 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl relative">
          
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 font-serif">
            <Briefcase className="w-5 h-5 text-blue-400" />
            Terminal Pengiriman Penawaran
          </h3>

          {validationError && (
            <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-mono">
              {validationError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-semibold text-zinc-400 uppercase tracking-wider block">Nama Anda *</label>
                <input
                  type="text"
                  required
                  disabled={isSubmitting}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Budi Gunawan"
                  className="w-full bg-zinc-950/80 border border-zinc-800/80 rounded-xl py-2.5 px-4 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all font-sans disabled:opacity-50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-semibold text-zinc-400 uppercase tracking-wider block">Nama Perusahaan / Organisasi</label>
                <input
                  type="text"
                  disabled={isSubmitting}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="PT Inovasi Digital"
                  className="w-full bg-zinc-950/80 border border-zinc-800/80 rounded-xl py-2.5 px-4 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all font-sans disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-semibold text-zinc-400 uppercase tracking-wider block">Email Kontak *</label>
              <input
                type="email"
                required
                disabled={isSubmitting}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="recruiter@company.com"
                className="w-full bg-zinc-950/80 border border-zinc-800/80 rounded-xl py-2.5 px-4 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all font-mono disabled:opacity-50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-semibold text-zinc-400 uppercase tracking-wider block">Pesan/Tawaran Singkat *</label>
              <textarea
                required
                rows={4}
                disabled={isSubmitting}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan detail undangan wawancara atau ide kemitraan Anda di sini..."
                className="w-full bg-zinc-950/80 border border-zinc-800/80 rounded-xl py-2.5 px-4 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all font-sans disabled:opacity-50"
              />
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                * Wajib diisi untuk pengiriman
              </span>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white text-sm font-bold tracking-wide shadow-md shadow-blue-950/20 hover:shadow-blue-400/10 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? "Mengirim..." : "Kirim Penawaran"}</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Form success overlay banner */}
          <AnimatePresence>
            {isSubmitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute inset-0 bg-zinc-950/98 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center text-center p-6 z-20 border border-blue-500/30"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 animate-bounce">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Penawaran Berhasil Terkirim!</h4>
                <p className="text-zinc-400 text-xs sm:text-sm max-w-sm mb-6">
                  Terima kasih, pesan Anda sudah sukses diteruskan langsung ke email pribadi Edivho. Notifikasi salinan juga masuk ke sandbox antrean lokal.
                </p>
                <button
                  onClick={() => setIsSubmitSuccess(false)}
                  className="text-xs font-mono font-bold text-blue-400 bg-zinc-900 border border-zinc-800 hover:border-blue-500/55 px-4 py-2 rounded-xl cursor-pointer transition-colors"
                >
                  Kembali ke Terminal
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Local Submissions Ledger Log */}
        <div className="lg:col-span-5 flex flex-col h-full">
          <div className="bg-zinc-900/10 border border-zinc-800/50 rounded-2xl p-6 flex flex-col h-full min-h-[360px] justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                <span className="text-xs font-mono text-zinc-300 font-bold tracking-widest flex items-center gap-1.5 uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  Antrean Lokal ({messages.length})
                </span>
                
                {messages.length > 0 && (
                  <button
                    onClick={handleClear}
                    className="text-[10px] font-mono text-zinc-500 hover:text-rose-400 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    Bersihkan
                  </button>
                )}
              </div>

              {/* Messages list scroller */}
              <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-850/80 text-xs relative group/item"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-white leading-none">{msg.name}</p>
                          <p className="text-[10px] text-zinc-500 mt-0.5">{msg.company}</p>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-600 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">
                          {msg.timestamp}
                        </span>
                      </div>
                      
                      <div className="text-[10px] font-mono text-blue-400 capitalize mb-2">
                        Tawaran: {msg.role.replace('-', ' ')}
                      </div>

                      <p className="text-zinc-400 italic font-sans break-words bg-zinc-900/20 p-2 rounded border border-zinc-900 leading-normal">
                        "{msg.message}"
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {messages.length === 0 && (
                  <div className="text-center py-12 text-zinc-500 space-y-2">
                    <Mail className="w-8 h-8 text-zinc-700 mx-auto" />
                    <p className="text-xs font-mono">Belum ada penawaran lokal dikirim di sesi ini.</p>
                    <p className="text-[10px] text-zinc-650 font-sans px-4">Kirimkan penawaran lewat form sebelah kiri untuk memantau simulasi ledger antrean.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Direct Email Link bottom card */}
            <div className="mt-6 pt-4 border-t border-zinc-800/60 text-center">
              <span className="text-[11px] text-zinc-500 block mb-2 font-sans">Ingin komunikasi langsung via inbox?</span>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-bold font-mono text-zinc-300 hover:text-blue-400 transition-all cursor-pointer"
              >
                <span>{PERSONAL_INFO.email}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}