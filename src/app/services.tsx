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
  SparklesIcon,
} from "@heroicons/react/24/solid";

const SERVICES = [
  {
    icon: PhoneIcon,
    title: "AI Voice Assistant",
    description: "Intelligent voice assistant that handles customer calls, provides 24/7 support, and delivers personalized responses to enhance customer experience.",
    features: ["24/7 call handling", "Natural language processing", "Customer support automation"],
    img: "/image/aivoice.jpg",
    link: "/services/ai-voice-assistant",
    color: "from-blue-500 to-cyan-500",
    stats: { clients: "500+", accuracy: "98%", uptime: "99.9%" }
  },
  {
    icon: CogIcon,
    title: "Banking AI Solutions",
    description: "Comprehensive AI solutions for banking and financial services, including fraud detection, customer service, and automated financial advisory.",
    features: ["Fraud detection", "Financial advisory", "Customer service automation"],
    img: "/image/banking.png",
    link: "/services/banking-ai",
    color: "from-green-500 to-emerald-500",
    stats: { transactions: "1M+", "fraud detected": "99.2%", saved: "$50M+" }
  },
];

export function Services() {
  const router = useRouter();
  const [visibleServices, setVisibleServices] = useState<number[]>([]);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [activeStats, setActiveStats] = useState<{[key: number]: string}>({});

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    
    SERVICES.forEach((_, index) => {
      const timeout = setTimeout(() => {
        setVisibleServices(prev => [...prev, index]);
      }, 300 + index * 400);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (hoveredService !== null) {
      const service = SERVICES[hoveredService];
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
          {/* <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 mb-6">
          
          </div> */}
          {/* @ts-ignore */}
          <Typography 
            variant="h2" 
            className="font-bold text-black"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Our Solutions
          </Typography>
          {/* @ts-ignore */}
          <Typography
            variant="lead"
            className="mt-2 mx-auto w-full px-4 text-slate-600 lg:w-6/12 lg:px-8 leading-relaxed"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Comprehensive artificial intelligence solutions designed to transform
            your business and create lasting impact.
          </Typography>
          <br/>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-6"></div>
          {/* <div className="flex items-center justify-center space-x-4 mt-8">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200"></div>
          </div> */}
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-x-10 gap-y-24 md:grid-cols-2 lg:gap-x-14 max-w-6xl">
        {SERVICES.map((service, idx) => {
          const { icon: Icon, title, description, features, img, link, color, stats } = service;
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
                {/* Stats Overlay */}
                <div className={`absolute top-4 right-4 z-20 transition-all duration-500 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                  <div className={`px-3 py-1 bg-gradient-to-r ${color} text-white text-xs font-bold rounded-full shadow-lg`}>
                    {activeStatKey}: {activeStatValue}
                  </div>
                </div>

                {/* Animated Background Gradient */}
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
                    alt={title}
                    className={`h-full w-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-[1.05]'}`}
                  />
                  
                  {/* Floating Icon */}
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
                      {title}
                    </Typography>
                  </div>
                  {/* @ts-ignore */}
                  <Typography 
                    className="mb-6 font-normal text-slate-600 leading-relaxed"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {description}
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
                      Key Features:
                    </Typography>
                    <ul className="space-y-2">
                      {features.map((feature, featureIdx) => (
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
                    <span className="mr-2">Learn More</span>
                    <ArrowRightIcon className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardBody>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                  <div className={`absolute inset-0 rounded-2xl shadow-2xl bg-gradient-to-r ${color} opacity-20 blur-xl`} />
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA Section
      <div className="text-center mt-20 opacity-0 animate-[fadeInUp_1s_ease-out_1.5s_forwards]">
        <div className="inline-flex items-center space-x-4 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse`} style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
          
          <Typography 
            variant="h6" 
            className="text-slate-700 font-semibold"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Ready to transform your business with AI?
          </Typography>
          
          <Button 
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Get Started
          </Button>
        </div>
      </div> */}

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
      
      {/* Section Separator Line */}
     {/* Section Separator Line */}
<div className="flex justify-center mt-16">
  <div className="w-2/3 border-t border-black/20"></div>
</div>
      
    </section>
    
  );
}

export default Services;