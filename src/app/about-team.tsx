"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Typography,
  Card,
  CardBody,
  Avatar,
} from "@material-tailwind/react";
import {
  HeartIcon,
  CpuChipIcon,
  GlobeAltIcon,
  LightBulbIcon,
} from "@heroicons/react/24/solid";
import { useLanguage } from "@/contexts/LanguageContext";

const TRANSLATIONS = {
  en: {
    aboutTitle: "About Us",
    aboutParagraph1: "Founded in 2025, AI Studio emerged from a simple yet powerful vision: to harness artificial intelligence for the betterment of humanity. We are a team of passionate technologists, researchers, and innovators committed to developing AI solutions that create meaningful positive impact across industries and communities worldwide.",
    aboutParagraph2: "Our approach combines cutting-edge research with practical applications, ensuring that every solution we develop serves a real-world purpose. From healthcare innovations to business automation, we're dedicated to making AI accessible and beneficial for everyone.",
    teamTitle: "Meet Our Team",
    teamSubtitle: "The brilliant minds behind AI Studio's innovative AI solutions.",
    teamMembers: [
      {
        name: "Slah Arfaoui",
        role: "CIO & Founder",
        bio: "Visionary leader driving innovation in AI solutions.",
      },
      {
        name: "Afef Arfaoui",
        role: "CEO & Founder",
        bio: "Strategic co-founder focused on scaling technologies.",
      },
      {
        name: "Amira Matoussi",
        role: "IT Engineer",
        bio: "Experienced software engineer specializing in AI.",
      },
      {
        name: "Leila Skouri",
        role: "IT Engineer", 
        bio: "Technical expert in machine learning implementation and AI.",
      },
    ]
  },
  fr: {
    aboutTitle: "À Propos de Nous",
    aboutParagraph1: "Fondé en 2025, AI Studio est né d'une vision simple mais puissante : exploiter l'intelligence artificielle pour le bien de l'humanité. Nous sommes une équipe de technologues passionnés, de chercheurs et d'innovateurs engagés à développer des solutions IA qui créent un impact positif significatif dans les industries et les communautés du monde entier.",
    aboutParagraph2: "Notre approche combine recherche de pointe et applications pratiques, garantissant que chaque solution que nous développons répond à un besoin concret. Des innovations en santé à l'automatisation commerciale, nous nous consacrons à rendre l'IA accessible et bénéfique pour tous.",
    teamTitle: "Rencontrez Notre Équipe",
    teamSubtitle: "Les esprits brillants derrière les solutions IA innovantes d'AI Studio.",
    teamMembers: [
      {
        name: "Slah Arfaoui",
        role: "CTO & Fondateur",
        bio: "Leader visionnaire stimulant l'innovation dans les solutions IA.",
      },
      {
        name: "Afef Arfaoui",
        role: "CEO & Fondatrice",
        bio: "Co-fondatrice stratégique axée sur la mise à l'échelle des technologies.",
      },
      {
        name: "Amira Matoussi",
        role: "Ingénieure IT",
        bio: "Ingénieure logiciel expérimentée spécialisée en IA.",
      },
      {
        name: "Leila Skouri",
        role: "Ingénieure IT", 
        bio: "Experte technique en implémentation d'apprentissage automatique et IA.",
      },
    ]
  }
};

export function AboutTeam() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const [isAboutVisible, setIsAboutVisible] = useState(false);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    
    // About Us animation
    const aboutTimeout = setTimeout(() => {
      setIsAboutVisible(true);
    }, 200);
    timeouts.push(aboutTimeout);
    
    // Team members animation - longer delay for more space
    t.teamMembers.forEach((_, index) => {
      const timeout = setTimeout(() => {
        setVisibleItems(prev => [...prev, index]);
      }, 1000 + index * 300);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [language, t.teamMembers]);

  return (
    <section className="container mx-auto px-8 pb-12 pt-16">
      {/* About Us Section - Image Left, Text Right */}
      <div className={`mb-40 transition-all duration-1000 transform ${isAboutVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image - Now positioned on the left with slide-in from left animation */}
          <div className="relative flex justify-start order-2 lg:order-1">
            <div className="relative lg:-translate-x-12">
              <div 
                className={`relative overflow-hidden shadow-2xl clip-blob transition-all duration-1000 ${
                  isAboutVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
                }`}
              >
                <Image
                  src="/image/about-us.jpg"
                  alt="About AI Studio"
                  width={500}
                  height={350}
                  className="object-cover w-[500px] h-[350px] transition-transform duration-700 hover:scale-105"
                />
                {/* Gray shadow behind */}
                <div className="absolute -z-10 top-4 left-4 w-full h-full bg-gray-200/50 clip-blob" />
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>
          
          {/* Text Content - Now positioned on the right */}
          <div className="space-y-6 order-1 lg:order-2">
            {/* @ts-ignore */}
            <Typography 
              variant="h2" 
              className="font-bold text-black"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {t.aboutTitle}
            </Typography>
            {/* @ts-ignore */}
            <Typography 
              variant="lead" 
              className="text-gray-700 leading-relaxed"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {t.aboutParagraph1}
            </Typography>
            {/* @ts-ignore */}
            <Typography 
              className="text-gray-600 leading-relaxed"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {t.aboutParagraph2}
            </Typography>
          </div>
        </div>
      </div>

      {/* Team Section - More space above */}
      <div className="mb-20 text-center">
        {/* @ts-ignore */}
        <Typography 
          variant="h3" 
          className="mb-4 font-bold text-black text-3xl lg:text-4xl"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {t.teamTitle}
        </Typography>

        {/* Decorative gradient line (coherent with About Us) */}
        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-6"></div>

        {/* @ts-ignore */}
        <Typography 
          variant="lead" 
          className="text-gray-600 lg:w-6/12 mx-auto text-center"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {t.teamSubtitle}
        </Typography>
      </div>

      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4 mb-16">
        {t.teamMembers.map(({ name, role, bio }, key) => {
          const isVisible = visibleItems.includes(key);
          const isHovered = hoveredMember === key;
          
          return (
            <div
              key={key}
              className={`group transition-all duration-700 transform ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${key * 150}ms` }}
              onMouseEnter={() => setHoveredMember(key)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              {/* @ts-ignore */}
              <Card 
                className={`relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden text-center h-full ${
                  isHovered ? 'border-blue-400/60 shadow-blue-400/25' : 'border-white/20'
                }`}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {/* Animated gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : ''}`} />
                {/* @ts-ignore */}
                <CardBody
                  className="p-8 relative z-10"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <div className="relative mb-6">
                    <div className={`w-24 h-24 mx-auto rounded-full p-1 bg-gradient-to-r from-blue-400 to-purple-400 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
                      {/* Avatar placeholder */}
                    </div>
                    {isHovered && (
                      <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-ping" />
                    )}
                  </div>
                  {/* @ts-ignore */}
                  <Typography 
                    variant="h5" 
                    className="text-black mb-1 font-semibold"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {name}
                  </Typography>
                  {/* @ts-ignore */}
                  <Typography 
                    className="text-blue-300 mb-3 font-medium text-sm uppercase tracking-wider"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {role}
                  </Typography>
                  {/* @ts-ignore */}
                  <Typography 
                    className="text-blue-100 leading-relaxed"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {bio}
                  </Typography>
                </CardBody>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Section Separator Line */}
      <div className="flex justify-center">
        <div className="w-2/3 border-t border-black/20"></div>
      </div>
    </section>
  );
}

export default AboutTeam;