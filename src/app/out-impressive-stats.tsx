"use client";
import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import {
  RocketLaunchIcon,
  UsersIcon,
  CpuChipIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";
import { useLanguage } from "@/contexts/LanguageContext";

const TRANSLATIONS = {
  en: {
    title: "Our Global Impact",
    subtitle: "We take pride in our commitment to innovation and our dedication to creating positive change through artificial intelligence.",
    stats: [
      {
        icon: RocketLaunchIcon,
        number: "500+",
        label: "Projects Completed",
      },
      {
        icon: UsersIcon,
        number: "1M+",
        label: "Lives Impacted",
      },
      {
        icon: CpuChipIcon,
        number: "50+",
        label: "AI Models Deployed",
      },
      {
        icon: GlobeAltIcon,
        number: "25+",
        label: "Countries Served",
      },
    ]
  },
  fr: {
    title: "Notre Impact Mondial",
    subtitle: "Nous sommes fiers de notre engagement envers l'innovation et notre dévouement à créer un changement positif grâce à l'intelligence artificielle.",
    stats: [
      {
        icon: RocketLaunchIcon,
        number: "500+",
        label: "Projets Réalisés",
      },
      {
        icon: UsersIcon,
        number: "1M+",
        label: "Vies Impactées",
      },
      {
        icon: CpuChipIcon,
        number: "50+",
        label: "Modèles IA Déployés",
      },
      {
        icon: GlobeAltIcon,
        number: "25+",
        label: "Pays Servis",
      },
    ]
  }
};

export function OutImpressiveStats() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  
  const [visibleStats, setVisibleStats] = useState<number[]>([]);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    
    // Header animation
    const headerTimeout = setTimeout(() => {
      setIsHeaderVisible(true);
    }, 200);
    timeouts.push(headerTimeout);

    // Stats animation
    t.stats.forEach((_, index) => {
      const timeout = setTimeout(() => {
        setVisibleStats(prev => [...prev, index]);
      }, 400 + index * 100);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [language, t.stats]);

  return (
    <section className="px-8 pt-60 pb-32">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 transform ${isHeaderVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {/* @ts-ignore */}
          <Typography 
            variant="h2" 
            className="font-bold text-black text-3xl lg:text-4xl mb-4"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {t.title}
          </Typography>
          
          {/* @ts-ignore */}
          <Typography 
            variant="lead" 
            className="text-gray-500 lg:w-8/12 mx-auto leading-relaxed"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {t.subtitle}
          </Typography>
        </div>

        {/* Minimalist Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {t.stats.map((stat, index) => {
            const { icon: Icon, number, label } = stat;
            const isVisible = visibleStats.includes(index);

            return (
              <div
                key={index}
                className={`text-center transition-all duration-500 transform ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Simple Icon */}
                <div className="flex justify-center mb-4">
                  <Icon className="w-8 h-8 text-gray-800" />
                </div>

                {/* Number */}
                {/* @ts-ignore */}
                <Typography 
                  variant="h2" 
                  className="font-bold text-black text-3xl lg:text-4xl mb-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {number}
                </Typography>

                {/* Label */}
                {/* @ts-ignore */}
                <Typography 
                  variant="small" 
                  className="text-gray-500 font-medium uppercase tracking-wide"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {label}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default OutImpressiveStats;