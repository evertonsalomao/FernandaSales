
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="sobre" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
                alt="Fernanda Sales"
                className="rounded-2xl shadow-2xl w-full h-[600px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-[#F2EDE4] rounded-2xl -z-0 hidden md:block"></div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <span className="text-[#A48862] font-bold uppercase tracking-[0.2em] text-xs mb-4 block">A Mente por trás da Lente</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 text-[#2C2C2C]">Fernanda Sales</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
              <p>
                Minha jornada na fotografia começou há mais de 10 anos, com uma câmera analógica herdada do meu avô. O que começou como uma curiosidade sobre como a luz interagia com as formas, rapidamente se tornou minha forma de ver o mundo.
              </p>
              <p>
                Especializada em capturar a essência das pessoas, acredito que cada clique é uma oportunidade de contar uma história única. Não procuro apenas o "ângulo perfeito", mas sim a emoção genuína que acontece entre os sorrisos posados.
              </p>
              <p>
                Seja no silêncio do meu estúdio ou no caos vibrante de um casamento, meu compromisso é com a verdade de cada momento. Para mim, a fotografia não é sobre o que eu vejo, mas sobre como eu faço você se sentir ao olhar para aquela imagem anos depois.
              </p>
            </div>
            <div className="mt-10 flex items-center gap-8">
              <div>
                <span className="block text-3xl font-serif text-[#2C2C2C]">500+</span>
                <span className="text-sm text-gray-500 uppercase tracking-widest">Ensaios</span>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div>
                <span className="block text-3xl font-serif text-[#2C2C2C]">12</span>
                <span className="text-sm text-gray-500 uppercase tracking-widest">Anos de Experiência</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
