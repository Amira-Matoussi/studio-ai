"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Typography,
  Card,
  CardBody,
  CardHeader,
  Button,
} from "@material-tailwind/react";
import {
  PhoneIcon,
  CogIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import { useLanguage } from "@/contexts/LanguageContext";

const TRANSLATIONS = {
  en: {
    title: "Our Solutions",
    subtitle: "Comprehensive artificial intelligence solutions designed to transform your business and create lasting impact.",
    keyFeatures: "Key Features:",
    learnMore: "Learn More",
    services: [
      {
        title: "AI Voice Assistant",
        description: "Intelligent voice assistant that handles customer calls, provides 24/7 support, and delivers personalized responses to enhance customer experience.",
        features: ["24/7 call handling", "Natural language processing", "Customer support automation"]
      },
      {
        title: "Banking AI Solutions",
        description: "Comprehensive AI solutions for banking and financial services, including fraud detection, customer service, and automated financial advisory.",
        features: ["Fraud detection", "Financial advisory", "Customer service automation"]
      }
    ]
  },
  fr: {
    title: "Nos Solutions",
    subtitle: "Solutions d'intelligence artificielle complètes conçues pour transformer votre entreprise et créer un impact durable.",
    keyFeatures: "Caractéristiques Principales :",
    learnMore: "En Savoir Plus",
    services: [
      {
        title: "Assistant Vocal IA",
        description: "Assistant vocal intelligent qui gère les appels clients, fournit un support 24/7 et offre des réponses personnalisées pour améliorer l'expérience client.",
        features: ["Gestion d'appels 24/7", "Traitement du langage naturel", "Automatisation du support client"]
      },
      {
        title: "Solutions IA Bancaires",
        description: "Solutions IA complètes pour les services bancaires et financiers, incluant la détection de fraude, le service client et le conseil financier automatisé.",
        features: ["Détection de fraude", "Conseil financier", "Automatisation du service client"]
      }
    ]
  }
};

const SERVICES_DATA = [
  {
    icon: PhoneIcon,
    img: "/image/aivoice.jpg",
    link: "/services/ai-voice-assistant",
    color: "from-blue-500 to-cyan-500",
    stats: { clients: "500+", accuracy: "98%", uptime: "99.9%" }
  },
  {
    icon: CogIcon,
    img: "/image/banking.png",
    link: "/services/banking-ai",
    color: "from-green-500 to-emerald-500",
    stats: { transactions: "1M+", "fraud detected": "99.2%", saved: "$50M+" }
  },
];

export function Services() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const router = useRouter();
  const [visibleServices, setVisibleServices] = useState<number[]>([]);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [activeStats, setActiveStats] = useState<{[key: number]: string}>({});

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    
    SERVICES_DATA.forEach((_, index) => {
      const timeout = setTimeout(() => {
        setVisibleServices(prev => [...prev, index]);
      }, 300 + index * 400);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (hoveredService !== null) {
      const service = SERVICES_DATA[hoveredService];
      const statKeys = Object.keys(service.stats);
      let currentIndex = 0;

      const interval = setInterval(() => {
        setActiveStats(prev => ({
          ...prev,
          [hoveredService]: statKeys[currentIndex]
        }));
        currentIndex = (currentIndex + 1) % statKeys.length;
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [hoveredService]);
  
  const handleLearnMore = (link: string) => {
    router.push(link);
  };

  return (
    <section className="px-8 pt-16 pb-32">
      <div className="container mx-auto mb-24 text-center">
        <div className="opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
          {/* @ts-ignore */}
          <Typography 
            variant="h2" 
            className="font-bold text-black"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {t.title}
          </Typography>
          {/* @ts-ignore */}
          <Typography
            variant="lead"
            className="mt-2 mx-auto w-full px-4 text-slate-600 lg:w-6/12 lg:px-8 leading-relaxed"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {t.subtitle}
          </Typography>
          <br/>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-6"></div>
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-x-10 gap-y-24 md:grid-cols-2 lg:gap-x-14 max-w-6xl">
        {SERVICES_DATA.map((service, idx) => {
          const { icon: Icon, img, link, color, stats } = service;
          const serviceContent = t.services[idx];
          const isVisible = visibleServices.includes(idx);
          const isHovered = hoveredService === idx;
          const activeStatKey = activeStats[idx] || Object.keys(stats)[0];
          const activeStatValue = stats[activeStatKey as keyof typeof stats];
          
          return (
            <div
              key={idx}
              className={`group transition-all duration-1000 transform ${
                isVisible 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : 'translate-y-16 opacity-0 scale-95'
              }`}
              style={{ 
                transitionDelay: `${idx * 200}ms`,
                transformOrigin: 'center bottom'
              }}
              onMouseEnter={() => setHoveredService(idx)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* @ts-ignore */}
              <Card 
                className={`relative bg-white/90 backdrop-blur-xl border-0 shadow-xl transition-all duration-500 cursor-pointer overflow-hidden h-full ${
                  isHovered 
                    ? 'shadow-2xl scale-105 bg-white' 
                    : 'shadow-lg hover:shadow-xl'
                }`}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <div className={`absolute top-4 right-4 z-20 transition-all duration-500 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                  <div className={`px-3 py-1 bg-gradient-to-r ${color} text-white text-xs font-bold rounded-full shadow-lg`}>
                    {activeStatKey}: {activeStatValue}
                  </div>
                </div>

                <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-10' : ''}`}>
                  <div className={`w-full h-full bg-gradient-to-br ${color}`} />
                </div>
                {/* @ts-ignore */}
                <CardHeader 
                  className="h-64 m-6 relative overflow-hidden rounded-xl"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10`} />
                  <Image
                    width={768}
                    height={768}
                    src={img}
                    alt={serviceContent.title}
                    className={`h-full w-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-[1.05]'}`}
                  />
                  
                  <div className={`absolute bottom-4 left-4 transition-all duration-500 ${isHovered ? 'scale-110 rotate-6' : 'scale-100'}`}>
                    <div className={`p-3 bg-gradient-to-r ${color} rounded-xl shadow-lg backdrop-blur-sm`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardHeader>
                {/* @ts-ignore */}
                <CardBody
                  className="p-6 relative z-10"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${color} bg-opacity-10`}>
                      <Icon className="h-6 w-6 text-slate-700" />
                    </div>
                    {/* @ts-ignore */}
                    <Typography 
                      variant="h4" 
                      className="normal-case font-bold text-slate-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {serviceContent.title}
                    </Typography>
                  </div>
                  {/* @ts-ignore */}
                  <Typography 
                    className="mb-6 font-normal text-slate-600 leading-relaxed"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {serviceContent.description}
                  </Typography>

                  <div className="mb-8">
                    {/* @ts-ignore */}
                    <Typography 
                      variant="small" 
                      className="font-bold mb-3 text-slate-800 uppercase tracking-wider"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {t.keyFeatures}
                    </Typography>
                    <ul className="space-y-2">
                      {serviceContent.features.map((feature, featureIdx) => (
                        <li 
                          key={featureIdx} 
                          className={`flex items-center gap-3 transition-all duration-300 ${
                            isHovered ? 'translate-x-2' : ''
                          }`}
                          style={{ transitionDelay: `${featureIdx * 100}ms` }}
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${color} transition-all duration-300 ${isHovered ? 'scale-125' : ''}`} />
                          {/* @ts-ignore */}
                          <Typography 
                            variant="small" 
                            className="text-slate-600 font-medium"
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          >
                            {feature}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* @ts-ignore */}
                  <Button 
                    variant="outlined"
                    fullWidth
                    onClick={() => handleLearnMore(link)}
                    className={`group/btn border-2 transition-all duration-300 transform hover:scale-105 flex items-center justify-center font-semibold ${
                      isHovered 
                        ? `border-transparent bg-gradient-to-r ${color} text-white shadow-lg` 
                        : 'border-slate-300 text-slate-700 hover:border-slate-400'
                    }`}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <span className="mr-2">{t.learnMore}</span>
                    <ArrowRightIcon className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardBody>

                <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                  <div className={`absolute inset-0 rounded-2xl shadow-2xl bg-gradient-to-r ${color} opacity-20 blur-xl`} />
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-16">
        <div className="w-2/3 border-t border-black/20"></div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

export default Services;