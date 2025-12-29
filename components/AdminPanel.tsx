
import React, { useState } from 'react';
import { SiteContent, PortfolioItem, Service } from '../types';
import { supabase, saveSiteContent } from '../services/supabase';

interface AdminPanelProps {
  content: SiteContent;
  setContent: React.Dispatch<React.SetStateAction<SiteContent>>;
  session: any;
  onExit: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ content, setContent, session, onExit }) => {
  const [activeTab, setActiveTab] = useState<'hero' | 'services' | 'portfolio' | 'contact'>('hero');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  
  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setLoginError('Credenciais inválidas. Verifique seu usuário e senha.');
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      await saveSiteContent(content);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (err) {
      console.error(err);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 800000) { // ~800kb limit
        alert("Imagem muito grande! Reduza para menos de 800kb antes de subir.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => callback(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const updateHeroText = (type: 'titles' | 'subtitles', idx: number, value: string) => {
    setContent(prev => {
      const newArray = [...prev.hero[type]];
      newArray[idx] = value;
      return { ...prev, hero: { ...prev.hero, [type]: newArray } };
    });
  };

  const updateService = (id: string, field: keyof Service, value: string) => {
    setContent(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === id ? { ...s, [field]: value } : s)
    }));
  };

  const addPortfolioItem = (base64: string) => {
    const newItem: PortfolioItem = {
      id: Date.now().toString(),
      title: 'Novo Trabalho',
      category: 'Casamentos',
      imageUrl: base64
    };
    setContent(prev => ({ ...prev, portfolio: [newItem, ...prev.portfolio] }));
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif italic text-[#A48862] mb-2">Qube Manager</h1>
            <p className="text-gray-500 text-sm">Portal de Administração Fernanda Sales</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Usuário / E-mail</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-[#A48862]"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Senha</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-[#A48862]"
                placeholder="••••••••"
              />
            </div>
            {loginError && <p className="text-red-500 text-xs text-center">{loginError}</p>}
            <button 
              disabled={loginLoading}
              className="w-full bg-[#A48862] hover:bg-[#8e7554] text-white py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg flex items-center justify-center"
            >
              {loginLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : 'Acessar Painel'}
            </button>
            <button 
              type="button"
              onClick={onExit}
              className="w-full text-gray-500 text-xs hover:text-white transition-colors"
            >
              Voltar ao Site Público
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-4xl font-serif italic text-[#A48862] mb-2">Qube Manager</h1>
            <p className="text-gray-500 text-sm">Gerenciando: {session.user.email}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className={`${saveStatus === 'saved' ? 'bg-green-600' : saveStatus === 'error' ? 'bg-red-600' : 'bg-[#A48862]'} hover:opacity-90 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-lg flex items-center gap-2`}
            >
              {saveStatus === 'saving' ? (
                 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : null}
              {saveStatus === 'saving' ? 'Publicando...' : saveStatus === 'saved' ? 'Publicado!' : saveStatus === 'error' ? 'Erro ao Salvar' : 'Salvar no Site'}
            </button>
            <button 
              onClick={handleLogout} 
              className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
            >
              Sair
            </button>
            <button onClick={onExit} className="bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all">Sair do Modo Admin</button>
          </div>
        </header>

        <nav className="flex gap-2 mb-12 overflow-x-auto pb-4 scrollbar-hide border-b border-white/5">
          {(['hero', 'services', 'portfolio', 'contact'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-[#A48862] text-white shadow-xl shadow-[#A48862]/20' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}
            >
              {tab === 'hero' ? 'Destaques' : tab === 'services' ? 'Serviços' : tab === 'portfolio' ? 'Portfólio' : 'Contatos'}
            </button>
          ))}
        </nav>

        {/* TAB: HERO */}
        {activeTab === 'hero' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fade-in">
            <div className="space-y-8">
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                <h3 className="text-xl mb-6 font-serif">Títulos do Hero</h3>
                <div className="space-y-4">
                  {content.hero.titles.map((t, i) => (
                    <div key={i} className="flex gap-2">
                      <input 
                        value={t} 
                        onChange={(e) => updateHeroText('titles', i, e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-[#A48862] outline-none"
                      />
                      <button 
                        onClick={() => setContent(p => ({...p, hero: {...p.hero, titles: p.hero.titles.filter((_, idx) => idx !== i)}}))}
                        className="text-red-500 hover:text-red-400"
                      >×</button>
                    </div>
                  ))}
                  <button onClick={() => setContent(p => ({...p, hero: {...p.hero, titles: [...p.hero.titles, "Novo Título"]}}))} className="text-xs text-[#A48862]">+ Adicionar Título</button>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
              <h3 className="text-xl mb-6 font-serif">Imagens do Hero</h3>
              <div className="grid grid-cols-2 gap-4">
                {content.hero.images.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden bg-black group">
                    <img src={img} className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setContent(p => ({...p, hero: {...p.hero, images: p.hero.images.filter((_, idx) => idx !== i)}}))}
                      className="absolute inset-0 bg-red-600/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-bold text-xs"
                    >Remover Imagem</button>
                  </div>
                ))}
                <label className="border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center cursor-pointer aspect-square hover:bg-white/5 transition-colors">
                  <div className="text-center">
                    <span className="text-2xl text-[#A48862]">+</span>
                    <p className="text-[10px] uppercase font-bold text-gray-500 mt-1">Upload</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (b64) => setContent(p => ({...p, hero: {...p.hero, images: [...p.hero.images, b64]}})))} />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* TAB: SERVICES */}
        {activeTab === 'services' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
            {content.services.map((service) => (
              <div key={service.id} className="bg-white/5 rounded-3xl p-8 border border-white/10 flex flex-col sm:flex-row gap-6">
                <div className="w-32 h-32 shrink-0 relative rounded-xl overflow-hidden bg-black mx-auto">
                   <img src={service.image} className="w-full h-full object-cover" />
                   <label className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-[10px] font-bold">
                    Trocar Foto
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (b64) => updateService(service.id, 'image', b64))} />
                   </label>
                </div>
                <div className="flex-1 space-y-4">
                   <input 
                    value={service.title} 
                    onChange={(e) => updateService(service.id, 'title', e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 font-serif text-xl outline-none focus:border-[#A48862] pb-1"
                   />
                   <textarea 
                    value={service.description} 
                    onChange={(e) => updateService(service.id, 'description', e.target.value)}
                    className="w-full bg-transparent text-sm text-gray-400 outline-none h-20 resize-none"
                    placeholder="Descrição curta para o card..."
                   />
                </div>
              </div>
            ))}
           </div>
        )}

        {/* TAB: PORTFOLIO */}
        {activeTab === 'portfolio' && (
          <div className="animate-fade-in space-y-10">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-serif">Gerenciar Galeria</h3>
              <label className="bg-[#A48862] hover:bg-[#8e7554] px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer transition-all shadow-lg">
                Nova Foto no Portfólio
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, addPortfolioItem)} />
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {content.portfolio.map((item) => (
                <div key={item.id} className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 group">
                  <div className="aspect-[4/5] relative">
                    <img src={item.imageUrl} className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setContent(p => ({...p, portfolio: p.portfolio.filter(x => x.id !== item.id)}))}
                      className="absolute top-2 right-2 bg-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/></svg>
                    </button>
                  </div>
                  <div className="p-4 space-y-3">
                    <input 
                      value={item.title} 
                      onChange={(e) => setContent(p => ({...p, portfolio: p.portfolio.map(x => x.id === item.id ? {...x, title: e.target.value} : x)}))}
                      className="w-full bg-transparent border-b border-white/10 text-xs outline-none focus:border-[#A48862] pb-1"
                      placeholder="Título da obra"
                    />
                    <select 
                      value={item.category}
                      onChange={(e) => setContent(p => ({...p, portfolio: p.portfolio.map(x => x.id === item.id ? {...x, category: e.target.value} : x)}))}
                      className="w-full bg-white/10 rounded-lg p-2 text-[10px] font-bold uppercase outline-none"
                    >
                      <option value="Casamentos">Casamentos</option>
                      <option value="Corporativo">Corporativo</option>
                      <option value="Infantil">Infantil</option>
                      <option value="Eventos">Eventos</option>
                      <option value="Estúdio">Estúdio</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: CONTACT */}
        {activeTab === 'contact' && (
          <div className="max-w-2xl animate-fade-in space-y-8">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
              <h3 className="text-xl mb-6 font-serif">Informações de Contato</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">WhatsApp (DDI+DDD+NÚMERO)</label>
                  <input 
                    type="text" 
                    value={content.contact.whatsapp}
                    onChange={(e) => setContent(p => ({...p, contact: {...p.contact, whatsapp: e.target.value}}))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-[#A48862]"
                    placeholder="5511999999999"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">E-mail Profissional</label>
                  <input 
                    type="email" 
                    value={content.contact.email}
                    onChange={(e) => setContent(p => ({...p, contact: {...p.contact, email: e.target.value}}))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-[#A48862]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
