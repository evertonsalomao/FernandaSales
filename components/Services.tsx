
import React from 'react';
import { Service } from '../types';

interface ServicesProps {
  services: Service[];
  onServiceClick: (service: Service) => void;
}

const Services: React.FC<ServicesProps> = ({ services, onServiceClick }) => {
  return (
    <section id="servicos" className="py-24 bg-[#FDFBF7]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#A48862] font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Experiência Local em SP</span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#2C2C2C]">Serviços Profissionais</h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto italic">Especializada em capturar a luz e a arquitetura urbana de São Paulo em cada registro.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              onClick={() => onServiceClick(service)}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:-translate-y-2 cursor-pointer"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif mb-4 text-[#2C2C2C]">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {service.description}
                </p>
                <button className="text-[#A48862] text-xs font-bold uppercase tracking-widest hover:text-[#2C2C2C] transition-colors flex items-center gap-2">
                  Ver Detalhes em SP <span>&rarr;</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
