
import React, { useState, useEffect } from 'react';
import { HeroContent } from '../types';

interface HeroProps {
  content: HeroContent;
}

const Hero: React.FC<HeroProps> = ({ content }) => {
  const [randomImage, setRandomImage] = useState('');
  const [randomTitle, setRandomTitle] = useState('');
  const [randomSubtitle, setRandomSubtitle] = useState('');

  useEffect(() => {
    if (content.images.length > 0) {
      const idx = Math.floor(Math.random() * content.images.length);
      setRandomImage(content.images[idx]);
    }
    if (content.titles.length > 0) {
      const tIdx = Math.floor(Math.random() * content.titles.length);
      setRandomTitle(content.titles[tIdx]);
    }
    if (content.subtitles.length > 0) {
      const sIdx = Math.floor(Math.random() * content.subtitles.length);
      setRandomSubtitle(content.subtitles[sIdx]);
    }
  }, [content]);

  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {randomImage && (
          <img
            src={randomImage}
            alt="Hero Background"
            className="w-full h-full object-cover animate-slow-zoom"
          />
        )}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center text-white">
        <h1 className="text-5xl md:text-8xl font-serif mb-6 leading-tight animate-fade-in-up">
          {randomTitle} <br />
          <span className="italic">com Alma e Luz</span>
        </h1>
        <p className="text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto opacity-90 animate-fade-in delay-200">
          {randomSubtitle}
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in delay-300">
          <a href="#portfolio" className="bg-white text-[#2C2C2C] px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all text-sm shadow-xl">
            Ver Portfólio
          </a>
          <a href="#contato" className="border border-white text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-[#2C2C2C] transition-all text-sm backdrop-blur-sm">
            Agendar Sessão
          </a>
        </div>
      </div>
      <style>{`
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate linear;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;
