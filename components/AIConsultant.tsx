
import React, { useState } from 'react';
import { getPhotographyAdvice } from '../services/gemini';

const AIConsultant: React.FC = () => {
  const [input, setInput] = useState('');
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    const result = await getPhotographyAdvice(input);
    setAdvice(result || "Não consegui pensar em nada agora, mas vamos conversar pessoalmente?");
    setLoading(false);
  };

  return (
    <section id="ai" className="py-24 bg-[#2C2C2C] text-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <span className="text-[#A48862] font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Assistente de Estilo Fernanda AI</span>
          <h2 className="text-4xl font-serif mb-6">Planeje seu Ensaio dos Sonhos</h2>
          <p className="text-gray-400">
            Diga-me que tipo de fotos você imagina ou peça uma sugestão. Nossa IA treinada no meu estilo fotográfico ajudará você a começar.
          </p>
        </div>

        <div className="bg-white/5 rounded-3xl p-8 backdrop-blur-sm border border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ex: Gostaria de um ensaio de gestante ao ar livre, o que sugere?"
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#A48862] placeholder-white/40"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#A48862] hover:bg-[#8e7554] disabled:bg-gray-600 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-all"
              >
                {loading ? 'Pensando...' : 'Consultar'}
              </button>
            </div>
          </form>

          {advice && (
            <div className="animate-fade-in bg-white/10 rounded-2xl p-8 border-l-4 border-[#A48862]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-[#A48862]">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop" alt="Fernanda AI" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="font-serif italic text-[#A48862] block mb-2">Fernanda Sales diz:</span>
                  <p className="text-lg leading-relaxed text-gray-200">
                    {advice}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AIConsultant;
