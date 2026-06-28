import React, { useState, useEffect } from 'react';
import { Sparkles, Image as ImageIcon, FileText, History, Terminal, Cpu, Zap, Eye, Shield, Video, Layers, Sliders, Flame, Download, Copy, Check } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('image'); 
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState('general'); 
  const [aspectRatio, setAspectRatio] = useState('16:9'); // Default to landscape for gaming thumbnails
  const [filterType, setFilterType] = useState('esports_thumbnail'); 
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [generatedImg, setGeneratedImg] = useState('');
  const [historyData, setHistoryData] = useState([]);
  const [copied, setCopied] = useState(false);

  const fetchHistory = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/text/history');
      const result = await res.json();
      if (result.success) setHistoryData(result.data);
    } catch (err) {
      console.error("History offline:", err);
    }
  };

  useEffect(() => {
    if (activeTab === 'history') fetchHistory();
  }, [activeTab]);

  const injectTemplate = (type) => {
    if (type === 'ff_bundle') {
      setPrompt('Free Fire aggressive character bundle render, standing tall on a peak, floating neon runes around hands, high contrast glowing crimson aura');
    } else if (type === 'esports_bg') {
      setPrompt('Esports tournament gaming stage backdrop, sharp abstract triangular lines, dark ambient lighting with violet and neon cyan spotlights, fog atmosphere');
    } else if (type === 'baggy_style') {
      setPrompt('Fair complexion model wearing premium aesthetic baggy clothing, oversized heavy dark long coat over a streetwear techwear cargo, cinematic urban moody alley lighting');
    }
  };

  const handleCopyText = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerate = async () => {
    if (!prompt) return alert("Workspace prompt template matrix cannot be empty!");
    setLoading(true);
    setOutput('');
    setGeneratedImg('');

    try {
      if (activeTab === 'text') {
        const res = await fetch('http://localhost:5000/api/v1/text/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, contentType }) 
        });
        const result = await res.json();
        if (result.success) setOutput(result.data);
      } else {
        const res = await fetch('http://localhost:5000/api/v1/image/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, aspectRatio, filterType })
        });
        const result = await res.json();
        if (result.success) setGeneratedImg(result.imageData);
        else alert("Generation failed. Check terminal servers logs.");
      }
    } catch (err) {
      alert("Core pipeline failure. Verify node server.js status!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#03050a] text-[#f1f5f9] font-sans overflow-hidden antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Premium Cyber Side Engine Panel */}
      <div className="w-68 bg-[#080c14]/90 border-r border-slate-900/80 backdrop-blur-md flex flex-col justify-between relative z-10">
        <div className="p-5">
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <Cpu className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <span className="text-sm font-black tracking-widest uppercase bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">CREATO.AI</span>
              <p className="text-[9px] text-slate-500 tracking-wider font-mono">CORE STUDIO ENGINE</p>
            </div>
          </div>

          <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 px-3 mb-2">Workspace Controls</div>
          <nav className="space-y-1">
            <button onClick={() => setActiveTab('image')} className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${activeTab === 'image' ? 'bg-gradient-to-r from-cyan-600/20 to-blue-600/10 border border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border border-transparent'}`}>
              <ImageIcon className="w-4 h-4 text-cyan-400" /> High-Fidelity Renders
            </button>
            <button onClick={() => setActiveTab('text')} className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${activeTab === 'text' ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/10 border border-purple-500/40 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border border-transparent'}`}>
              <FileText className="w-4 h-4 text-purple-400" /> Viral Strategy Core
            </button>
            <button onClick={() => setActiveTab('history')} className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${activeTab === 'history' ? 'bg-gradient-to-r from-emerald-600/20 to-teal-600/10 border border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border border-transparent'}`}>
              <History className="w-4 h-4 text-emerald-400" /> Database Ledger
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-900/60 bg-[#05080e]/40 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 bg-slate-950/60 p-2.5 border border-slate-900/60 rounded-lg">
            <span className="flex items-center gap-1.5"><Shield className="w-3 h-3 text-cyan-400" /> STATUS: RUNNING</span>
            <span className="text-cyan-500 animate-pulse">●</span>
          </div>
        </div>
      </div>

      {/* Main Studio Console Grid */}
      <div className="flex-1 flex flex-col overflow-y-auto p-6 md:p-8 relative z-0 bg-radial-[at_50%_top] from-[#0a1224] via-[#03050a] to-[#03050a]">
        
        <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-900/60 pb-5">
          <div>
            <h1 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
              Production Laboratory Suite <Layers className="w-4 h-4 text-cyan-400 animate-bounce" />
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">Automated high-contrast esports asset compilation matrix.</p>
          </div>
        </header>

        {activeTab === 'history' ? (
          <div className="bg-[#080d16]/80 border border-slate-900 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-slate-400 flex items-center gap-2">
              <History className="w-3.5 h-3.5 text-emerald-400" /> System Data Synchronization Logs
            </h2>
            {historyData.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-slate-900 rounded-xl text-xs text-slate-500 font-mono">
                No storage metadata logs detected inside active local cluster.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[550px] overflow-y-auto pr-2">
                {historyData.map((item) => (
                  <div key={item._id} className="bg-[#0c1220]/60 p-4 rounded-xl border border-slate-900/80 hover:border-slate-800 transition-all">
                    <div className="flex justify-between items-center text-[10px] font-mono mb-2">
                      <span className="text-cyan-400 uppercase tracking-widest bg-cyan-950/40 border border-cyan-900/50 px-2 py-0.5 rounded">Log Matrix</span>
                      <span className="text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium line-clamp-3">Prompt: "{item.prompt}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 flex-1 items-start">
            
            {/* Controls Input Terminal - 5 Columns */}
            <div className="xl:col-span-5 space-y-5">
              <div className="bg-[#080c14]/90 border border-slate-900 rounded-2xl p-5 backdrop-blur-sm relative overflow-hidden shadow-xl">
                
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Creative Query Matrix
                  </label>
                  {activeTab === 'image' && (
                    <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-900/60 px-2 py-0.5 rounded">STABILITY.API</span>
                  )}
                </div>

                <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4} className="w-full bg-[#04060b] border border-slate-900 rounded-xl p-3.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 placeholder-slate-600 resize-none font-medium leading-relaxed" placeholder={activeTab === 'text' ? "Enter short topic (e.g., Free fire gameplay editing secret, AI trends 2026)..." : "Describe detailed structural graphics layers context..."} />

                {/* Micro-Injectors for Quick Tuning */}
                {activeTab === 'image' && (
                  <div className="mt-3">
                    <div className="text-[9px] uppercase tracking-widest font-bold text-slate-500 mb-1.5 px-0.5 flex items-center gap-1"><Flame className="w-3 h-3 text-orange-400" /> Quick-Inject Pro Templates</div>
                    <div className="flex flex-wrap gap-1.5">
                      <button onClick={() => injectTemplate('ff_bundle')} className="text-[10px] font-semibold bg-slate-950 hover:bg-slate-900 text-slate-400 border border-slate-900 hover:border-slate-800 px-2.5 py-1 rounded-lg transition-all">FF Character</button>
                      <button onClick={() => injectTemplate('esports_bg')} className="text-[10px] font-semibold bg-slate-950 hover:bg-slate-900 text-slate-400 border border-slate-900 hover:border-slate-800 px-2.5 py-1 rounded-lg transition-all">Esports Stage</button>
                      <button onClick={() => injectTemplate('baggy_style')} className="text-[10px] font-semibold bg-slate-950 hover:bg-slate-900 text-slate-400 border border-slate-900 hover:border-slate-800 px-2.5 py-1 rounded-lg transition-all">Baggy Clothes</button>
                    </div>
                  </div>
                )}
              </div>

              {activeTab === 'image' && (
                <div className="bg-[#080c14]/90 border border-slate-900 rounded-2xl p-5 backdrop-blur-sm shadow-xl">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-purple-400" /> Pipeline Multiplier Presets
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button onClick={() => setFilterType('esports_thumbnail')} className={`p-3 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group ${filterType === 'esports_thumbnail' ? 'bg-purple-950/20 border-purple-500/50 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.05)]' : 'bg-[#04060b] border-slate-900 text-slate-400 hover:border-slate-800'}`}>
                      <p className="text-xs font-bold block tracking-tight group-hover:text-slate-200 transition-colors">Gaming Glow</p>
                      <span className="text-[9px] text-slate-500 block leading-tight mt-0.5">Neon, High Contrast Renders</span>
                    </button>

                    <button onClick={() => setFilterType('cinematic_realistic')} className={`p-3 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group ${filterType === 'cinematic_realistic' ? 'bg-cyan-950/20 border-cyan-500/50 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.05)]' : 'bg-[#04060b] border-slate-900 text-slate-400 hover:border-slate-800'}`}>
                      <p className="text-xs font-bold block tracking-tight group-hover:text-slate-200 transition-colors">8K Realistic</p>
                      <span className="text-[9px] text-slate-500 block leading-tight mt-0.5">Studio Light, Hyper-Realism</span>
                    </button>

                    <button onClick={() => setFilterType('aesthetic_apparel')} className={`p-3 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group ${filterType === 'aesthetic_apparel' ? 'bg-pink-950/20 border-pink-500/50 text-pink-200 shadow-[0_0_15px_rgba(236,72,153,0.05)]' : 'bg-[#04060b] border-slate-900 text-slate-400 hover:border-slate-800'}`}>
                      <p className="text-xs font-bold block tracking-tight group-hover:text-slate-200 transition-colors">High Aesthetic</p>
                      <span className="text-[9px] text-slate-500 block leading-tight mt-0.5">Baggy Outfits, Trendy Textiles</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-[#080c14]/90 border border-slate-900 rounded-2xl p-5 backdrop-blur-sm shadow-xl">
                {activeTab === 'text' ? (
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5">
                      Strategy Target Matrix
                    </label>
                    <select value={contentType} onChange={(e) => setContentType(e.target.value)} className="w-full bg-[#04060b] border border-slate-900 rounded-xl p-3 text-xs focus:outline-none focus:border-purple-500/50 text-slate-300 font-medium">
                      <option value="general">Viral Reels Script & Hook Blueprint</option>
                      <option value="blog">SEO Article Framework & Keywords</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5">
                      Display Resolution Bounds
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['1:1', '16:9', '9:16'].map((ratio) => (
                        <button key={ratio} onClick={() => setAspectRatio(ratio)} className={`py-2 rounded-xl text-xs font-mono font-bold border transition-all ${aspectRatio === ratio ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.1)]' : 'bg-[#04060b] border-slate-900 text-slate-500 hover:border-slate-800'}`}>
                          {ratio === '1:1' ? '1:1 SQ' : ratio === '16:9' ? '16:9 HD' : '9:16 REEL'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button onClick={handleGenerate} disabled={loading} className={`w-full font-bold py-3.5 rounded-xl transition-all duration-300 text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 border disabled:opacity-40 ${activeTab === 'text' ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 border-purple-500 hover:opacity-95 shadow-purple-950/20' : 'bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 border-cyan-500 hover:opacity-95 shadow-cyan-950/20'}`}>
                {loading ? (
                  <span className="flex items-center gap-2 font-mono text-[11px] normal-case tracking-normal">
                    <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                    Executing Core Pipeline Tiers...
                  </span>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" /> Launch Compilation Engine
                  </>
                )}
              </button>
            </div>

            {/* High Fidelity Monitor Display Panel - 7 Columns */}
            <div className="xl:col-span-7 bg-[#080c14]/90 border border-slate-900 rounded-2xl p-5 backdrop-blur-sm min-h-[480px] xl:h-[570px] flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
              
              <div className="flex justify-between items-center border-b border-slate-900/60 pb-3 mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" /> High-Fidelity Output Monitor
                </span>
                
                {/* Contextual Action Buttons */}
                {activeTab === 'text' && output && (
                  <button onClick={handleCopyText} className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-slate-400 hover:text-purple-400 bg-slate-950 border border-slate-900 hover:border-purple-900/40 px-2.5 py-1 rounded-lg transition-all">
                    {copied ? <><Check className="w-3 h-3 text-green-400" /> Copied</> : <><Copy className="w-3 h-3" /> Copy Logs</>}
                  </button>
                )}
              </div>

              <div className="flex-1 flex items-center justify-center overflow-hidden w-full h-full relative">
                {loading ? (
                  <div className="text-center space-y-3 relative z-10">
                    <div className={`w-9 h-9 border-2 border-t-transparent rounded-full animate-spin mx-auto ${activeTab === 'text' ? 'border-purple-500' : 'border-cyan-500'}`}></div>
                    <p className="text-[10px] tracking-widest text-slate-500 font-mono uppercase">Compiling neural visual tokens...</p>
                  </div>
                ) : activeTab === 'text' && output ? (
                  <div className="w-full h-full text-xs text-slate-300 bg-[#04060b] p-4 rounded-xl border border-slate-900/60 whitespace-pre-wrap text-left leading-relaxed overflow-y-auto font-mono selection:bg-purple-500/20 max-h-[380px] xl:max-h-[440px] shadow-inner">{output}</div>
                ) : activeTab === 'image' && generatedImg ? (
                  <div className="space-y-4 w-full h-full flex flex-col justify-between">
                    <div className="flex-1 flex items-center justify-center bg-slate-950/40 border border-slate-900/60 rounded-xl overflow-hidden p-2">
                      <img src={generatedImg} alt="AI Engine Output Render" className="rounded-lg max-h-[320px] xl:max-h-[380px] w-full object-contain border border-slate-900 shadow-2xl transition-all duration-500 hover:scale-[1.01]" />
                    </div>
                    <div className="flex justify-between items-center bg-[#04060b] p-3 rounded-xl border border-slate-900/80 shadow-md">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Video className="w-3.5 h-3.5 animate-pulse" /> Asset Engine Finalized
                      </span>
                      <a href={generatedImg} download="creatoai_render.webp" className="text-[10px] uppercase font-bold tracking-wider bg-gradient-to-r from-cyan-600 to-blue-600 hover:opacity-95 text-white py-2 px-3.5 rounded-lg flex items-center gap-1 shadow-md">
                        <Download className="w-3 h-3" /> Export WebP
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 relative">
                    <div className="w-12 h-12 rounded-full border border-dashed border-slate-800 flex items-center justify-center mx-auto mb-3 opacity-40">
                      <Terminal className="w-4 h-4 text-slate-600" />
                    </div>
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest font-mono">Fidelity Studio Core Idle.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}