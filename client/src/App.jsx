import React, { useState, useEffect } from 'react';
import { Sparkles, Image as ImageIcon, FileText, History, Terminal, Cpu, Zap, Eye, Shield, Video, ArrowLeft, Download, Copy, Check, Flame, Layers } from 'lucide-react';

export default function App() {
  // Navigation State: 'home', 'esports', 'cinematic', 'apparel', 'text_viral', 'history'
  const [currentPage, setCurrentPage] = useState('home'); 
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState('general'); 
  const [aspectRatio, setAspectRatio] = useState('16:9'); 
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
    if (currentPage === 'history') fetchHistory();
  }, [currentPage]);

  const handleCopyText = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navigateToTool = (pageId, defaultPrompt = '', defaultRatio = '16:9') => {
    setCurrentPage(pageId);
    setPrompt(defaultPrompt);
    setAspectRatio(defaultRatio);
    setOutput('');
    setGeneratedImg('');
  };

  const handleGenerate = async (filterType) => {
    if (!prompt) return alert("Workspace core prompt cannot be empty!");
    setLoading(true);
    setOutput('');
    setGeneratedImg('');

    try {
      if (currentPage === 'text_viral') {
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
        else alert("Generation failed. Check server logs.");
      }
    } catch (err) {
      alert("Pipeline failure. Check node server.js connection!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#03050a] text-[#f1f5f9] font-sans overflow-hidden antialiased selection:bg-cyan-500/30">
      
      {/* Fixed Left Global Sidebar Navigation */}
      <div className="w-64 bg-[#080c14]/90 border-r border-slate-900/80 backdrop-blur-md flex flex-col justify-between z-10">
        <div className="p-5">
          <div className="flex items-center gap-3 mb-8 px-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
              <Cpu className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <span className="text-sm font-black tracking-widest uppercase bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">CREATO.AI</span>
              <p className="text-[9px] text-slate-500 tracking-wider font-mono">LABS HUB</p>
            </div>
          </div>

          <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 px-3 mb-2">Navigation</div>
          <nav className="space-y-1">
            <button onClick={() => setCurrentPage('home')} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${currentPage === 'home' ? 'bg-slate-900 text-white border border-slate-800' : 'text-slate-400 hover:bg-slate-900/40'}`}>
              <Layers className="w-4 h-4 text-cyan-400" /> Studio Home
            </button>
            <button onClick={() => setCurrentPage('history')} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${currentPage === 'history' ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:bg-slate-900/40'}`}>
              <History className="w-4 h-4 text-emerald-400" /> Storage Ledger
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-900/60 text-center">
          <div className="text-[10px] font-mono text-slate-500 bg-slate-950/60 p-2 border border-slate-900/60 rounded-lg flex items-center justify-between">
            <span><Shield className="w-3 h-3 inline mr-1 text-green-400" /> SECURE DEPLOY</span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          </div>
        </div>
      </div>

      {/* Main Container Workstation */}
      <div className="flex-1 flex flex-col overflow-y-auto p-6 md:p-8 bg-radial-[at_50%_top] from-[#0a1224] via-[#03050a] to-[#03050a]">
        
        {/* VIEW 1: HOME PAGE (Options Selection Studio) */}
        {currentPage === 'home' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tight">Creative Application Hub</h1>
              <p className="text-xs text-slate-400 mt-1">Select a dedicated workspace engine below to process isolated asset compilation maps.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Option Card 1: Esports Thumbnail */}
              <div onClick={() => navigateToTool('esports', 'Free Fire aggressive bundle character render, neon crimson aura', '16:9')} className="bg-[#080c14]/90 border border-slate-900 hover:border-purple-500/40 rounded-2xl p-5 cursor-pointer group transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-4 h-4 text-purple-400" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wide group-hover:text-purple-300 transition-colors">Esports Thumbnail</h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">Generate extreme high-contrast character renders with violent neon vectors custom engineered for YouTube gaming montages.</p>
                <div className="mt-4 text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1">Open Studio →</div>
              </div>

              {/* Option Card 2: 8K Cinematic Portrait */}
              <div onClick={() => navigateToTool('cinematic', 'Man wearing black traditional long coat over a black kurta standing tall, 85mm lens', '1:1')} className="bg-[#080c14]/90 border border-slate-900 hover:border-cyan-500/40 rounded-2xl p-5 cursor-pointer group transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Eye className="w-4 h-4 text-cyan-400" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wide group-hover:text-cyan-300 transition-colors">8K Cinematic Lab</h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">Render hyper-realistic portraits with studio volumetric dust, deep lens blur parameters, and fair skin texture optimization maps.</p>
                <div className="mt-4 text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1">Open Studio →</div>
              </div>

              {/* Option Card 3: Urban Apparel Studio */}
              <div onClick={() => navigateToTool('apparel', 'Lifestyle photography of streetwear aesthetic cargo look', '9:16')} className="bg-[#080c14]/90 border border-slate-900 hover:border-pink-500/40 rounded-2xl p-5 cursor-pointer group transition-all duration-300 hover:shadow-[0_0_20px_rgba(236,72,153,0.1)]">
                <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wide group-hover:text-pink-300 transition-colors">Aesthetic Apparel</h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">Curate modern high-fashion textiles and lifestyle designs highlighting aesthetic baggy clothes structures on vertical canvas frames.</p>
                <div className="mt-4 text-[10px] font-mono font-bold text-pink-400 uppercase tracking-widest flex items-center gap-1">Open Studio →</div>
              </div>

              {/* Option Card 4: Viral Strategy Engine */}
              <div onClick={() => navigateToTool('text_viral', 'Free Fire gameplay editing secret tutorials', '1:1')} className="bg-[#080c14]/90 border border-slate-900 hover:border-indigo-500/40 rounded-2xl p-5 cursor-pointer group transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="w-4 h-4 text-indigo-400" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wide group-hover:text-indigo-300 transition-colors">Viral Hooks Strategy</h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">Deploy Gemini AI brain to map current media trends, output scroll-stopping entry hooks, and script frame-by-frame visual reel strategies.</p>
                <div className="mt-4 text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1">Open Engine →</div>
              </div>

            </div>
          </div>
        )}

        {/* VIEW 2: HISTORY LEDGER PAGE */}
        {currentPage === 'history' && (
          <div className="space-y-4 animate-fade-in">
            <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-slate-400 hover:text-white mb-4 bg-slate-950 border border-slate-900 px-3 py-1.5 rounded-lg"><ArrowLeft className="w-3.5 h-3.5" /> Back to Studio</button>
            <div className="bg-[#080d16]/80 border border-slate-900 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-slate-400 flex items-center gap-2"><History className="w-3.5 h-3.5 text-emerald-400" /> Cluster Data Sync Logs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[480px] overflow-y-auto pr-2">
                {historyData.map((item) => (
                  <div key={item._id} className="bg-[#0c1220]/60 p-4 rounded-xl border border-slate-900/80">
                    <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-1">Matrix Frame Log</p>
                    <p className="text-xs text-slate-300 font-medium">Prompt: "{item.prompt}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: ISOLATED WORKSPACE TEMPLATE (For Isolated Processing Pages) */}
        {currentPage !== 'home' && currentPage !== 'history' && (
          <div className="flex-1 flex flex-col h-full animate-fade-in">
            {/* Header Control */}
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-slate-400 hover:text-white bg-slate-950 border border-slate-900 px-3 py-2 rounded-xl transition-all"><ArrowLeft className="w-4 h-4 text-cyan-400" /> Return to Dashboard Hub</button>
              <div className="text-xs font-bold uppercase font-mono tracking-widest bg-slate-950 px-3 py-2 border border-slate-900 rounded-xl">
                Active Module: <span className={currentPage === 'text_viral' ? 'text-purple-400' : 'text-cyan-400'}>{currentPage.toUpperCase()} UNIT</span>
              </div>
            </div>

            {/* Core Isolated Double Split Cockpit */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 flex-1 items-start w-full">
              
              {/* Left Settings Control Column - 5 Cols */}
              <div className="xl:col-span-5 space-y-4">
                <div className="bg-[#080c14]/90 border border-slate-900 rounded-2xl p-5 shadow-xl">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Configure Generation String Prompt</label>
                  <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={5} className="w-full bg-[#04060b] border border-slate-900 rounded-xl p-3.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50 placeholder-slate-600 resize-none font-medium leading-relaxed" />
                </div>

                <div className="bg-[#080c14]/90 border border-slate-900 rounded-2xl p-5 shadow-xl">
                  {currentPage === 'text_viral' ? (
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Strategy Model Blueprint</label>
                      <select value={contentType} onChange={(e) => setContentType(e.target.value)} className="w-full bg-[#04060b] border border-slate-900 rounded-xl p-3 text-xs text-slate-300 font-bold focus:outline-none">
                        <option value="general">Viral Reels Script & Hook Blueprint</option>
                        <option value="blog">SEO Article Framework & Keywords</option>
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Resolution Bounds Aspect Ratio</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['1:1', '16:9', '9:16'].map((ratio) => (
                          <button key={ratio} onClick={() => setAspectRatio(ratio)} className={`py-2 rounded-xl text-xs font-mono font-bold border transition-all ${aspectRatio === ratio ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.1)]' : 'bg-[#04060b] border-slate-900 text-slate-500 hover:border-slate-800'}`}>
                            {ratio}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button onClick={() => handleGenerate(currentPage === 'esports' ? 'esports_thumbnail' : currentPage === 'cinematic' ? 'cinematic_realistic' : 'aesthetic_apparel')} disabled={loading} className={`w-full font-bold py-4 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 shadow-md ${currentPage === 'text_viral' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 border border-purple-500' : 'bg-gradient-to-r from-cyan-600 to-blue-600 border border-cyan-500'}`}>
                  {loading ? "Processing Complex Rendering Map..." : "Execute Pipeline Module"}
                </button>
              </div>

              {/* Right Isolated Output Screen Monitor - 7 Cols */}
              <div className="xl:col-span-7 bg-[#080c14]/90 border border-slate-900 rounded-2xl p-5 min-h-[460px] xl:h-[510px] flex flex-col justify-between shadow-xl relative overflow-hidden">
                <div className="flex justify-between items-center border-b border-slate-900/60 pb-3 mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">High Fidelity Live Output</span>
                  {currentPage === 'text_viral' && output && (
                    <button onClick={handleCopyText} className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-slate-400 hover:text-purple-400 bg-slate-950 border border-slate-900 px-2.5 py-1 rounded-lg transition-all">
                      {copied ? 'Copied' : 'Copy Logs'}
                    </button>
                  )}
                </div>

                <div className="flex-1 flex items-center justify-center overflow-hidden w-full h-full relative">
                  {loading ? (
                    <div className="text-center space-y-2">
                      <div className={`w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto ${currentPage === 'text_viral' ? 'border-purple-500' : 'border-cyan-500'}`}></div>
                      <p className="text-[9px] tracking-widest text-slate-500 font-mono uppercase">Compiling neural visual matrix tokens...</p>
                    </div>
                  ) : currentPage === 'text_viral' && output ? (
                    <div className="w-full h-full text-xs text-slate-300 bg-[#04060b] p-4 rounded-xl border border-slate-900/60 whitespace-pre-wrap text-left overflow-y-auto font-mono max-h-[380px] shadow-inner">{output}</div>
                  ) : currentPage !== 'text_viral' && generatedImg ? (
                    <div className="space-y-4 w-full h-full flex flex-col justify-between">
                      <div className="flex-1 flex items-center justify-center bg-slate-950/40 border border-slate-900/60 rounded-xl p-2 overflow-hidden">
                        <img src={generatedImg} alt="Isolated Module Output" className="rounded-lg max-h-[280px] xl:max-h-[340px] w-full object-contain border border-slate-900 shadow-2xl" />
                      </div>
                      <div className="flex justify-between items-center bg-[#04060b] p-2.5 border border-slate-900/80 rounded-xl">
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5"><Video className="w-3.5 h-3.5" /> Bit-wise Outline Synchronized</span>
                        <a href={generatedImg} download="creatoai_isolated_render.webp" className="text-[10px] uppercase font-bold tracking-wider bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-2 px-3.5 rounded-lg flex items-center gap-1 shadow-md"><Download className="w-3 h-3" /> Export WebP</a>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest font-mono">Isolated Frame Idle. Awaiting pipeline instruction.</p>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}