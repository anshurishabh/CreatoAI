import React, { useState, useEffect } from 'react';
import { Sparkles, Image as ImageIcon, FileText, History, Terminal, Cpu, Zap, Eye, Shirt } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('text');
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState('general');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [filterType, setFilterType] = useState('general'); // New State
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [generatedImg, setGeneratedImg] = useState('');
  const [historyData, setHistoryData] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/text/history');
      const result = await res.json();
      if (result.success) setHistoryData(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (activeTab === 'history') fetchHistory();
  }, [activeTab]);

  const handleGenerate = async () => {
    if (!prompt) return alert("Prompt missing!");
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
          body: JSON.stringify({ prompt, aspectRatio, filterType }) // Sent filterType
        });
        const result = await res.json();
        if (result.success) setGeneratedImg(result.imageData);
      }
    } catch (err) {
      alert("Error processing pipeline");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#0b0f19] text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-[#111827] border-r border-gray-800 flex flex-col justify-between">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <Cpu className="w-8 h-8 text-indigo-500 animate-pulse" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">CreatoAI</span>
          </div>
          <nav className="space-y-2">
            <button onClick={() => setActiveTab('text')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'text' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}>
              <FileText className="w-5 h-5" /> AI Text Generator
            </button>
            <button onClick={() => setActiveTab('image')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'image' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}>
              <ImageIcon className="w-5 h-5" /> AI Image Generator
            </button>
            <button onClick={() => setActiveTab('history')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'history' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}>
              <History className="w-5 h-5" /> Content History
            </button>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-800 flex items-center gap-2 text-xs text-gray-500">
          <Terminal className="w-4 h-4 text-green-400" /> Matrix Engine v1.2
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col overflow-y-auto p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold">Advanced Content Suite</h1>
          <p className="text-sm text-gray-400">Power rendering with contextual filters activated.</p>
        </header>

        {activeTab === 'history' ? (
          <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Saved Logs</h2>
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {historyData.map((item) => (
                <div key={item._id} className="bg-[#1f2937] p-4 rounded-xl border border-gray-700">
                  <p className="text-sm text-gray-300 font-medium">Prompt: {item.prompt}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 items-start">
            {/* Controls Panel */}
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Workspace Prompt Input</label>
                <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4} className="w-full bg-[#1f2937] border border-gray-700 rounded-xl p-4 text-sm focus:outline-none focus:border-indigo-500 placeholder-gray-500 resize-none" placeholder={activeTab === 'text' ? "Enter content guidelines..." : "Describe image or render context..."} />
              </div>

              {activeTab === 'image' && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">AI Engine Prompt Preset Filters</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button onClick={() => setFilterType('general')} className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center gap-2 transition-all ${filterType === 'general' ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-[#1f2937] border-gray-700 text-gray-400 hover:border-gray-600'}`}>
                      <Zap className="w-4 h-4" /> Raw Mode
                    </button>
                    <button onClick={() => setFilterType('cinematic')} className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center gap-2 transition-all ${filterType === 'cinematic' ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-[#1f2937] border-gray-700 text-gray-400 hover:border-gray-600'}`}>
                      <Eye className="w-4 h-4" /> Cinematic 8K
                    </button>
                    <button onClick={() => setFilterType('esports')} className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center gap-2 transition-all ${filterType === 'esports' ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-[#1f2937] border-gray-700 text-gray-400 hover:border-gray-600'}`}>
                      <Sparkles className="w-4 h-4" /> Esports Glow
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'text' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Content Blueprint</label>
                  <select value={contentType} onChange={(e) => setContentType(e.target.value)} className="w-full bg-[#1f2937] border border-gray-700 rounded-xl p-3 text-sm">
                    <option value="general">Standard Response</option>
                    <option value="blog">SEO Blog Pipeline</option>
                    <option value="social">Social Caption Engine</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Canvas Ratio</label>
                  <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)} className="w-full bg-[#1f2937] border border-gray-700 rounded-xl p-3 text-sm">
                    <option value="1:1">1:1 Square</option>
                    <option value="16:9">16:9 Landscape</option>
                    <option value="9:16">9:16 Vertical / Reel</option>
                  </select>
                </div>
              )}

              <button onClick={handleGenerate} disabled={loading} className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 font-medium py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50">
                {loading ? "Processing Matrices..." : <><Sparkles className="w-4 h-4" /> Execute Production Engine</>}
              </button>
            </div>

            {/* Output Panel */}
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 min-h-[400px] flex flex-col justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 block">Fidelity Output Preview</span>
              <div className="flex-1 flex items-center justify-center overflow-auto">
                {loading ? (
                  <div className="text-center space-y-2">
                    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-xs text-gray-400">Processing complex AI layers...</p>
                  </div>
                ) : activeTab === 'text' && output ? (
                  <div className="w-full text-sm text-gray-300 whitespace-pre-wrap text-left bg-[#1f2937] p-4 rounded-xl">{output}</div>
                ) : activeTab === 'image' && generatedImg ? (
                  <img src={generatedImg} alt="AI Output" className="rounded-xl max-h-[400px] w-full object-contain border border-gray-700" />
                ) : (
                  <p className="text-sm text-gray-500 text-center">Fidelity visual output rendering block.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}