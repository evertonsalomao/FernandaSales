
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ServiceDetail from './components/ServiceDetail';
import AdminPanel from './components/AdminPanel';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { Service, SiteContent } from './types';
import { SERVICES, PORTFOLIO } from './constants';
import { supabase, fetchSiteContent } from './services/supabase';

const INITIAL_CONTENT: SiteContent = {
  hero: {
    titles: ["Eternizando Momentos", "Sua História em Foco", "Luz, Alma e Emoção"],
    subtitles: ["Fernanda Sales transforma instantes em memórias tangíveis em São Paulo."],
    images: ["https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=2058", "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1974"]
  },
  services: SERVICES,
  portfolio: PORTFOLIO,
  contact: {
    email: "contato@fernandasales.com.br",
    whatsapp: "5511987654321"
  }
};

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePage, setActivePage] = useState<'home' | 'service' | 'admin'>('home');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [content, setContent] = useState<SiteContent>(INITIAL_CONTENT);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname;
      if (path === '/qube-manager') {
        setActivePage('admin');
      } else {
        setActivePage('home');
      }
    };

    handleLocation();
    window.addEventListener('popstate', handleLocation);

    // Monitorar sessão do Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Carregar conteúdo do banco
    const loadContent = async () => {
      const remoteContent = await fetchSiteContent();
      if (remoteContent && remoteContent.hero) {
        setContent(remoteContent);
      }
      setLoading(false);
    };

    loadContent();
    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToService = (service: Service) => {
    setSelectedService(service);
    setActivePage('service');
    window.scrollTo(0, 0);
  };

  const handleAdminNavigate = () => {
    window.history.pushState({}, '', '/qube-manager');
    setActivePage('admin');
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#FDFBF7]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#A48862] border-t-transparent rounded-full animate-spin"></div>
          <p className="font-serif italic text-[#A48862] animate-pulse">Carregando memórias...</p>
        </div>
      </div>
    );
  }

  if (activePage === 'admin') {
    return (
      <AdminPanel 
        content={content} 
        setContent={setContent} 
        session={session}
        onExit={() => {
          window.history.pushState({}, '', '/');
          setActivePage('home');
        }} 
      />
    );
  }

  return (
    <div className="relative min-h-screen">
      <Navbar 
        isScrolled={isScrolled} 
        onLogoClick={() => {
          window.history.pushState({}, '', '/');
          setActivePage('home');
        }} 
        isInternalPage={activePage !== 'home'} 
      />
      <main>
        {activePage === 'home' ? (
          <>
            <Hero content={content.hero} />
            <About />
            <Services services={content.services} onServiceClick={navigateToService} />
            <Portfolio items={content.portfolio} />
            <Contact contact={content.contact} />
          </>
        ) : (
          selectedService && <ServiceDetail service={selectedService} onBack={() => setActivePage('home')} />
        )}
      </main>
      <Footer onAdminClick={handleAdminNavigate} />
      <FloatingWhatsApp number={content.contact.whatsapp} />
    </div>
  );
};

export default App;
