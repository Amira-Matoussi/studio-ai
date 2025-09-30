"use client";
import Image from "next/image";
import { Button, Typography, Card } from "@material-tailwind/react";
import { useLanguage } from "@/contexts/LanguageContext";

const TRANSLATIONS = {
  en: {
    title: "AI Solutions Making the World a Better Place",
    description: "At AI Studio, we harness the power of artificial intelligence to solve real-world problems and create meaningful impact. Our innovative AI solutions are designed to improve lives, enhance productivity, and build a more sustainable future for everyone.",
    learnMore: "Learn More",
    getStarted: "Get Started"
  },
  fr: {
    title: "Solutions IA pour un Monde Meilleur",
    description: "Chez AI Studio, nous exploitons la puissance de l'intelligence artificielle pour résoudre des problèmes réels et créer un impact significatif. Nos solutions IA innovantes sont conçues pour améliorer la vie, accroître la productivité et construire un avenir plus durable pour tous.",
    learnMore: "En Savoir Plus",
    getStarted: "Commencer"
  }
};

function Hero() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  return (
    <div className="!flex h-[55vh] w-full items-center justify-between px-10">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute right-0 top-0 w-[920px] h-[780px] rounded-bl-[100px] object-cover object-center"
      >
        <source src="/image/videotest.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="container mx-auto mt-28">
        <div className="grid grid-cols-12 text-center lg:text-left">
          {/* @ts-ignore */}
          <Card className="col-span-full rounded-xl border border-white bg-white/90 py-10 p-8 shadow-lg shadow-black/10 backdrop-blur-sm backdrop-saturate-200 xl:col-span-7">
            {/* @ts-ignore */}
            <Typography
              variant="h1"
              color="blue-gray"
              className="lg:text-5xl !leading-snug text-3xl lg:max-w-3xl"
            >
              {t.title}
            </Typography>
            
            {/* @ts-ignore */}
            <Typography variant="lead" className="mb-10 mt-6 !text-gray-900">
              {t.description}
            </Typography>
            <div className="mb-8 flex justify-center gap-4 lg:justify-start">
              {/* @ts-ignore */}
              <Button color="gray">{t.learnMore}</Button>
              {/* @ts-ignore */}
              <Button color="gray" variant="outlined">
                {t.getStarted}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Hero;