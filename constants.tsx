
import { Service, PortfolioItem, NavLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Início', href: '#inicio' },
  { label: 'História', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Consultoria IA', href: '#ai' },
  { label: 'Contato', href: '#contato' },
];

export const SERVICES: Service[] = [
  {
    id: 'events',
    slug: 'fotografia-de-eventos-sao-paulo',
    title: 'Eventos Sociais',
    description: 'Cobertura fotográfica premium para eventos em São Paulo, capturando cada detalhe com sofisticação.',
    locationContext: 'Atendimento em toda a capital paulista, com foco em espaços de eventos nos Jardins, Itaim Bibi e Pinheiros.',
    detailedContent: 'Nossa fotografia de eventos em São Paulo foca na espontaneidade e no luxo. Atendemos desde lançamentos de marcas na Oscar Freire até festas exclusivas em rooftops da Faria Lima. O olhar de Fernanda Sales busca a conexão real entre os convidados, entregando um registro atemporal da energia paulistana.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop',
  },
  {
    id: 'corporate',
    slug: 'fotografia-corporativa-headshots-sp',
    title: 'Corporativo & Branding',
    description: 'Retratos executivos e posicionamento de imagem para profissionais no centro financeiro de SP.',
    locationContext: 'Estúdio localizado na Vila Madalena ou sessões "in-company" na região da Av. Paulista e Berrini.',
    detailedContent: 'No mercado competitivo de São Paulo, sua imagem é seu cartão de visitas. Realizamos ensaios corporativos que transmitem autoridade e modernidade. Especialistas em headshots para LinkedIn e branding pessoal para executivos do setor financeiro e criativo de SP.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 'kids',
    slug: 'festa-infantil-fotografo-sao-paulo',
    title: 'Festas Infantis',
    description: 'A alegria das crianças em SP registrada com naturalidade e cores vibrantes.',
    locationContext: 'Disponibilidade para buffets infantis em Moema, Brooklin e região do Morumbi.',
    detailedContent: 'Cada aniversário é único. Em São Paulo, onde as festas infantis são verdadeiros espetáculos, Fernanda Sales traz um olhar lúdico. Focamos na interação da criança com a família e amiguinhos, sem interrupções forçadas, permitindo que a diversão seja a protagonista.',
    image: 'https://images.unsplash.com/photo-1530103862676-fa392211d118?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'weddings',
    slug: 'fotografia-de-casamento-sp-luxo',
    title: 'Casamentos',
    description: 'Destination wedding e casamentos clássicos nas igrejas e espaços mais icônicos de São Paulo.',
    locationContext: 'Cobertura em locais como Capela da PUC, Mosteiro de São Bento e fazendas no interior de SP.',
    detailedContent: 'Casar em São Paulo é abraçar a pluralidade. Seja um mini-wedding charmoso na Vila Madalena ou uma celebração grandiosa em um hotel de luxo, nossa fotografia documental foca na narrativa emocional. Fernanda Sales é especialista em luz natural e momentos não roteirizados.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'studio',
    slug: 'ensaio-estudio-vila-madalena-sp',
    title: 'Ensaios em Estúdio',
    description: 'Controle total de luz e privacidade em nosso estúdio boutique na Vila Madalena.',
    locationContext: 'Espaço climatizado e moderno no coração do bairro mais artístico de São Paulo.',
    detailedContent: 'Nosso estúdio na Vila Madalena é um refúgio de criatividade. Ideal para ensaios de gestante, moda ou retratos artísticos. Com equipamentos de última geração, garantimos um ambiente acolhedor onde o cliente se sente à vontade para expressar sua verdadeira essência sob a luz controlada.',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop',
  },
];

// Fixed IDs to be strings to match PortfolioItem interface
export const PORTFOLIO: PortfolioItem[] = [
  { id: '1', category: 'Casamentos', title: 'Casamento no Jockey Club SP', imageUrl: 'https://picsum.photos/seed/p1/800/1000' },
  { id: '2', category: 'Corporativo', title: 'Diretoria Google Brasil', imageUrl: 'https://picsum.photos/seed/p2/800/1000' },
  { id: '3', category: 'Infantil', title: 'Aniversário no Buffet Spasso Kids', imageUrl: 'https://picsum.photos/seed/p3/800/1000' },
  { id: '4', category: 'Estúdio', title: 'Editorial Vogue SP', imageUrl: 'https://picsum.photos/seed/p4/800/1000' },
  { id: '5', category: 'Eventos', title: 'SP Fashion Week Backstage', imageUrl: 'https://picsum.photos/seed/p5/800/1000' },
  { id: '6', category: 'Casamentos', title: 'Mini Wedding em Pinheiros', imageUrl: 'https://picsum.photos/seed/p6/800/1000' },
];