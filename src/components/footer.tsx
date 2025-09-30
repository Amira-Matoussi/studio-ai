"use client";
import { Typography, Button } from "@material-tailwind/react";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { useLanguage } from "@/contexts/LanguageContext";

const TRANSLATIONS = {
  en: {
    company: "Company",
    aboutUs: "About Us",
    team: "Team",
    careers: "Careers",
    contact: "Contact",
    services: "Services",
    aiVoiceAssistant: "AI Voice Assistant",
    aiFortuneTelling: "AI Fortune Telling",
    bankingAI: "Banking AI",
    consulting: "Consulting",
    legal: "Legal",
    terms: "Terms",
    privacy: "Privacy",
    security: "Security",
    compliance: "Compliance",
    companyName: "AI Studio",
    description: "Transforming the future with intelligent AI solutions. We bridge the gap between cutting-edge technology and real-world applications.",
    copyright: "AI Studio - AI Solutions for a Better World. All rights reserved.",
    scrollToTop: "Scroll to top"
  },
  fr: {
    company: "Entreprise",
    aboutUs: "À Propos",
    team: "Équipe",
    careers: "Carrières",
    contact: "Contact",
    services: "Services",
    aiVoiceAssistant: "Assistant Vocal IA",
    aiFortuneTelling: "Voyance IA",
    bankingAI: "IA Bancaire",
    consulting: "Conseil",
    legal: "Légal",
    terms: "Conditions",
    privacy: "Confidentialité",
    security: "Sécurité",
    compliance: "Conformité",
    companyName: "AI Studio",
    description: "Transformer l'avenir avec des solutions d'IA intelligentes. Nous comblons le fossé entre la technologie de pointe et les applications du monde réel.",
    copyright: "AI Studio - Solutions IA pour un Monde Meilleur. Tous droits réservés.",
    scrollToTop: "Retour en haut"
  }
};

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  const LINKS = [
    {
      title: t.company,
      items: [
        { name: t.aboutUs, href: "#about" },
        { name: t.team, href: "#about" },
        { name: t.careers, href: "#contact" },
        { name: t.contact, href: "#contact" }
      ],
    },
    {
      title: t.services,
      items: [
        { name: t.aiVoiceAssistant, href: "/services/ai-voice-assistant" },
        { name: t.aiFortuneTelling, href: "/services/ai-fortune-telling" },
        { name: t.bankingAI, href: "/services/banking-ai" },
        { name: t.consulting, href: "#contact" }
      ],
    },
    {
      title: t.legal,
      items: [
        { name: t.terms, href: "#" },
        { name: t.privacy, href: "#" },
        { name: t.security, href: "#" },
        { name: t.compliance, href: "#" }
      ],
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gray-50">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600 rounded-full opacity-5 blur-3xl"></div>
      </div>

      <div className="relative px-8 pt-20 pb-8">
        <div className="container max-w-7xl mx-auto">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-8">
                {/* @ts-ignore */}
                <Typography 
                  variant="h4" 
                  className="text-gray-900 font-bold mb-4"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {t.companyName}
                </Typography>
                {/* @ts-ignore */}
                <Typography 
                  className="text-gray-600 text-sm leading-relaxed font-medium"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {t.description}
                </Typography>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 mb-8">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-10 h-10 bg-gray-200 hover:bg-blue-600 rounded-full flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="w-10 h-10 bg-gray-200 hover:bg-blue-500 rounded-full flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-10 h-10 bg-gray-200 hover:bg-blue-700 rounded-full flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Links Sections */}
            {LINKS.map(({ title, items }) => (
              <div key={title} className="lg:col-span-1">
                {/* @ts-ignore */}
                <Typography 
                  variant="h6" 
                  className="text-gray-900 font-semibold mb-6"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {title}
                </Typography>
                <ul className="space-y-3">
                  {items.map(({ name, href }) => (
                    <li key={name}>
                      <a
                        href={href}
                        className="text-gray-600 hover:text-gray-900 text-sm transition-all duration-300 hover:translate-x-2 block font-medium"
                      >
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-300 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Centered Copyright Text */}
              <div className="flex-1 text-center">
                {/* @ts-ignore */}
                <Typography 
                  className="text-gray-500 text-sm font-medium"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  © {CURRENT_YEAR} {t.copyright}
                </Typography>
              </div>
              
              {/* Scroll to Top Button */}
              <button
                onClick={scrollToTop}
                className="group bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-900 p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg md:ml-4"
                aria-label={t.scrollToTop}
              >
                <ArrowUpIcon className="h-5 w-5 transition-transform group-hover:-translate-y-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;