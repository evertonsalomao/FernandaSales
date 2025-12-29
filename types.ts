
export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  detailedContent: string;
  image: string;
  locationContext: string;
}

export interface PortfolioItem {
  id: string;
  category: string;
  imageUrl: string;
  title: string;
}

// Added NavLink interface to resolve import error in constants.tsx
export interface NavLink {
  label: string;
  href: string;
}

export interface HeroContent {
  titles: string[];
  subtitles: string[];
  images: string[];
}

export interface SiteContent {
  hero: HeroContent;
  services: Service[];
  portfolio: PortfolioItem[];
  contact: {
    email: string;
    whatsapp: string;
  };
}