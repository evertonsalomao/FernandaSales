
import React, { useEffect } from 'react';
import { Service } from '../types';
import Contact from './Contact';

interface ServiceDetailProps {
  service: Service;
  onBack: () => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [service]);

  return (
    <div className="animate-fade-in pt-24">
      {/* Header Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <button 
            onClick={onBack}
            className="mb-8 text-sm font-bold uppercase tracking-widest text-[#A48862] hover:text-white transition-colors flex items-center gap-2 mx-auto"
          >
            &larr; Voltar para o Início
          </button>
          <h1 className="text-4xl md:text-7xl font-serif mb-4">
            {service.title} <br />
            <span className="text-xl md:text-2xl italic font-light opacity-80">em São Paulo</span>
          </h1>
          <p className="text-sm uppercase tracking-[0.3em] font-medium text-[#A48862]">
            {service.slug}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-3xl font-serif text-[#2C2C2C]">Sobre o Serviço</h2>
              <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
                <p className="text-xl font-medium text-[#2C2C2C] mb-6">
                  {service.description}
                </p>
                <p>
                  {service.detailedContent}
                </p>
              </div>
              
              <div className="bg-[#FDFBF7] p-8 rounded-2xl border-l-4 border-[#A48862]">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#A48862] mb-2">Diferencial em São Paulo</h4>
                <p className="text-gray-700 italic">
                  "{service.locationContext}"
                </p>
              </div>
            </div>

            <div className="space-y-12">
              <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
                <h3 className="text-xl font-serif mb-6">Por que escolher Fernanda em SP?</h3>
                <ul className="space-y-4">
                  {[
                    'Conhecimento dos melhores "spots" urbanos',
                    'Equipamento de ponta para luz variável',
                    'Mobilidade em toda a Grande São Paulo',
                    'Agilidade na entrega (fluxo digital)',
                    'Estúdio próprio na Vila Madalena'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                      <svg className="w-5 h-5 text-[#A48862] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center p-8 bg-[#2C2C2C] rounded-2xl text-white">
                <h4 className="text-lg font-serif mb-4">Dúvidas sobre o roteiro?</h4>
                <p className="text-xs text-gray-400 mb-6">Consulte nossa assistente IA para sugestões de locais e figurino para {service.title}.</p>
                <a href="#ai" onClick={onBack} className="inline-block bg-[#A48862] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all">
                  Usar Consultoria IA
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Social Proof / Locations */}
      <section className="py-20 bg-[#FDFBF7] border-y border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">Locais Populares de Atendimento</h3>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-[#2C2C2C] font-serif italic text-lg opacity-70">
            <span>Vila Madalena</span>
            <span>Jardins</span>
            <span>Itaim Bibi</span>
            <span>Avenida Paulista</span>
            <span>Pinheiros</span>
            <span>Moema</span>
            <span>Morumbi</span>
          </div>
        </div>
      </section>

      {/* Reuse Contact for booking */}
      <Contact />
    </div>
  );
};

export default ServiceDetail;
