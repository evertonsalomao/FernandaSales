
import React, { useState } from 'react';
import { PortfolioItem } from '../types';

interface PortfolioProps {
  items: PortfolioItem[];
}

const Portfolio: React.FC<PortfolioProps> = ({ items }) => {
  const [filter, setFilter] = useState<string>('Todos');
  const categories = ['Todos', 'Casamentos', 'Corporativo', 'Infantil', 'Eventos', 'Estúdio'];

  const filteredItems = filter === 'Todos' 
    ? items 
    : items.filter(item => item.category === filter);

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-[#A48862] font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Meu Trabalho</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#2C2C2C]">Portfólio</h2>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${filter === cat ? 'bg-[#2C2C2C] text-white' : 'bg-[#F2EDE4] text-[#2C2C2C] hover:bg-[#EAE1D5]'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-2xl h-[500px] cursor-pointer">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 text-white">
                <span className="text-xs uppercase tracking-widest font-bold mb-2 text-[#A48862]">{item.category}</span>
                <h3 className="text-2xl font-serif">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
