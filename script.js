const { useState, useEffect } = React;

// --- MULTI-TEXTURE ASMR SYNTHESIZER ---
let audioCtx = null;

const getAudioCtx = () => {
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) audioCtx = new AudioCtx();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

const playAsmrSound = (texture = 'wood-tap') => {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;

    if (texture === 'wood-tap') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.045);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (texture === 'bubble-pop') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.03);
      
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    }
  } catch (e) {}
};

// --- DATA DEFINITIONS ---
const SOCIAL_LINKS = {
  youtube: 'https://youtube.com/@RogWertz',
  instagram: 'https://instagram.com/RogWertz',
  discord: 'https://discord.gg/rogwertz',
};

const VIDEOS = [
  {
    id: 'vid-1',
    title: '100 DAYS IN HARDCORE MINECRAFT: THE RED OBSIDIAN CITADEL',
    category: 'HARDCORE SURVIVAL',
    views: '240K',
    duration: '28:45',
    thumbnail: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=1200&q=80',
    youtubeUrl: 'https://youtube.com/@RogWertz'
  },
  {
    id: 'vid-2',
    title: 'I BUILT THE ULTIMATE AUTOMATED REDSTONE SORTER (100,000 ITEMS/HR)',
    category: 'REDSTONE TUTORIAL',
    views: '185K',
    duration: '18:20',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    youtubeUrl: 'https://youtube.com/@RogWertz'
  }
];

function App() {
  const [asmrEnabled, setAsmrEnabled] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  const handleTap = (type = 'wood-tap') => {
    if (asmrEnabled) playAsmrSound(type);
  };

  const copyIp = () => {
    handleTap('bubble-pop');
    navigator.clipboard?.writeText('mc.rogwertz.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div 
      onClick={() => handleTap('wood-tap')}
      className="min-h-screen flex flex-col items-center justify-between p-6 sm:p-12 relative overflow-hidden"
    >
      <header className="w-full max-w-5xl flex items-center justify-between py-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 border border-yellow-400 rounded-xl flex items-center justify-center font-mono font-black text-yellow-300 text-xl shadow-lg">
            R
          </div>
          <span className="font-mono text-lg font-black tracking-wider text-yellow-400">ROGWERTZ</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setAsmrEnabled(!asmrEnabled);
            if (!asmrEnabled) playAsmrSound('bubble-pop');
          }}
          className={`px-4 py-2 rounded-xl font-mono text-xs uppercase font-bold border transition-all ${
            asmrEnabled 
              ? 'bg-red-500/20 border-red-500 text-yellow-400' 
              : 'bg-zinc-900 border-zinc-700 text-zinc-500'
          }`}
        >
          {asmrEnabled ? '🔊 ASMR Sound ON' : '🔇 ASMR Sound OFF'}
        </button>
      </header>

      <main className="w-full max-w-4xl text-center my-16 space-y-6">
        <div className="inline-block px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-yellow-400 text-xs font-mono uppercase tracking-widest animate-float-bounce">
          👑 Minecraft Creator & Redstone Engineer
        </div>

        <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tight">
          BUILDING THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-red-500">IMPOSSIBLE</span> IN MINECRAFT
        </h1>

        <p className="text-zinc-400 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed">
          Welcome to the official hub. Tap anywhere on the page to hear interactive ASMR block taps!
        </p>

        <div className="pt-6 flex justify-center">
          <div className="glass-panel-dark p-4 rounded-2xl flex items-center gap-4 border border-zinc-700">
            <div className="text-left font-mono">
              <span className="text-[10px] text-zinc-500 block uppercase">Minecraft Server IP</span>
              <span className="text-sm font-bold text-yellow-400">mc.rogwertz.com</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                copyIp();
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 font-mono text-xs uppercase font-bold rounded-xl transition-all"
            >
              {copied ? 'Copied!' : 'Copy IP'}
            </button>
          </div>
        </div>
      </main>

      <section className="w-full max-w-5xl my-8">
        <h2 className="text-xs font-mono uppercase tracking-widest text-red-400 mb-6">Latest Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VIDEOS.map((vid) => (
            <a
              key={vid.id}
              href={vid.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => handleTap('bubble-pop')}
              className="glass-panel-dark rounded-2xl overflow-hidden group hover:border-yellow-400/50 transition-all block"
            >
              <div className="h-48 overflow-hidden relative">
                <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-xs font-mono">{vid.duration}</span>
              </div>
              <div className="p-5">
                <span className="text-[10px] font-mono text-yellow-400 block mb-1 uppercase">{vid.category}</span>
                <h3 className="font-bold uppercase text-sm group-hover:text-yellow-400 transition-colors leading-snug">{vid.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className="w-full max-w-5xl py-6 border-t border-zinc-800 text-center font-mono text-xs text-zinc-500">
        © {new Date().getFullYear()} ROGWERTZ MINECRAFT. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}

// Render React Root
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
