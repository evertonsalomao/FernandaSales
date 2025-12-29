
import React from 'react';

interface FooterProps {
  onAdminClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="bg-[#1A1A1A] text-white py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 border-b border-white/10 pb-12 mb-12">
          <div>
            <h3 className="text-2xl font-serif font-bold tracking-tight mb-2">Fernanda Sales</h3>
            <p className="text-gray-400 text-sm max-w-xs">Eternizando cada detalhe com sensibilidade e técnica apurada em São Paulo.</p>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#A48862] transition-colors uppercase text-xs font-bold tracking-widest">Instagram</a>
            <a href="#" className="hover:text-[#A48862] transition-colors uppercase text-xs font-bold tracking-widest">Pinterest</a>
            <button 
              onClick={onAdminClick}
              className="text-white/20 hover:text-white transition-colors uppercase text-[10px] font-bold tracking-widest"
            >
              Acesso Restrito
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 uppercase tracking-widest gap-4 text-center">
          <p>&copy; 2024 Fernanda Sales Fotografia. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
