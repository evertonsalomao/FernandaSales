
import React, { useState } from 'react';
import { NAV_LINKS } from '../constants';

interface NavbarProps {
  isScrolled: boolean;
  onLogoClick: () => void;
  isInternalPage: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled, onLogoClick, isInternalPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || isInternalPage ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <button onClick={onLogoClick} className={`text-left transition-transform hover:scale-105 cursor-pointer ${isScrolled || isInternalPage ? 'text-[#2C2C2C]' : 'text-white'}`}>
          <span className="text-2xl font-serif font-bold tracking-tight block">
            Fernanda Sales
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-light block ml-1">Fotografia • São Paulo</span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center">
          {!isInternalPage ? (
            NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide hover:opacity-70 transition-opacity ${isScrolled ? 'text-[#2C2C2C]' : 'text-white'}`}
              >
                {link.label}
              </a>
            ))
          ) : (
            <button 
              onClick={onLogoClick}
              className="text-sm font-bold text-[#A48862] hover:text-[#2C2C2C] flex items-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/></svg>
              Voltar para Home
            </button>
          )}
          <a
            href="#contato"
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${isScrolled || isInternalPage ? 'bg-[#2C2C2C] text-white hover:bg-black' : 'bg-white text-[#2C2C2C] hover:bg-opacity-90'}`}
          >
            Reservar em SP
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <svg className={`w-6 h-6 ${isScrolled || isInternalPage ? 'text-[#2C2C2C]' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-white shadow-xl transition-all duration-300 ${isOpen ? 'max-h-[500px] py-6' : 'max-h-0 overflow-hidden'}`}>
        {!isInternalPage ? (
          NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block px-8 py-3 text-lg font-serif text-[#2C2C2C] border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))
        ) : (
          <button
            onClick={() => { onLogoClick(); setIsOpen(false); }}
            className="block w-full text-left px-8 py-3 text-lg font-serif text-[#A48862]"
          >
            &larr; Voltar para Home
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
